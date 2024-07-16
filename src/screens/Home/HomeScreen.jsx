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


  const calculateServicesPerPage = () => {
    const width = window.innerWidth;
    let columns = 1;

console.log(width)
    if (width >= 1200) columns = 5;
    else if (width >= 992) columns = 4;
    else if (width >= 768) columns = 3;
    else if (width >= 576) columns = 2;

console.log(columns)
    return columns === 3 ? 18 : 20;
  };


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
  }, []);


  const fetchServices = (page) => {
    axios
      .get(
        URL.URL_API +
          "/api/servicios?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBlcGUxNDNAZ21haWwuY29tIiwidXNlcl9pZCI6NDgsImlhdCI6MTcyMDU5NTc5NywiZXhwIjoxNzIwNTk5Mzk3fQ.t8mC94nMwMzmQLVxGJ1cXsZuLbmpvw8nHnrbrXqHovM"
      )
      .then((data) => {
        let serviciosProcesados = data.data.servicios.map((servicio) => ({
          ...servicio,
          imagen_url: servicio.imagen_url
            ? servicio.imagen_url.split(",").map((url) => url.trim())
            : [],
        }));


        setTotalServices(serviciosProcesados.length);
        setAllServices(serviciosProcesados);


        let limit = calculateServicesPerPage() * page;
        let offset = (page - 1) * limit;
        let ServiciosPaginados = serviciosProcesados.slice(
          offset,
          offset + limit
        );
        setServices(ServiciosPaginados);
      });
  };


  const handleLogin = () => {
    navigate("/login");
  };


  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };


  const handleContact = (serviceId) => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
    }
  };


  const filteredServices = allServices.filter((service) =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const handlePage = (action) => {
    if (action === "anterior" && page > 1) {
      let newPage = page - 1;
      let limit = calculateServicesPerPage() * newPage;
      //Si la pagina es 1, el offset no se le resta
      let offset = newPage === 1 ? (newPage - 1) * limit : (newPage - 1) * limit - 20
 
      let ServiciosPaginados = allServices.slice(offset, offset + limit);
      setServices(ServiciosPaginados);
      setPage(page - 1);
      console.log("newPage", newPage);
      console.log("limit", limit);
      console.log("offset", offset);
      console.log("servicios paginados", ServiciosPaginados);
    } else if (
      action === "siguiente" &&
      page < Math.ceil(totalServices / servicesPerPage)
    ) {
      let newPage = page + 1;


      let limit = calculateServicesPerPage() * newPage;
      let offset = (newPage - 1) * limit - 20;
      let ServiciosPaginados = allServices.slice(offset, offset + limit);
      setServices(ServiciosPaginados);


      setPage(page + 1);
      console.log("newPage", newPage);
      console.log("limit", limit);
      console.log("offset", offset);
      console.log("servicios paginados", ServiciosPaginados);
    }
   
  };


  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center my-4">
        <div className="d-flex align-items-center">
          <img
            src="https://eshopcompany.com/imagenes/logo.JPG"
            alt="Logo"
            style={{ height: "50px", marginRight: "10px" }}
          />
          <div>
            <h1 style={{ marginBottom: "0", fontSize: "28px" }}>
              Bienvenido! a Busca Constructores.
            </h1>
            <p style={{ margin: "0", fontStyle: "italic" }}>
              Tu fuente de profesionales de confianza.
            </p>
          </div>
        </div>
        {isLoggedIn ? (
          <>
            {" "}
            <button onClick={() => navigate("/ABM_Servicios/MisServicios")}>
              Mis Servicios{" "}
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



