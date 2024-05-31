import React from "react";
import 'font-awesome/css/font-awesome.css'
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
                                <p>
                                    <i className="fa fa-clock-o me-3" aria-hidden="true"></i>8AM - 10PM
                                </p>
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
                                <h6 className="text-uppercase fw-bold mb-4">
                                    Hỗ trợ & Dịch vụ
                                </h6>
                                <p>
                                    <a href="#" className="text-reset">Giới thiệu</a>
                                </p>
                                <p>
                                    <a href="#" className="text-reset">Hướng dẫn</a>
                                </p>
                                <p>
                                    <a href="#" className="text-reset">Chính sách</a>
                                </p>
                                <p>
                                    <a href="#" className="text-reset">Giao nhận & Thanh toán</a>
                                </p>
                            </div>
                            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">Liên hệ</h6>
                                <p><i className="fa fa-location-arrow me-3"></i> 192/2 Nguyễn Thái Bình, Phường 12,Q.Tân Bình, TP.HCM </p>
                                <p><i className="fa fa-envelope me-3"></i>shopShoes@gmail.com</p>
                                <p><i className="fa fa-phone me-3" aria-hidden="true"></i> 0982.997.698</p>
                                <p><i className="fa fa-print me-3"></i> 0981.997.699</p>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="text-center p-4">
                    © 2024 Copyright:<a className="text-reset fw-bold" href="">ShopShoes</a>
                </div>
            </footer>
        </div>
    );
}
export default Footers;