import React from 'react';
import { MDBCarousel, MDBCarouselItem } from 'mdb-react-ui-kit';

const ImageCarousel = ({ images }) => {
    // Log para ver las imágenes recibidas por el componente
    console.log('Images received by ImageCarousel:', images);

    return (
        <MDBCarousel>
            {images.map((image, index) => (
                <MDBCarouselItem
                    key={index}
                    className='w-100 d-block'
                    itemId={index}
                >
                    <img
                        src={image.imagen_url}
                        alt={`Imagen ${index + 1}`}
                        className='d-block w-100'
                    />
                </MDBCarouselItem>
            ))}
        </MDBCarousel>
    );
};

export default ImageCarousel; // Solo una exportación por defecto
