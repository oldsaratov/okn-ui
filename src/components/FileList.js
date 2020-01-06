import React from 'react';
import { Icon, Input } from 'antd';

import './FileList.scss';

const FileList = (props) => {
    const editableClass = props.editable ? 'ant-upload-list-text--editable' : '';

    const onFileDownload = url => {
        if (url) {
            window.open(url);
        }
    };

    const onDescriptionChange = (id, event)  => {
        const { value } = event.target;

        props.onDescriptionChange(id, value)
    };

    const renderFileList = () => {
        return (props.fileList || []).map(file => {
            const itemClass = 'ant-upload-list-item';
            const statusClass = file.status ? `${itemClass}-${file.status}` : `${itemClass}-done`;
            const placeholder = file.name ? `Добавьте описание для ${file.name}` : 'Добавьте описание';
            const content = props.editable
                ? <Input
                    size="small"
                    placeholder={placeholder}
                    maxLength={50}
                    value={file.description}
                    onChange={event => onDescriptionChange(file.fileId, event)}/>
                : <React.Fragment>{file.description}</React.Fragment>;

            // Action icons
            const downloadIcon = <Icon type="download" title="Скачать файл" onClick={() => onFileDownload(file.url)}/>;
            const deleteIcon = <Icon type="delete" title="Удалить файл" onClick={() => props.onFileRemove(file.fileId)}/>;

            return (
                <div key={file.fileId}>
                    <div className={`${itemClass} ${statusClass} ${itemClass}-list-type-text`}>
                        <div className={`${itemClass}-info`}>
                            <span>
                                <Icon type="paper-clip"/>
                                <span className={`${itemClass}-name ${itemClass}-name-icon-count-2`} title={file.name}>
                                    {content}
                                </span>
                                <span className={`${itemClass}-card-actions`}>
                                    {downloadIcon}
                                    {props.editable && deleteIcon}
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            );
        });
    };

    return <div className={`ant-upload-list ant-upload-list-text ${editableClass}`}>{renderFileList()}</div>;
};

export default FileList;