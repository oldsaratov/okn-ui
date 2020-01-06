import React from 'react';
import { connect } from 'react-redux';
import { Button, Icon, Spin, Timeline, Typography } from 'antd';
import groupBy from 'lodash/groupBy';

import { createObjectEvent, fetchObjectEvents } from '../../actions';
import { getActionStatus } from '../../selectors';
import EventCard from './EventCard';
import EventFormModal from './EventFormModal';

import './Events.scss';

const { Text } = Typography;

class Events extends React.Component {
    state = { visible: false, formEvent: {} };

    componentDidMount() {
        if (this.props.eventsCount > 0) {
            this.props.fetchObjectEvents(this.props.objectId);
        }
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
            return <Spin size="large" className="okn-object-events__loading"/>;
        } else if (this.props.error) {
            return <Text className="okn-object-events__message">Что-то пошло не так <Icon type="frown"/></Text>;
        } else if (!this.props.loading && this.props.events.length === 0) {
            return <Text className="okn-object-events__message">С этим объектом пока ещё ничего не случилось.</Text>;
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
        const timeline = [];
        const years = groupBy(
            this.props.events.map((event, i) => ({ ...event, position: i % 2 === 0 ? 'left' : 'right' })),
            event => event.occuredAt.format('YYYY')
        );

        for (const year in years) {
            const revertedYears = years[year].reverse();

            revertedYears.forEach((event, index) => {
                timeline.unshift({ type: 'event', item: { ...event, last: index === 0 } });
            });

            timeline.unshift({ type: 'dot', item: year });
        }

        const timelineItems = timeline.map(({ type, item }, index) => {
            if (type === 'dot') {
                return this.renderTimelineYear(item, index);
            }

            return this.renderTimelineEvent(item, index);
        });

        return <Timeline className="okn-object-events__timeline" mode="alternate">{timelineItems}</Timeline>;
    }

    renderTimelineYear(year, index) {
        const dot = (
            <div className="okn-dot-year">
                <Icon type="calendar" className="okn-dot-year__icon" />
                <span className="okn-dot-year__year">{year}</span>
            </div>
        );

        return (
            <Timeline.Item key={index} dot={dot}>
                <div className="okn-object-events__timeline__fake-block"></div>
            </Timeline.Item>
        );
    }

    renderTimelineEvent(event, index) {
        const dot = (
            <div className="okn-dot-event">
                <Icon type="clock-circle" className="okn-dot-event__icon" />
            </div>
        );

        return (
            <Timeline.Item
                className={event.position}
                key={index}
                dot={dot}
                position={event.position}
            >
                <EventCard
                    objectId={this.props.objectId}
                    event={event}
                    isLoggedIn={this.props.isLoggedIn}
                />
            </Timeline.Item>
        );
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
