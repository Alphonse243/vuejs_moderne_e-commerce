import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api', // L'URL de ton backend Laravel
    withCredentials: true, // Crucial pour Laravel Sanctum (cookies/session)
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
    }
});

export default api;