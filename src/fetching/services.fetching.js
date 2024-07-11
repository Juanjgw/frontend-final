// src/fetching/service.fetching.js
import { HTTP, URL } from "./http";

export const obtenerServicios = async () => {
  try {
    const result = await HTTP.GET(URL.URL_API + '/api/servicios');
    console.log('Response from API:', result); // Agregar console.log aquí
    if (!result.ok) {
      throw new Error('Error fetching services');
    }
    const data = await result.json();
    console.log('Parsed data:', data); // Agregar console.log aquí
    return data.servicios;
  } catch (error) {
    console.error('Error in obtenerServicios:', error); // Agregar console.error aquí
    throw { message: error.message };
  }
};
