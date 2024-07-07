

import React, { useState } from 'react';

import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn } from 'mdb-react-ui-kit';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { registrar } from '../../fetching/auth.fetching';
import { useNavigate } from 'react-router-dom';
import './Register.css';




const RegisterScreen = () => {
  const [errorText, setErrorText] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const usuario = {
        email: event.target.email.value,
        password: event.target.password.value,
        confirmPassword: event.target.confirmPassword.value,
      };
      await registrar(usuario);
      setErrorText('');
      navigate('/login');
    } catch (error) {
      setErrorText(error.message);
    }
  };

  return (
    <MDBContainer fluid className='p-4'>
      <MDBRow>
        <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
          <h1 className="my-5 display-5 fw-bold ls-tight px-3">
            Encuentra profesionales y proveedores de servicios <br />
            <span className="text-primary">para tus proyectos de construcción</span>
          </h1>
          <p className='px-3' style={{ color: 'hsl(217, 10%, 50.8%)' }}>
            Construye y remodela viviendas y locales comerciales con seguridad:
            encuentra profesionales de la construcción que cumplen con seguros contra accidentes,
            certificados de antecedentes penales y calificaciones transparentes.
            Confía en expertos para hacer realidad tus proyectos de construcción y renovación.
          </p>
          <p className='px-3' style={{ color: 'hsl(217, 10%, 50.8%)' }}>
            ¿Eres proveedor de servicios en construcción? Únete a nuestra plataforma para ofrecer tus servicios.
            Regístrate ahora y alcanza nuevos clientes para tus proyectos.
          </p>
        </MDBCol>
        <MDBCol md='6'>
          <MDBCard className='my-5'>
            <MDBCardBody className='p-5'>
              <h3 className='text-center mb-4'>Registro</h3>
              {errorText && <p className='text-danger'>{errorText}</p>}
              <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                  <MDBInput label='Correo electrónico' id='email' name='email' type='email' wrapperClass='mb-4' />
                </div>
                <div className='mb-3'>
                  <MDBInput label='Contraseña' id='password' name='password' type='password' wrapperClass='mb-4' />
                </div>
                <div className='mb-3'>
                  <MDBInput label='Confirmar Contraseña' id='confirmPassword' name='confirmPassword' type='password' wrapperClass='mb-4' />
                </div>
                <MDBBtn type='submit' className='w-100 mb-3'>Registrar</MDBBtn>
              </form>
              <div className='text-center mt-4'>
                <p>o regístrate con:</p>
                <MDBBtn className="mb-2 w-100" size="lg" style={{ backgroundColor: '#dd4b39' }}>
                  <FontAwesomeIcon icon={faGoogle} className="mx-2" />
                  Regístrate con Google
                </MDBBtn>
                <MDBBtn className="mb-4 w-100" size="lg" style={{ backgroundColor: '#3b5998' }}>
                  <FontAwesomeIcon icon={faFacebookF} className="mx-2" />
                  Regístrate con Facebook
                </MDBBtn>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default RegisterScreen;




