import React from 'react';
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './slider.css';
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";
import { useHistory } from 'react-router';
import 'antd/dist/antd.css';
import { message } from 'antd';
import { favourite } from '../../../api/index';


function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "#D5D9DB", borderRadius: '10px', }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "#D5D9DB", borderRadius: '10px', zIndex: 1 }}
            onClick={onClick}
        />
    );
}

export default function RecommendationSlider(props) {

    let routerHistory = useHistory();

    const showDetails = (item) => {

        console.log("product item: ", item.title);
        routerHistory.push({
            pathname: "/details",
            state: { product: item }
        });

    }


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
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ],
        autoplaySpeed: 3000,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };
    return (
        <div className="container" style={{ padding: '20px' }}>
            <h2> Recommendations For You </h2>
            <Slider {...settings}>
                {props.products.map((item, key) => (
                    <>
                        <div className="listing" style={{width:'90%', heigth:'30%'}}>
                            <div className="listing-thumbnail">
                                <button onClick={() => showDetails(item)} className="image-container"><img src={item.picture} alt="product" style={{ width: 160, height: 200 }} /></button>

                                <div className="listing-controls">
                                    <Link to="#" className="favorite"><i className="far fa-heart" onClick={(e) => onFav(item, e)} /></Link>
                                    <Link to="#" className="compare"><i className="fas fa-camera" /></Link>
                                </div>
                            </div>
                            <div className="listing-body">
                                <h5 className="listing-title"> <Link to="#" title={item.title}>{item.title}</Link> </h5>
                                <p className="listing-text">{item.location}</p>
                                <span className="listing-price">{item.price} RS/-</span>

                               
                            </div>
                        </div>
                    </>
                ))}
                {/* <img className="slick-slide-image" src={"/LOGO(1).PNG"} />
                <img className="slick-slide-image" src={"/LOGO(2).PNG"} />
                <img className="slick-slide-image" src={"/LOGO(3).PNG"} />
                <img className="slick-slide-image" src={"/LOGO(4).PNG"} /> */}
            </Slider>
        </div>
    );
}