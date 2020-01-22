import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'antd';

import { fetchAllObjects } from '../../actions';
import isEqual from 'lodash/isEqual';

class ObjectMap extends Component {

    componentDidMount() {
        this.fetchObjects();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!isEqual(prevProps.filters, this.props.filters)) {
            this.fetchObjects();
        }
    }

    fetchObjects = () => {
        this.props.fetchAllObjects({
            term: this.props.filters.searchTerm,
            types: this.props.filters.objectTypes
        });
    };

    render() {
        return (
            <div className="okn-empty-state okn-empty-state--grey">
                <Icon type="hourglass" className="okn-empty-state__icon"/>
                <h2>{this.props.objects.length} объектов когда-нибудь будут показаны здесь на карте</h2>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { all, loading } = state.objects;

    return {
        objects: all,
        loading
    };
};

export default connect(mapStateToProps, { fetchAllObjects })(ObjectMap);