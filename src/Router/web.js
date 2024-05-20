import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import ProductList from "../component/ProductList";
import ProductDetail, {loadProduct} from "../component/ProductDetail";
import Error from "../component/Error";
import {News} from "../component/News";




export const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        errorElement: <Error/>,
        children: [
            {
                path: 'list-product',
                element: <ProductList/>
            }, {
                path: 'product/:id',
                element: <ProductDetail/>,
                loader: loadProduct,
            }
        ]
    },
]);