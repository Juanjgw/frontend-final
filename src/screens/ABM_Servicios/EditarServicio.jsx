import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import './EditarServicio.css'; // Archivo de estilos CSS personalizados

const EditarServicio = () => {
    const { id } = useParams();
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

    useEffect(() => {
        const fetchService = async () => {
            try {
                const response = await axios.get(`http://localhost:4041/api/servicios/${id}`);
                setService(response.data);
                setDescriptionLength(response.data.description.length);
            } catch (error) {
                setError('Error al cargar los datos del servicio');
            }
        };

        fetchService();
    }, [id]);

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`http://localhost:4041/api/servicios/${id}`, service);
            console.log('Servicio actualizado:', response.data);
            setSuccessMessage('¡Servicio actualizado exitosamente!');
            setError('');
            await handleImageUpload(id); // Subir imagen después de actualizar el servicio
        } catch (error) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError('Error al intentar actualizar el servicio');
            }
        }
    };

    const handleImageUpload = async (serviceId) => {
        if (!image) {
            return; // Si no hay imagen seleccionada, no hacer nada
        }

        const formData = new FormData();
        formData.append('imagen', image);
        console.log([...formData]);
        try {
            await axios.post(`http://localhost:4041/api/servicios/${serviceId}/imagenes`, formData, {
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
        setImage(event.target.files[0]); // Cambiado para una sola imagen
    };

    const handleCancel = () => {
        navigate("/ABM_Servicios/MisServicios");
    };

    return (
        <div className="formulario-servicio">
            <h2>Editar Servicio</h2>
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
                    <Form.Control type="file" onChange={handleFileChange} />
                </Form.Group>
                <div className="button-container">
                    <Button variant="secondary" onClick={handleCancel} className="btn-cancelar">
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleUpdate} className="btn-crear">
                        Actualizar Servicio
                    </Button>
                </div>
            </Form>
            {error && <Alert variant="danger">{error}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
        </div>
    );
}

export default EditarServicio;
