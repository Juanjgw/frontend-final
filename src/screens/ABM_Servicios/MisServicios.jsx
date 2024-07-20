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
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [serviceToUpdate, setServiceToUpdate] = useState({
        id: '',
        title: '',
        description: '',
        contactNumber: '',
    });
    const [serviceToDelete, setServiceToDelete] = useState(null);

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

    const handleDelete = (servicio) => {
        setServiceToDelete(servicio);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`${URL.URL_API}/api/servicios/${serviceToDelete.id}`);
            fetchServicios();
            setShowDeleteModal(false);
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

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setServiceToDelete(null);
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
                <div className="header-buttons">
                    <Link to="/ABM_Servicios/NuevoServicio" className="btn btn-primary nuevo-servicio">
                        Nuevo Servicio
                    </Link>
                    <Button className="btn btn-secondary" onClick={() => navigate('/home')}>
                        Ir a Home
                    </Button>
                </div>
            </div>
            {error && <Alert variant="danger">{error}</Alert>}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Imagen</th>
                        <th>Título</th>
                        <th className="description-cell">Descripción</th>
                        <th className="contact-cell">Número de Contacto</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {servicios.map((servicio) => (
                        <tr key={servicio.id}>
                            <td>
                                <img 
                                    src={servicio.imagen_url ? `https://www.contrataexpertos.com/Servicios/Imagenes/${servicio.imagen_url}` : 'https://www.contrataexpertos.com/ImagenesSistema/LogoContrataExpertos.jpeg'}
                                    alt={servicio.title} 
                                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                />
                            </td>
                            <td>{servicio.title}</td>
                            <td className="description-cell">{servicio.description}</td>
                            <td className="contact-cell">{servicio.contactNumber}</td>
                            <td>
                                <Button variant="primary" className="button-icon" onClick={() => handleEdit(servicio)}>
                                    <FontAwesomeIcon icon={faEdit} />
                                </Button>{' '}
                                <Button variant="danger" className="button-icon" onClick={() => handleDelete(servicio)}>
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

            <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro de que deseas eliminar este servicio?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeleteModal}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={confirmDelete}>
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default MisServicios;
