import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router';
import {products} from "../../data/ProductData";
import Navbar from "../Navigation/navbar";
import Footers from "../Footer/Footers";

const ProductDetails = () => {

    const {id} = useParams();
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getProduct = async () => {
            setLoading(true);
            const response = await fetch(`https://fakestoreapi.com/products/${id}`);
            setProduct(await response.json());
            setLoading(false);

        }
        getProduct();
    }, [id]);


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
      return(
          <><Navbar></Navbar><>
              <div className="">
                  <img src={product.image} alt={product.title}
                       height="400px" width="400px"
                  className="ms-3 mt-2 border border-1 "/>
              </div>
              <div className="col-md-6">
                  <h4 className="text-uppercase text-black-50">{product.title}</h4>
              </div>


              






          </><Footers></Footers></>
      )
    }



    return (
        <>
            <div className="row justify-content-center">
                {loading ? <Loading/> : <ShowProducts/>}
            </div>

        </>
    );

}
export default ProductDetails;