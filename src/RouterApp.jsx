// src/RouterApp.jsx
import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { verificarToken } from './fetching/auth.fetching';
import LoginScreen from './screens/login/LoginScreen';
import RegisterScreen from './screens/register/RegisterScreen';
import HomeScreen from './screens/Home/HomeScreen';
import ServiceDetail from './screens/Services/ServiceDetail';
import RegisterReferralsScreen from './screens/RegisterReferrals/RegisterReferralsScreen';
import NuevoServicio from './screens/ABM_Servicios/NuevoServicio';
import MisServicios from './screens/ABM_Servicios/MisServicios';
import EditarServicio from './screens/ABM_Servicios/EditarServicio';

const RouterApp = () => {
    const navigate = useNavigate();

    useEffect(() => {
        verificarToken()
            .then(resultado => {
                if (resultado.status === 200) {
                    navigate('/home');
                } else {
                    navigate('/login');
                }
            });
    }, [navigate]);

    return (
        <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/ABM_Servicios/NuevoServicio" element={<NuevoServicio />} />
            <Route path="/ABM_Servicios/MisServicios" element={<MisServicios />} />
            <Route path="/service/:id" element={<ServiceDetail />} />
            <Route path="/ABM_Servicios/EditarServicio/:id" element={<EditarServicio />} />
            <Route path="/referrals/:ReferralLink" element={<RegisterReferralsScreen />} />
        </Routes>
    );
};

export default RouterApp;
