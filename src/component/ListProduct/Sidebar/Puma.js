import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText } from "mdb-react-ui-kit";
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { motion } from "framer-motion";
import { Button } from "react-bootstrap";
import "../../Styles/PaginationInProduct.css";
import '../../Styles/ProductListStyles.css'
import { addCart } from "../../../store/Action";

const ITEMS_PER_PAGE = 8;

export default function Puma() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [filterValues] = useOutletContext();
    const [sizeFilterChanged, setSizeFilterChanged] = useState(false);
    const [priceFilterChanged, setPriceFilterChanged] = useState(false);
    const [genderFilterChanged, setGenderFilterChanged] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true);

    useEffect(() => {
        fetch("http://localhost:9000/products")
            .then((response) => response.json())
            .then((data) => {
                const pumaProducts = data.filter(product => product.type === "Puma");
                setProducts(pumaProducts);
                setInitialLoad(false);
            });
    }, []);

    useEffect(() => {
        if (!initialLoad) {
            setSizeFilterChanged(true);
        }
    }, [filterValues.puma.size]);

    useEffect(() => {
        if (!initialLoad) {
            setPriceFilterChanged(true);
        }
    }, [filterValues.puma.price]);

    useEffect(() => {
        if (!initialLoad) {
            setGenderFilterChanged(true);
        }
    }, [filterValues.puma.gender]);

    const applyFilters = (products) => {
        return products.filter(product => {
            if (filterValues.puma.price === 'above' && product.price <= 2000000) return false;
            if (filterValues.puma.price === 'below' && product.price > 2000000) return false;

            if (filterValues.puma.gender && filterValues.puma.gender !== 'all' && product.gender !== filterValues.puma.gender) {
                return false;
            }
            if (filterValues.puma.size && filterValues.puma.size !== 'all') {
                const { size } = product;

                if (Array.isArray(size)) {
                    let sizeRange;
                    if (filterValues.puma.size === 'small') {
                        sizeRange = [35, 37];
                    } else if (filterValues.puma.size === 'medium') {
                        sizeRange = [38, 41];
                    } else if (filterValues.puma.size === 'large') {
                        sizeRange = [42, 45];
                    }
                    const sizeInRange = size.some(s => s >= sizeRange[0] && s <= sizeRange[1]);
                    if (!sizeInRange) {
                        return false;
                    }
                } else {
                    if (filterValues.puma.size === 'small' && (size < 35 || size > 37)) {
                        return false;
                    }
                    if (filterValues.puma.size === 'medium' && (size < 38 || size > 41)) {
                        return false;
                    }
                    if (filterValues.puma.size === 'large' && (size < 42 || size > 45)) {
                        return false;
                    }
                }
            }

            return true;
        });
    };

    const filteredProducts = applyFilters(products);
    const indexOfLastProduct = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstProduct = indexOfLastProduct - ITEMS_PER_PAGE;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        setSizeFilterChanged(false);
        setPriceFilterChanged(false);
        setGenderFilterChanged(false);
    };

    return (
        <MDBContainer className="my-5">
            <MDBRow>
                <MDBRow className="gy-4">
                    {currentProducts.map((product, index) => (
                        <Product
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            img={product.img}
                            price={product.price}
                            gender={product.gender}
                            size={product.size}
                            tint={product.tint}
                            index={index}
                            sizeFilterChanged={sizeFilterChanged}
                            priceFilterChanged={priceFilterChanged}
                            genderFilterChanged={genderFilterChanged}
                            initialLoad={initialLoad}
                        />
                    ))}
                </MDBRow>
            </MDBRow>
            <br></br>
            <MDBRow>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </MDBRow>
        </MDBContainer>
    );
}

const Product = ({ id, name, img, des, price, size, gender, tint, index, sizeFilterChanged, priceFilterChanged, genderFilterChanged, initialLoad }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);



    const handleViewDetail = () => {
        navigate(`/product/${id}`);
    };

    const shouldAnimate = !sizeFilterChanged && !priceFilterChanged && !genderFilterChanged && !initialLoad;
    useEffect(() => {
        setSelectedSize(null);
        setSelectedColor(null);
        setQuantity(1);
    }, [id]);
    const [showPopup, setShowPopup] = useState(false);
    const handleClosePopup = () => {
        setShowPopup(false);
        setSelectedSize(null);
        setSelectedColor(null);
        setQuantity(1);
    };
    const handlePopUp = () =>{
        setShowPopup(true);

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
    const handleAddToCart = () => {
        dispatch(addCart({id, name, img, des, price,size:selectedSize,color:selectedColor,quantity:selectedQuantity}));
    };
    return (
        <>

        <MDBCol md="4" lg="3">
            <motion.div
                initial={shouldAnimate ? { x: "100%", opacity: 0, scale: 0.7 } : false}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2, ease: "easeIn" }}
            >
                <MDBCard className="product-card-pl" onClick={handleViewDetail} style={{ cursor: 'pointer' }}>
                    <MDBCardImage src={img} alt={name} position="top" />
                    <MDBCardBody>
                        <MDBCardTitle className="truncate-name truncate-text"><b>{name}</b></MDBCardTitle>
                        <MDBCardText className="truncate-size truncate-text"><b>Size:</b> {size.join(', ')}</MDBCardText>
                        <MDBCardText className="truncate-tint truncate-text"><b>Màu sắc:</b> {tint.join(', ')}</MDBCardText>
                    </MDBCardBody>
                    <div className="card-footer">
                        <span className="text-price">{formattedPrice}</span>
                        <button className="custom-button-pl" onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart();
                        }}>Thêm</button>
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

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <MDBCol>
            <div className="pagination">
                <Button
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                >
                    Previous
                </Button>
                {pageNumbers.map(number => (
                    <Button
                        key={number}
                        active={number === currentPage}
                        onClick={() => onPageChange(number)}
                    >
                        {number}
                    </Button>
                ))}
                <Button
                    disabled={currentPage === totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                >
                    Next
                </Button>
            </div>
        </MDBCol>
    );
};
