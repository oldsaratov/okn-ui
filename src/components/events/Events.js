import React from 'react';
import { connect } from 'react-redux';
import { Button, Icon, Spin, Timeline } from 'antd';

import { createObjectEvent, fetchObjectEvents } from '../../actions';
import { getActionStatus } from '../../selectors';
import EventCard from './EventCard';
import EventFormModal from './EventFormModal';

import './Events.css';

class Events extends React.Component {
    state = { visible: false, formEvent: {} };

    componentDidMount() {
        this.props.fetchObjectEvents(this.props.objectId);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.createStatus.loading && !this.props.createStatus.loading) {
            this.toggleModal(false);
        }
    }

    onAddEvent = () => {
        this.setState({ formEvent: {} });
        this.toggleModal(true);
    };

    onFormChange = changedEventFields => {
        this.setState(({ formEvent }) => ({ formEvent: { ...formEvent, ...changedEventFields } }));
    };

    onFormSave = () => {
        const { form } = this.formRef.props;

        form.validateFields((err, event) => {
            if (err) {
                return;
            }

            this.props.createObjectEvent(this.props.objectId, event);
        });
    };

    newFormRef = formRef => {
        this.formRef = formRef;
    };

    toggleModal = visible => {
        this.setState({ visible });
    };

    render() {
        return (
            <div className="okn-object-events">
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

        return <h2 className="okn-object-events__title">События {button}</h2>;
    }

    renderTimeline() {
        const timelineItems = this.props.events.map(event =>
            <Timeline.Item
                key={event.id}
                dot={<Icon type="clock-circle-o" theme="twoTone" style={{ fontSize: '26px' }}/>}>
                <EventCard
                    objectId={this.props.objectId}
                    event={event}
                    isLoggedIn={this.props.isLoggedIn}
                />
            </Timeline.Item>
        );

        return <Timeline className="okn-object-events__container" mode="alternate">{timelineItems}</Timeline>;
    }

    renderModal() {
        const modal = (
            <EventFormModal
                wrappedComponentRef={this.newFormRef}
                visible={this.state.visible}
                title="Новое событие"
                okText="Создать"
                confirmLoading={this.props.createStatus.loading}
                event={this.state.formEvent}
                onChange={this.onFormChange}
                onCancel={() => this.toggleModal(false)}
                onSave={this.onFormSave}
            />
        );

        return this.props.isLoggedIn && modal;
    }
}

const mapStateToProps = state => {
    return {
        ...state.events,
        createStatus: getActionStatus(state, 'create', 'event')
    };
};

export default connect(mapStateToProps, { createObjectEvent, fetchObjectEvents })(Events);
