import React from "react";
import 'font-awesome/css/font-awesome.css'
import Navbar from "../Navigation/navbar";
import Footers from "../Footer/Footers";
import {flicker} from "../Styles/flicker.css"
const Warranty = () => {
    return(
        <><Navbar></Navbar>
            <div className="ms-lg-5 me-lg-5 mt-lg-2">
                <h1 className="fs-5 fw-bold">CHÍNH SÁCH BẢO HÀNH, ĐỔI HÀNG</h1>
                <p className="fw-bold">I. Chính sách bảo hành sản phẩm</p>
                <p>Shop Shoes cam kết tất cả các sản phẩm là hàng chính hãng 100%!</p>
                <p>Trong quá trình sử dụng, nếu phát hiện sản phẩm có những vấn đề do lỗi của nhà sản xuất.
                    Thời gian bảo hành trong vòng 06 tháng kể từ ngày mua (chỉ bảo hành các lỗi như bong keo, sứt
                    chỉ).</p>
                <p>Lưu ý: Shop Shoes sẽ không bảo hành nếu quý khách tự ý thay đổi, sửa chữa và tác động vào sản phẩm
                    hoặc không làm theo phương pháp bảo quản, cách sử dụng dẫn đến sản phẩm bị hư hại.</p>
                <p className="fw-bold">II. Chính sách đổi hàng và hoàn tiền</p>
                <p>- Shop Shoes đổi hàng trong 30 ngày kể từ ngày Quý khách nhận hàng đối với sản phẩm chưa sử dụng còn
                    nguyên vẹn như lúc nhận hàng (nguyên hộp, tem, mác, hóa đơn, thẻ bảo hành,...).</p>
                <p>- Shop Shoes hoàn tiền 200% cho Quý khách nếu Quý khách phát hiện hàng giả, hàng nhái.</p>
                <p>Mọi thông tin về việc bảo hành, đổi hàng Quý khách vui lòng liên hệ với bộ phận chăm sóc khách hàng
                    của Shop Shoes</p>
                <div className="blink">
                    <p><i className="fa fa-phone me-3" aria-hidden="true"></i>Số điện thoại: 0982.997.698</p>
                    <p><i className="fa fa-envelope me-3"></i>Email: shopShoes@gmail.com</p>
                </div>

            </div>
            <hr/>
            <Footers></Footers></>

    );


}
export default Warranty;