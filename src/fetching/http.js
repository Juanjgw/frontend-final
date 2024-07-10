// src/fetching/http.js
export const HTTP = {
    GET: async (url, headers = {}) => {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
      });
      return response.json();
    },
    POST: async (url, body) => {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      return response.json();
    },
    // Agrega PUT y DELETE si es necesario
  };
  
  export const URL = {
    URL_API: 'http://localhost:4040',
  };
  