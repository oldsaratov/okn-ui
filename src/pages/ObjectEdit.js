import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Col, Form, Input, Row, Select, Spin } from 'antd';

import { fetchObject, updateObject } from '../actions';
import ObjectEvents from '../components/events/Events';
import Upload from '../components/Upload';
import { OBJECT_TYPES } from '../constants';
import history from '../history';
import { getActionStatus } from '../selectors';

const { TextArea } = Input;
const { Option } = Select;

const requiredFieldRule = { required: true, message: 'Обязательное поле' };

const ObjectForm = Form.create({
    name: 'object_form',
    mapPropsToFields(props) {
        const { object } = props;

        return (object && {
            name: Form.createFormField({ ...object.name, value: object.name }),
            description: Form.createFormField({ ...object.description, value: object.description }),
            type: Form.createFormField({ ...object.type, value: object.type }),
            photos: Form.createFormField({ ...object.photos, value: object.photos })
        }) || {};
    },
    onValuesChange(props, changedFields) {
        props.onChange(changedFields);
    }
})(class extends Component {

    handleSubmit = event => {
        event.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            }

            this.props.onSubmit(values);
        });
    };

    hasErrors = fieldsError => {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
    };

    render() {
        const { form, loading } = this.props;
        const { getFieldDecorator, getFieldsError } = form;

        return (
            <Form colon={false} layout="vertical" onSubmit={this.handleSubmit} className="okn-object-form">
                <Form.Item label="Название">
                    {getFieldDecorator('name', { rules: [requiredFieldRule] })(<Input/>)}
                </Form.Item>

                <Row gutter={32}>
                    <Col span={12}>
                        <Form.Item label="Фото" className="okn-object-form__photos">
                            {getFieldDecorator('photos', {
                                valuePropName: 'fileList'
                            })(<Upload type="image" />)}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Описание">
                            {getFieldDecorator('description')(<TextArea autoSize={{ minRows: 10, maxRows: 20 }}/>)}
                        </Form.Item>

                        <Form.Item label="Тип">
                            {getFieldDecorator('type')(
                                <Select placeholder="Тип">
                                    {OBJECT_TYPES.map(opt => <Option key={opt.value} value={opt.value}>{opt.label}</Option>)}
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                </Row>

                <Row type="flex" justify="end">
                    <Button onClick={() => this.props.onCancel()}>Отмена</Button>
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={this.hasErrors(getFieldsError())}
                        loading={loading}
                        className="okn-object-form__submit"
                    >
                        Сохранить
                    </Button>
                </Row>
            </Form>
        );
    }
});

class ObjectEdit extends Component {
    state = { formObject: null };

    componentDidMount() {
        this.props.fetchObject(this.props.id);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.updateStatus.loading && !this.props.updateStatus.loading) {
            this.goToObjectShow();
        }
    }

    onFormChange = changedFields => {
        const current = this.state.formObject ? this.state.formObject : this.props.formObject;

        this.setState({ formObject: { ...current, ...changedFields } });
    };

    onFormSubmit = object => {
        this.props.updateObject({ ...this.props.formObject, ...object });
    };

    goToObjectShow = () => {
        history.push(`/objects/${this.props.id}`);
    };

    render() {
        if (this.props.loading) {
            return this.renderLoading();
        }

        const { id, formObject, hasEvents } = this.props;

        return (
            <Fragment>
                <div className="okn-object">
                    <ObjectForm
                        object={this.state.formObject || formObject}
                        loading={this.props.updateStatus.loading}
                        onChange={this.onFormChange}
                        onCancel={this.goToObjectShow}
                        onSubmit={this.onFormSubmit}
                    />
                </div>

                <ObjectEvents objectId={id} hasEvents={hasEvents} editable={true}/>
            </Fragment>
        );
    }

    renderLoading() {
        return (
            <div className="okn-empty-state">
                <Spin size="large"/>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { model, loading } = state.object;

    return {
        id: ownProps.match.params.id,
        loading,
        hasEvents: model.eventsCount > 0,
        formObject: model,
        updateStatus: getActionStatus(state, 'update', model.id)
    };
};

export default connect(mapStateToProps, { fetchObject, updateObject })(ObjectEdit);
