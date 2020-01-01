import React from 'react';
import { DatePicker, Form, Input, Modal } from 'antd';

const { TextArea } = Input;

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
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
                width={600}
                confirmLoading={confirmLoading}
                okText={okText}
                cancelText="Отмена"
                onCancel={onCancel}
                onOk={onSave}
            >
                <Form colon={false}>
                    <Form.Item {...formItemLayout} label="Заголовок">
                        {getFieldDecorator('name', { rules: [requiredFieldRule] })(<Input/>)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="Описание">
                        {getFieldDecorator('description')(<TextArea autoSize={{ minRows: 2, maxRows: 6 }}/>)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="Дата">
                        {getFieldDecorator('occuredAt', { rules: [{ type: 'object',  ...requiredFieldRule }] })(<DatePicker />)}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
});

export default EventFormModal;
