import React, { useRef } from 'react';
import { Button } from 'antd';
import { Widget as UploadCare } from '@uploadcare/react-widget';

import './UploadCareWrapper.css';

const UploadCareWrapper = ({ multipleMax, onUpload }) => {
    const publicKey = 'cd9f808e21ca087dc455';
    const widgetApi = useRef();

    const openUploadcareDialog = () => {
        widgetApi.current.openDialog().done(fileGroup => {
            Promise.all(fileGroup.files()).then(files => {
                const newFiles = files.map(file => ({
                    fileId: file.uuid,
                    name: file.name,
                    url: file.cdnUrl,
                    description: '',
                    status: 'new'
                }));

                onUpload(newFiles);

                // Reset uploadcare widget to don't see previously uploaded files when user opens it again
                widgetApi.current.reloadInfo();
            });
        });
    };

    return (
        <div>
            <Button icon="upload" disabled={!multipleMax} onClick={openUploadcareDialog}>Загрузить</Button>

            <UploadCare
                ref={widgetApi}
                publicKey={publicKey}
                preloader={null}
                imagesOnly
                multiple
                multipleMax={multipleMax}
                crop
                locale="ru"
                tabs="file url vk facebook instagram gdrive gphotos dropbox"
            />
        </div>
    );
};

export default UploadCareWrapper;