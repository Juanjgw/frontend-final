export const HTTP = {
    GET: async (url, headers = {}) => {
        const response = await fetch(url, {
            method: 'GET',
            headers: headers,
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        return response.json();
    },
    POST: async (url, body, headers = {}) => {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
            body: JSON.stringify(body),
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        return response.json();
    },
    PUT: async (url, body, headers = {}) => {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
            body: JSON.stringify(body),
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        return response.json();
    },
    DELETE: async (url, headers = {}) => {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: headers,
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        return response.json();
    }
};

export const URL = {
    
   // tp final 
   // URL_API: 'https://backend-final-con-sql.onrender.com', 
   // local
    //URL_API: 'http://localhost:4041',
 // produccion
   URL_API: 'https://contrata-expertos-backed.onrender.com', 
   //URL_API: 'https://contrataexpertos.com',

}