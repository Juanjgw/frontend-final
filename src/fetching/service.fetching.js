// src/fetching/service.fetching.js
import { HTTP, URL } from './http';

export const getServiceById = async (id) => {
    try {
        const response = await HTTP.GET(`${URL.URL_API}/api/servicios/${id}`);
        if (!response.ok) {
            throw new Error(`Error al obtener el servicio: ${response.statusText}`);
        }
        return response.data;
    } catch (error) {
        throw new Error(`Error al obtener el servicio: ${error.message}`);
    }
};

export const updateService = async (id, servicio) => {
    try {
        const response = await HTTP.PUT(`${URL.URL_API}/api/servicios/${id}`, servicio);
        if (!response.ok) {
            throw new Error(`Error al actualizar el servicio: ${response.statusText}`);
        }
        return response.data;
    } catch (error) {
        throw new Error(`Error al actualizar el servicio: ${error.message}`);
    }
};
