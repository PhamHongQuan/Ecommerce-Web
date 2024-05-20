import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addCart, delCart, loadProduct} from "../store/Action";

export default function ProductList(data) {
    const products = useSelector((state)=>{
        return state.products;
    });
    const cart = useSelector(state => state.cart)

    return (<div>
            {/*<p>Số sản phẩm trong giở hàng: {cart.length}</p>*/}
            <div className="row">
                {products.map(product => (
                    <Product
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        img={product.img}
                        des={product.des}
                        price={product.price}
                        isBuying={ product.isBuying}
                    ></Product>
                ))}
            </div>
        </div>
    );
}

function Product(data) {
    const [product, setProduct] = useState(data);

    // const dispatch = useDispatch();

    // function add() {
    //     setProduct({...product, isBuying: (product.isBuying === undefined || product.isBuying === false)})
    //     if (product.isBuying !== false) {
    //         dispatch(delCart(product));
    //         console.log("DEL");
    //     } else {
    //         dispatch(addCart(product));
    //         console.log("ADD");
    //     }
    // }

    return (
        <div className="col col-xs-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card p-2">
                <img className="card-img-top" src={product.img}
                     alt="Card image cap"/>
                <div className="card-body">
                    <h6 className="card-title"><a>{product.name}</a></h6>
                    {/*<p className="card-text">{product.des}</p>*/}
                    <a className="text-danger p-2">{product.price}</a><br/>
                    <button
                        // onClick={add}
                        className={"btn p-2" + (product.isBuying===false?" btn-success ": " btn-danger ")}>{(product.isBuying===false?"THÊM":"LOẠI BỎ")}</button>
                    {/*<Link className="btn btn-primary p-2" to={`/product/${product.id}`}>XEM</Link>*/}
                </div>
            </div>
        </div>
    );
}
