import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Icon, Spin, Tag } from 'antd';

import history from '../history';
import { fetchObject, resetObject } from '../actions';
import ObjectEvents from '../components/events/Events';
import { getObjectType } from '../selectors';
import { authService } from '../services/auth.service';

import './ObjectShow.scss';

class ObjectShow extends Component {

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

        if (this.props.error) {
            return this.renderError();
        }

        return (
            <Fragment>
                <div className="okn-object">
                    <h1 className="okn-object__title">
                        {this.props.name}
                        {this.props.isLoggedIn && (
                            <Button
                                type="link"
                                icon="edit"
                                className="okn-object__title__edit-button"
                                onClick={() => history.push(`/objects/edit/${this.props.id}`)}
                            >
                                Редактировать
                            </Button>
                        )}
                    </h1>
                    <p>{this.props.description}</p>
                    <p>Тип <Tag color={this.props.type.color}>{this.props.type.label}</Tag></p>
                </div>

                <ObjectEvents objectId={this.props.id} eventsCount={this.props.eventsCount}/>
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
    return {
        id: ownProps.match.params.id,
        isLoggedIn: authService.isLoggedIn(),
        ...state.object,
        type: getObjectType(state.object.type) || {}
    };
};

export default connect(mapStateToProps, { fetchObject, resetObject })(ObjectShow);
