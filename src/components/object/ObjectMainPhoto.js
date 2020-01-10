import React, { Component, Fragment } from 'react';
import { Icon, Input } from 'antd';

import './ObjectMainPhoto.scss';

class ObjectMainPhoto extends Component {

    onChange = photo => {
        const { onChange } = this.props;

        if (onChange) {
            onChange(photo);
        }
    };

    onDescriptionChange = (event)  => {
        const { value } = event.target;

        this.onChange({ ...this.props.photo, description: value });
    };

    render() {
        const { editable, photo } = this.props;
        const emptyClass = photo ? '' : 'okn-object__main-photo--empty';
        const editableClass = editable ? 'okn-object__main-photo--editable' : '';
        const description = editable
            ? <Input
                    placeholder="Добавьте описание"
                    maxLength={100}
                    value={photo && photo.description}
                    onChange={event => this.onDescriptionChange(event)}/>
            : <Fragment>{photo && photo.description}</Fragment>;

        return (
            <div className={`okn-object__main-photo ${emptyClass} ${editableClass}`}>
                {!photo && (
                    <Fragment>
                        <Icon type="picture" className="okn-object__main-photo__icon" />
                    </Fragment>
                )}

                {photo && (
                    <Fragment>
                        <img src={photo.url} alt={photo.description}/>
                        <div className="okn-object__main-photo__desc">{description}</div>
                    </Fragment>
                )}
            </div>
        );
    }
}

export default ObjectMainPhoto;
