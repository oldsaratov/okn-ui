import React, { useRef } from 'react';
import { Button } from 'antd';
import { Widget as UploadCare } from '@uploadcare/react-widget';

import './UploadCareWrapper.css';

const UploadCareWrapper = ({ type, multipleMax, onUpload }) => {
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

    // TODO: Use it for preferredTypes when uploadcare team fix issue - https://github.com/uploadcare/uploadcare-widget/issues/547
    // const preferredTypes = () => {
    //     switch (type) {
    //         case 'file':
    //             return 'application/pdf application/vnd.openxmlformats-officedocument.* application/vnd.oasis.opendocument.*';
    //         case 'image':
    //             return 'image/*';
    //         default:
    //             return null;
    //     }
    // };

    return (
        <div>
            <Button icon="upload" disabled={!multipleMax} onClick={openUploadcareDialog}>Загрузить</Button>

            <UploadCare
                ref={widgetApi}
                publicKey={publicKey}
                preloader={null}
                imagesOnly={type === 'image'}
                multiple
                multipleMax={multipleMax}
                locale="ru"
                tabs="file url vk facebook instagram gdrive gphotos dropbox"
            />
        </div>
    );
};

export default UploadCareWrapper;