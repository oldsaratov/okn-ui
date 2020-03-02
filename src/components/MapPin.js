import React, { PureComponent } from 'react';

class MapPin extends PureComponent {
    render() {
        const color = this.props.color || 'grey';
        const size = this.props.size || 'medium';

        return <div className={`okn-map__pin okn-bg-color--${color} okn-map__pin--${size}`}></div>;
    }
}

export default MapPin;
