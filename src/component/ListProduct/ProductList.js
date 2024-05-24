import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText } from "mdb-react-ui-kit";
import '../Styles/ProductListStyles.css'; // Import the CSS file
import {  useNavigate } from 'react-router-dom';
import {addCart} from "../../store/Action";

export default function ProductList() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch("http://localhost:9000/products")
            .then((response) => response.json())
            .then((data) => setProducts(data));
    }, []);

    return (
        <MDBContainer className="my-5">
            <MDBRow>
                <MDBRow className="gy-4">
                    {products.map((product) => (
                        <Product
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            img={product.img}
                            des={product.des}
                            price={product.price}
                            isBuying={product.isBuying}
                        />
                    ))}
                </MDBRow>
            </MDBRow>
        </MDBContainer>
    );
};

const Product = ({ id, name, img, des, price }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAddToCart = () => {
         dispatch(addCart({ id, name, img, des, price }));
    };

    const handleViewDetail = () => {
        navigate(`/product/${id}`);
    };

    return (
        <MDBCol md="4" lg="3">
            <MDBCard className="product-card" onClick={handleViewDetail} style={{ cursor: 'pointer' }}>
                <MDBCardImage src={img} alt={name} position="top" />
                <MDBCardBody>
                    <MDBCardTitle className="truncate-name">{name}</MDBCardTitle>
                    <MDBCardText className="truncate-description">{des}</MDBCardText>
                </MDBCardBody>
                <div className="card-footer">
                    <span className="text-danger">{price}</span>
                    <button className="custom-button" onClick={(e) => { e.stopPropagation(); handleAddToCart(); }}>Thêm</button>
                </div>
            </MDBCard>
        </MDBCol>
    );
};
