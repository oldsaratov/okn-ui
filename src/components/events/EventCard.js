import React from 'react';
import { connect } from 'react-redux';
import { Button, Card, Icon, Popconfirm, Typography } from 'antd';

import { deleteObjectEvent, updateObjectEvent } from '../../actions';
import { getActionStatus } from '../../selectors';
import EventFormModal from './EventFormModal';

const { Paragraph } = Typography;

class EventCard extends React.Component {
    state = { visible: false };

    onEditEvent = () => {
        this.toggleModal(true);
    };

    onDeleteEvent = () => {
        this.props.deleteObjectEvent(this.props.objectId, this.props.event.id)
    };

    onFormSave = () => {
        const { form } = this.formRef.props;

        form.validateFields((err, event) => {
            if (err) {
                return;
            }

            this.props.updateObjectEvent(this.props.objectId, { ...this.props.event, ...event });
        });
    };

    toggleModal = visible => {
        this.setState({ visible });
    };

    editFormRef = formRef => {
        this.formRef = formRef;
    };

    render() {
        const { event } = this.props;

        return (
            <Card
                size="small"
                title={event.name}
                extra={this.props.isLoggedIn ? this.renderActions() : null}
                style={{ width: 400 }}
            >
                <Paragraph ellipsis={{ rows: 5, expandable: true }}>{event.description}</Paragraph>
            </Card>
        );
    };

    renderActions() {
        return (
            <div className="okn-event-card__actions">
                <Button type="link" icon="edit" onClick={this.onEditEvent}/>

                <Popconfirm
                    title="Вы уверены что хотите удалить это событие?"
                    okText="Удалить"
                    okType="danger"
                    icon={<Icon type="warning" style={{ color: 'red' }}/>}
                    onConfirm={this.onDeleteEvent}
                >
                    <Button type="link" icon="delete" loading={this.props.deleteStatus.loading}/>
                </Popconfirm>

                {this.renderEditModal()}
            </div>
        );
    }

    renderEditModal() {
        const modal = (
            <EventFormModal
                wrappedComponentRef={this.editFormRef}
                visible={this.state.visible}
                title="Редактирование событие"
                okText="Сохранить"
                confirmLoading={this.props.updateStatus.loading}
                event={this.props.event}
                onCancel={() => this.toggleModal(false)}
                onSave={this.onFormSave}
            />
        );

        return this.props.isLoggedIn && modal;
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        updateStatus: getActionStatus(state, 'update', ownProps.event.id),
        deleteStatus: getActionStatus(state, 'delete', ownProps.event.id)
    };
};

export default connect(mapStateToProps, { deleteObjectEvent, updateObjectEvent })(EventCard);
