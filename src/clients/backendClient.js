import axios from "axios";


export const backendClient = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}`
});