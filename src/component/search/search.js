import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import {useDispatch} from "react-redux";
import {products} from "../../data/ProductData";
import {NavLink} from "react-router-dom";
import Navbar from '../Navigation/navbar';
import Footers from "../Footer/Footers";
import {addCart} from "../../store/Action";
import {useSelector} from "react-redux";
const Search = () => {
    const [buttonColors, setButtonColors] = useState({});
    useEffect(() => {
        // Lấy màu sắc từ localStorage khi component được render
        const storedColors = JSON.parse(localStorage.getItem('buttonColors')) || {};
        setButtonColors(storedColors);
    }, []);


    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            // Kiểm tra query trước khi gửi request
            if (!query || query.trim() === "") {
                setProducts([]);
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`http://localhost:9000/products?search=${query}`);
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error('Không thể tìm kiếm sản phẩm.');
                }
                const data = await response.json();

                // Kiểm tra kết quả trả về từ API
                const filteredData = data.filter(product =>
                    product.name.toLowerCase().includes(query.toLowerCase())
                );
                setProducts(filteredData);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (query) {
            fetchProducts();
        }
    }, [query]);
    const [inCart, setInCart] = useState(false); // State để theo dõi sản phẩm có trong giỏ hàng hay không
    const [selectedProduct, setSelectedProduct] = useState(null);
    const currentUser = useSelector(state => state.currentUser);
    const dispatch = useDispatch();

    const [showPopup, setShowPopup] = useState(false);
    const handleClosePopup = () => {
        setShowPopup(false);

    };
    const handlePopUp = (product) =>{
        setShowPopup(true);
        setSelectedProduct(product);
        setSelectedSize(null);
        setSelectedColor(null);
        setQuantity(1);
    }
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

    useEffect(() => {
        localStorage.setItem("selectedSize", selectedSize);
    }, [selectedSize]);
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
    const handleAddToCart =({id, name, img, des,price},selectedSize,selectedColor,selectedQuantity) =>{

        if (selectedColor !== null && selectedSize !== null) {
            dispatch(addCart({  id,  name,  img,  des,  price,size: selectedSize, color: selectedColor,quantity: selectedQuantity
            }));
            alert("Đã thêm sản phẩm vào giỏ hàng");


        } else {
            alert("Vui lòng chọn đầy đủ kích thước, màu sắc và số lượng trước khi thêm vào giỏ hàng");
        }

    };

    return (
        <div>
            <Navbar />
            <h5 className="fs-5 text-center mt-2">Kết quả tìm kiếm cho: {query}</h5>
            {loading && <p>Đang tải...</p>}
            {error && <p>{error}</p>}
            <ul>
                <div className="row">
                    {products.map((product) => {
                        const formattedPrice = new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND'
                        }).format(product.price);
                        const buttonColor = buttonColors[product.id] || 'btn-success'; // Lấy màu sắc từ state hoặc màu mặc định


                        return (
                            <div key={product.id} className="col-3 col-6 col-sm-6 col-lg-3 pb-lg-2 mb-3">
                                <div className="card ms-3 h-100 border">
                                    <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                                        <NavLink to={`/product/${product.id}`}
                                                 style={{display: 'block', overflow: 'hidden'}}>
                                            <img
                                                src={product.img}
                                                alt={product.title}
                                                className="img-fluid w-100"
                                                style={{transition: 'transform 0.3s ease'}}
                                                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.15)'}
                                                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                            />
                                        </NavLink>
                                    </div>
                                    <div className="card-body text-center">
                                        <h5 className="fs-6 h-50">{product.name}</h5>
                                        <div className="d-flex justify-content-center flex-column flex-md-row mt-3">
                                            <p className="fs-5 me-md-1 mb-2 mb-md-0 "
                                               data-mdb-color="dark" data-mdb-ripple-init="">
                                                {formattedPrice}
                                            </p>
                                            <div className="btn-group shadow-0  flex-column flex-md-row">
                                                <button
                                                    type="button"
                                                    className={`btn ${buttonColor} d-flex align-items-center justify-content-center text-center mb-2 mb-md-0 rounded-5 w-100 w-md-auto`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handlePopUp(product);
                                                        //  changeButtonColor(product.id); // Đổi màu khi nhấp chuột
                                                        // handleToggleCart(product.id);
                                                        // handleRemoveFromCart(product.id);
                                                    }}>
                                                    <i className="fa fa-cart-plus me-2" aria-hidden="true"></i>
                                                    {inCart ? 'Xóa' : 'Thêm'}
                                                </button>
                                                {showPopup && selectedProduct && (
                                                    <div id="popup" className="text-center w-100"
                                                         style={{boxShadow: 'none', maxWidth: '450px', height: 'auto'}}>
                                                        <div className="popup-content">
                                                            <div
                                                                className="d-flex flex-column flex-lg-row align-items-center">
                                                                <p className="fw-bold mt-2 mt-lg-0">Chọn Size</p>
                                                                <div className="ms-0 ms-lg-3 mb-3 mb-lg-0" role="group"
                                                                     aria-label="First group">
                                                                    {Array.isArray(selectedProduct.size) && selectedProduct.size.map((size, index) => (
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
                                                            <div
                                                                className="d-flex flex-column flex-lg-row align-items-center">
                                                                <p className="fw-bold mt-2 mb-lg-0">Màu Sắc</p>
                                                                <div className="ms-0 ms-lg-4 mb-3 mb-lg-0" role="group"
                                                                     aria-label="">
                                                                    {Array.isArray(selectedProduct.tint) && selectedProduct.tint.map((tint, index) => (
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
                                                            <div
                                                                className="d-flex flex-column flex-lg-row align-items-center mt-lg-2">
                                                                <p className="fw-bold mb-lg-0">Số Lượng</p>
                                                                <div className="quantity buttons_added ms-3">
                                                                    <input type="button" value="-"
                                                                           className="minus button is-form"
                                                                           onClick={handleDecrement}/>
                                                                    <input type="number" id="quantity"
                                                                           className="input-text qty text" step="1"
                                                                           min="1" max="9999" name="quantity"
                                                                           value={selectedQuantity} title="SL" size="4"
                                                                           inputMode="numeric" onChange={handleChange}
                                                                           style={{
                                                                               textAlign: 'center',
                                                                               marginLeft: '0px'
                                                                           }}/>
                                                                    <input style={{marginLeft: '0px'}} type="button"
                                                                           value="+" className="plus button is-form"
                                                                           onClick={handleIncrement}/>
                                                                </div>

                                                            </div>
                                                            <div className="card-footer">
                                                                <button className="custom-button-pl" onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    if (currentUser != null) {
                                                                        if (selectedSize != null && selectedColor != null) {
                                                                            handleAddToCart(selectedProduct, selectedSize, selectedColor, selectedQuantity);
                                                                        } else {
                                                                            alert("Bạn hãy chọn đầy đủ kích thước và màu sắc");
                                                                        }
                                                                    } else {
                                                                        alert("Bạn phải đăng nhập");

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
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </ul>
            <hr/>
            <Footers/>
        </div>
    );
};

// {products.length === 0 && !loading && !error && <p>No products found</p>}
export default Search;