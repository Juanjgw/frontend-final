import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
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

    const handlePost = async () => {
        try {
            const response = await axios.post('http://localhost:4040/api/servicios', service);
            console.log('Servicio creado:', response.data);
            setSuccessMessage('¡Servicio creado exitosamente!');
            setError('');
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
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'description') {
            setDescriptionLength(value.length);
            setService((prevService) => ({
                ...prevService,
                description: value,
            }));
        } else if (name === 'contactNumber') {
            // Verificar y mantener el prefijo '+54' y permitir solo números después del prefijo
            const numberValue = value.replace(/\D/g, ''); // Remover cualquier caracter no numérico
            if (!numberValue.startsWith('54')) {
                setService((prevService) => ({
                    ...prevService,
                    contactNumber: '+54'
                }));
            } else {
                setService((prevService) => ({
                    ...prevService,
                    contactNumber: '+' + numberValue
                }));
            }
        } else {
            setService((prevService) => ({
                ...prevService,
                [name]: value,
            }));
        }

        setError('');
        setSuccessMessage('');
    }

    const handleCancel = () => {
        navigate('/');
    }

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


