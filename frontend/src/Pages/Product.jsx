import React, { useContext } from "react"
import "./CSS/Product.css";
import { ShopContext } from "../Context/ShopContex";
import { useParams } from 'react-router-dom'
import Breadcrum from "../Components/Breadcrums/Breadcrum";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";
import DescribtionBox from "../Components/DescribtionBox/DescribtionBox";



const Product = ()=> {
    const {all_product} = useContext(ShopContext);
    const { productId } = useParams();
    const product = all_product.find((e)=> e.id === Number(productId));

    return(
        <div className="">
            <Breadcrum product={product}/>
            <ProductDisplay product={product}/>
            <DescribtionBox/>
        </div>
    )
}; 


export default Product;