import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText } from "mdb-react-ui-kit";
import { motion } from "framer-motion";
import '../Styles/ProductListStyles.css';
import {NavLink, useNavigate} from 'react-router-dom';
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
    const [showPopup, setShowPopup] = useState(false);
    const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

    const handleClosePopup = () => {
        setShowPopup(false);
        setSelectedSize(null);
        setSelectedColor(null);
        setQuantity(1);
    };

    const handlePopUp = () =>{
        setShowPopup(true);

    }
    const handleAddToCart = () => {
        dispatch(addCart({id, name, img, des, price,size:selectedSize,color:selectedColor,quantity:selectedQuantity}));
    };
    const handleViewDetail = () => {
        navigate(`/product/${id}`);

    };
    useEffect(() => {
        setSelectedSize(null);
        setSelectedColor(null);
        setQuantity(1);
    }, [id]);
    const [selectedColor, setSelectedColor] = useState(
        localStorage.getItem("selectedColor") || null
    );
    useEffect(() => {
        localStorage.setItem("selectedColor", selectedColor);
    }, [selectedColor]);

    const [selectedSize, setSelectedSize] = useState(
        localStorage.getItem("selectedSize") || null
    );

    useEffect(() => {
        localStorage.setItem("selectedSize", selectedSize);
    }, [selectedSize]);
    const handleColorClick = (tint) => {
        setSelectedColor(tint);
    };
    const handleColorClickSize = (size) => {
        setSelectedSize(size);
    };
    const [selectedQuantity, setQuantity] = useState(() => {
        const savedQuantity = localStorage.getItem('selectedQuantity');
        return savedQuantity ? parseInt(savedQuantity, 10) : 1;
    });
    useEffect(() => {
        localStorage.setItem('selectedQuantity', selectedQuantity);
    }, [selectedQuantity]);

    const handleIncrement = () => {
        setQuantity((prevQuantity) => Math.min(prevQuantity + 1, 9999));
    };

    const handleDecrement = () => {
        setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
    };

    const handleChange = (event) => {
        const value = Math.max(1, Math.min(parseInt(event.target.value, 10) || 1, 9999));
        setQuantity(value);
    };

    return (
        <>
        <MDBCol md="6" lg="3">
            <motion.div
                initial={{ x: "100%", opacity: 0, scale: 0.7 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2, ease: "easeIn" }}
            >
                <MDBCard className="product-card-pl" onClick={handleViewDetail} style={{ cursor: 'pointer' }}>
                    <MDBCardImage src={img} alt={name} position="top" />
                    <MDBCardBody>
                        <MDBCardTitle className="truncate-name truncate-text">{name}</MDBCardTitle>
                        <MDBCardText className="truncate-size truncate-text"><b>Size:</b> {size.join(', ')}</MDBCardText>
                        <MDBCardText className="truncate-tint truncate-text"><b>Màu sắc:</b> {tint.join(', ')}</MDBCardText>
                    </MDBCardBody>
                    <div className="card-footer">
                        <span className="text-price">{formattedPrice}</span>
                        <button className="custom-button-pl" onClick={(e) => {
                            e.stopPropagation();
                            handlePopUp();
                        }}>Thêm
                        </button>

                    </div>

                </MDBCard>
            </motion.div>
        </MDBCol>
            {showPopup && (
                <div id="popup">
                    <div className="popup-content">
                        <div className="d-flex">
                            <p className="fw-bold mt-2">Chọn Size</p>
                            <div className="ms-3" role="group" aria-label="First group">
                                {Array.isArray(size) && size.map((size, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        className={`btn ${selectedSize === size ? "btn-primary" : "btn-outline-black"} me-2`}
                                        onClick={() => handleColorClickSize(size)}
                                    >
                                        {size}
                                    </button>

                                ))}

                            </div>
                        </div>
                        <div className="d-flex">
                            <p className="fw-bold mt-2">Màu Sắc</p>
                            <div className="ms-4" role="group" aria-label="">
                                {Array.isArray(tint) && tint.map((tint, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        className={`btn ${selectedColor === tint ? "btn-primary" : "btn-outline-black"} me-2`}
                                        onClick={() => handleColorClick(tint)}
                                    >
                                        {tint}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="d-flex">
                            <div className="quantity buttons_added">
                                <input type="button" value="-" className="minus button is-form"
                                       onClick={handleDecrement}/>
                                <input type="number" id="quantity" className="input-text qty text" step="1"
                                       min="1" max="9999" name="quantity" value={selectedQuantity} title="SL" size="4"
                                       inputMode="numeric" onChange={handleChange}  style={{ textAlign: 'center' }}/>
                                <input type="button" value="+" className="plus button is-form"
                                       onClick={handleIncrement}/>
                            </div>

                        </div>
                        <div className="card-footer">
                            <button className="custom-button-pl" onClick={(e) => {
                                e.stopPropagation();
                                if(selectedSize != null && selectedColor != null){
                                    handleAddToCart();
                                    alert("Đã thêm sản phẩm vào giỏ haàng");
                                }else {
                                    alert("Bạn hãy chọn đầy đủ kích thước và màu sắc");
                                }
                            }}>Thêm
                            </button>
                            <button className="custom-button-pl" onClick={(e) => {
                                e.stopPropagation();
                                handleClosePopup();
                            }}>Đóng
                            </button>

                        </div>
                    </div>
                </div>
            )}
        </>
    );


};