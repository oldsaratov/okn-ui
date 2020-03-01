import flatten from 'lodash/flatten';

import { OBJECT_TYPES } from '../../constants';

export const clusterLayer = {
    id: 'clusters',
    type: 'circle',
    source: 'objects',
    filter: ['has', 'point_count'],
    paint: {
        'circle-color': [
            'step',
            ['get', 'point_count'],
            '#a4abcb',
            30,
            '#daea99',
            100,
            '#fee17e',
            350,
            '#ffc498'
        ],
        'circle-radius': ['step', ['get', 'point_count'], 20, 30, 25, 100, 30, 350, 40],
        'circle-opacity': 0.7
    }
};

export const clusterCountLayer = {
    id: 'cluster-count',
    type: 'symbol',
    source: 'objects',
    filter: ['has', 'point_count'],
    layout: {
        'text-field': '{point_count_abbreviated}',
        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
        'text-size': 12
    }
};

export const unclusteredPointLayer = {
    id: 'unclustered-point',
    type: 'circle',
    source: 'objects',
    filter: ['!', ['has', 'point_count']],
    paint: {
        // Color circles by object type
        'circle-color': [
            'match',
            ['get', 'type'],
            ...flatten(Object.values(OBJECT_TYPES).map(type => ([type.value, type.colorCode]))),
            '#ccc' // Other
        ],
        // Make circles larger as the user zooms from z8 to z18
        'circle-radius': {
            'base': 1.75,
            'stops': [[12, 6], [18, 12]]
        },
        'circle-stroke-width': 2,
        'circle-stroke-color': '#fff'
    }
};
