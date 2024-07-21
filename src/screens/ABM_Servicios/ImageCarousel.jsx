import React from 'react';
import { MDBCarousel, MDBCarouselItem, MDBCarouselInner, MDBCarouselElement, MDBCarouselCaption } from 'mdb-react-ui-kit';

const ImageCarousel = ({ images }) => {
    return (
        <MDBCarousel showControls showIndicators>
            <MDBCarouselInner>
                {images.map((image, index) => (
                    <MDBCarouselItem key={index} className={index === 0 ? 'active' : ''}>
                        <MDBCarouselElement
                            src={image.imagen_url}
                            alt={`Imagen ${index + 1}`}
                            className='d-block w-100'
                        />
                        <MDBCarouselCaption>
                            <h5>Imagen {index + 1}</h5>
                        </MDBCarouselCaption>
                    </MDBCarouselItem>
                ))}
            </MDBCarouselInner>
        </MDBCarousel>
    );
};

export default ImageCarousel;
