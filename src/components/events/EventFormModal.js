import React from 'react';
import { Col, DatePicker, Form, Input, Modal, Row } from 'antd';

// Import RU locale from moment for Datepicker (months)
import 'moment/locale/ru';

import Upload from '../Upload';

const { TextArea } = Input;

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};
const requiredFieldRule = { required: true, message: 'Обязательное поле' };

const EventFormModal = Form.create({
    name: 'event_form_in_modal',
    mapPropsToFields(props) {
        const { event } = props;

        return (event && {
            name: Form.createFormField({ ...event.name, value: event.name }),
            description: Form.createFormField({ ...event.description, value: event.description }),
            occuredAt: Form.createFormField({ ...event.occuredAt, value: event.occuredAt }),
            files: Form.createFormField({ ...event.files, value: event.files }),
            photos: Form.createFormField({ ...event.photos, value: event.photos })
        }) || {};
    },
    onValuesChange(props, values) {
        props.onChange(values);
    }
})(class extends React.Component {
    render() {
        const { visible, title, onCancel, onSave, okText, form, confirmLoading } = this.props;
        const { getFieldDecorator } = form;

        return (
            <Modal
                visible={visible}
                title={title}
                width={1000}
                confirmLoading={confirmLoading}
                maskClosable={false}
                okText={okText}
                cancelText="Отмена"
                onCancel={onCancel}
                onOk={onSave}
            >
                <Form colon={false}>
                    <Row>
                        <Col span={12}>
                            <Form.Item {...formItemLayout} label="Заголовок">
                                {getFieldDecorator('name', { rules: [requiredFieldRule] })(<Input size="small"/>)}
                            </Form.Item>

                            <Form.Item {...formItemLayout} label="Описание">
                                {getFieldDecorator('description')(<TextArea size="small" autoSize={{ minRows: 3, maxRows: 6 }}/>)}
                            </Form.Item>

                            <Form.Item {...formItemLayout} label="Дата">
                                {getFieldDecorator('occuredAt', {
                                    rules: [{ type: 'object',  ...requiredFieldRule }]
                                })(<DatePicker size="small" />)}
                            </Form.Item>

                            <Form.Item {...formItemLayout} label="Файлы">
                                {getFieldDecorator('files', {
                                    valuePropName: 'fileList'
                                })(<Upload type="file" />)}
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item {...formItemLayout} label="Фото">
                                {getFieldDecorator('photos', {
                                    valuePropName: 'fileList'
                                })(<Upload type="image" />)}
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        );
    }
});

export default EventFormModal;
