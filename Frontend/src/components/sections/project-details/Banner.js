import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from '@farbenmeer/react-spring-slider';

const bannerpost = [
    {
        img: 'assets/img/listing-single/1.jpg',
    },
    {
        img: 'assets/img/listing-single/1-2.jpg',
    }
]

function Banner(props){

    const listing = props.list;
    const settings = {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        fade: true,
    }
    var images = [];
    var temp = [];
    images = listing.picture;
    for (var i = 0; i < Object.keys(images).length; i++) {
        temp[i] = images[i].thumbUrl;
    }

    return (
        <div className="banner banner-2 slider-no-padding">
            <div className="banner-item">
                <img  className="banner-inner bg-cover bg-center dark-overlay" src={temp[0]} alt="cover" style={{WebkitBackgroundSize:'cover', width:'100%'}}/>
                    <div className="acr-listing-details">
                        <div className="acr-listing-section">
                            <div className="acr-listing-nav">
                                <button className="btn-custom secondary" style={{width:'100%', borderRadius:0}}>Listing Price</button>
                            </div>
                            <div className="acr-listing-section-body">
                                <div className="acr-listing-section-price">
                                    <span>For {listing.type}</span>
                                    <h3>${listing.price} {listing.type === "Rent"? <span style={{fontSize:15}}>/month</span> : ""}</h3>
                                
                                </div>
                            </div>
                
                        </div>
                        <div className="acr-listing-section">
                            <div className="acr-listing-section-body">
                                <h4> {listing.title}</h4>
                                <div className="acr-listing-icons">
                                    <div className="acr-listing-icon">
                                        <i className="flaticon-ruler" />
                                        <span>{listing.unit}</span>
                                        <span className="acr-listing-icon-value">{listing.area}</span>
                                    </div>
                                </div>
                                <p>
                                    {listing.description}
                                </p>
                            </div>
                        </div>
                        <div className="acr-listing-section">
                            <div className="acr-listing-controls">
                                <Link to="#" className="acr-listing-control">
                                    <i className="flaticon-share" />
                                </Link>
                                <Link to="#" className="acr-listing-control">
                                    <i className="flaticon-star" />
                                </Link>
                                <Link to="#" className="acr-schedule-tour acr-listing-control">
                                    <i className="flaticon-event" />
                                    <span>Schedule Link tour</span>
                                </Link>
                            </div>
                            <div className="acr-listing-section-body">
                                <div className="acr-listing-meta">
                                    <div className="row">
                                        <div className="col-lg-6 col-md-3 col-sm-3">
                                            <div className="acr-listing-meta-item">
                                                <span>Type</span>
                                                <p>{listing.category}</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-3 col-sm-3">
                                            <div className="acr-listing-meta-item">
                                                <span>View</span>
                                                <p>City View</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-3 col-sm-3">
                                            <div className="acr-listing-meta-item">
                                                <span>Lot Size</span>
                                                <p>{listing.area}</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-3 col-sm-3">
                                            <div className="acr-listing-meta-item">
                                                <span>Condition</span>
                                                <p>Brand New</p>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );

}
export default Banner;