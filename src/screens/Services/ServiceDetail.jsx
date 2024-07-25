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
                // Obtener los datos del servicio
                const data = await getServiceById(id);
                
                // Verificar si se obtuvieron datos
                if (data) {
                    setService(data);
                    
                    // Verificar si hay imágenes y establecer el estado
                    if (data.imagenes) {
                        setImages(data.imagenes);
                    }
                }
            } catch (error) {
                // Manejar errores de la llamada a la API
                setError(`Error al cargar el servicio: ${error.message}`);
            }
        };

        fetchService();
    }, [id]);

    // Mostrar error si hay
    if (error) return <div>{error}</div>;

    return (
        <div>
            {service ? (
                <>
                    <h1>{service.title}</h1>
                    <p>{service.description}</p>
                    
                    {/* Mostrar carrusel si hay imágenes */}
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
