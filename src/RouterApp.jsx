import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { verificarToken } from './fetching/auth.fetching';
import LoginScreen from './screens/login/LoginScreen';
import RegisterScreen from './screens/register/RegisterScreen';
import HomeScreen from './screens/Home/HomeScreen';
import ServiceDetail from './screens/Services/ServiceDetail';

import NuevoServicio from './screens/ABM_Servicios/NuevoServicio';
import EditarServicio from './screens/ABM_Servicios/EditarServicio';
import MisServicios from './screens/ABM_Servicios/MisServicios'; // Asegúrate de importar MisServicios

const RouterApp = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkTokenAndNavigate = async () => {
            try {
                const result = await verificarToken();
                if (result && result.ok) {
                    navigate('/home');
                } else {
                    navigate('/');
                }
            } catch (error) {
                navigate('/');
            }
        };

        checkTokenAndNavigate();
    }, [navigate]);

    return (
        <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/ABM_Servicios/NuevoServicio" element={<NuevoServicio />} />
            <Route path="/service/:id" element={<ServiceDetail />} />
            <Route path="/ABM_Servicios/editarServicio/:id" element={<EditarServicio />} />
            <Route path="/ABM_Servicios/MisServicios" element={<MisServicios />} /> {/* Ruta para MisServicios */}
        </Routes>
    );
};

export default RouterApp;

