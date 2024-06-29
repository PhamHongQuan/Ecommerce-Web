import React from "react";
import 'font-awesome/css/font-awesome.css'
import Navbar from "../Navigation/navbar";
import Footers from "../Footer/Footers";
import {flicker} from "../Styles/flicker.css"
const Security = () => {
    return(
        <><Navbar></Navbar>
            <div className="ms-lg-5 me-lg-5 mt-lg-2">
                <h1 className="fs-5 fw-bold">CHÍNH SÁCH BẢO MẬT</h1>
                <p>Bảo mật thông tin khách hàng là một trong những ưu tiên nhằm tạo điều kiện mua hàng trực tuyến tốt nhất cho bạn tại SHOP SHOES
                    Chúng tôi hiểu sử dụng hợp lý và bảo mật thông tin sẽ thể hiện sự quan tâm của SHOP SHOES dành cho bạn. Vì thế,
                    SHOP SHOES cam kết việc sử dụng thông tin trên sẽ chỉ nhằm nâng cao chất lượng dịch vụ khách hàng và tạo môi trường mua sắm trực tuyến an tòan, tiện lợi tại SHOP SHOES
                    Cụ thể, thông tin của bạn chỉ dùng để:</p>
                <div>
                    <p>1. Cung cấp một số tiện ích, nâng cao chất lượng dịch vụ hỗ trợ khách hàng</p>
                    <p>2. Giải quyết các vấn đề, tranh chấp phát sinh liên quan đến việc sử dụng website SHOP SHOES</p>
                    <p>3. Ngăn chặn những hoạt động vi phạm pháp luật Việt Nam</p>
                    <p>4. SHOP SHOES cam đoan sẽ không bán, chia sẻ dẫn đến làm lộ thông tin cá nhân của bạn vì mục đích thương mại vi phạm cam kết của chúng tôi ghi trong chính sách bảo mật này.
                        Tất cả thông tin giao dịch giữa bạn và SHOP SHOES sẽ được bảo mật qua phần mềm mã hóa tất cả thông tin bạn nhập vào.</p>
                    <p>5. Tuy nhiên, bạn không nên trao đổi những thông tin thanh toán, giao nhận của mình cho 1 bên thứ 3 nào khác để tránh rò rỉ thông tin.
                        Khi sử dụng chung máy tính với nhiều người, vui lòng thoát khỏi tài khoản mỗi khi không sử dụng dịch vụ của SHOP SHOES nữa để tự bảo vệ thông tin về mật khẩu truy cập của mình.</p>
                    <p>6. SHOP SHOES hiểu rằng quyền lợi của bạn trong việc bảo vệ thông tin cá nhân cũng chính là trách
                        nhiệm của chúng tôi nên trong bất kỳ trường hợp có thắc mắc,
                        góp ý nào liên quan đến chính sách bảo mật của SHOP SHOES, vui lòng liên hệ qua <br/>
                        <div className="blink">
                            <p><i className="fa fa-phone me-3" aria-hidden="true"></i>Số điện thoại: 0982.997.698</p>
                            <p><i className="fa fa-envelope me-3"></i>Email: shopShoes@gmail.com</p>
                        </div>
                        
                    </p>
                </div>

            </div>
            <hr/>
            <Footers></Footers></>

    );


}
export default Security;