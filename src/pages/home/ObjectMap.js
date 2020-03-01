import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactMapGL, { FullscreenControl, Layer, NavigationControl, Popup, Source } from 'react-map-gl';
import isEqual from 'lodash/isEqual';
import { Spin } from 'antd';

import { fetchAllObjects } from '../../actions';
import { SARATOV_CENTER_COORDS } from '../../constants';
import { clusterCountLayer, clusterLayer, unclusteredPointLayer } from './layers';
import LegendControl from './LegendControl';
import history from '../../history';

const mapboxApiAccessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

class ObjectMap extends Component {
    state = {
        popupInfo: null,
        viewport: {
            latitude: SARATOV_CENTER_COORDS.latitude,
            longitude: SARATOV_CENTER_COORDS.longitude,
            zoom: 11,
            maxZoom: 18,
            minZoom: 8,
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
        this.closePopup();

        this.props.fetchAllObjects({
            term: this.props.filters.searchTerm,
            types: this.props.filters.objectTypes
        });
    };

    onViewportChange = viewport => {
        this.closePopup();
        this.setState({ viewport });
    };

    onMapClick = event => {
        const feature = event.features[0];
        const layerId = feature && feature.layer && feature.layer.id;

        if (this.state.popupInfo) {
            this.closePopup();
        }

        if (layerId === clusterLayer.id) {
            this.zoomInCluster(feature);
        } else if (layerId === unclusteredPointLayer.id) {
            const { geometry, properties } = feature;

            this.setState({
                popupInfo: {
                    name: properties.name,
                    objectId: properties.objectId,
                    photoUrl: properties.photoUrl,
                    longitude: geometry.coordinates[0],
                    latitude: geometry.coordinates[1]
                }
            });
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

    closePopup = () => {
        if (this.state.popupInfo) {
            this.setState({ popupInfo: null });
        }
    };

    render() {
        const { dataSource, loading } = this.props;
        const { popupInfo, viewport } = this.state;

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
                            clusterMaxZoom={15}
                            clusterRadius={50}
                            ref={this.sourceRef}
                        >
                            <Layer {...clusterLayer} />
                            <Layer {...clusterCountLayer} />
                            <Layer {...unclusteredPointLayer} />
                        </Source>
                    )}

                    {this.renderPopup(popupInfo)}

                    <div className="okn-map__nav">
                        <FullscreenControl/>

                        <NavigationControl
                            zoomInLabel="Приблизить"
                            zoomOutLabel="Отдалить"
                            showCompass={false}
                            onViewportChange={viewport => this.onViewportChange(viewport)}
                        />
                    </div>

                    <div  className="okn-map__legend">
                        <LegendControl/>
                    </div>
                </ReactMapGL>
            </div>
        );
    }

    renderPopup = popupInfo => {
        const objectPageUrl = popupInfo && `/objects/${popupInfo.objectId}`;

        return popupInfo && (
            <Popup
                className="okn-map__popup"
                longitude={popupInfo.longitude}
                latitude={popupInfo.latitude}
                closeButton={false}
            >
                <Link className="okn-map__popup__name" to={objectPageUrl}>{popupInfo.name}</Link>

                {popupInfo.photoUrl && (
                    <img
                        className="okn-map__popup__photo"
                        src={`${popupInfo.photoUrl}-/scale_crop/250x150/smart/`}
                        alt={popupInfo.name}
                        draggable={false}
                        onClick={() => history.push(objectPageUrl)}
                    />
                )}
            </Popup>
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