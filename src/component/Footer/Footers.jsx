import React from "react";
import 'font-awesome/css/font-awesome.css'
import {Link} from "react-router-dom";
const Footers =() =>{
    return(
        <div className="">
            <footer className="text-center text-lg-start bg-body-tertiary text-muted ">
                <section className="">
                    <div className="container text-center text-md-start mt-2 pt-3">
                        <div className="row mt-3">
                            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold fs-4 ">
                                    <i className="fa fa-gem me-3"></i>Shop Shoes
                                </h6>
                                <div className="">
                                    <p><i className="fa fa-clock-o me-3" aria-hidden="true"></i>8AM - 10PM</p>
                                    <p><i className="fa fa-location-arrow me-3"></i> 192/2 Nguyễn Thái Bình, Phường
                                        12,Q.Tân Bình, TP.HCM </p>
                                    <p><i className="fa fa-envelope me-3"></i>shopShoes@gmail.com</p>
                                    <p><i className="fa fa-phone me-3" aria-hidden="true"></i> 0982.997.698</p>

                                </div>
                            </div>
                            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">
                                    Danh mục
                                </h6>
                                <p>
                                    <a href="#" className="text-reset">Bitis</a>
                                </p>
                                <p>
                                    <a href="#" className="text-reset">Adidas</a>
                                </p>
                                <p>
                                <a href="#" className="text-reset">Puma</a>
                                </p>
                                <p>
                                    <a href="#" className="text-reset">Nike</a>
                                </p>
                            </div>

                            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">VỀ CHÚNG TÔI</h6>
                                <p>
                                    <a href="#" className="text-reset">Giới thiệu</a>
                                </p>
                                <p>
                                    <a href="#" className="text-reset">Hướng dẫn</a>
                                </p>
                                <p>
                                    <a className="text-reset">
                                    <Link to="/security">Chính sách bảo mật </Link>
                                    </a>
                                </p>
                                <p>
                                    <a href="#" className="text-reset">Giao nhận & Thanh toán</a>
                                </p>
                            </div>
                            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">Khách Hàng</h6>
                                <p>Hướng dẫn mua hàng </p>
                                <p> <Link to="/warranty">Chính sách đổi trả</Link></p>
                                <p> <Link to="/warranty">Chính sách bảo hành</Link></p>
                                <p>Chương trình khuyến mãi</p>
                            </div>
                        </div>
                    </div>
                </section>
                <hr/>
                <div className="text-center pb-lg-2">
                    © 2024 Copyright:<a className="text-reset fw-bold" href="">ShopShoes</a>
                </div>
            </footer>
        </div>
    );
}
export default Footers;