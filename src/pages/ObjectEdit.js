import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Col, Form, Input, Row, Select, Spin } from 'antd';

import { fetchObject, resetObject } from '../actions';
import ObjectEvents from '../components/events/Events';
import { OBJECT_TYPES } from '../constants';

const { TextArea } = Input;
const { Option } = Select;

class ObjectEdit extends Component {

    componentDidMount() {
        this.props.fetchObject(this.props.id);
    }

    componentWillUnmount() {
        this.props.resetObject();
    }

    handleFormChange = changedFields => {
        console.log('handleFormChange changedFields', changedFields);
    };

    render() {
        if (this.props.loading) {
            return this.renderLoading();
        }

        const { formObject } = this.props;

        return (
            <Fragment>
                <div className="okn-object">
                    <ObjectForm object={formObject} onChange={this.handleFormChange}/>
                </div>

                <ObjectEvents objectId={this.props.id} eventsCount={this.props.eventsCount} editable={true}/>
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

const requiredFieldRule = { required: true, message: 'Обязательное поле' };

const ObjectForm = Form.create({
    name: 'object_form',
    mapPropsToFields(props) {
        const { object } = props;

        return (object && {
            name: Form.createFormField({ ...object.name, value: object.name }),
            description: Form.createFormField({ ...object.description, value: object.description }),
            type: Form.createFormField({ ...object.type, value: object.type })
        }) || {};
    },
    onValuesChange(props, changedFields) {
        props.onChange(changedFields);
    }
})(class extends Component {
    render() {
        const { form } = this.props;
        const { getFieldDecorator } = form;

        return (
            <Form colon={false} layout="vertical">
                <Form.Item label="Название">
                    {getFieldDecorator('name', { rules: [requiredFieldRule] })(<Input/>)}
                </Form.Item>

                <Row>
                    <Col span={12}></Col>
                    <Col span={12}>
                        <Form.Item label="Описание">
                            {getFieldDecorator('description')(<TextArea autoSize={{ minRows: 10, maxRows: 20 }}/>)}
                        </Form.Item>

                        <Form.Item label="Тип">
                            {getFieldDecorator('type')(
                                <Select placeholder="Тип">
                                    {OBJECT_TYPES.map(opt => <Option key={opt.value}>{opt.label}</Option>)}
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        );
    }
});

const mapStateToProps = (state, ownProps) => {
    return {
        id: ownProps.match.params.id,
        loading: state.object.loading,
        eventsCount: state.object.eventsCount,
        formObject: {
            name: state.object.name || '',
            description: state.object.description || '',
            type: state.object.type ? state.object.type.toString() : ''
        }
    };
};

export default connect(mapStateToProps, { fetchObject, resetObject })(ObjectEdit);
