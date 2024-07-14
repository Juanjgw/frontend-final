import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import './MisServicios.css'; // Importar el archivo CSS

import { URL } from '../../fetching/http';

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
            const usuario = JSON.parse(localStorage.getItem("usuario"));
            const response = await axios.get(`${URL.URL_API}/api/servicios/servicios_usuario/${usuario.id}`);
            setServicios(response.data);
            setError('');
        } catch (error) {
            setError('Error al cargar los servicios.');
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${URL.URL_API}/api/servicios/${id}`);
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
            await axios.put(`${URL.URL_API}/api/servicios/${serviceToUpdate.id}`, {
                title: serviceToUpdate.title,
                description: serviceToUpdate.description,
                contactNumber: serviceToUpdate.contactNumber,
            });
            fetchServicios();
            setShowModal(false);
        } catch (error) {
            setError('Error al actualizar el servicio.');
        }
    };

    return (
        <div className="container">
            <div className="header">
                <h2>Mis Servicios</h2>
                <Link to="/ABM_Servicios/NuevoServicio" className="btn btn-primary nuevo-servicio">
                    Nuevo Servicio
                </Link>
            </div>
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
                            <td className="description-cell">{servicio.description}</td>
                            <td>{servicio.contactNumber}</td>
                            <td>
                                <Button variant="primary" className="button-icon" onClick={() => handleEdit(servicio)}>
                                    <FontAwesomeIcon icon={faEdit} />
                                </Button>{' '}
                                <Button variant="danger" className="button-icon" onClick={() => handleDelete(servicio.id)}>
                                    <FontAwesomeIcon icon={faTrash} />
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
        </div>
    );
};

export default MisServicios;
