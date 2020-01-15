import React from 'react';
import { connect } from 'react-redux';
import { Col, Icon, Radio, Row } from 'antd';

import { fetchAllObjects } from '../actions';
import './Home.scss';

class Home extends React.Component {

    componentDidMount() {
        this.props.fetchAllObjects();
    }

    render() {
        return (
            <div className="okn-home-page">
                <Row gutter={16} type="flex" justify="space-between"className="okn-filters-panel">
                    <Col></Col>

                    <Col>
                        <Radio.Group defaultValue="map" buttonStyle="solid" className="okn-filters-panel__type">
                            <Radio.Button value="map"><Icon type="picture"/></Radio.Button>
                            <Radio.Button value="list"><Icon type="unordered-list"/></Radio.Button>
                        </Radio.Group>
                    </Col>
                </Row>

                <div className="okn-empty-state okn-empty-state--grey">
                    <Icon type="hourglass" className="okn-empty-state__icon"/>
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
