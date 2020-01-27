import React, { PureComponent, Component } from 'react';
import { connect } from 'react-redux';
import ReactMapGL, { Marker, FullscreenControl, NavigationControl, Layer, Source } from 'react-map-gl';
import isEqual from 'lodash/isEqual';
import { Spin } from 'antd';

import { fetchAllObjects } from '../../actions';
import { SARATOV_CENTER_COORDS } from '../../constants';
import { getObjectType } from '../../selectors';
import MapPin from '../../components/MapPin';
import { clusterLayer, clusterCountLayer, unclusteredPointLayer } from './layers';

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
    sourceRef = React.createRef();

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

    onViewportChange = viewport => this.setState({ viewport });

    onMapClick = event => {
        const feature = event.features[0];
        const layerId = feature && feature.layer && feature.layer.id;

        if (layerId === clusterLayer.id) {
            this.zoomInCluster(feature);
        } else if (layerId === unclusteredPointLayer.id) {
            console.log('obj click', feature);
        }
    };

    zoomInCluster = feature => {
        const clusterId = feature.properties.cluster_id;
        const mapboxSource = this.sourceRef.current.getSource();

        mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
            if (err) {
                return;
            }

            this.onViewportChange({
                ...this.state.viewport,
                longitude: feature.geometry.coordinates[0],
                latitude: feature.geometry.coordinates[1],
                zoom,
                transitionDuration: 500
            });
        });
    };

    render() {
        const { dataSource, loading } = this.props;
        const { viewport } = this.state;

        return (
            <div className="okn-map">
                <ReactMapGL
                    {...viewport}
                    width="100%"
                    height="500px"
                    mapboxApiAccessToken={mapboxApiAccessToken}
                    interactiveLayerIds={[clusterLayer.id, unclusteredPointLayer.id]}
                    onClick={this.onMapClick}
                    onViewportChange={viewport => this.onViewportChange(viewport)}
                >
                    {loading && (
                        <div className="okn-map__loading">
                            <Spin size="large"/>
                        </div>
                    )}

                    {!loading && (
                        <Source
                            type="geojson"
                            data={dataSource}
                            cluster={true}
                            clusterMaxZoom={14}
                            clusterRadius={50}
                            ref={this.sourceRef}
                        >
                            <Layer {...clusterLayer} />
                            <Layer {...clusterCountLayer} />
                            <Layer {...unclusteredPointLayer} />
                        </Source>
                    )}

                    <div className="okn-map__nav">
                        <FullscreenControl/>

                        <NavigationControl
                            zoomInLabel="Приблизить"
                            zoomOutLabel="Отдалить"
                            showCompass={false}
                            onViewportChange={viewport => this.onViewportChange(viewport)}
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
        dataSource: all,
        loading
    };
};

export default connect(mapStateToProps, { fetchAllObjects })(ObjectMap);