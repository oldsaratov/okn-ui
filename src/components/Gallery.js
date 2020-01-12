import React, { Fragment, useState } from 'react';
import Carousel, { Modal, ModalGateway } from 'react-images';

import './Gallery.scss';

const Gallery = ({ images }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [lightboxVisible, setLightboxVisible] = useState(false);

    const hasImages = Array.isArray(images) && images.length > 0;

    const toggleLightbox = index => {
        setCurrentImageIndex(index);
        setLightboxVisible(!lightboxVisible);
    };

    return hasImages && (
        <Fragment>
            <div className="okn-gallery">
                {images.map(({ id, source, description }, i) => (
                    <div className="okn-gallery__item" key={id} onClick={() => toggleLightbox(i)}>
                        <img alt={description} src={source.thumbnail}/>
                    </div>
                ))}
            </div>

            <ModalGateway>
                {lightboxVisible && (
                    <Modal onClose={toggleLightbox}>
                        <Carousel currentIndex={currentImageIndex} views={images}/>
                    </Modal>
                )}
            </ModalGateway>
        </Fragment>
    );
};

export default Gallery;
