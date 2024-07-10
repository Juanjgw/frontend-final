// src/fetching/services.fetching.js
import { HTTP, URL } from "./http";

export const obtenerServicios = async () => {
  try {
    const result = await HTTP.GET(URL.URL_API + '/api/Servicios');
    if (!result.ok) {
      throw new Error('Error fetching services');
    }
    return result;
  } catch (error) {
    throw { message: error.message };
  }
};
