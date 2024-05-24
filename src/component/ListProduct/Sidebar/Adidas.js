import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBBtn } from "mdb-react-ui-kit";
import { Link, useNavigate } from 'react-router-dom';
import {Button} from "react-bootstrap";
import "../../Styles/PaginationInProduct.css"


const ITEMS_PER_PAGE = 8;

export default function Nike() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetch("http://localhost:9000/products")
            .then((response) => response.json())
            .then((data) => {
                const nikeProducts = data.filter(product => product.type === "Adidas");
                setProducts(nikeProducts);
            });
    }, []);

    // Tính toán các sản phẩm cho trang hiện tại
    const indexOfLastProduct = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstProduct = indexOfLastProduct - ITEMS_PER_PAGE;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    // Xử lý thay đổi trang
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Tính tổng số trang
    const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

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
                            des={product.des}
                            price={product.price}
                            isBuying={product.isBuying}
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

const Product = ({ id, name, img, des, price }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Định dạng giá thành định dạng tiền tệ VND
    const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

    const handleAddToCart = () => {
        // dispatch(addCart({ id, name, img, des, price }));
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
