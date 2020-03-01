import React, { Component } from 'react';
import ReactMapGL, { Marker, NavigationControl } from 'react-map-gl';

import { SARATOV_CENTER_COORDS } from '../../constants';
import MapPin from '../MapPin';

const mapboxApiAccessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

class ObjectMap extends Component {
    state = {
        viewport: {
            width: '100%',
            height: 400,
            latitude: (this.props.coords && this.props.coords.latitude) || SARATOV_CENTER_COORDS.latitude,
            longitude: (this.props.coords && this.props.coords.longitude) || SARATOV_CENTER_COORDS.longitude,
            zoom: 12,
            bearing: 0,
            pitch: 0
        }
    };

    onChange = coords => {
        const { onChange } = this.props;

        if (onChange) {
            onChange(coords);
        }
    };

    onMarkerDragEnd = event => {
        this.onChange({ longitude: event.lngLat[0], latitude: event.lngLat[1] });
    };

    render() {
        const { coords, editable, type } = this.props;
        const hasCoords = coords && coords.latitude && coords.longitude;

        return (
            <div className="okn-map">
                <ReactMapGL
                    {...this.state.viewport}
                    scrollZoom={false}
                    mapboxApiAccessToken={mapboxApiAccessToken}
                    onViewportChange={viewport => this.setState({ viewport })}
                >
                    {hasCoords && type && (
                        <Marker
                            latitude={coords.latitude}
                            longitude={coords.longitude}
                            offsetTop={-20}
                            offsetLeft={-10}
                            draggable={editable}
                            onDragEnd={this.onMarkerDragEnd}
                        >
                            <MapPin color={type.colorName}/>
                        </Marker>
                    )}

                    <div className="okn-map__nav">
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
    };
}

export default ObjectMap;
