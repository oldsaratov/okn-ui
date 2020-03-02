import React from 'react';
import { connect } from 'react-redux';
import { Button, Col, Row } from 'antd';

import history from '../../history';
import { VIEW_TYPES } from '../../constants';
import ObjectList from './ObjectList';
import ObjectMap from './ObjectMap';
import FiltersPanel from '../../components/FiltersPanel';
import './Home.scss';

const Home = (props) => {
    const { filters } = props;
    const showMap = filters.viewType === VIEW_TYPES.MAP;

    return (
        <div className="okn-home-page">
            <FiltersPanel/>

            {showMap && (
                <ObjectMap filters={filters}/>
            )}

            {!showMap && (
                <ObjectList filters={filters}/>
            )}

            <Row>
                <Col span={16}></Col>

                <Col span={8} className="okn-new-object-section">
                    <Button
                        type="primary"
                        onClick={() => history.push(`/objects/new`)}
                    >
                        Добавить объект
                    </Button>
                </Col>
            </Row>
        </div>
    );
};

const mapStateToProps = (state) => ({ filters: state.filters });

export default connect(mapStateToProps)(Home);
