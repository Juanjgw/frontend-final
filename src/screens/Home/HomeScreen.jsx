import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ServiceList from "../Services/ServiceList";
import axios from "axios";
import { URL } from "../../fetching/http";

const HomeScreen = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [services, setServices] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [page, setPage] = useState(1);
  const [totalServices, setTotalServices] = useState(0);
  const [servicesPerPage, setServicesPerPage] = useState(18);
  const [allServices, setAllServices] = useState([]);

  // Función para calcular la cantidad de servicios por página
  const calculateServicesPerPage = () => {
    const width = window.innerWidth;
    let columns = 1;

    if (width >= 1200) columns = 5;
    else if (width >= 992) columns = 4;
    else if (width >= 768) columns = 3;
    else if (width >= 576) columns = 2;

    return columns === 3 ? 18 : 20; // Ajusta según tus necesidades
  };

  // Efecto para inicialización y manejo de redimensionamiento
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    const updateServicesPerPage = () => {
      setServicesPerPage(calculateServicesPerPage());
    };

    window.addEventListener("resize", updateServicesPerPage);
    updateServicesPerPage();

    fetchServices(page);

    return () => {
      window.removeEventListener("resize", updateServicesPerPage);
    };
  }, [page]);

  // Función para obtener servicios
  const fetchServices = (page) => {
    axios
      .get(`${URL.URL_API}/api/servicios?token=${localStorage.getItem("token")}`)
      .then((response) => {
        let serviciosProcesados = response.data.servicios.map((servicio) => ({
          ...servicio,
          imagen_url: servicio.imagen_url
            ? servicio.imagen_url.split(",").map((url) => url.trim())
            : [],
        }));

        setTotalServices(serviciosProcesados.length);
        setAllServices(serviciosProcesados);

        let limit = calculateServicesPerPage();
        let offset = (page - 1) * limit;
        let serviciosPaginados = serviciosProcesados.slice(offset, offset + limit);
        setServices(serviciosPaginados);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
      });
  };

  // Función para manejar el inicio de sesión
  const handleLogin = () => {
    navigate("/login");
  };

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  // Función para manejar el contacto con un servicio
  const handleContact = (serviceId) => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      // Lógica para contactar con el servicio
    }
  };

  // Filtrado de servicios según el término de búsqueda
  const filteredServices = allServices.filter((service) =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Función para manejar el cambio de página
  const handlePage = (action) => {
    if (action === "anterior" && page > 1) {
      setPage(page - 1);
    } else if (
      action === "siguiente" &&
      page < Math.ceil(totalServices / servicesPerPage)
    ) {
      setPage(page + 1);
    }
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center my-4">
        <div className="d-flex align-items-center">
          <img
            src="https://www.contrataexpertos.com.ar/ImagenesSistema/LogoContrataExpertos.jpeg"
            alt="Logo"
            style={{ height: "50px", marginRight: "10px" }}
          />
          <div>
            <h1 style={{ marginBottom: "0", fontSize: "28px" }}>
              Bienvenido! a ContrataExpertos.com
            </h1>
            <p style={{ margin: "0", fontStyle: "italic" }}>
              Tu fuente de profesionales de confianza.
            </p>
          </div>
        </div>
        {isLoggedIn ? (
          <>
            <button onClick={() => navigate("/ABM_Servicios/MisServicios")}>
              Mis Servicios
            </button>
            <button className="btn btn-danger" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </>
        ) : (
          <button className="btn btn-primary" onClick={handleLogin}>
            Iniciar sesión
          </button>
        )}
      </div>
      <div className="row search-bar mb-4">
        <div className="col-md-12">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar servicios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <ServiceList
        services={searchTerm !== "" ? filteredServices : services}
        isLoggedIn={isLoggedIn}
        handleContact={handleContact}
      />
      <div className="d-flex justify-content-between align-items-center my-4">
        <button
          className="btn btn-secondary"
          disabled={page === 1}
          onClick={() => handlePage("anterior")}
        >
          Anterior
        </button>
        <span>Página {page}</span>
        <button
          className="btn btn-secondary"
          disabled={page === Math.ceil(totalServices / servicesPerPage)}
          onClick={() => handlePage("siguiente")}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default HomeScreen;
