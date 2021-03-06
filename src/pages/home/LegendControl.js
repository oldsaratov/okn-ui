import React from 'react';

import { OBJECT_TYPES } from '../../constants';
import ColorDot from '../../components/ColorDot';
import './LegendControl.scss';

const LegendControl = () => {
    const options = Object.values(OBJECT_TYPES);

    const renderItem = item => {
        return (
            <div className="okn-legend__item" key={item.value}>
                <ColorDot color={item.colorCode}/>
                <span className="okn-legend__item__label">{item.label}</span>
            </div>
        );
    };

    return (
        <div className="okn-legend">
            <div className="okn-legend__body">
                {options.map(opt => renderItem(opt))}
            </div>
        </div>
    );
};

export default LegendControl;
