import axios from 'axios';
import React from 'react';

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000"
});
const useAxiosSecure = () => {
    const token = localStorage.getItem("token");
    axiosInstance.interceptors.request.use(config => {
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    // // Response interceptor
    // axiosInstance.interceptors.response.use(
    //     response => {
    //         return response;
    //     },
    //     error => {
    //         if ( error.response.status === 401 ||error.response && error.response.status === 403) {
    //             SignOut().then(() => {
    //                 setUser(null)
    //                 navigate('/login')
    //             });
    //         }
    //         return Promise.reject(error);
    //     }
    // );

    return axiosInstance
};

export default useAxiosSecure;