import React from "react";
import 'font-awesome/css/font-awesome.css'
import Navbar from "../Navigation/navbar";
import Footers from "../Footer/Footers";
import {flicker} from "../Styles/flicker.css"
const Rules = () => {
    return(
        <><Navbar></Navbar>
            <div className="ms-lg-5 me-lg-5 mt-lg-2">
                <h1 className="fs-5 fw-bold">ĐIỀU KHOẢN SỬ DỤNG</h1>
                <p>Chào mừng bạn đến mua hàng qua mạng tại SHOP SHOES
                    Sau khi truy cập vào website để tham khảo hoặc mua sắm,
                    Vui lòng xem kỹ các quy định và hợp tác với chúng tôi để xây dựng 1 website SHOP SHOES ngày càng thân thiện và phục vụ tốt những yêu cầu của chính bạn.
                    Ngoài ra, nếu có bất cứ câu hỏi nào về những thỏa thuận trên đây, vui lòng email cho chúng tôi qua địa chỉ: <span className="blink">shopShoes@gmail.com</span> </p>
                <p className="fw-bold">1. Tài khoản của bạn</p>
                <p>
                    Khi sử dụng dịch vụ SHOP SHOES, bạn sẽ cung cấp cho chúng tôi thông tin về địa chỉ email,
                    mật khẩu và họ tên để có được 1 tài khoản tại đây. Việc sử dụng và bảo mật thông tin tài khoản là trách nhiệm và quyền lợi của bạn
                    khi sử dụng SHOP SHOES. Ngoài ra, những thông tin khác trong tài khoản như tên tuổi, địa chỉ.... là những thông tin sẽ giúp SHOP SHOES
                    phục vụ bạn tốt nhất. Trong trường hợp thông tin do bạn cung cấp không đầy đủ hoặc sai dẫn đến việc không thể giao hàng cho bạn, chúng
                    tôi có quyền đình chỉ hoặc từ chối phục vụ, giao hàng mà không phải chịu bất cứ trách nhiệm nào đối với bạn. Khi có những thay đổi thông
                    tin của bạn, vui lòng cập nhật lại thông tin trong tài khoản tại SHOP SHOES. Bạn phải giữ kín mật khẩu và tài khoản, hoàn toàn chịu trách
                    nhiệm đối với tất cả các hoạt động diễn ra thông qua việc sử dụng mật khẩu hoặc tài khoản của mình.
                    Bạn nên đảm bảo thoát khỏi tài khoản tại SHOP SHOES sau mỗi lần sử dụng để bảo mật thông tin của mình
                </p>
                <p className="fw-bold">2. Quyền lợi bảo mật thông tin của bạn</p>
                <p>
                    Khi sử dụng dịch vụ tại website SHOP SHOES, bạn được đảm bảo rằng những thông tin cung cấp cho chúng tôi sẽ chỉ
                    được dùng để nâng cao chất lượng dịch vụ dành cho khách hàng của SHOP SHOES và sẽ không được chuyển giao cho 1 bên thứ ba nào
                    khác vì mục đích thương mại. Thông tin của bạn tại SHOP SHOES sẽ được chúng tôi bảo mật và chỉ trong trường hợp pháp luật yêu cầu,
                    chúng tôi sẽ buộc phải cung cấp những thông tin này cho các cơ quan pháp luật.
                </p>
                <p className="fw-bold">3. Trách nhiệm của bạn khi sử dụng dịch vụ của SHOP SHOES</p>
                <p>
                    Bạn tuyệt đối không được sử dụng bất kỳ công cụ, phương pháp nào để can thiệp, xâm nhập bất hợp pháp vào hệ thống hay làm thay đổi cấu trúc dữ liệu tại website SHOP SHOES.
                    Bạn không được có những hành động ( thực hiện, cổ vũ) việc can thiệp, xâm nhập dữ liệu của SHOP SHOES cũng như hệ thống máy chủ của chúng tôi.
                    Ngoài ra, xin vui lòng thông báo cho quản trị web của SHOP SHOES ngay khi bạn phát hiện ra lỗi hệ thống theo <span className="blink">số điện thoại  0982.997.698 hoặc email: shopShoes@gmail.com</span>
                </p>
                <p>
                    Bạn không được đưa ra những nhận xét, đánh giá có ý xúc phạm, quấy rối, làm phiền hoặc có bất cứ hành vi nào thiếu văn hóa đối
                    với người khác. Không nêu ra những nhận xét có tính chính trị ( tuyên truyền, chống phá, xuyên tạc chính quyền),
                    kỳ thị tôn giáo, giới tính, sắc tộc.... Tuyệt đối cấm mọi hành vi mạo nhận, cố ý tạo sự nhầm lẫn mình là một
                    khách hàng khác hoặc là thành viên Ban Quản Trị SHOP SHOES.
                </p>
                <p className="fw-bold">4. Trách nhiệm và quyền lợi của Myshoes.vn</p>
                <p>
                    Trong trường hợp có những phát sinh ngoài ý muốn hoặc trách nhiệm của mình, SHOP SHOES sẽ không chịu trách nhiệm về mọi tổn thất
                    phát sinh. Ngoài ra, chúng tôi không cho phép các tổ chức, cá nhân khác quảng bá sản phẩm tại website SHOP SHOES
                    mà chưa có sự đồng ý bằng văn bản từ SHOP SHOES. Các thỏa thuận và quy định trong.
                    Điều khoản sử dụng có thể thay đổi vào bất cứ lúc nào nhưng sẽ được SHOP SHOES thông báo cụ thể trên website SHOP SHOES.
                </p>

            </div>
            <hr/>
            <Footers></Footers></>

    );


}
export default Rules;