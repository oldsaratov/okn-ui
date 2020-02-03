import React from 'react';

import { OBJECT_TYPES } from '../../constants';
import './LegendControl.scss';

const LegendControl = () => {

    const renderItem = item => {
        return (
            <div className="okn-legend__item" key={item.value}>
                <span className={`okn-legend__item__point okn-legend__item__point--${item.color}`}></span>
                <span className="okn-legend__item__label">{item.label}</span>
            </div>
        );
    };

    return (
        <div className="okn-legend">
            <div className="okn-legend__body">
                {OBJECT_TYPES.map(opt => renderItem(opt))}
            </div>
        </div>
    );
};

export default LegendControl;
