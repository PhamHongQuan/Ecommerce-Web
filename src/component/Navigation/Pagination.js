import React, { useState, useEffect } from 'react';
import { products } from '../../data/ProductData';
import {Link, NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useSelector } from 'react-redux';
import {addCart} from "../../store/Action";
import {MDBContainer} from "mdb-react-ui-kit";
import Navbar from "./navbar";
import Footers from "../Footer/Footers"; // Đường dẫn đến tệp ProductData

const Products = ({product}) => {
    const [productList, setProductList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(20); // Số sản phẩm mỗi trang
    const dispatch = useDispatch();

    const [selectedProduct, setSelectedProduct] = useState(null);
    // Tính toán số lượng trang dựa trên số lượng sản phẩm và số sản phẩm mỗi trang
    const totalPages = Math.ceil(products.length / productsPerPage);
    const cart = useSelector(state => state.cart);
    const currentUser = useSelector(state => state.currentUser);
    const [buttonColors, setButtonColors] = useState({});

    if(currentUser != null){
        const userCart = cart.find(item => item.username === currentUser.username);
        const productsOfCart = userCart.products;
    }
    useEffect(() => {
        // Lấy màu sắc từ localStorage khi component được render
        const storedColors = JSON.parse(localStorage.getItem('buttonColors')) || {};
        setButtonColors(storedColors);
    }, []);
    useEffect(() => {
        // Cắt lấy danh sách sản phẩm cho trang hiện tại
        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        const currentProducts = products.slice(startIndex, endIndex);
        setProductList(currentProducts);
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    //thay doi mau btn


    const [isAddedToCart, setIsAddedToCart] = useState(false);
    const handleAddToCart =({id, name, img, des,price},selectedSize,selectedColor,selectedQuantity) =>{

        if (selectedColor !== null && selectedSize !== null) {
            dispatch(addCart({  id,  name,  img,  des,  price,size: selectedSize, color: selectedColor,quantity: selectedQuantity
            }));
            alert("Đã thêm sản phẩm vào giỏ hàng");


        } else {
            alert("Vui lòng chọn đầy đủ kích thước, màu sắc và số lượng trước khi thêm vào giỏ hàng");
        }

    };

    const handleRemoveFromCart = (productId) => {
        // Logic để xóa sản phẩm khỏi giỏ hàng
        console.log('Xóa sản phẩm khỏi giỏ hàng', productId);
        alert('Xóa sản phẩm khỏi giỏ hàng');

        // Cập nhật lại trạng thái và localStorage khi sản phẩm bị xóa
        const newColors = { ...buttonColors };
        delete newColors[productId];
        setButtonColors(newColors);
        localStorage.setItem('buttonColors', JSON.stringify(newColors));
    };



    const changeButtonColor = (productId) => {
        if (buttonColors[productId]) {
            // Nếu nút đã được nhấn, hiển thị thông báo
            alert('Sản phẩm này đã có trong giỏ hàng bạn có muốn thêm vào không!');
        } else {
            // Nếu nút chưa được nhấn, thay đổi màu sắc và lưu vào localStorage
            const newColors = {
                ...buttonColors,
                [productId]: 'btn-danger' // Thay đổi màu sắc thành màu
            };
            setButtonColors(newColors);
            localStorage.setItem('buttonColors', JSON.stringify(newColors));
        }
    };
    const [inCart, setInCart] = useState(false); // State để theo dõi sản phẩm có trong giỏ hàng hay không

    const handleToggleCart = () => {
        setInCart(!inCart); // Đảo ngược trạng thái giỏ hàng khi nhấn vào button
    };


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

    return (
        <div>
            <div className="row">
                {productList.map((product) => {
                    const formattedPrice = new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND'
                    }).format(product.price);
                    const buttonColor = buttonColors[product.id] || 'btn-success'; // Lấy màu sắc từ state hoặc màu mặc định
                    const buttonColor1 = buttonColors[product.id] || 'btn-primary'; // Lấy màu sắc từ state hoặc màu mặc định
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
                                            {/*<p className="btn bg-primary btn-outline fs-5 me-md-1 mb-2 mb-md-0"*/}
                                            {/*   data-mdb-color="dark" data-mdb-ripple-init="">*/}
                                            {/*    {formattedPrice}*/}
                                            {/*</p>*/}

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
                                                <div id="popup" className="" style={{boxShadow: 'none'}}>
                                                    <div className="popup-content">
                                                        <div className="d-flex">
                                                            <p className="fw-bold mt-2">Chọn Size</p>
                                                            <div className="ms-3" role="group" aria-label="First group">
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
                                                        <div className="d-flex">
                                                            <p className="fw-bold mt-2">Màu Sắc</p>
                                                            <div className="ms-4" role="group" aria-label="">
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
                                                        <div className="d-flex mt-lg-2">
                                                            <p className="fw-bold">Số Lượng</p>
                                                            <div className="quantity buttons_added">
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


            <nav aria-label="Page navigation example">
                <ul className="pagination">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>Previous
                        </button>
                    </li>
                    {Array.from({length: totalPages}, (_, index) => (
                        <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                            <button className="page-link"
                                    onClick={() => handlePageChange(index + 1)}>{index + 1}</button>
                        </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Products;

