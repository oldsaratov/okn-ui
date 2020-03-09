import React, { PureComponent } from 'react';

import './ColorDot.scss';

const DEFAULT_COLOR = '#ccc';

class ColorDot extends PureComponent {
    render() {
        const color = this.props.color || DEFAULT_COLOR;
        const tooltip = this.props.tooltip || null;

        return <span
            className={`okn-color-dot okn-bg-color--${color}`}
            title={tooltip}
            style={{backgroundColor: color}}
        />;
    }
}

export default ColorDot;
