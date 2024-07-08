import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import LoginScreen from './screens/login/LoginScreen';
import RegisterScreen from './screens/register/RegisterScreen';
import HomeScreen from './screens/Home/HomeScreen';
import { verificarToken } from './fetching/auth.fetching';

const RouterApp = () => {
    const navigate = useNavigate();
    useEffect(() => {
        verificarToken()
            .then(result => {
                if (result && result.ok) {
                    navigate('/home');
                } else {
                    navigate('/');
                }
            })
            .catch(() => {
                navigate('/');
            });
    }, []);

    return (
        <Routes>
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/' element={<HomeScreen />} />
            <Route path='/home' element={<HomeScreen />} />
        </Routes>
    );
};

export default RouterApp;


