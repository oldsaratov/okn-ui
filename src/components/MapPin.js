import React, { PureComponent } from 'react';

class MapPin extends PureComponent {
    render() {
        const color = this.props.color;
        const size = this.props.size || 'medium';

        return <div className={`okn-map__pin okn-map__pin--${color} okn-map__pin--${size}`}></div>;
    }
}

export default MapPin;
