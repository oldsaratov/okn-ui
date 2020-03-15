import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { Button, Icon, Spin, Timeline, Typography } from 'antd';
import groupBy from 'lodash/groupBy';

import { createObjectEvent, fetchObjectEvents } from '../../actions';
import { getActionStatus } from '../../selectors';
import EventCard from './EventCard';
import EventFormModal from './EventFormModal';

import './Events.scss';
const { Text } = Typography;

const Events = props => {
    const { createStatus, createObjectEvent, fetchObjectEvents, hasEvents, objectId } = props;
    const [formEvent, setFormEvent] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const isMobileOrTablet = useMediaQuery({ maxWidth: 768 });
    let formRef = {};

    /**
     * Fetch object events on init
     */
    useEffect(() => {
        if (hasEvents) {
            fetchObjectEvents(objectId);
        }
    }, [fetchObjectEvents, hasEvents, objectId]);

    /**
     * Close EventFormModal after saving event
     */
    useEffect(() => {
        if (!createStatus.loading) {
            setModalVisible(false);
        }
    }, [createStatus]);

    const onAddEvent = () => {
        setFormEvent({});
        setModalVisible(true);
    };

    const onFormChange = changedFields => {
        setFormEvent({ ...formEvent, ...changedFields });
    };

    const onFormSave = () => {
        const { form } = formRef.props;

        form.validateFields((err, event) => {
            if (err) {
                return;
            }

            createObjectEvent(props.objectId, event);
        });
    };

    const newFormRef = value => {
        formRef = value;
    };

    const renderContent = () => {
        if (props.loading) {
            return <Spin size="large" className="okn-object-events__loading"/>;
        } else if (props.error) {
            return <Text className="okn-object-events__message">Что-то пошло не так <Icon type="frown"/></Text>;
        } else if (!props.loading && props.events.length === 0) {
            return <Text className="okn-object-events__message">С этим объектом пока ещё ничего не случилось.</Text>;
        }

        return renderTimeline();
    }

    const renderTitle = () => {
        const button = (
            <div className="okn-object-events__title__edit-button">
                <Button title="Добавить" type="link" icon="plus" onClick={onAddEvent}/>
            </div>
        );

        return <h2 className="okn-object-events__title">События {props.isLoggedIn && button}</h2>;
    }

    const renderTimeline = () => {
        const timeline = [];
        const timelineMode = isMobileOrTablet ? 'left' : 'alternate';
        const years = groupBy(
            props.events.map((event, i) => ({
                ...event,
                position: isMobileOrTablet ? 'left' : i % 2 === 0 ? 'left' : 'right' })
            ),
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
                return renderTimelineYear(item, index);
            }

            return renderTimelineEvent(item, index);
        });

        return <Timeline className="okn-object-events__timeline" mode={timelineMode}>{timelineItems}</Timeline>;
    }

    const renderTimelineYear = (year, index) => {
        const dot = (
            <div className="okn-dot-year">
                <Icon type="calendar" className="okn-dot-year__icon"/>
                <span className="okn-dot-year__year">{year}</span>
            </div>
        );

        return (
            <Timeline.Item key={index} dot={dot}>
                <div className="okn-object-events__timeline__fake-block"></div>
            </Timeline.Item>
        );
    }

    const renderTimelineEvent = (event, index) => {
        const dot = (
            <div className="okn-dot-event">
                <Icon type="clock-circle" className="okn-dot-event__icon"/>
            </div>
        );

        return (
            <Timeline.Item
                className={event.position}
                key={index}
                dot={dot}
                position={event.position}
            >
                <EventCard objectId={props.objectId} event={event} editable={props.isLoggedIn}/>
            </Timeline.Item>
        );
    }

    const renderModal = () => {
        const modal = (
            <EventFormModal
                wrappedComponentRef={newFormRef}
                visible={modalVisible}
                title="Новое событие"
                okText="Создать"
                confirmLoading={props.createStatus.loading}
                event={formEvent}
                onChange={onFormChange}
                onCancel={() => setModalVisible(false)}
                onSave={onFormSave}
            />
        );

        return props.isLoggedIn && modal;
    }

    return (
        <div className="okn-object-events">
            {renderTitle()}
            {renderContent()}
            {renderModal()}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        ...state.events,
        createStatus: getActionStatus(state, 'create', 'event')
    };
};

export default connect(mapStateToProps, { createObjectEvent, fetchObjectEvents })(Events);
