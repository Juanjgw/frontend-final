import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./NuevoServicio.css"; // Archivo de estilos CSS personalizados
import { URL } from "../../fetching/http";


const EditarServicio = () => {
  const location = useLocation();
  console.log(location.state.servicio);
  const navigate = useNavigate();
  const { id } = useParams(); // Obtener el ID del servicio desde la URL
  const [service, setService] = useState({
    title: location.state.servicio.title,
    description: location.state.servicio.description,
    contactNumber: location.state.servicio.contactNumber,
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [descriptionLength, setDescriptionLength] = useState(0);
  const [image, setImage] = useState(null); // Para la nueva imagen
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para manejar la desactivación del botón
  const fileInputRef = useRef(null); // Referencia al campo de archivo


  /*   useEffect(() => {
    // Obtener los datos del servicio para editar
    const fetchService = async () => {
      try {
        const response = await axios.get(`${URL.URL_API}/api/servicios/${id}`);
        setService({
          title: response.data.title,
          description: response.data.description,
          contactNumber: response.data.contactNumber,
        });
        setDescriptionLength(response.data.description.length);
      } catch (error) {
        setError("Error al cargar el servicio.");
      }
    };








    fetchService();
  }, [id]); */


  const handlePost = async () => {
    if (isSubmitting) return; // Si ya se está enviando, no hacer nada
    setIsSubmitting(true); // Desactivar el botón al comenzar la solicitud


    try {
      const response = await axios.put(
        `${URL.URL_API}/api/servicios/${id}`,
        service
      );
      console.log("Servicio actualizado:", response.data);
      setSuccessMessage("¡Servicio actualizado exitosamente!");
      setError("");


      if (image) {
        await handleImageUpload(); // Solo subir imagen si se ha cambiado
      }


      // Reiniciar estado
      setService({
        title: "",
        description: "",
        contactNumber: "+54",
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
      setIsSubmitting(false); // Reactivar el botón al terminar la solicitud
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



