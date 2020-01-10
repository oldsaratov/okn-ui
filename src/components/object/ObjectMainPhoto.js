import React, { Component } from 'react';
import { Icon } from 'antd';

import './ObjectMainPhoto.scss';

class ObjectMainPhoto extends Component {

    onChange = photo => {
        const { onChange } = this.props;

        if (onChange) {
            onChange(photo);
        }
    };

    render() {
        const { editable, photo } = this.props;

        if (!photo) {
            return (
                <div className="okn-object__main-photo okn-object__main-photo--empty">
                    <Icon type="picture" className="okn-object__main-photo__icon" />
                </div>
            );
        }

        return (
            <div className="okn-object__main-photo">
                <img src={photo.url} alt={photo.description}/>
                <div className="okn-object__main-photo__desc">{photo.description}</div>
            </div>
        );
    }
}

export default ObjectMainPhoto;
