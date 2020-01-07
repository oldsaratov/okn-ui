import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { fetchObject, resetObject } from '../actions';
import ObjectEvents from '../components/events/Events';
import { Spin } from 'antd';

class ObjectEdit extends Component {

    componentDidMount() {
        this.props.fetchObject(this.props.id);
    }

    componentWillUnmount() {
        this.props.resetObject();
    }

    render() {
        if (this.props.loading) {
            return this.renderLoading();
        }

        return (
            <Fragment>
                <div className="okn-object">
                    <h1>{this.props.name}</h1>
                </div>

                <ObjectEvents objectId={this.props.id} eventsCount={this.props.eventsCount} editable={true}/>
            </Fragment>
        );
    }

    renderLoading() {
        return (
            <div className="okn-empty-state">
                <Spin size="large"/>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        id: ownProps.match.params.id,
        ...state.object
    };
};

export default connect(mapStateToProps, { fetchObject, resetObject })(ObjectEdit);
