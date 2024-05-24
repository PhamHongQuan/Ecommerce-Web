import React, {useState, useEffect} from 'react';
import 'font-awesome/css/font-awesome.min.css';
import {Ripple, initMDB} from "mdb-ui-kit";
import {products} from "../../data/ProductData";

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
        return (
            <>
                <div className="col-md-3 d-flex mb-3 w-100 h-50 justify-content-center">
                    <div className="w-25 h-50 d-flex justify-content-center align-items-center">
                        <div className="text-center d-flex flex-column justify-content-center align-items-center">
                            <img
                                src="https://cdn-icons-png.freepik.com/256/9457/9457485.png?ga=GA1.1.2079026882.1697034920"
                                alt=""
                                className="mb-2"
                                height="50"
                                width="50"/>
                            <p className="fw-bold">Giao hàng miễn phí</p>
                            <p className="">Tất cả sản phẩm được giao hàng miễn phí SHIP hỏa tốc 2h nhận hàng trong nội thành</p>
                        </div>
                    </div>
                    <div className="w-25 h-50 ps-4 d-flex justify-content-center align-items-center">
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

                    <div className="w-25 h-50 d-flex justify-content-center align-items-center">
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
                </div>
                <div className="buttons d-flex justify-content-center mb-5 ">
                    <button className="btn btn-outline-dark me-2">All</button>
                    <button className="btn btn-outline-dark me-2">Bitis</button>
                    <button className="btn btn-outline-dark me-2">Adidas</button>
                    <button className="btn btn-outline-dark me-2">Puma</button>
                    <button className="btn btn-outline-dark me-2">Nike</button>
                </div>
                <div className="d-flex justify-content-center fw-bold fs-5"><p>SẢN PHẨM MỚI</p></div>
                {products.map((products) => {
                    return (
                        <>
                            <div className="col-md-3 pb-3">
                                <div className="card ms-3 h-100 w-80">
                                    <div className="bg-image hover-overlay w-100" data-mdb-ripple-init=""
                                         data-mdb-ripple-color="light">
                                        <img src={products.img} alt={products.title}
                                             className="img-fluid"/>
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title h-50">{products.name}</h5>
                                        <div className="btn-group shadow-0 mt-3 d-flex justify-content-center" role="group" aria-label="Basic example">
                                            <p className="btn btn-outline-black me-1"
                                                    data-mdb-color="dark" data-mdb-ripple-init="">{products.price} Đ
                                            </p>
                                            <a href=""><button type="button" className="btn btn-danger h-75"
                                                    data-mdb-color="dark" data-mdb-ripple-init=""><i className="fa fa-cart-plus me-2" aria-hidden="true"></i>Thêm
                                            </button></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                })}

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