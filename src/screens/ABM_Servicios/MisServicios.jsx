import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Table, Button, Modal, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import './MisServicios.css'; // Importar el archivo CSS
import { URL } from '../../fetching/http';

const MisServicios = () => {
    const navigate = useNavigate();
    const [servicios, setServicios] = useState([]);
    const [error, setError] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [serviceToDelete, setServiceToDelete] = useState(null);

    useEffect(() => {
        fetchServicios();
    }, []);

    const fetchServicios = async () => {
        try {
            const usuario = JSON.parse(localStorage.getItem("usuario"));
            if (!usuario || !usuario.id) {
                throw new Error('Usuario no encontrado en localStorage');
            }
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
        navigate(`/ABM_Servicios/EditarServicio/${servicio.id}`);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setServiceToDelete(null);
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
            {!error && servicios.length === 0 && <Alert variant="info">No tienes servicios todavía.</Alert>}
            {servicios.length > 0 && (
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
                                        src={servicio.imagen_url ? `https://www.contrataexpertos.com.ar/Servicios/Imagenes/${servicio.imagen_url}` : 'https://www.contrataexpertos.com/ImagenesSistema/LogoContrataExpertos.jpeg'}
                                        alt={servicio.title} 
                                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                    />
                                </td>
                                <td>{servicio.title}</td>
                                <td className="description-cell">{servicio.description}</td>
                                <td className="contact-cell">{servicio.contactNumber}</td>
                                <td>
                                    <Button
                                        variant="primary"
                                        className="button-icon"
                                        onClick={() => navigate(`/ABM_Servicios/EditarServicio/${servicio.id}`, { state: { servicio } })}
                                    >
                                        <FontAwesomeIcon icon={faEdit} />
                                    </Button>
                                    <Button variant="danger" className="button-icon" onClick={() => handleDelete(servicio)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

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
