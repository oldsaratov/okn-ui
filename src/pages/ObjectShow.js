import React from 'react';
import { connect } from 'react-redux';
import { Icon, Spin } from 'antd';

import { fetchObject, resetObject } from '../actions';

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
                <h2>{this.props.name}</h2>
                <div>{this.props.description}</div>
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
        ...state.object
    };
};

export default connect(mapStateToProps, { fetchObject, resetObject })(ObjectShow);
