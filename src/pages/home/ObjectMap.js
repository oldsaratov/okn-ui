import React, { PureComponent, Component } from 'react';
import { connect } from 'react-redux';
import ReactMapGL, { Marker, FullscreenControl, NavigationControl } from 'react-map-gl';
import isEqual from 'lodash/isEqual';
import { Spin } from 'antd';

import { fetchAllObjects } from '../../actions';
import { SARATOV_CENTER_COORDS } from '../../constants';
import { getObjectType } from '../../selectors';
import MapPin from '../../components/MapPin';

const mapboxApiAccessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

class Markers extends PureComponent {
    render() {
        const { data } = this.props;

        return data.map(
            object => {
                const type = getObjectType(object.type);

                return (
                    <Marker
                        key={object.id}
                        longitude={object.coords.longitude}
                        latitude={object.coords.latitude} >
                        <MapPin size="small" color={type.color}/>
                    </Marker>
                );
            }
        )
    }
}

class ObjectMap extends Component {
    state = {
        viewport: {
            latitude: SARATOV_CENTER_COORDS.latitude,
            longitude: SARATOV_CENTER_COORDS.longitude,
            zoom: 12,
            bearing: 0,
            pitch: 0
        }
    };

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
        const { objects, loading } = this.props;
        const { viewport } = this.state;

        return (
            <div className="okn-map">
                <ReactMapGL
                    {...viewport}
                    width="100%"
                    height="500px"
                    mapboxApiAccessToken={mapboxApiAccessToken}
                    onViewportChange={viewport => this.setState({ viewport })}
                >
                    {loading && (
                        <div className="okn-map__loading">
                            <Spin size="large"/>
                        </div>
                    )}

                    {!loading && (
                        <Markers data={objects}/>
                    )}

                    <div className="okn-map__nav">
                        <FullscreenControl/>

                        <NavigationControl
                            zoomInLabel="Приблизить"
                            zoomOutLabel="Отдалить"
                            showCompass={false}
                            onViewportChange={viewport => this.setState({ viewport })}
                        />
                    </div>
                </ReactMapGL>
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