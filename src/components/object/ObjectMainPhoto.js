import React, { Component, Fragment } from 'react';
import { Icon, Input } from 'antd';

import UploadcareWrapper from '../UploadcareWrapper';
import './ObjectMainPhoto.scss';

class ObjectMainPhoto extends Component {

    onChange = photo => {
        const { onChange } = this.props;

        if (onChange) {
            onChange(photo);
        }
    };

    onFileUpload = file => {
        this.onChange({ ...this.props.photo, fileId: file.fileId, url: file.url });
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
                    <Icon type="picture" className="okn-object__main-photo__icon" />
                )}

                {photo && (
                    <Fragment>
                        <img src={photo.url} alt={photo.description}/>
                        {photo.description && (
                            <div className="okn-object__main-photo__desc">{description}</div>
                        )}
                    </Fragment>
                )}

                {editable && (
                    <UploadcareWrapper
                        className="okn-object__main-photo__upload-btn"
                        type="image"
                        onUpload={this.onFileUpload}
                    />
                )}
            </div>
        );
    }
}

export default ObjectMainPhoto;
