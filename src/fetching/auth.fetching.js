import { HTTP, URL } from "./http";

const ROUTE = '/api/auth';

export const login = async (usuario) => {
    try {
        const result = await HTTP.POST(URL.URL_API + ROUTE + '/login', usuario);
        if (!result.ok) {
            throw { status: result.status, message: result.message }; // Mejora en el manejo de errores
        } else {
            localStorage.setItem('token', result.token); // Asegúrate de que result.token esté definido
            return result;
        }
    } catch (error) {
        throw { message: error.message };
    }
};

export const registrar = async (usuario) => {
    try {
        const result = await HTTP.POST(URL.URL_API + ROUTE + '/register', usuario);
        if (!result.ok) {
            throw { status: result.status, message: result.message };
        }
    } catch (error) {
        throw { message: error.message };
    }
};

export const verificarToken = async () => {
    try {
        const token = localStorage.getItem('token');
        const headers = new Headers();
        headers.append('Authorization', token);
        const result = await HTTP.GET(URL.URL_API + ROUTE + '/verify-token', headers);
        return result;
    } catch (error) {
        throw { message: error.message }; // Mejora en el manejo de errores
    }
};
