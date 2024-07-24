import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { registrar } from '../../fetching/auth.fetching';
import { useNavigate, useParams } from 'react-router-dom';
import './RegisterReferralsScreen.css';

const RegisterReferralsScreen = () => {
  const [errorText, setErrorText] = useState('');
  const navigate = useNavigate();
let {referralLink}= useParams()
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
    <div className='container'>
      <div className='row'>
        <div className='col-md-6 text-center text-md-start d-flex flex-column justify-content-center'>
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
        </div>
        <div className='col-md-6 '>
          <div className='card my-5 '> 
            <div className='card-body p-5 custom-bg-color'>
            <div className='text-center mb-4'>
                                <img src='https://contrataexpertos.com.ar/ImagenesSistema/LogoContrataExpertos.jpeg' alt='Logo' style={{ width: '150px' }} />
                            </div>
              <h3 className='text-center mb-4'>Registro</h3>
              {errorText && <p className='text-danger'>{errorText}</p>}
              <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                  <label htmlFor='email' className='form-label'>Correo electrónico *</label>
                  <input type='email' className='form-control' id='email' name='email' required />
                </div>
                <div className='mb-3'>
                  <label htmlFor='password' className='form-label'>Contraseña *</label>
                  <input type='password' className='form-control' id='password' name='password' required />
                </div>
                <div className='mb-3'>
                  <label htmlFor='confirmPassword' className='form-label'>Confirmar Contraseña *</label>
                  <input type='password' className='form-control' id='confirmPassword' name='confirmPassword' required />
                </div>
                <button type='submit' className='btn btn-primary w-100 mb-3'>Registrar</button>
              </form>
              <div className='text-center mt-4'>
                <p>o regístrate con:</p>
                <button className='btn btn-danger mb-2 w-100'>
                  <FontAwesomeIcon icon={faGoogle} className='mx-2' />
                  Regístrate con Google
                </button>
                {/* <button className='btn btn-primary mb-4 w-100'>
                  <FontAwesomeIcon icon={faFacebookF} className='mx-2' />
                  Regístrate con Facebook
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterReferralsScreen;
