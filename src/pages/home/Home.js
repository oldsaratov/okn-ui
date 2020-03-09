import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';

import history from '../../history';
import { VIEW_TYPES } from '../../constants';
import { authService } from '../../services/auth.service';
import ObjectList from './ObjectList';
import ObjectMap from './ObjectMap';
import LastEvents from './LastEvents';
import FiltersPanel from './FiltersPanel';
import './Home.scss';

const Home = (props) => {
    const { isLoggedIn, filters } = props;
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

            {isLoggedIn && (
                <div className="okn-new-object-section">
                    <Button type="primary" size="large" onClick={() => history.push(`/objects/new`)}>
                        Добавить объект
                    </Button>
                </div>
            )}

            <LastEvents/>
        </div>
    );
};

const mapStateToProps = (state) => ({
    isLoggedIn: authService.isLoggedIn(),
    filters: state.filters
});

export default connect(mapStateToProps)(Home);
