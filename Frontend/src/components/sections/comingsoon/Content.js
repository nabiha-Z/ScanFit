import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

const images = [
    { img: 'images/img8.jpg' },
    { img: 'images/img4.jpg' },
    { img: 'images/img1.png' },
];

class Content extends Component {
    render() {
        const settings = {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            autoplay: true,
            dots: true,
            dotsClass: "d-flex slick-dots",
        }
        return (
            <div className="acr-cs-container">
                <div className="acr-cs-content">
                    <div className="acr-cs-content-head">
                        <div className="acr-cs-logo">
                            <Link to="/"><img src={process.env.PUBLIC_URL + "/logo.png"} width="40%" alt="logo" /></Link>
                        </div>
                    </div>
                    <div className="acr-cs-content-body">
                        <div className="acr-cs-text">
                            <div className="acr-dots-wrapper">
                                <div className="acr-dots" />
                            </div>
                            <h1 className="title">Page  <span className="custom-primary">Coming Soon</span> </h1>
                            <p className="subtitle">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                        </div>
                        
                    </div>
                   
                </div>
                <div className="acr-cs-bg">
                    <Slider className="acr-cs-bg-slider" {...settings}>
                        {images.map((item, i) => (
                            <div key={i}>
                                <div className="acr-cs-bg-item bg-cover bg-center" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/" + item.img + ")" }} />
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        );
    }
}

export default Content;