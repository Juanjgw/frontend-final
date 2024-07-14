import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap';

const MisServicios = () => {
    const navigate = useNavigate();
    const [servicios, setServicios] = useState([]);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [serviceToUpdate, setServiceToUpdate] = useState({
        id: '',
        title: '',
        description: '',
        contactNumber: '',
    });

    useEffect(() => {
        fetchServicios();
    }, []);

    const fetchServicios = async () => {
        try {
            const response = await axios.get('http://localhost:4040/api/mis-servicios');
            setServicios(response.data);
            setError('');
        } catch (error) {
            setError('Error al cargar los servicios.');
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4040/api/mis-servicios/${id}`);
            fetchServicios();
        } catch (error) {
            setError('Error al eliminar el servicio.');
        }
    };

    const handleEdit = (servicio) => {
        setServiceToUpdate({
            id: servicio.id,
            title: servicio.title,
            description: servicio.description,
            contactNumber: servicio.contactNumber,
        });
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setServiceToUpdate({
            id: '',
            title: '',
            description: '',
            contactNumber: '',
        });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setServiceToUpdate((prevService) => ({
            ...prevService,
            [name]: value,
        }));
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:4040/api/mis-servicios/${serviceToUpdate.id}`, serviceToUpdate);
            fetchServicios();
            setShowModal(false);
        } catch (error) {
            setError('Error al actualizar el servicio.');
        }
    };

    return (
        <div className="container">
            <h2>Mis Servicios</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Descripción</th>
                        <th>Número de Contacto</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {servicios.map((servicio) => (
                        <tr key={servicio.id}>
                            <td>{servicio.title}</td>
                            <td>{servicio.description}</td>
                            <td>{servicio.contactNumber}</td>
                            <td>
                                <Button variant="primary" onClick={() => handleEdit(servicio)}>
                                    Editar
                                </Button>{' '}
                                <Button variant="danger" onClick={() => handleDelete(servicio.id)}>
                                    Eliminar
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Servicio</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formTitle">
                            <Form.Label>Título</Form.Label>
                            <Form.Control type="text" name="title" value={serviceToUpdate.title} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="formDescription">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control type="text" name="description" value={serviceToUpdate.description} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="formContactNumber">
                            <Form.Label>Número de Contacto</Form.Label>
                            <Form.Control type="text" name="contactNumber" value={serviceToUpdate.contactNumber} onChange={handleChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>
                        Guardar Cambios
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className="text-center">
                <Link to="/ABM_Servicios/NuevoServicio" className="btn btn-primary">
                    Nuevo Servicio
                </Link>
            </div>
        </div>
    );
};

export default MisServicios;

