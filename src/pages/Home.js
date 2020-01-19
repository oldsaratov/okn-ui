import React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'antd';

import { fetchAllObjects } from '../actions';
import { DEFAULT_FILTERS } from '../constants';
import ObjectList from '../components/object/ObjectList';
import FiltersPanel from '../components/FiltersPanel';
import './Home.scss';

class Home extends React.Component {
    state = { filters: DEFAULT_FILTERS };

    componentDidMount() {
        this.props.fetchAllObjects();
    }

    onFiltersChange = filters => {
        this.setState({ filters: filters });
    };

    render() {
        const showMap = this.state.filters.viewType === 'map';

        return (
            <div className="okn-home-page">
                <FiltersPanel onChange={this.onFiltersChange}/>

                {showMap && (
                    <div className="okn-empty-state okn-empty-state--grey">
                        <Icon type="hourglass" className="okn-empty-state__icon"/>
                        <h2>{this.props.objects.length} объектов когда-нибудь будут показаны здесь на карте</h2>
                    </div>
                )}

                {!showMap && (
                    <ObjectList filters={this.state.filters}/>
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { all } = state.objects;

    return { objects: all };
};

export default connect(mapStateToProps, { fetchAllObjects })(Home);
