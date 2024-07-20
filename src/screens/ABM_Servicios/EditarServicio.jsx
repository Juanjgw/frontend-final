import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./NuevoServicio.css";
import { URL } from "../../fetching/http";

const EditarServicio = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [service, setService] = useState({
    title: location.state.servicio.title,
    description: location.state.servicio.description,
    contactNumber: location.state.servicio.contactNumber,
    imagen_url: location.state.servicio.imagen_url
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [descriptionLength, setDescriptionLength] = useState(0);
  const [image, setImage] = useState(null); 
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const fileInputRef = useRef(null); 

  const handlePost = async () => {
    if (isSubmitting) return; 
    setIsSubmitting(true); 

    try {
      const response = await axios.put(
        `${URL.URL_API}/api/servicios/${id}`,
        service
      );
      console.log("Servicio actualizado:", response.data);
      setSuccessMessage("¡Servicio actualizado exitosamente!");
      setError("");

      if (image) {
        await handleImageUpload(); 
      }

      setService({
        title: "",
        description: "",
        contactNumber: "+54",
        imagen_url: ""
      });
      setDescriptionLength(0);
      setImage(null);
      fileInputRef.current.value = "";
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Error al intentar actualizar el servicio");
      }
    } finally {
      setIsSubmitting(false); 
    }
  };

  const handleImageUpload = async () => {
    if (!image) {
      setError("Por favor, selecciona una imagen.");
      return;
    }

    const formData = new FormData();
    formData.append("imagen", image);
    console.log([...formData]);
    try {
      await axios.post(
        `${URL.URL_API}/api/servicios/${id}/imagenes`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSuccessMessage("¡Imagen subida y registrada exitosamente!");
      setError("");
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Error al intentar subir la imagen");
      }
    }
  };

  const handleUpdate = async () => {
    setIsSubmitting(true);
    try {
      await axios.put(
        `${URL.URL_API}/api/servicios/${location.state.servicio.id}`,
        {
          title: service.title,
          description: service.description,
          contactNumber: service.contactNumber,
        }
      );
      setSuccessMessage("Editado con exito.");
      setIsSubmitting(false);
    } catch (error) {
      console.log(error);
      setError("Error al actualizar el servicio.");
      setIsSubmitting(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "description") {
      setDescriptionLength(value.length);
    }

    setService((prevService) => ({
      ...prevService,
      [name]: value,
    }));

    setError("");
    setSuccessMessage("");
  };

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleCancel = () => {
    navigate("/ABM_Servicios/MisServicios");
  };

  return (
    <div className="formulario-servicio">
      <h2>Editar Servicio</h2>
      
      <Form>
        {service.imagen_url && (
          <div className="service-image">
            <img
              src={service.imagen_url ? `https://www.contrataexpertos.com/Servicios/Imagenes/${service.imagen_url}` : 'https://www.contrataexpertos.com/ImagenesSistema/LogoContrataExpertos.jpeg'}
              alt={service.title}
              style={{ width: '200px', height: '200px', objectFit: 'cover' }}
            />
          </div>
        )}
        <Form.Group controlId="formTitle">
          <Form.Label>Título</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={service.title}
            onChange={handleChange}
          />
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
          <Form.Control
            type="text"
            name="contactNumber"
            value={service.contactNumber}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formFile">
          <Form.Label>Imagen del Servicio</Form.Label>
          <Form.Control
            type="file"
            onChange={handleFileChange}
            ref={fileInputRef}
          />
        </Form.Group>
        <div className="button-container">
          <Button
            variant="secondary"
            onClick={handleCancel}
            className="btn-cancelar"
          >
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={handleUpdate}
            className="btn-crear"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Actualizando..." : "Actualizar Servicio"}
          </Button>
        </div>
      </Form>
      {error && <Alert variant="danger">{error}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
    </div>
  );
};

export default EditarServicio;
