import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import {products} from "../../data/ProductData";
import {NavLink} from "react-router-dom";
import Navbar from '../Navigation/navbar';
import Footers from "../Footer/Footers";
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
                                                        // handleAddToCart(product);
                                                        // changeButtonColor(product.id); // Đổi màu khi nhấp chuột
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
            </ul>
            <hr/>
            <Footers />
        </div>
    );
};

// {products.length === 0 && !loading && !error && <p>No products found</p>}
export default Search;