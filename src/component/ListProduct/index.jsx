import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import Sidebar from './Sidebar/Sidebar';
import Navbar from '../../component/Navigation/navbar';
import Footers from "../Footer/Footers";
// json-server db.json --port 9000 --watch
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
        <MDBContainer className="my-5">
            <Navbar />
            <br />
            <MDBRow>
                <MDBCol md="3">
                    <Sidebar onFilterChange={handleFilterChange} />
                </MDBCol>
                <MDBCol md="9">
                    <div className="content" style={{ marginTop: "-100px" }}>
                        <Outlet context={[filterValues]} />
                    </div>
                </MDBCol>
            </MDBRow>
            <Footers />
        </MDBContainer>
    );
}

export default ProductListDefaultPage;
