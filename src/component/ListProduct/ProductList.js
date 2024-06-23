import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText } from "mdb-react-ui-kit";
import { motion } from "framer-motion";
import '../Styles/ProductListStyles.css';
import { useNavigate } from 'react-router-dom';
import { addCart } from "../../store/Action";

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
                {products.map((product, index) => (
                    <Product
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        img={product.img}
                        des={product.des}
                        price={product.price}
                        size={product.size}
                        tint={product.tint}
                        index={index}
                    />
                ))}
            </MDBRow>
        </MDBContainer>
    );
};

const Product = ({ id, name, img, des, price, size, tint, index }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    const handleAddToCart = () => {
        dispatch(addCart({ id, name, img, des, price, size, tint }));
    };

    const handleViewDetail = () => {
        navigate(`/product/${id}`);
    };

    return (
        <MDBCol md="4" lg="3">
            <motion.div
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
            >
                <MDBCard className="product-card" onClick={handleViewDetail} style={{ cursor: 'pointer' }}>
                    <MDBCardImage src={img} alt={name} position="top" />
                    <MDBCardBody>
                        <MDBCardTitle className="truncate-name truncate-text">{name}</MDBCardTitle>
                        <MDBCardText className="truncate-size truncate-text"><b>Size:</b> {size.join(', ')}</MDBCardText>
                        <MDBCardText className="truncate-tint truncate-text"><b>Màu sắc:</b> {tint.join(', ')}</MDBCardText>
                    </MDBCardBody>
                    <div className="card-footer">
                        <span className="text-danger">{formattedPrice}</span>
                        <button className="custom-button" onClick={(e) => { e.stopPropagation(); handleAddToCart(); }}>Thêm</button>
                    </div>
                </MDBCard>
            </motion.div>
        </MDBCol>
    );
};