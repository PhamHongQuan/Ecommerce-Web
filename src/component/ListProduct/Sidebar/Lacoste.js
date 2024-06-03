import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBBtn } from "mdb-react-ui-kit";
import {Link, useNavigate, useOutletContext} from 'react-router-dom';
import {Button} from "react-bootstrap";
import "../../Styles/PaginationInProduct.css"
import {addCart} from "../../../store/Action";

const ITEMS_PER_PAGE = 8;

export default function Lacoste() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [filterValues] = useOutletContext();

    useEffect(() => {
        fetch("http://localhost:9000/products")
            .then((response) => response.json())
            .then((data) => {
                const LacosteProducts = data.filter(product => product.type === "Lacoste");
                setProducts(LacosteProducts);
            });
    }, []);

    const applyFilters = (products) => {
        return products.filter(product => {
            // Kiểm tra giới tính
            if (filterValues.lacoste.price === 'above' && product.price <= 2000000) return false;
            if (filterValues.lacoste.price === 'below' && product.price > 2000000) return false;

            // Lọc sản phẩm theo giới tính
            if (filterValues.lacoste.gender && filterValues.lacoste.gender !== 'all' && product.gender !== filterValues.lacoste.gender) {
                return false;
            }
            // Lọc sản phẩm theo kích thước
            if (filterValues.lacoste.size && filterValues.lacoste.size !== 'all') {
                const { size } = product;

                // Kiểm tra nếu kích thước sản phẩm là một mảng
                if (Array.isArray(size)) {
                    // Xác định khoảng kích thước cần lọc
                    let sizeRange;
                    if (filterValues.lacoste.size === 'small') {
                        sizeRange = [35, 37];
                    } else if (filterValues.lacoste.size === 'medium') {
                        sizeRange = [38, 41];
                    } else if (filterValues.lacoste.size === 'large') {
                        sizeRange = [42, 45];
                    }

                    // Kiểm tra nếu có ít nhất một kích thước nằm trong khoảng cần lọc
                    const sizeInRange = size.some(s => s >= sizeRange[0] && s <= sizeRange[1]);

                    // Nếu không có kích thước nào phù hợp, trả về false
                    if (!sizeInRange) {
                        return false;
                    }
                } else {
                    // Nếu kích thước không phải là mảng, xử lý như bình thường
                    if (filterValues.lacoste.size === 'small' && (size < 35 || size > 37)) {
                        return false;
                    }
                    if (filterValues.lacoste.size === 'medium' && (size < 38 || size > 41)) {
                        return false;
                    }
                    if (filterValues.lacoste.size === 'large' && (size < 42 || size > 45)) {
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
    };

    return (
        <MDBContainer className="my-5">
            <MDBRow>
                <MDBRow className="gy-4">
                    {currentProducts.map((product) => (
                        <Product
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            img={product.img}
                            price={product.price}
                            gender={product.gender}
                            size={product.size}
                            tint={product.tint}
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
};

const Product = ({ id, name, img, des, price, size, gender, tint }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Định dạng giá thành định dạng tiền tệ VND
    const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

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
                    <MDBCardTitle className="truncate-name"><b>{name}</b></MDBCardTitle>
                    <MDBCardTitle className="truncate-name"><b>Size:</b> {size.join(', ')}</MDBCardTitle>
                    <MDBCardTitle className="truncate-name"><b>Màu sắc:</b>{tint.join(', ')}</MDBCardTitle>
                </MDBCardBody>
                <div className="card-footer">
                    <span className="text-danger">{formattedPrice}</span>
                    <button className="custom-button" onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart();
                    }}>Thêm</button>
                </div>
            </MDBCard>
        </MDBCol>
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
