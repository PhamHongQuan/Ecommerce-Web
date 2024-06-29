import React from "react";
import 'font-awesome/css/font-awesome.css'
import Navbar from "../Navigation/navbar";
import Footers from "../Footer/Footers";
import {flicker} from "../Styles/flicker.css"
const Introduce = () => {
    return(
        <><Navbar></Navbar>
            <div className="ms-lg-5 me-lg-5 mt-lg-2">
                <h1 className="fs-5 fw-bold">GIỚI THIỆU SHOP SHOES</h1>
                <p className="fs-5 fw-bold text-center">Shop Shoes - Sải bước đam mê!</p>
                <p>
                    Shop Shoes ra đời với tất cả niềm đam mê thương mại điện tử và giày dép của những người sáng lập.
                    Chúng tôi mong muốn mang đến cho khách hàng những đôi giày tốt nhất, giúp khách hàng luôn cảm thấy
                    tự tin vững bước
                    theo đuổi niềm đam mê của bản thân để thành công vượt trội.
                </p>
                <p>
                    Shop Shoes là website bán giày chính hãng từ các thương hiệu hàng đầu thế giới như: Nike, adidas,
                    Converse, New balance, Ascis,...
                    Tất cả các sản phẩm đều có nguồn gốc xuất sứ rõ ràng chính hãng.Shop Shoes nói không với hàng fake,
                    hàng gia công chất lượng kém.
                    Khi mua hàng tại Shop Shoes khách hàng sẽ luôn có được sản phẩm tốt nhất với mức giá cực kỳ hấp dẫn
                    mà khó có thể tìm được ở nơi khác.
                    Ngoài ra, Shop Shoes mong muốn mang đến cho khách hàng những trải nghiệm mua sắm tuyệt vời với sự tư
                    vấn nhiệt tình và chân thành nhất
                    từ đội ngũ bán hàng chuyên nghiệp, những phần quà bất ngờ và tình cảm sâu sắc của Shop Shoes gửi gắm
                    trên từng sản phẩm.
                    Shop Shoes sẽ nỗ lực hết sức để mỗi sản phẩm đến tay khách hàng là mang đến một niềm vui thú vị.
                </p>
                <p>
                    Hiện tại, Shop Shoes chủ yếu tập trung vào các sản phẩm giày thể thao và giày sneaker dành cho nam
                    và nữ của các thương hiệu uy tín trên thế giới.
                    Shop Shoes luôn tâm niềm rằng chất lượng sản phẩm là yếu tố quan trọng nhất quyết định sự thành công
                    của một thương hiệu và đó là giá trị
                    cốt lõi mà Shop Shoes sẽ mang tới cho khách hàng của mình.

                    Hãy cùng đồng hành với Shop Shoes "Sải bước đam mê" nhé!
                </p>
                <p>Trân trọng.</p>
                <p className="fw-bold fs-5">Shop Shoes-Giày chính hãng</p>
                <div className="">
                    <p><i className="fa fa-clock-o me-3" aria-hidden="true"></i>8AM - 10PM</p>
                    <p><i className="fa fa-location-arrow me-3"></i> 192/2 Nguyễn Thái Bình, Phường
                        12,Q.Tân Bình, TP.HCM </p>
                    <p><i className="fa fa-envelope me-3"></i>shopShoes@gmail.com</p>
                    <p><i className="fa fa-phone me-3" aria-hidden="true"></i> 0982.997.698</p>

                </div>


            </div>
            <hr/>
            <Footers></Footers></>

    );


}
export default Introduce;