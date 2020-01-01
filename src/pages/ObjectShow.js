import React from 'react';
import { connect } from 'react-redux';
import { Icon, Spin } from 'antd';

import { fetchObject, resetObject } from '../actions';
import ObjectEvents from '../components/events/Events';
import { authService } from '../services/auth.service';

class ObjectShow extends React.Component {

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
            <div>
                <div>
                    <h1>{this.props.name}</h1>
                    <p>{this.props.description}</p>
                </div>

                <ObjectEvents objectId={this.props.id} isLoggedIn={this.props.isLoggedIn} />
            </div>
        );
    };

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
                <h2>Что-то пошло не так <Icon type="frown" /></h2>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        id: ownProps.match.params.id,
        isLoggedIn: authService.isLoggedIn(),
        ...state.object
    };
};

export default connect(mapStateToProps, { fetchObject, resetObject })(ObjectShow);
