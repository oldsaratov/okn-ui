import React from 'react';
import { connect } from 'react-redux';
import { Button, Icon, Spin, Timeline } from 'antd';

import {
    createObjectEvent,
    deleteObjectEvent,
    fetchObjectEvents,
    resetObjectEvents,
    updateObjectEvent
} from '../../actions';
import EventCard from './EventCard';
import EventModal from './EventModal';

class Events extends React.Component {
    state = { modalVisible: false, modalType: null, selectedEvent: null };

    componentDidMount() {
        this.props.fetchObjectEvents(this.props.objectId);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.confirmLoading && !this.props.confirmLoading) {
            this.closeModal();
        }
    }

    componentWillUnmount() {
        this.props.resetObjectEvents();
    }

    onAddEvent = () => {
        this.setState({ modalVisible: true, modalType: 'NEW', selectedEvent: null });
    };

    onEditEvent = event => {
        this.setState({ modalVisible: true, modalType: 'EDIT', selectedEvent: event });
    };

    onDeleteEvent = event => {
        this.props.deleteObjectEvent(this.props.objectId, event.id)
    };

    closeModal = () => {
        this.setState({ modalVisible: false });
    };

    onFormSave = () => {
        const { form } = this.formRef.props;

        form.validateFields((err, event) => {
            if (err) {
                return;
            }

            if (this.state.modalType === 'NEW') {
                this.props.createObjectEvent(this.props.objectId, event);
            } else {
                this.props.updateObjectEvent(this.props.objectId, { ...this.state.selectedEvent, ...event });
            }
        });
    };

    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    render() {
        return (
            <div>
                {this.renderTitle()}
                {this.renderContent()}
                {this.renderModal()}
            </div>
        );
    }

    renderContent() {
        if (this.props.loading) {
            return <Spin size="large"/>;
        } else if (this.props.error) {
            return <div>Что-то пошло не так <Icon type="frown"/></div>;
        } else if (!this.props.loading && this.props.events.length === 0) {
            return <div>С этим объектом пока ещё ничего не случилось.</div>;
        }

        return this.renderTimeline();
    }

    renderTitle() {
        const button = this.props.isLoggedIn
            ? <Button type="link" icon="plus" onClick={this.onAddEvent}>Добавить</Button>
            : null;

        return <h2>События {button}</h2>;
    }

    renderTimeline() {
        const timelineItems = this.props.events.map(event =>
            <Timeline.Item key={event.id} dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}>
                <EventCard
                    event={event}
                    isLoggedIn={this.props.isLoggedIn}
                    confirmLoading={this.props.confirmLoading}
                    onEdit={() => this.onEditEvent(event)}
                    onDelete={() => this.onDeleteEvent(event)}
                />
            </Timeline.Item>
        );

        return <Timeline>{timelineItems}</Timeline>;
    }

    renderModal() {
        const modal = (
            <EventModal
                wrappedComponentRef={this.saveFormRef}
                visible={this.state.modalVisible}
                confirmLoading={this.props.confirmLoading}
                event={this.state.selectedEvent}
                type={this.state.modalType}
                onCancel={() => this.closeModal()}
                onSave={this.onFormSave}
            />
        );

        return this.props.isLoggedIn && modal;
    }
}

const mapStateToProps = state => {
    return { ...state.events };
};

export default connect(mapStateToProps, {
    createObjectEvent,
    fetchObjectEvents,
    deleteObjectEvent,
    resetObjectEvents,
    updateObjectEvent
})(Events);
