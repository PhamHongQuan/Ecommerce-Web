import React from "react";
import 'react-alice-carousel/lib/alice-carousel.css';
import 'font-awesome/css/font-awesome.min.css';
import {mainCarouselData} from "./MainCaroselData";
import AliceCarousel from "react-alice-carousel";
import Homes from "../Home/Homes";
const slideshow = () =>{
    const items = mainCarouselData.map((item)=> <img className='cursor-pointer'
      role='presentation' src={item.image} alt="" style={{ width: '100%', height: '600px' }}/>)
    return (
        <><AliceCarousel
            items={items}
            disableButtonsControls
            autoPlay
            autoPlayInterval={1000}
            infinite/><Homes/></>
    );

}
export default  slideshow;

