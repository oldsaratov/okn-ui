import React, { useState } from 'react';
import ReactMapGL, { Marker, NavigationControl } from 'react-map-gl';

import { SARATOV_CENTER_COORDS } from '../../constants';
import MapPin from '../MapPin';

const mapboxApiAccessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const ObjectMap = ({ coords, color }) => {
    const [viewport, setViewport] = useState({
        width: '100%',
        height: 400,
        latitude: (coords && coords.latitude) || SARATOV_CENTER_COORDS.latitude,
        longitude: (coords && coords.longitude) || SARATOV_CENTER_COORDS.longitude,
        zoom: 12
    });

    return (
        <div className="okn-map">
            <ReactMapGL
                {...viewport}
                mapboxApiAccessToken={mapboxApiAccessToken}
                onViewportChange={setViewport}
            >
                <Marker latitude={coords.latitude} longitude={coords.longitude} offsetTop={-20} offsetLeft={-10}>
                    <MapPin color={color}></MapPin>
                </Marker>

                <div className="okn-map__nav">
                    <NavigationControl
                        zoomInLabel="Приблизить"
                        zoomOutLabel="Отдалить"
                        showCompass={false}
                        onViewportChange={setViewport}
                    />
                </div>
            </ReactMapGL>
        </div>
    );
};

export default ObjectMap;
