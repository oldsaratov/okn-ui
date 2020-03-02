import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import history from '../history';
import { createObject } from '../actions';
import { getActionStatus } from '../selectors';
import ObjectForm from '../components/object/ObjectForm';

class ObjectCreate extends Component {
    state = { formObject: {} };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.updateStatus.loading && !this.props.updateStatus.loading) {
            this.goToObjectShow();
        }
    }

    onFormChange = changedFields => {
        this.setState({ formObject: { ...this.state.formObject, ...changedFields } });
    };

    onFormSubmit = object => {
        this.props.createObject({ ...this.props.formObject, ...object });
    };

    goToHome = () => {
        history.push('/');
    };

    goToObjectShow = () => {
        history.push(`/objects/${this.props.model.id}`);
    };

    render() {
        return (
            <Fragment>
                <div className="okn-object">
                    <div className="okn-object__content">
                        <ObjectForm
                            object={this.state.formObject}
                            loading={this.props.updateStatus.loading}
                            onChange={this.onFormChange}
                            onCancel={this.goToHome}
                            onSubmit={this.onFormSubmit}
                        />
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    const { model, loading } = state.object;

    return {
        model,
        loading,
        updateStatus: getActionStatus(state, 'create', 'newObject')
    };
};

export default connect(mapStateToProps, { createObject })(ObjectCreate);
