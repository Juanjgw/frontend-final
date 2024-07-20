import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './NuevoServicio.css'; // Archivo de estilos CSS personalizados
import { URL } from '../../fetching/http';

const NuevoServicio = () => {
    const navigate = useNavigate();
    const [service, setService] = useState({
        title: '',
        description: '',
        contactNumber: '+54'
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [descriptionLength, setDescriptionLength] = useState(0);
    const [image, setImage] = useState(null); // Cambiado para una sola imagen
    const [isSubmitting, setIsSubmitting] = useState(false); // Estado para manejar la desactivación del botón
    const fileInputRef = useRef(null); // Referencia al campo de archivo

    const handlePost = async () => {
        if (isSubmitting) return; // Si ya se está enviando, no hacer nada
        setIsSubmitting(true); // Desactivar el botón al comenzar la solicitud

        try {
            const usuario = JSON.parse(localStorage.getItem("usuario"));
            const response = await axios.post(URL.URL_API + '/api/servicios', {
                ...service,
                Usuario_ID: usuario.id // Incluir el ID del usuario actual
            });
            console.log('Servicio creado:', response.data);
            setSuccessMessage('¡Servicio creado exitosamente!');
            setError('');
            console.log(response);
            const servicioId = response.data.idCreado;
            await handleImageUpload(servicioId); 
            setService({
                title: '',
                description: '',
                contactNumber: '+54'
            });
            setDescriptionLength(0);
            setImage(null); 
            fileInputRef.current.value = '';
            
        } catch (error) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError('Error al intentar crear el servicio');
            }
        } finally {
            setIsSubmitting(false); // Reactivar el botón al terminar la solicitud
        }
    };

    const handleImageUpload = async (serviceId) => {
        if (!image) {
            setError('Por favor, selecciona una imagen.');
            return;
        }

        const formData = new FormData();
        formData.append('imagen', image);
        console.log([...formData]);
        try {
            await axios.post(URL.URL_API + `/api/servicios/${serviceId}/imagenes`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setSuccessMessage('¡Imagen subida y registrada exitosamente!');
            setError('');
        } catch (error) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError('Error al intentar subir la imagen');
            }
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'description') {
            setDescriptionLength(value.length);
        }

        setService((prevService) => ({
            ...prevService,
            [name]: value,
        }));

        setError('');
        setSuccessMessage('');
    };

    const handleFileChange = (event) => {
        console.log(event.target.files);
        setImage(event.target.files[0]); 
    };

    const handleCancel = () => {
        navigate("/ABM_Servicios/MisServicios");
    };

    return (
        <div className="formulario-servicio">
            <h2>Nuevo Servicio</h2>
            <div className="recomendaciones">
                <h4>Recomendaciones para una buena publicación:</h4>
                <ul>
                    <li>Escribe un título claro y descriptivo.</li>
                    <li>Detalla tu servicio de manera concisa pero completa.</li>
                    <li>Proporciona un número de contacto válido.</li>
                </ul>
            </div>
            <Form>
                <Form.Group controlId="formTitle">
                    <Form.Label>Título</Form.Label>
                    <Form.Control type="text" name="title" value={service.title} onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="formDescription">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="description"
                        value={service.description}
                        onChange={handleChange}
                        className="descripcion-textarea"
                    />
                    <div className="text-right text-muted">{descriptionLength}/100</div>
                </Form.Group>
                <Form.Group controlId="formContactNumber">
                    <Form.Label>Número de Contacto</Form.Label>
                    <Form.Control type="text" name="contactNumber" value={service.contactNumber} onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="formFile">
                    <Form.Label>Imagen del Servicio</Form.Label>
                    <Form.Control type="file" onChange={handleFileChange} ref={fileInputRef} />
                </Form.Group>
                <div className="button-container">
                    <Button variant="secondary" onClick={handleCancel} className="btn-cancelar">
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handlePost} className="btn-crear" disabled={isSubmitting}>
                        {isSubmitting ? 'Creando...' : 'Crear Servicio'}
                    </Button>
                </div>
            </Form>
            {error && <Alert variant="danger">{error}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
        </div>
    );
}

export default NuevoServicio;
