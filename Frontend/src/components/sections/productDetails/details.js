import React, { Component, Fragment, useEffect, useState } from 'react';
import { Link, } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import { OverlayTrigger, Tooltip, Dropdown, NavLink, Button } from 'react-bootstrap';
import Sidebar from '../../layouts/Shopsidebar';
import Bounce from "react-activity/dist/Bounce";
import "react-activity/dist/Bounce.css";
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";
import 'antd/dist/antd.css';
import { message } from 'antd';
import ProductSlider from './slider';
import { smartAdvisor, addCart, favourite } from '../../../api/index';


export default function Details() {

    let routerHistory = useHistory();
    const location = useLocation();
    const [currentPage, setcurrentPage] = useState(1);
    const [productsPerPage, setproductsPerPage] = useState(6);
    const [loading, setloading] = useState(false);

    console.log("location: ", location.state.product.category)
    const products = location.state.product;
    return (
        // products.map((item, i) => {
        //     return (<div key={i} className="col-md-6 col-sm-8" style={{ justifyContent: 'center' }}>
        //         <div className="listing">
        //             <div className="listing-thumbnail">
        //                 <Link to="/listing-details-v1"><img src={item.picture} alt="listing" style={{ width: 280, height: 320 }} /></Link>

        //                 <div className="listing-controls">
        //                     <Link to="#" className="favorite"><i className="far fa-heart" onClick={(e) => onFav(item, e)} /></Link>
        //                     <Link to="#" className="compare"><i className="fas fa-camera" /></Link>
        //                 </div>
        //             </div>
        //             <div className="listing-body">
        //                 <h5 className="listing-title"> <Link to="#" title={item.title}>{item.title}</Link> </h5>
        //                 <p className="listing-text">{item.location}</p>
        //                 <span className="listing-price">{item.price} RS/-</span>
        //                 <p className="listing-text">{item.description}</p>
        //                 <div className="listing-gallery-wrapper" style={{ justifyContent: 'flex-end', marginTop: 20 }}>

        //                     <button onClick={() => showDetails(item)} className="btn-custom btn-sm secondary" style={{ marginRight: 10 }}>View Details</button>
        //                     <button onClick={() => addtocart(item)} className="btn-custom btn-sm primary">Add to Cart</button>
        //                     {/* <OverlayTrigger overlay={gallerytip}>
        //                 <Link to="#" className="listing-gallery"> <i className="fas fa-camera" /> </Link>
        //             </OverlayTrigger> */}
        //                 </div>
        //             </div>
        //         </div>
        //     </div>

        //     )

        // })
        <div>
            <p>{products.category}</p>
            <ProductSlider category={products.category} color={products.color} mainCategory={products.main_category}/>
        </div>
    )
}