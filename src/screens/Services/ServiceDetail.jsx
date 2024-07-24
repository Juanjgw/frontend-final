import React, { useEffect, useState } from "react";
import { getServiceById } from "../../fetching/service.fetching";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ServiceDetail = ({ id }) => {
    const [service, setService] = useState(null);
    const [images, setImages] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchService = async () => {
            try {
                const data = await getServiceById(id);
                if (data) {
                    setService(data);
                    if (data.imagenes) {
                        setImages(data.imagenes);
                    }
                }
            } catch (error) {
                setError(`Error al cargar el servicio: ${error.message}`);
            }
        };

        fetchService();
    }, [id]);

    if (error) return <div>{error}</div>;

    return (
        <div>
            {service ? (
                <>
                    <h1>{service.title}</h1>
                    <p>{service.description}</p>
                    
                    {images.length > 0 ? (
                        <Carousel>
                            {images.map((img, index) => (
                                <div key={index}>
                                    <img src={img} alt={`Imagen ${index}`} />
                                </div>
                            ))}
                        </Carousel>
                    ) : (
                        <p>No hay imágenes disponibles.</p>
                    )}
                </>
            ) : (
                <p>Cargando...</p>
            )}
        </div>
    );
};

export default ServiceDetail;
