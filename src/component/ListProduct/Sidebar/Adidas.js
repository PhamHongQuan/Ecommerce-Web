import React, { useEffect, useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText } from 'mdb-react-ui-kit';
import { useOutletContext } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import '../../Styles/PaginationInProduct.css';

const ITEMS_PER_PAGE = 8;

const Adidas = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [filterValues] = useOutletContext();

    useEffect(() => {
        fetch('http://localhost:9000/products')
            .then(response => response.json())
            .then(data => {
                const adidasProducts = data.filter(product => product.type === 'Adidas');
                setProducts(adidasProducts);
            });
    }, []);

    const applyFilters = (products) => {
        return products.filter(product => {
            // Kiểm tra giới tính
            if (filterValues.adidas.price === 'above' && product.price <= 2000000) return false;
            if (filterValues.adidas.price === 'below' && product.price > 2000000) return false;

            // Lọc sản phẩm theo giới tính
            if (filterValues.adidas.gender && filterValues.adidas.gender !== 'all' && product.gender !== filterValues.adidas.gender) {
                return false;
            }
            // Lọc sản phẩm theo kích thước
            if (filterValues.adidas.size && filterValues.adidas.size !== 'all') {
                const { size } = product;
                if (filterValues.adidas.size === 'small' && (size < 35 || size > 37)) {
                    return false;
                }
                if (filterValues.adidas.size === 'medium' && (size < 38 || size > 41)) {
                    return false;
                }
                if (filterValues.adidas.size === 'large' && (size < 42 || size > 45)) {
                    return false;
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
                    {currentProducts.map(product => (
                        <Product
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            img={product.img}
                            price={product.price}
                            gender={product.gender}
                            size={product.size}
                        />
                    ))}
                </MDBRow>
            </MDBRow>
            <br />
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

const Product = ({ id, name, img, des, price, size, gender }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
                    <MDBCardTitle className="truncate-name"><b>{name}</b></MDBCardTitle>
                    <MDBCardTitle className="truncate-name">Size: {size}</MDBCardTitle>
                    <MDBCardTitle className="truncate-name">Giới tính:{gender}</MDBCardTitle>
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

export default Adidas;
