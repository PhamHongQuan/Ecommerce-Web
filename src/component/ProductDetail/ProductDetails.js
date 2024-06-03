import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router';
import {products} from "../../data/ProductData";
import Navbar from "../Navigation/navbar";
import Footers from "../Footer/Footers";
import { FaTimes } from 'react-icons/fa';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { MDBPopover, MDBPopoverBody, MDBPopoverHeader, MDBBtn } from 'mdb-react-ui-kit';
import {NavLink} from "react-router-dom";
import {Carousel} from "react-bootstrap";



const ProductDetails = () => {

    const {id} = useParams();
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const getProduct = async () => {
            setLoading(true);
            const response = await fetch(`http://localhost:9000/products/${id}`);
            setProduct(await response.json());
            setLoading(false);

        }
        getProduct();
    }, [id]);


    const Loading = () => {
        return (

            <>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </>
        );
    }

    const ShowProducts = () => {
        const [showPopover, setShowPopover] = useState(false);
        const formattedPrice = new Intl.NumberFormat('vi-VN',{style:'currency',currency:'VND'}).format(product.price);
        // const displayedProducts = products.slice(0, 8);
        const shuffleArray = (array) => {
            let shuffledArray = array.slice(); // Tạo một bản sao của mảng gốc
            for (let i = shuffledArray.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
            }
            return shuffledArray;
        };
        const randomProducts = shuffleArray(products).slice(0, 8);

        const [selectedImage, setSelectedImage] = useState(product.img);

        const handleImageClick = (image) => {
            setSelectedImage(image);
        };
        const [quantity, setQuantity] = useState(1);

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


        return(
          <><Navbar></Navbar><>
              <div className="col-md-4 mt-5">
                  <div className="d-flex justify-content-center">
                      <img src={selectedImage} alt={product.name}
                           height="400px" width="400px"
                           className="border border-1"/>
                  </div>

                  <div className="mt-2 d-flex justify-content-center">
                      {Array.isArray(product.additionalImages) && product.additionalImages.map((image, index) => (
                          <img key={index} src={image} alt={`${product.name} ${index + 1}`}
                               style={{width: '100px', margin: '5px', border: '1px solid black'}}
                               onClick={() => handleImageClick(image)}/>
                      ))}
                  </div>
                  
              </div>
              <div className="col-md-7 ms-5 mt-5">
                  <h1 className="fw-bold">{product.name}</h1>
                  {/*<p className="lead">*/}
                  {/*    Rating{product.rating && product.rating.rate}*/}
                  {/*    <i className="fa fa-star"></i>*/}
                  {/*</p>*/}
                  <div>
                      <ul className="rating d-flex list-unstyled " data-mdb-rating-init>
                          <li><i className="fa fa-star fa-sm text-warning me-2" title="Bad"></i></li>
                          <li><i className="fa fa-star fa-sm text-warning me-2" title="Poor"></i></li>
                          <li><i className="fa fa-star fa-sm text-warning me-2" title="OK"></i></li>
                          <li><i className="fa fa-star fa-sm text-warning me-2" title="Good"></i></li>
                          {/*<li><i className="fa fa-star fa-sm text-warning" title="Excellent"></i></li>*/}
                      </ul>
                  </div>
                  <h5 className="fw-bold my-4 text-danger">
                      Giá bán: {formattedPrice}
                  </h5>
                  <div className="">
                      <div className="d-flex">
                          <p className="fw-bold mt-2">Màu Sắc</p>
                          <div className="ms-4" role="group" aria-label="">
                              {Array.isArray(product.tint) && product.tint.map((tint, index) => (
                                  <button key={index} type="button"
                                          className="btn btn-outline-black me-2">{tint}</button>
                              ))}
                          </div>
                      </div>

                      <div className="d-flex">
                          <p className="fw-bold mt-2">Chọn Size</p>
                          <div className="ms-3" role="group" aria-label="First group">
                              {Array.isArray(product.size) && product.size.map((size, index) => (
                                  <button key={index} type="button"
                                          className="btn btn-outline-black me-2 mb-2">{size}</button>
                              ))}
                          </div>
                      </div>
                      <div className="d-flex">
                          <div className="quantity buttons_added">
                              <input type="button" value="-" className="minus button is-form" onClick={handleDecrement}/>
                              <input type="number" id="quantity" className="input-text qty text" step="1"
                                     min="1" max="9999" name="quantity"  value={quantity}  title="SL" size="4"
                                     inputMode="numeric"  onChange={handleChange} />
                              <input type="button" value="+" className="plus button is-form"  onClick={handleIncrement} />
                          </div>
                          <button type="submit" className="ms-4 border bg-danger rounded-2"><i
                              className="fa fa-cart-plus me-2"></i>Thêm vào giỏ hàng
                          </button>
                      </div>
                      <div style={{marginTop:"20px", position: 'relative', display: 'inline-block'}}>
                          <MDBPopoverBody
                              onClick={() => setShowPopover(!showPopover)}
                          ><i className="fa fa-bookmark-o me-2"></i>Hướng dẫn chọn size giày
                              {showPopover && (
                                  <div style={{zIndex: 1, marginTop: '-10px', width:"600px"}}>
                                          <MDBPopoverBody className="">
                                              <FaTimes
                                                  style={{float: 'right', cursor: 'pointer'}}
                                                  onClick={() => setShowPopover(false)}
                                              />
                                              <img className="img-fluid" src="https://cdn.giayhongthanh.com.vn/public/uploads/site/10179/wordpress/2022/05/7a8baa45f531356f6c20-787x400.jpg" alt=""
                                                   />
                                          </MDBPopoverBody>
                                  </div>
                              )}
                          </MDBPopoverBody>
                      </div>

                      <div>
                          <span><i className="fa fa-phone me-1"></i>  Hotline: 0973 711 868</span><br/>
                          <span><i className="fa fa-undo me-2"></i>Đổi hàng 30 ngày, bảo hành 6 tháng</span><br/>
                          <span><i className="fa fa-truck me-2"></i>Miễn phí giao hàng với đơn từ 1.000.000Đ</span>
                      </div>
                      <hr/>
                      <div className="">
                          <p className="fw-bold fs-5 mt-2">Thương hiệu: {product.type} </p>
                      </div>

                      <div className="">
                          <a style={{color: "#3b5998", href: "#", role: "button", marginRight:"10px"}}>
                              <i className="fa fa-facebook-f fa-lg"></i>
                          </a>
                          <a style={{color: "#55acee", href:"#", role:"button", marginRight:"10px"}}>
                              <i className="fa fa-twitter fa-lg"></i>
                          </a>
                          <a style={{color: "#dd4b39", href:"#", role:"button", marginRight:"10px"}}>
                              <i className="fa fa-google fa-lg"></i>
                          </a>
                          <a style={{color:"#ac2bac", href:"#", role:"button"}}>
                              <i className="fa fa-instagram fa-lg"></i>
                          </a>
                      </div>
                  </div>
              </div>
              <hr/>
              <div className="ms-5 fs-5 ">
                  <p className="fw-bold">Thông tin</p>
                  <div className="d-flex">
                      <p className="fw-bold mt-2">Màu Sắc: </p>
                          {Array.isArray(product.tint) && product.tint.map((tint, index) => (
                              <p className="mt-2 ms-3 pe-2" key={index}>{tint}</p>
                          ))}
                  </div>

                  <div className="d-flex">
                      <p className="fw-bold">Size:</p>
                      {Array.isArray(product.size) && product.size.map((size, index) => (
                          <p className="ms-3 pe-2" key={index}>{size}</p>
                      ))}
                  </div>
                  <div className="">
                      <p className="fw-bold">Mô tả</p>
                      <p className="ms-3 me-5">{product.description}</p>
                  </div>
              </div>
              <hr/>
              <div className="ms-5 mb-5">
                  <p className="fw-bold fs-5">Sản phẩm tương tự</p>
                  <div className="container">
                      <div className="row">
                          {randomProducts.map((product) => (
                              <div className="col-3 col-6 col-sm-6 col-lg-3 pb-lg-2 mb-3" key={product.id}>
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
                                          <h5 className=" fs-6 h-50">{product.name}</h5>
                                          <div className="d-flex justify-content-center">
                                              <div className="btn-group shadow-0 mt-3 flex-column flex-md-row"
                                                   role="group"
                                                   aria-label="Basic example">
                                                  <p className="btn btn-outline-black  me-md-1 mb-2 mb-md-0"
                                                     data-mdb-color="dark" data-mdb-ripple-init="">{formattedPrice}
                                                  </p>
                                                  <NavLink to="cart">
                                                      <button type="button"
                                                              className="btn btn-danger d-flex align-items-center mb-2 mb-md-0"
                                                              data-mdb-color="dark" data-mdb-ripple-init=""><i
                                                          className="fa fa-cart-plus me-2" aria-hidden="true"></i>Thêm
                                                      </button>
                                                  </NavLink>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>
              </div>
              <hr/>
          </>

              <Footers></Footers></>
        )
    }


    return (
        <>
            <div className="row justify-content-center">
                {loading ? <Loading/> : <ShowProducts/>}
            </div>

        </>
    );

}
export default ProductDetails;