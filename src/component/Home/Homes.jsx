import React, {useState, useEffect} from 'react';
import 'font-awesome/css/font-awesome.min.css';
import {Ripple, initMDB} from "mdb-ui-kit";
import {products} from "../../data/ProductData";
import {NavLink, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {addCart} from "../../store/Action";
import Pagination from '../Navigation/Pagination';
import Sidebar from "../ListProduct/Sidebar/Sidebar"
import '../Styles/Sidebar.css';


initMDB({Ripple});
const Homes = () => {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState(data);
    const [loading, setLoading] = useState(false);
    let componentMounted = true;
    const dispatch = useDispatch();

    const handleAddToCart =({id, name, img, des,price}) =>{
        dispatch(addCart({id, name, img, des, price}));
    };
    const [buttonColors, setButtonColors] = useState({});
    useEffect(() => {
        // Lấy màu sắc từ localStorage khi component được render
        const storedColors = JSON.parse(localStorage.getItem('buttonColors')) || {};
        setButtonColors(storedColors);
    }, []);

    const [isAddedToCart, setIsAddedToCart] = useState(false);




    const changeButtonColor = (productId) => {
        if (buttonColors[productId]) {
            // Nếu nút đã được nhấn, hiển thị thông báo
            alert('Sản phẩm này đã có trong giỏ hàng bạn có muốn thêm vào không!');
        } else {
            // Nếu nút chưa được nhấn, thay đổi màu sắc và lưu vào localStorage
            const newColors = {
                ...buttonColors,
                [productId]: 'btn-primary' // Thay đổi màu sắc thành màu
            };
            setButtonColors(newColors);
            localStorage.setItem('buttonColors', JSON.stringify(newColors));
        }
    };
    const handleRemoveFromCart = (productId) => {
        // Logic để xóa sản phẩm khỏi giỏ hàng
        console.log('Xóa sản phẩm khỏi giỏ hàng', productId);
        alert('Xóa sản phẩm khỏi giỏ hàng');

        // Cập nhật lại trạng thái và localStorage khi sản phẩm bị xóa
        const newColors = { ...buttonColors };
        delete newColors[productId];
        setButtonColors(newColors);
        localStorage.setItem('buttonColors', JSON.stringify(newColors));
    };
    const toggleCartStatus = (productId) => {
        if (isAddedToCart) {
            handleRemoveFromCart(productId);
        } else {
            handleAddToCart(productId);
        }
        setIsAddedToCart(!isAddedToCart);
    };


    // useEffect(() => {
    //     const getProduct = async () => {
    //         setLoading(true);
    //         const response = await fetch("https://fakestoreapi.com/products");
    //         if (componentMounted) {
    //             setData(await response.clone().json());
    //             setFilter(await response.json());
    //             setLoading(false);
    //             console.log(filter)
    //         }
    //         return () => {
    //             componentMounted = false;
    //         }
    //     }
    //     getProduct();
    // }, []);

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
                {/*gioi thieu dich vu*/}
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
                {/*san pham*/}
                <div className="d-flex justify-content-center fw-bold fs-5"><p>SẢN PHẨM MỚI</p></div>
                <div className="d-flex">
                    <div className="d-none d-md-block">
                        <Sidebar/>
                    </div>
                    <Pagination></Pagination>
                </div>


                {/*</div>*/}
                <hr/>
                {/*tin moi nhat*/}
                <div className="w-100  mb-5">
                    <div className="text-center">
                        <p className="fs-4 fw-bold">Tin mới nhất</p>
                        <p>Nơi cập nhật những xu hướng thời trang mới nhất cho bạn</p>
                    </div>
                    <div className="container">
                        <div className="row">
                            {/*bang do size giay*/}
                            <div className="col-lg-8 col-md-12">
                                <div className="ms-lg-5">
                                    <p className="fs-5 fw-bold">Bảng đo size giày</p>
                                    <div className="row gx-3">
                                        <div className="col-6">
                                            <img
                                                src="https://giaythainguyen.com/wp-content/uploads/2020/09/bang-size-giay-us-vn-nu.jpg"
                                                alt="bangsizegiay"
                                                className="img-fluid"
                                            />
                                        </div>
                                        <div className="col-6">
                                            <img
                                                src="https://file.hstatic.net/1000230642/file/2_3_3afaf5fc5f63479bab89817e73cf1fba.jpg"
                                                alt="bangsizegiay"
                                                className="img-fluid"
                                            />
                                        </div>
                                    </div>
                                    <p className="fw-bold fs-4">Lưu ý</p>
                                    <p>Chiều dài thực của bàn chân (Centimet).</p>
                                    <p>– Thời gian tốt nhất để đo cỡ giày của bạn là vào lúc cuối ngày, khi đôi chân của
                                        bạn được thư giãn hoàn toàn.</p>
                                    <p>– Nếu có sai số giữa hai bàn chân, bạn hãy chọn đôi giày có cỡ bằng với chân lớn
                                        hơn của bạn.</p>
                                </div>
                            </div>
                            {/*khuyen mai*/}
                            <div className="col-lg-4 col-md-12">
                                <p className="ms-4 fs-4 fw-bold">Khuyến Mãi</p>
                                <div className="ms-lg-4 mt-4 mt-lg-0 row">
                                    <div className="col-6">
                                        <img
                                            src="https://stc.shopiness.vn/deal/2020/11/09/0/1/a/9/1604887588452_540.png"
                                            className="img-fluid h-50 w-100"
                                            alt="off 30%"
                                        />
                                        <p className="fw-bold">Giảm 50% khi mua 3 sản phẩm</p>
                                    </div>
                                    <div className="col-6">
                                        <img
                                            src="https://s3-ap-southeast-1.amazonaws.com/storage.adpia.vn/affiliate_document/multi/yes24-sieu-uu-dai-sale-giua-nam.jpg"
                                            className="img-fluid h-50 w-100"
                                            alt="sale giua nam"
                                        />
                                        <p className="fw-bold">Adidas sale giữa năm</p>
                                    </div>
                                </div>
                                <div className="ms-lg-4 mt-lg-0 row">
                                    <div className="col-6">
                                        <img
                                            src="https://media.loveitopcdn.com/22819/flash-sales-hanghotdeal-thoi-trang-adidas.jpg"
                                            className="img-fluid w-100 h-50"
                                            alt="off 30%"
                                        />
                                        <p className="fw-bold">Bùng nổ ưu đãi</p>
                                    </div>
                                    <div className="col-6">
                                        <img
                                            src="https://cdn.dribbble.com/userupload/9273259/file/original-49bcf06009aff90422cbb46fbe804bd2.png?resize=400x0"
                                            className="img-fluid w-100 h-50"
                                            alt="sale giua nam"
                                        />
                                        <p className="fw-bold">Sale 50% cuối tháng</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*Thương hiệu nổi tiếng*/}
                <div className="multi-carousel w-75 mb-5" data-mdb-multi-carousel-init>
                    <div className="text-center">
                        <p className="fs-4 fw-bold">Thương hiệu nổi tiếng</p>
                        <p>Chúng tôi luôn đem đến khách hàng những thương hiệu hàng đầu thế
                            giới</p>
                    </div>
                    <div className="multi-carousel-inner d-flex border bg-white h-50">
                        <div
                            className="multi-carousel-item border-end border-2 w-50 d-flex justify-content-center align-items-center">
                            <img
                                src="https://i.pinimg.com/736x/e9/47/14/e9471439ec9b636be81a7d43ad23e540.jpg"
                                alt="Table Full of Spices"
                                className="w-50 h-50  img-fluid"
                            />
                        </div>
                        <div
                            className="multi-carousel-item border-end border-2 w-50 d-flex justify-content-center align-items-center">
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4A-U2nKk1f0cP6LqPe8nJB3-PP9hxrr4RU-78_oaZaA&s"
                                alt="Winter Landscape"
                                className="w-50 h-50 img-fluid m-2"
                            />
                        </div>
                        <div
                            className="multi-carousel-item border-end border-2 w-50 d-flex justify-content-center align-items-center">
                            <img
                                src="https://seeklogo.com/images/A/adidas-logo-107B082DA0-seeklogo.com.png"
                                alt="View of the City in the Mountains"
                                className="w-50 h-50 img-fluid"
                            />
                        </div>
                        <div
                            className="multi-carousel-item border-2 w-50 d-flex justify-content-center align-items-center">
                            <img
                                src="https://seeklogo.com/images/P/Puma-logo-65565A474D-seeklogo.com.png"
                                alt="Place Royale Bruxelles"
                                className="w-50 h-50 img-fluid m-2"
                            />
                        </div>
                    </div>
                </div>
                <hr/>
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