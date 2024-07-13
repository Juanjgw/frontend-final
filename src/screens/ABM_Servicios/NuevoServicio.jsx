import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';

const NuevoServicio = () => {
    const [service, setService] = useState({
        title: '',
        description: '',
        contactNumber: ''
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handlePost = async () => {
        try {
            const response = await axios.post('http://localhost:4040/api/servicios', service);
            console.log('Servicio creado:', response.data);
            setSuccessMessage('¡Servicio creado exitosamente!');
            setError(''); // Limpiar el mensaje de error
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
        setService({ ...service, [name]: value });
        setError(''); // Limpiar el mensaje de error cuando se cambia el valor
        setSuccessMessage(''); // Limpiar el mensaje de éxito cuando se cambia el valor
    }

    return (
        <div>
            <Form>
                <Form.Group controlId="formTitle">
                    <Form.Label>Título</Form.Label>
                    <Form.Control type="text" name="title" value={service.title} onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="formDescription">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control as="textarea" rows={3} name="description" value={service.description} onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="formContactNumber">
                    <Form.Label>Número de Contacto</Form.Label>
                    <Form.Control type="text" name="contactNumber" value={service.contactNumber} onChange={handleChange} />
                </Form.Group>
                <Button variant="primary" onClick={handlePost}>
                    Crear Servicio
                </Button>
            </Form>
            {error && <Alert variant="danger">{error}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
        </div>
    );
}

export default NuevoServicio;

