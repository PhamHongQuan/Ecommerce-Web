import React from 'react';
import Navbar from '../Navigation/navbar';
import Slideshow from '../Slideshow/slideshow';
import Footers from '../Footer/Footers';
import { Outlet } from 'react-router-dom';

const HomeLayout = () => {
    return (
        <div>
            <Navbar />
            <Slideshow />
            {/*<Outlet />*/}
            <Footers />
        </div>
    );
};

export default HomeLayout;
