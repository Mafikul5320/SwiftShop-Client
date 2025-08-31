import React from 'react';
import Navber from '../Components/Navber';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';

const Root = () => {
    return (
        <div>
            <Navber />
            <div className='min-h-[calc(100vh-443px)]'>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Root;