import React, {useState, useEffect} from 'react';
import 'font-awesome/css/font-awesome.min.css';
import {Ripple, initMDB} from "mdb-ui-kit";
import {products} from "../../data/ProductData";
import {NavLink} from "react-router-dom";


initMDB({Ripple});
const Homes = () => {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState(data);
    const [loading, setLoading] = useState(false);
    let componentMounted = true;

    useEffect(() => {
        const getProduct = async () => {
            setLoading(true);
            const response = await fetch("https://fakestoreapi.com/products");
            if (componentMounted) {
                setData(await response.clone().json());
                setFilter(await response.json());
                setLoading(false);
                console.log(filter)
            }
            return () => {
                componentMounted = false;
            }
        }
        getProduct();
    }, []);

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
        // @ts-ignore
        return (
            <>
                <div className="col-md-3 d-flex flex-wrap mb-3 w-100 h-50 justify-content-center">
                    <div className="w-25 h-50 d-flex flex-wrap justify-content-center align-items-center">
                        <div className="text-center d-flex flex-column justify-content-center align-items-center">
                            <img
                                src="https://cdn-icons-png.freepik.com/256/9457/9457485.png?ga=GA1.1.2079026882.1697034920"
                                alt=""
                                className="mb-2"
                                height="50"
                                width="50"/>
                            <p className="fw-bold">Giao hàng toàn quốc</p>
                            <p className="">Miễn phí vận chuyển với các đơn hàng trị giá trên 1.000.000Đ</p>
                        </div>
                    </div>
                    <div className="w-25 h-50 ps-4 d-flex flex-wrap justify-content-center align-items-center">
                        <div className="text-center d-flex flex-column justify-content-center align-items-center">
                            <img
                                src="https://cdn-icons-png.freepik.com/256/1828/1828884.png?ga=GA1.2.2079026882.1697034920&semt=ais_hybrid"
                                alt=""
                                className="mb-2"
                                height="50"
                                width="50"/>
                            <p className="fw-bold">Bảo hành sản phẩm 6 tháng</p>
                            <p className="">Dịch vụ chăm sóc khách hàng tận tâm chu đáo nhiệt tình </p>
                        </div>
                    </div>

                    <div className="w-25 h-50 d-flex flex-wrap justify-content-center align-items-center">
                        <div className="text-center d-flex flex-column justify-content-center align-items-center">
                            <img
                                src="https://cdn-icons-png.freepik.com/256/3712/3712308.png?ga=GA1.1.2079026882.1697034920&semt=ais_hybrid"
                                alt=""
                                className="mb-2"
                                height="50"
                                width="50"/>
                            <p className="fw-bold">Cam kết chính hãng</p>
                            <p className="ps-4 pe-4">Cam kết sản phẩm chính hãng từ Châu Âu, Châu Mỹ...</p>
                        </div>
                    </div>

                    <div className="w-25 h-50 d-flex flex-wrap justify-content-center align-items-center">
                        <div className="text-center d-flex flex-column justify-content-center align-items-center">
                            <img
                                src="https://cdn-icons-png.freepik.com/256/9198/9198368.png?ga=GA1.1.2079026882.1697034920&semt=ais_hybrid"
                                alt=""
                                className="mb-2"
                                height="50"
                                width="50"/>
                            <p className="fw-bold">Quà tặng hấp dẫn</p>
                            <p className="ps-4 pe-4">Chương trình khuyến mãi cực lớn và hấp dẫn hàng tháng</p>
                        </div>
                    </div>
                </div>
                <div className="buttons d-flex flex-wrap justify-content-center mb-5 h-50 col-12 col-md-6 mb-2">
                    <button className="btn btn-outline-dark me-2 mb-2">All</button>
                    <button className="btn btn-outline-dark me-2 mb-2">Bitis</button>
                    <button className="btn btn-outline-dark me-2 mb-2">Adidas</button>
                    <button className="btn btn-outline-dark me-2 mb-2">Puma</button>
                    <button className="btn btn-outline-dark me-2 mb-2">Nike</button>
                </div>

                <div className="d-flex justify-content-center fw-bold fs-5"><p>SẢN PHẨM MỚI</p></div>
                {products.map((products) => {
                    return (
                        <>
                            <div className="col-3 col-6 col-sm-6 col-lg-3 pb-lg-2">
                                <div className="card ms-3 h-100 border">
                                    <div className="bg-image hover-overlay" data-mdb-ripple-init=""
                                         data-mdb-ripple-color="light">
                                        <NavLink to={`/product/${products.id}`}>
                                            <img src={products.img} alt={products.title}
                                                 className="img-fluid w-100"/>
                                        </NavLink>
                                    </div>
                                    <div className="card-body text-center">
                                        <h5 className=" fs-6 h-50">{products.name}</h5>
                                        <div className="d-flex justify-content-center">
                                            <div className="btn-group shadow-0 mt-3 " role="group" aria-label="Basic example">
                                                <p className="btn btn-outline-black me-1"
                                                   data-mdb-color="dark" data-mdb-ripple-init="">{products.price} Đ
                                                </p>
                                                <NavLink to = {`/products/${products.id}`}>
                                                    <button type="button" className="btn btn-danger"
                                                            data-mdb-color="dark" data-mdb-ripple-init=""><i
                                                        className="fa fa-cart-plus me-2" aria-hidden="true"></i>Thêm
                                                    </button>
                                                </NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                })}
                <div className="w-100 mt-5 mb-5">
                    <div className="text-center">
                        <p className="fs-4 fw-bold">Tin mới nhất</p>
                        <p>Nơi cập nhật những xu hướng thời trang mới nhất cho bạn</p>
                    </div>
                    <div className="d-flex">
                        <div className="w-100 h-100 d-flex">
                            <div className="ms-4">
                                <p className="fs-5 fw-bold">Bảng đo size giày</p>
                                <div className="d-flex w-50">
                                    <img
                                        src="https://giaythainguyen.com/wp-content/uploads/2020/09/bang-size-giay-us-vn-nu.jpg"
                                        alt="bangsizegiay"
                                        className="w-100"/>
                                    <img
                                        src="https://file.hstatic.net/1000230642/file/2_3_3afaf5fc5f63479bab89817e73cf1fba.jpg"
                                        alt="bangsizegiay"
                                        className="w-100"/>
                                </div>
                                <p className="fw-bold fs-4">Lưu ý</p>
                                <p>Chiều dài thực của bàn chân (Centimet).</p>
                                <p>– Thời gian tốt nhất để đo cỡ giày của bạn là vào lúc cuối ngày, khi đôi chân của bạn
                                    được thư giãn hoàn toàn.</p>
                                <p>– Nếu có sai số giữa hai bàn chân, bạn hãy chọn đôi giày có cỡ bằng với chân lớn hơn
                                    của bạn.</p>
                            </div>
                        </div>
                        <div className="">
                            <div className="w-100 ms-4">
                                <img src="https://donghohungthinh.com/upload/upload/Sieu-giam-gia-30-phan-tram-700.jpg"
                                     className="w-75 h-50" alt="Sunset Over the Sea"/><p className="fw-bold">Hóa đơn
                                trên 1.000.000 giảm 30%</p>
                            </div>
                            <div className="w-100 ms-4 mt-2">
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeUtzCPN4QGnYIJpiaTOr68-6DIMWpijU4bg&s"
                                    className="w-75 h-50" alt="Sunset Over the Sea"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="multi-carousel w-75 mb-5" data-mdb-multi-carousel-init>
                    <div className="text-center">
                        <p className="fs-4 fw-bold">Thương hiệu nổi tiếng</p>
                        <p>Chúng tôi luôn đem đến khách hàng những thương hiệu hàng đầu thế
                            giới</p>
                    </div>
                    <div className="multi-carousel-inner d-flex border  border-dark h-75">
                        <div className="multi-carousel-item border-end border-2 w-50 d-flex justify-content-center">
                            <img
                                src="https://i.pinimg.com/736x/e9/47/14/e9471439ec9b636be81a7d43ad23e540.jpg"
                                alt="Table Full of Spices"
                                className="w-50"
                            />
                        </div>
                        <div className="multi-carousel-item border-end border-2 w-50 d-flex justify-content-center">
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4A-U2nKk1f0cP6LqPe8nJB3-PP9hxrr4RU-78_oaZaA&s"
                                alt="Winter Landscape"
                                className="w-50 m-2"
                            />
                        </div>
                        <div className="multi-carousel-item border-end border-2 w-50 d-flex justify-content-center">
                            <img
                                src="https://seeklogo.com/images/A/adidas-logo-107B082DA0-seeklogo.com.png"
                                alt="View of the City in the Mountains"
                                className="w-50"
                            />
                        </div>
                        <div className="multi-carousel-item border-2 w-50 d-flex justify-content-center">
                            <img
                                src="https://seeklogo.com/images/P/Puma-logo-65565A474D-seeklogo.com.png"
                                alt="Place Royale Bruxelles"
                                className="w-50 m-2"
                            />
                        </div>
                    </div>
                </div>

            </>
        );
    }


    return (
        <>
            <div className="row justify-content-center">
                {loading ? <Loading/> : <ShowProducts/>}
            </div>

        </>
    );
}
export default Homes;