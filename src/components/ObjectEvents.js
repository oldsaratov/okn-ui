import React from 'react';
import { connect } from 'react-redux';
import { Icon, Spin, Timeline } from 'antd';

import { fetchObjectEvents, resetObjectEvents } from '../actions';

class ObjectEvents extends React.Component {

    componentDidMount() {
        this.props.fetchObjectEvents(this.props.objectId);
    }

    componentWillUnmount() {
        this.props.resetObjectEvents();
    }

    render() {
        return (
            <div>
                <h2>События</h2>
                <div>{this.renderContent()}</div>
            </div>
        );
    }

    renderContent() {
        if (this.props.loading) {
            return <Spin size="large"/>;
        } else if (this.props.error) {
            return <div>Что-то пошло не так <Icon type="frown" /></div>;
        } else if (!this.props.loading && this.props.events.length === 0) {
            return <div>С этим объектом пока ещё ничего не случилось.</div>;
        }

        return this.renderTimeline();
    }

    renderTimeline() {
        const timelineItems = this.props.events.map(event => <Timeline.Item key={event.id}>{event.name}</Timeline.Item>);

        return <Timeline>{timelineItems}</Timeline>;
    }

}

const mapStateToProps = state => {
    return { ...state.events };
};

export default connect(mapStateToProps, { fetchObjectEvents, resetObjectEvents })(ObjectEvents);
