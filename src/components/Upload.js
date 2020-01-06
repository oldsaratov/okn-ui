import React from 'react';
import { Icon, Input } from 'antd';
import uniqBy from 'lodash/uniqBy';

import UploadCareWrapper from './UploadCareWrapper';
import FileList from './FileList';

import './Upload.css';

class Upload extends React.Component {

    onFileUpload = files => {
        this.onChange(uniqBy([...(this.props.fileList || []), ...files], 'fileId'));
    };

    onFileRemove = id => {
        this.onChange(this.props.fileList.filter((file) => id !== file.fileId));
    };

    onChange = files => {
        const { onChange } = this.props;

        if (onChange) {
            onChange(files);
        }
    };

    onDescriptionChange = (id, description) => {
        const newFiles = this.props.fileList.map(file => {
            if (file.fileId === id) {
                return { ...file, description};
            }

            return file;
        });

        this.onChange(newFiles);
    };

    render() {
        const multipleMax = (this.props.maxLimit || 5) - (this.props.fileList || []).length;

        return (
            <React.Fragment>
                <UploadCareWrapper type={this.props.type} multipleMax={multipleMax} onUpload={this.onFileUpload}/>
                {this.props.type === 'image' && this.renderImageList()}
                {this.props.type === 'file' &&
                    <FileList
                        fileList={this.props.fileList}
                        editable
                        onDescriptionChange={(id, description) => this.onDescriptionChange(id, description)}
                        onFileRemove={id => this.onFileRemove(id)}
                    />
                }
            </React.Fragment>
        );
    }

    renderImageList() {
        const list = (this.props.fileList || []).map(file => {
            const itemClass = 'ant-upload-list-item';
            const statusClass = file.status ? `${itemClass}-${file.status}` : `${itemClass}-done`;
            const thumbnail = (
                <a className={`${itemClass}-thumbnail`} href={file.url} target="_blank" rel="noopener noreferrer">
                    <img className={`${itemClass}-image`} src={`${file.url}-/preview/-/resize/48x48/`} alt={file.name}/>
                </a>
            );
            const placeholder = file.name ? `Добавьте описание для ${file.name}` : 'Добавьте описание';

            return (
                <div className={`${itemClass} ${statusClass} ${itemClass}-list-type-picture`} key={file.fileId}>
                    <div className={`${itemClass}-info`}>
                        <span>
                            {thumbnail}
                            <span className={`${itemClass}-name ${itemClass}-name-icon-count-2`} title={file.name}>
                                <Input
                                    size="small"
                                    placeholder={placeholder}
                                    maxLength={50}
                                    value={file.description}
                                    onChange={({ target }) => this.onDescriptionChange(file.fileId, target.value)}
                                />
                            </span>
                            <span className={`${itemClass}-card-actions picture`}>
                                <Icon type="delete" title="Удалить фото" onClick={() => this.onFileRemove(file.fileId)}/>
                            </span>
                        </span>
                    </div>
                </div>
            );
        });

        return <div className="ant-upload-list ant-upload-list-picture">{list}</div>;
    }
}

export default Upload;