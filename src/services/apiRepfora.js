// /services/apiRepfora.js
import apiRepfora from '@/plugins/axiosRepfora.js'; // Importa tu instancia de Axios si está configurada en /plugins

// Función GET
export async function getDataRepfora(url) {
    try {
        const response = await apiRepfora.get(url);
        return response.data;  // Devuelve los datos de la respuesta
    } catch (error) {
        console.error('Error en la petición GET:', error);
        throw error;  // Opcionalmente, puedes manejar el error o lanzarlo
    }
}

// Función POST
export async function postDataRepfora(url, data) {
    try {
        console.log('this is data from postData:  ', data);
        const response = await apiRepfora.post(url, data);
        return response.data;  // Devuelve los datos de la respuesta
    } catch (error) {
        console.error('Error en la petición POST:', error);
        throw error;
    }
}

// Función PUT
export async function putDataRepfora(url, data) {
    try {
        const response = await apiRepfora.put(url, data);
        return response.data;  // Devuelve los datos de la respuesta
    } catch (error) {
        console.error('Error en la petición PUT:', error);
        throw error;
    }
}