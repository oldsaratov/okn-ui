import React, { Component } from 'react';
import { Button, Col, Form, Input, Row, Select } from 'antd';

import Upload from '../Upload';
import { OBJECT_TYPES } from '../../constants';
import './ObjectForm.scss';
import ObjectMainPhoto from './ObjectMainPhoto';

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
            mainPhoto: Form.createFormField({ ...object.mainPhoto, value: object.mainPhoto }),
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
                <Row gutter={32}>
                    <Col span={12}>
                        <Form.Item label="Главная фотография">
                            {getFieldDecorator('mainPhoto', { valuePropName: 'photo' })(<ObjectMainPhoto editable />)}
                        </Form.Item>

                        <Form.Item label="Дополнительные фотографии" className="okn-object-form__photos">
                            {getFieldDecorator('photos', {
                                valuePropName: 'fileList'
                            })(<Upload type="image"/>)}
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item label="Название">
                            {getFieldDecorator('name', { rules: [requiredFieldRule] })(<Input/>)}
                        </Form.Item>

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

export default ObjectForm;
