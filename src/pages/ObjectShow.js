import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Icon, Spin, Tag } from 'antd';

import history from '../history';
import { fetchObject } from '../actions';
import ObjectEvents from '../components/events/Events';
import { getObjectType } from '../selectors';
import { authService } from '../services/auth.service';

import './ObjectShow.scss';

class ObjectShow extends Component {

    componentDidMount() {
        this.props.fetchObject(this.props.id);
    }

    render() {
        if (this.props.loading) {
            return this.renderLoading();
        }

        if (this.props.error) {
            return this.renderError();
        }

        const { id, object, hasEvents, type, isLoggedIn } = this.props;

        return (
            <Fragment>
                <div className="okn-object">
                    <h1 className="okn-object__title">
                        {object.name}
                        {isLoggedIn && (
                            <Button
                                type="link"
                                icon="edit"
                                className="okn-object__title__edit-button"
                                onClick={() => history.push(`/objects/edit/${id}`)}
                            >
                                Редактировать
                            </Button>
                        )}
                    </h1>
                    <p>{object.description}</p>
                    <p>Тип <Tag color={type.color}>{type.label}</Tag></p>
                </div>

                <ObjectEvents objectId={id} hasEvents={hasEvents}/>
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

    renderError() {
        return (
            <div className="okn-empty-state">
                <h2>Что-то пошло не так <Icon type="frown"/></h2>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { model, loading, error } = state.object;

    return {
        id: ownProps.match.params.id,
        loading,
        error,
        isLoggedIn: authService.isLoggedIn(),
        object: model,
        hasEvents: model.eventsCount > 0,
        type: getObjectType(model.type) || {}
    };
};

export default connect(mapStateToProps, { fetchObject })(ObjectShow);
