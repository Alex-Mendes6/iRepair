import axios from "axios";

export const api = axios.create({
    baseURL: 'https://trainee.fidelis.workers.dev/api',
    withCredentials: false,
    headers: {
        'Authorization': 'Bearer 058b250b-b754-48ad-9923-61f19d65f4b9',
        'Content-Type': 'application/json',
    },
});