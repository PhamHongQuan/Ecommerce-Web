import { Outlet } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import Sidebar from './Sidebar/Sidebar';
import Navbar from '../Navigation/navbar';
import Footers from "../Footer/Footers";
function ProductListDefaultPage() {
    return (
        <MDBContainer className="my-5">
            <Navbar></Navbar>
            <br></br>
            <MDBRow>
                <MDBCol md="3">
                    <Sidebar/>
                </MDBCol>
                <MDBCol md="9">
                    <div className="content" style={{marginTop: "-100px"}}>
                        <Outlet/>
                    </div>
                </MDBCol>
            </MDBRow>
            <Footers></Footers>
        </MDBContainer>

    );
}

export default ProductListDefaultPage;
