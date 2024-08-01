// src/fetching/auth.fetching.js
import axios from 'axios';
import { URL } from './http';

const ROUTE = '/api/auth';

export const login = async (usuario) => {
    try {
        const result = await axios.post(URL.URL_API + ROUTE + '/login', usuario);
        if (result.status !== 200) {
            throw { status: result.status, message: result.data.message };
        } else {
            console.log(result.data);
            localStorage.setItem('token', result.data.token);
            let usuario = JSON.stringify(result.data.usuario);
            localStorage.setItem('usuario', usuario);
            return result.data;
        }
    } catch (error) {
        throw { message: error.response?.data?.message || error.message };
    }
};

export const registrar = async (usuario) => {
    try {
        const result = await axios.post(URL.URL_API + ROUTE + '/register', usuario);
        if (result.status !== 200) {
            throw { status: result.status, message: result.data.message };
        }
    } catch (error) {
        throw { message: error.response?.data?.message || error.message };
    }
};

export const verificarToken = async () => {
    try {
        const token = localStorage.getItem('token');
        const result = await axios.get(URL.URL_API + ROUTE + '/verify-token', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return result.data;
    } catch (error) {
        throw { message: error.response?.data?.message || error.message };
    }
};
