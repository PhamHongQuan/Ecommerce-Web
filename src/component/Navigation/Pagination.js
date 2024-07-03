import React, { useState, useEffect } from 'react';
import { products } from '../../data/ProductData';
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useSelector } from 'react-redux';
import {addCart} from "../../store/Action"; // Đường dẫn đến tệp ProductData

const Products = () => {
    const [productList, setProductList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(20); // Số sản phẩm mỗi trang
    const dispatch = useDispatch();

    // Tính toán số lượng trang dựa trên số lượng sản phẩm và số sản phẩm mỗi trang
    const totalPages = Math.ceil(products.length / productsPerPage);
    const currentUser = useSelector((state) => state.user?.currentUser); // Sử dụng optional chaining

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
    const [buttonColors, setButtonColors] = useState({});
    useEffect(() => {
        // Lấy màu sắc từ localStorage khi component được render
        const storedColors = JSON.parse(localStorage.getItem('buttonColors')) || {};
        setButtonColors(storedColors);
    }, []);

    const [isAddedToCart, setIsAddedToCart] = useState(false);
    const handleAddToCart =({id, name, img, des,price}) =>{
        dispatch(addCart({id, name, img, des, price}));
    };

    const changeButtonColor = (productId) => {
        if (buttonColors[productId]) {
            // Nếu nút đã được nhấn, hiển thị thông báo
            alert('Sản phẩm này đã có trong giỏ hàng bạn có muốn thêm vào không!');
        } else {
            // Nếu nút chưa được nhấn, thay đổi màu sắc và lưu vào localStorage
            const newColors = {
                ...buttonColors,
                [productId]: 'btn-primary' // Thay đổi màu sắc thành màu
            };
            setButtonColors(newColors);
            localStorage.setItem('buttonColors', JSON.stringify(newColors));
        }
    };

    return (
        <div>

            <div className="row">
                {productList.map((product) => {
                    const formattedPrice = new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND'
                    }).format(product.price);
                    const buttonColor = buttonColors[product.id] || 'btn-danger'; // Lấy màu sắc từ state hoặc màu mặc định
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
                                    <div className="d-flex justify-content-center">
                                        <div className="btn-group shadow-0 mt-3 flex-column flex-md-row"
                                             role="group" aria-label="Basic example">
                                            <p className="btn btn-outline-black me-md-1 mb-2 mb-md-0"
                                               data-mdb-color="dark" data-mdb-ripple-init="">
                                                {formattedPrice}
                                            </p>

                                            <button
                                                type="button"
                                                className={`btn ${buttonColor} d-flex align-items-center mb-2 mb-md-0`}
                                                data-mdb-color="dark" data-mdb-ripple-init=""
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleAddToCart(product);
                                                    changeButtonColor(product.id); // Đổi màu khi nhấp chuột
                                                    // handleRemoveFromCart(product.id);
                                                }}>
                                                <i className="fa fa-cart-plus me-2" aria-hidden="true"></i> Thêm
                                            </button>


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
