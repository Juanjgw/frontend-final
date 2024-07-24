//http.js
export const HTTP = {
    GET: async (url, headers) =>{
        const response = await fetch(url, {
            method: 'GET',
            headers: headers
  
        })
        return response.json()
    },
    POST: async (url, body) =>{
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        return response.json()
    },
    PUT:  () =>{

    },
    DELETE:() =>{

    }
}

export const URL = {
    
   // tp final 
   // URL_API: 'https://backend-final-con-sql.onrender.com', 
   // local
   // URL_API: 'http://localhost:4041',
      // produccion
   // URL_API: 'https://contrata-expertos-backed.onrender.com', 
   URL_API: 'https://contrataexpertos.com',

}