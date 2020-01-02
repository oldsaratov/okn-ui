import React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'antd';

import { fetchAllObjects } from '../actions';
import './Home.css';

class Home extends React.Component {

    componentDidMount() {
        this.props.fetchAllObjects();
    }

    render() {
        return (
            <div className="okn-home-page">
                <div className="okn-empty-state okn-empty-state--grey">
                    <Icon type="hourglass" className="okn-empty-state__icon" />
                    <h2>{this.props.objects.length} объектов когда-нибудь будут показаны здесь на карте</h2>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { objects: state.objects.all };
};

export default connect(mapStateToProps, { fetchAllObjects })(Home);
