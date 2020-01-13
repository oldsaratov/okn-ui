import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';

import { fetchObject, updateObject } from '../actions';
import ObjectEvents from '../components/events/Events';
import ObjectForm from '../components/object/ObjectForm';
import history from '../history';
import { getActionStatus } from '../selectors';

class ObjectEdit extends Component {
    state = { formObject: null };

    componentDidMount() {
        this.props.fetchObject(this.props.id);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.updateStatus.loading && !this.props.updateStatus.loading) {
            this.goToObjectShow();
        }
    }

    onFormChange = changedFields => {
        const current = this.state.formObject ? this.state.formObject : this.props.formObject;

        this.setState({ formObject: { ...current, ...changedFields } });
    };

    onFormSubmit = object => {
        this.props.updateObject({ ...this.props.formObject, ...object });
    };

    goToObjectShow = () => {
        history.push(`/objects/${this.props.id}`);
    };

    render() {
        if (this.props.loading) {
            return this.renderLoading();
        }

        const { id, formObject, hasEvents } = this.props;

        return (
            <Fragment>
                <div className="okn-object">
                    <div className="okn-object__content">
                        <ObjectForm
                            object={this.state.formObject || formObject}
                            loading={this.props.updateStatus.loading}
                            onChange={this.onFormChange}
                            onCancel={this.goToObjectShow}
                            onSubmit={this.onFormSubmit}
                        />
                    </div>
                </div>

                <ObjectEvents isLoggedIn editable objectId={id} hasEvents={hasEvents}/>
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
    const { model, loading } = state.object;

    return {
        id: ownProps.match.params.id,
        loading,
        hasEvents: model.eventsCount > 0,
        formObject: model,
        updateStatus: getActionStatus(state, 'update', model.id)
    };
};

export default connect(mapStateToProps, { fetchObject, updateObject })(ObjectEdit);
