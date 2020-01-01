import React from 'react';
import { Form, Input, Modal } from 'antd';

const { TextArea } = Input;

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
};
const requiredFieldRule = { required: true, message: 'Обязательное поле' };

const EventModal = Form.create({
    name: 'form_in_modal',
    mapPropsToFields(props) {
        const { event } = props;

        return (event && {
            name: Form.createFormField({ ...event.name, value: event.name }),
            description: Form.createFormField({ ...event.description, value: event.description }),
        }) || {};
    }
})(class extends React.Component {
        render() {
            const { visible, type, onCancel, onSave, form, confirmLoading } = this.props;
            const { getFieldDecorator } = form;
            const isNew = type === 'NEW';

            return (
                <Modal
                    visible={visible}
                    title={isNew ? 'Новое событие' : 'Редиктирование события'}
                    width={600}
                    confirmLoading={confirmLoading}
                    okText={isNew ? 'Создать' : 'Сохранить'}
                    cancelText="Отмена"
                    onCancel={onCancel}
                    onOk={onSave}
                >
                    <Form colon={false}>
                        <Form.Item {...formItemLayout} label="Заголовок">
                            {getFieldDecorator('name', { rules: [requiredFieldRule] })(<Input />)}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="Описание">
                            {getFieldDecorator('description')(<TextArea autoSize={{ minRows: 2, maxRows: 6 }} />)}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    },
);

export default EventModal;
