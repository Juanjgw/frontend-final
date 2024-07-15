import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './NuevoServicio.css'; // Archivo de estilos CSS personalizados

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
    const [images, setImages] = useState([]);

    const handlePost = async () => {
        try {
            const usuario = JSON.parse(localStorage.getItem("usuario"));
            const response = await axios.post('http://localhost:4041/api/servicios', {
                ...service,
                Usuario_ID: usuario.id // Incluir el ID del usuario actual
            });
            console.log('Servicio creado:', response.data);
            setSuccessMessage('¡Servicio creado exitosamente!');
            setError('');
            const servicioId = response.data.servicio_id;
            await handleImageUpload(servicioId); // Subir imágenes después de crear el servicio
            setService({
                title: '',
                description: '',
                contactNumber: '+54'
            });
            setDescriptionLength(0);
        } catch (error) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError('Error al intentar crear el servicio');
            }
        }
    };

    const handleImageUpload = async (serviceId) => {
        if (images.length === 0) {
            setError('Por favor, selecciona al menos una imagen.');
            return;
        }

        const formData = new FormData();
        images.forEach((image, index) => {
            formData.append('images', image);
            formData.append('imageNames', `${serviceId}-${index + 1}`);
        });

        try {
            await axios.post(`http://localhost:4041/api/servicios/${serviceId}/imagenes`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setSuccessMessage('¡Imágenes subidas y registradas exitosamente!');
            setError('');
        } catch (error) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError('Error al intentar subir las imágenes');
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
        setImages([...event.target.files]);
    };

    const handleCancel = () => {
        navigate('/');
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
                    <Form.Label>Imágenes del Servicio (hasta 5)</Form.Label>
                    <Form.Control type="file" multiple onChange={handleFileChange} />
                </Form.Group>
                <div className="button-container">
                    <Button variant="secondary" onClick={handleCancel} className="btn-cancelar">
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handlePost} className="btn-crear">
                        Crear Servicio
                    </Button>
                </div>
            </Form>
            {error && <Alert variant="danger">{error}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
        </div>
    );
}

export default NuevoServicio;
