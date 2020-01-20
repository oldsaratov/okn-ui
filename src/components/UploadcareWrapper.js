import React, { useRef } from 'react';
import { Button } from 'antd';
import { Widget as Uploadcare } from '@uploadcare/react-widget';

import './UploadcareWrapper.scss';

const uploadcarePublicKey = process.env.REACT_APP_UPLOADCARE_PUBLIC_KEY;

const UploadcareWrapper = ({ type, multiple, multipleMax, onUpload }) => {
    const widgetApi = useRef();
    const disabledBtn = multiple ? !multipleMax : false;

    const openUploadcareDialog = () => {
        widgetApi.current.openDialog().done(response => {
            const deferred = multiple ? Promise.all(response.files()) : response;

            deferred.then(data => {
                const result = Array.isArray(data) ? data.map(file => mapFile(file)) : mapFile(data);

                onUpload(result);

                // Reset uploadcare widget to don't see previously uploaded files when user opens it again
                widgetApi.current.reloadInfo();
            });
        });
    };

    const mapFile = (fileDto) => {
        return {
            fileId: fileDto.uuid,
            name: fileDto.name,
            url: fileDto.cdnUrl,
            description: '',
            status: 'new'
        };
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
            <Button icon="upload" className="okn-upload-btn" disabled={disabledBtn} onClick={openUploadcareDialog}>Загрузить</Button>

            <Uploadcare
                ref={widgetApi}
                publicKey={uploadcarePublicKey}
                preloader={null}
                imagesOnly={type === 'image'}
                crop
                multiple={multiple}
                multipleMax={multipleMax}
                locale="ru"
                tabs="file url vk facebook instagram gdrive gphotos dropbox"
            />
        </div>
    );
};

export default UploadcareWrapper;