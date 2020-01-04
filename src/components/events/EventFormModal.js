import React from 'react';
import { Col, DatePicker, Form, Input, Modal, Row } from 'antd';

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
                width={800}
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
                                {getFieldDecorator('name', { rules: [requiredFieldRule] })(<Input/>)}
                            </Form.Item>

                            <Form.Item {...formItemLayout} label="Описание">
                                {getFieldDecorator('description')(<TextArea autoSize={{ minRows: 2, maxRows: 6 }}/>)}
                            </Form.Item>

                            <Form.Item {...formItemLayout} label="Дата">
                                {getFieldDecorator('occuredAt', {
                                    rules: [{ type: 'object',  ...requiredFieldRule }]
                                })(<DatePicker />)}
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item {...formItemLayout} label="Фото">
                                {getFieldDecorator('photos', {
                                    valuePropName: 'fileList'
                                })(<Upload />)}
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        );
    }
});

export default EventFormModal;
