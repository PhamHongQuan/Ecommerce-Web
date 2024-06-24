import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import Sidebar from './Sidebar/Sidebar';
import Navbar from '../../component/Navigation/navbar';
import Footers from "../Footer/Footers";
import "../Styles/ProductListDefaultPage.css"

function ProductListDefaultPage() {
    const [filterValues, setFilterValues] = useState({
        nike: { price: '', size: '', gender: '' },
        adidas: { price: '', size: '', gender: '' },
        lacoste: { price: '', size: '', gender: '' },
        puma: { price: '', size: '', gender: '' }
    });

    const handleFilterChange = (newFilterValues) => {
        setFilterValues(newFilterValues);
    };

    return (
        <div className="page-wrapper">
            <Navbar/>
            <MDBContainer className="my-5">
                <MDBRow>
                    <MDBCol md="3">
                        <Sidebar onFilterChange={handleFilterChange}/>
                    </MDBCol>
                    <MDBCol md="9">
                        <div className="content">
                            <Outlet context={[filterValues]}/>
                        </div>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            <Footers/>
        </div>
    );
}

export default ProductListDefaultPage;
