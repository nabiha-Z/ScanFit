import React, { useState, useEffect } from 'react';
import { latestProducts, favourite, addCart } from '../../../api';
import 'antd/dist/antd.css';
import { message } from 'antd';
import { useHistory } from 'react-router';
import { Link, } from 'react-router-dom';
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";

import { FaHeart } from 'react-icons/fa';


export default function LatestProducts(props) {

    const routerHistory = useHistory();
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(async () => {
        await latestProducts()
            .then((response) => {
                if (response.data.message === true) {
                    setProducts(response.data.products)
                }
            })

    }, [])

    const onFav = async (item, e) => {
        e.preventDefault();
        console.log("onFav");
        if (Cookies.get("token") != undefined) {
            const token = Cookies.get("token");

            const user = jwt_decode(token);
            const user_id = user.id;
            console.log(user_id);

            await favourite({ item, user_id })

                .then(function (response) {
                    console.log("onFav= ", response.data)
                    if (response.data.message === true) {
                        message.success("Saved")
                    } else {
                        message.error("Already in saved products");
                    }
                })
                .catch(function (error) {

                });
        } else {
            message.error("You need to login first!");
        }
    }

    const showDetails = (item) => {

        var itemObj = {};
        var counts = Cookies.get('counts');
        var tempArr = [];
        const chars = counts.split(",");
        if (item.category === 'Shirts') {
            var temp = (parseInt(chars[0]) + 1).toString()
            chars[0] = temp
        }
        else if (item.category === 'jeans') {
            var temp = (parseInt(chars[1]) + 1).toString()
            chars[1] = temp
        }
        else if (item.category === 'Suits') {
            var temp = (parseInt(chars[2]) + 1).toString()
            chars[2] = temp
        }
        else if (item.category === 'Dress') {
            var temp = (parseInt(chars[3]) + 1).toString()
            chars[3] = temp
        }
        else if (item.category === 'Trousers') {
            var temp = (parseInt(chars[4]) + 1).toString()
            chars[4] = temp
        }
        else if (item.category === 'Dress Pants') {
            var temp = (parseInt(chars[5]) + 1).toString()
            chars[5] = temp
        }
        
        Cookies.set('counts', chars);
        props.setCheck(!props.check)
        console.log("product item: ", item.title);
        routerHistory.push({
            pathname: "/details",
            state: { product: item }
        });

    }

    return (
        <div className="container" style={{ padding: '20px' }}>
            <h2 className='heading'> LATEST  PRODUCTS </h2>
            <div className="row" style={{ flexWrap: 'wrap' }}>
                {products.map((item, key) => (

                    <div key={key} className="col-md-4 col-sm-8" style={{ justifyContent: 'center' }}>
                        <div className="listing">
                            <div className="listing-thumbnail">
                                <Link to="/listing-details-v1"><img src={item.picture} alt="listing" style={{ width: 300, height: 300 }} /></Link>

                                <div className="listing-controls">
                                    <Link to="#" onClick={(e) => onFav(item, e)} className="favorite"><FaHeart /></Link>
                                </div>
                            </div>

                            <div className="listing-body">

                                <h5 className="listing-title"> <Link to="/listing-details-v1" title={item.title}>{item.title}</Link> </h5>
                                <span style={{fontSize:14, color:'#7CC3C6', marginBottom:50, textTransform:'capitalize'}}>{item.main_category} {item.category}</span>
                                <span className="listing-price">{item.price} RS/-</span>
                                {/* <p className="listing-text">{item.description}</p> */}
                                <div className="listing-gallery-wrapper" style={{ justifyContent: 'flex-end', marginTop: 20 }}>

                                    <button onClick={() => showDetails(item)} className="btn-custom btn-sm secondary" style={{ marginRight: 10 }}>View Details</button>
                                    {/* <button onClick={() => addtocart(item)} className="btn-custom btn-sm primary">Add to Cart</button> */}
                                </div>
                            </div>
                        </div>
                    </div>

                ))}
            </div>
        </div>


    );
}

