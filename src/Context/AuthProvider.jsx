import React, { useState } from 'react';
import { AuthContext } from './AuthContext';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const AuthProvider = ({ children }) => {
    const axiosSecure = useAxiosSecure();
    const [user, setUser] = useState(null);

    const Login = async (email, password) => {
        const res = await axiosSecure.get(`/login?email=${email}&password=${password}`)
        if (res?.data?.token) {
            localStorage.setItem("token", res?.data?.token)
            const profileRes = await axiosSecure.get(`/user?email=${email}`)
            setUser(profileRes.data)
        }
    }

    const UserInfo = {
        Login,
        user
    };

    return (
        <AuthContext.Provider value={UserInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
