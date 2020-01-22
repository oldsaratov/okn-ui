import React, { useState } from 'react';

import { DEFAULT_FILTERS } from '../../constants';
import ObjectList from './ObjectList';
import ObjectMap from './ObjectMap';
import FiltersPanel from '../../components/FiltersPanel';
import './Home.scss';

const Home = () => {
    const [filters, setFilters] = useState(DEFAULT_FILTERS);
    const showMap = filters.viewType === 'map';

    return (
        <div className="okn-home-page">
            <FiltersPanel onChange={setFilters}/>

            {showMap && (
                <ObjectMap filters={filters}/>
            )}

            {!showMap && (
                <ObjectList filters={filters}/>
            )}
        </div>
    );
};

export default Home;
