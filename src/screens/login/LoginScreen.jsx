import React, { useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { login } from '../../fetching/auth.fetching';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import FacebookLogin from 'react-facebook-login';
import './LoginScreen.css';

const LoginScreen = () => {
    const [errorText, setErrorText] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const usuario = {
                email: event.target.email.value,
                password: event.target.password.value
            };
            await login(usuario);
            setErrorText('');
            navigate('/home');
        } catch (error) {
            setErrorText(error.message);
        }
    };

    const responseFacebook = async (response) => {
        if (response.accessToken) {
            navigate(`/home?token=${response.accessToken}`);
        } else {
            setErrorText('Error en la autenticación con Facebook');
        }
    };

    return (
        <MDBContainer fluid className='p-4'>
            <MDBRow>
                <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
                    <h1 className="my-5 display-3 fw-bold ls-tight px-3">
                        Encuentra profesionales de la construcción <br />
                        <span className="text-primary">para tus proyectos</span>
                    </h1>
                    <p className='px-3' style={{ color: 'hsl(217, 10%, 50.8%)' }}>
                        Construye, remodela viviendas y locales comerciales con seguridad:
                        encuentra proveedores que cuentan con seguros contra accidentes,
                        certificados de antecedentes penales y calificaciones transparentes.
                        Confía en expertos para hacer realidad tus proyectos de construcción y renovación.
                    </p>
                </MDBCol>
                <MDBCol md='6'>
                    <MDBCard className='my-5'>
                        <MDBCardBody className='p-5 login-form'>
                            <div className='text-center mb-4'>
                                <img src='https://eshopcompany.com/imagenes/logo.JPG' alt='Logo' style={{ width: '150px' }} />
                            </div>
                            <h3 className='text-center mb-4'>Iniciar sesión</h3>
                            {errorText && <p className='text-danger'>{errorText}</p>}
                            <form onSubmit={handleSubmit}>
                                <div className='mb-3'>
                                    <MDBInput label='Correo electrónico' id='email' name='email' type='email' wrapperClass='mb-4' />
                                </div>
                                <div className='mb-3'>
                                    <MDBInput label='Contraseña' id='password' name='password' type='password' wrapperClass='mb-4' />
                                </div>
                                <MDBBtn type='submit' className='w-100 mb-3'>Iniciar sesión</MDBBtn>
                            </form>
                            <p className='text-center mb-0'>¿Aún no tienes cuenta? <Link to='/register'>Regístrate aquí</Link></p>
                            <div className='text-center mt-4'>
                                <p>o inicia sesión con:</p>
                                <MDBBtn className="mb-2 w-100" size="lg" style={{ backgroundColor: '#dd4b39' }}>
                                    <FontAwesomeIcon icon={faGoogle} className="mx-2" />
                                    Iniciar sesión con Google
                                </MDBBtn>
                                {/* Componente FacebookLogin con estilo personalizado */}
                                <FacebookLogin
                                    appId="497976672798785"
                                    autoLoad={false}
                                    fields="id,name,email"
                                    callback={responseFacebook}
                                    cssClass="my-facebook-button-class"
                                    icon={<FontAwesomeIcon icon={faFacebookF} className="mx-2" />}
                                    textButton="&nbsp;&nbsp;Iniciar sesión con Facebook"
                                />
                            </div>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default LoginScreen;
