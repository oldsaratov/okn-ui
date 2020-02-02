import React, { Component, Fragment } from 'react';
import { Button, Icon, Input } from 'antd';

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

    onPhotoDelete = () => {
        this.onChange(null);
    };

    render() {
        const { editable, photo } = this.props;
        const emptyClass = photo ? '' : 'okn-object__main-photo--empty';
        const editableClass = editable ? 'okn-object__main-photo--editable' : '';

        return (
            <div className={`okn-object__main-photo ${emptyClass} ${editableClass}`}>
                {!photo && (
                    <Icon type="picture" className="okn-object__main-photo__icon" />
                )}

                {photo && (
                    <Fragment>
                        <img src={photo.url} alt={photo.description}/>
                        {this.renderDescription(photo)}
                    </Fragment>
                )}

                {editable && (
                    <div className="okn-object__main-photo__buttons">
                        <UploadcareWrapper type="image" onUpload={this.onFileUpload}/>
                        {photo && (
                            <Button
                                className="okn-delete-btn"
                                type="danger"
                                icon="delete"
                                onClick={this.onPhotoDelete}
                            >
                                Удалить
                            </Button>
                        )}
                    </div>
                )}
            </div>
        );
    }

    renderDescription = photo => {
        const { editable } = this.props;
        const description = photo && photo.description;
        const showDescription = editable ? true : description;

        return showDescription && (
            <div className="okn-object__main-photo__desc">
                {editable && (
                    <Input
                        placeholder="Добавьте описание"
                        maxLength={100}
                        value={description}
                        onChange={event => this.onDescriptionChange(event)}/>
                )}

                {!editable && (
                    <Fragment>{description}</Fragment>
                )}
            </div>
        );
    }
}

export default ObjectMainPhoto;
