import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { OverlayTrigger, Tooltip, Dropdown, NavLink } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";
import { recentLists, favourite } from '../../../api';
import 'antd/dist/antd.css';
import { message, Space } from 'antd';

const gallerytip = (
    <Tooltip>
        Gallery
    </Tooltip>
);
const bedstip = (
    <Tooltip>
        Beds
    </Tooltip>
);
const bathstip = (
    <Tooltip>
        Bathrooms
    </Tooltip>
);
const areatip = (
    <Tooltip>
        Square Feet
    </Tooltip>
);

function Recentlistings() {

    const routerHistory = useHistory();
    const [listing, setlisting] = useState([]);
    const [nonfeatured, setnonfeatured] = useState([]);


    async function place() {
        //setloading(true);
        //console.log("recent here");
        await recentLists()
            .then(function (response) {

                if (response.data.message === true) {

                    setlisting(response.data.listing);

                    console.log("res= ", response.data.listing);
                    //setloading(false);
                }

                //console.log("items= ", items); 



            })
            .catch(function (error) {

            });

    }

    useEffect(() => {
        place();
    }, []);

    const showDetails = (item) => {

        console.log("listing item: ", item.title);
        routerHistory.push({
            pathname: "/listing-details-v1",
            state: { listing: item }
        });

    }
    const onFav = (item, e) => {
        e.preventDefault();
        console.log("onfavee")
        if (Cookies.get("token") != undefined) {
            const token = Cookies.get("token");
            const user = jwt_decode(token);
            const user_id = user.id;
            console.log("currentuser");
            console.log(user_id);

            favourite({ item, user_id })

                .then(function (response) {
                    console.log("onFav= ", response.data)
                    if (response.data.message === true) {
                        message.success('Saved');
                    } else {
                        message.error('Already in save items');
                    }



                })
                .catch(function (error) {

                });
        }
        else {
            message.error('You need to login first');
        }
    }

    return (
        <div className="section">
            <div className="container">
                <div className="section-title-wrap section-header">
                    <h5 className="custom-primary">Find Your Home</h5>
                    <h2 className="title">Recent Listings</h2>
                </div>
                <div className="row">
                    <div className="col-lg-8">
                        {listing.slice(0, 1).map((item, i) => (
                            <div key={i} className="listing listing-list">
                                <div className="listing-thumbnail">
                                    <Link to="/listing-details-v1"><img src={item.picture} style={{ width: '700px' }} alt="listing" /></Link>
                                    <div className="listing-badges">
                                        {
                                            item.subscribed === "featured" ? <span className="listing-badge featured"> <i className="fas fa-star" style={{ backgroundColor: "#F3C13C" }} /> </span> : ''
                                        }
                                        {
                                            item.type === "Sale" ? <span className="listing-badge sale">On Sale</span> : ''
                                        }
                                        {
                                            item.pending === true ? <span className="listing-badge pending"> Pending</span> : ''
                                        }
                                        {
                                            item.type === "Rent" ? <span className="listing-badge rent"> Rental</span> : ''
                                        }
                                    </div>
                                    <div className="listing-controls">
                                        <Link to="#" className="favorite"><i className="far fa-heart" onClick={(e) => onFav(item, e)} /></Link>

                                    </div>
                                </div>
                                <div className="listing-body">
                                    {/* <div className="listing-author">
                                        <img src={item.picture} alt="author" />
                                        <div className="listing-author-body">
                                            <p> <Link to="#">{item.authorname}</Link> </p>
                                            <span className="listing-date">{item.postdate}</span>
                                        </div>
                                        <Dropdown className="options-dropdown">
                                            <Dropdown.Toggle as={NavLink}><i className="fas fa-ellipsis-v" /></Dropdown.Toggle>
                                            <Dropdown.Menu className="dropdown-menu-right">
                                                <ul>
                                                    <li> <Link to="tel:+123456789"> <i className="fas fa-phone" /> Call Agent</Link> </li>
                                                    <li> <Link to="mailto:+123456789"> <i className="fas fa-envelope" /> Send Message</Link> </li>
                                                    <li> <Link to="/listing-details-v1"> <i className="fas fa-bookmark" /> Book Tour</Link> </li>
                                                </ul>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div> */}
                                    <h5 className="listing-title"> {item.title}</h5>
                                    <p className="listing-title"> {item.description}</p>
                                    <span className="listing-price">{item.price}${item.type === "Rent" ? <span>/month</span> : ""} </span>
                                    <p className="listing-text">{item.text}</p>
                                    <div className="acr-listing-icons">
                                        {/* <OverlayTrigger overlay={bedstip}>
                                            <div className="acr-listing-icon">
                                                <i className="flaticon-bedroom" />
                                                <span className="acr-listing-icon-value">{item.beds}</span>
                                            </div>
                                        </OverlayTrigger>
                                        <OverlayTrigger overlay={bathstip}>
                                            <div className="acr-listing-icon">
                                                <i className="flaticon-bathroom" />
                                                <span className="acr-listing-icon-value">{item.bathrooms}</span>
                                            </div>
                                        </OverlayTrigger> */}
                                        <OverlayTrigger overlay={areatip}>
                                            <div className="acr-listing-icon">
                                                <i className="flaticon-ruler" />
                                                <span className="acr-listing-icon-value">{item.area}</span>
                                                <span >&nbsp;{item.unit}</span>
                                            </div>
                                        </OverlayTrigger>
                                    </div>
                                    <div className="listing-gallery-wrapper">
                                        <button onClick={() => showDetails(item)} className="btn-custom btn-sm secondary">View Details</button>
                                        {/* <OverlayTrigger overlay={gallerytip}>
                                            <Link to="#" className="listing-gallery"> <i className="fas fa-camera" /> </Link>
                                        </OverlayTrigger> */}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {listing.slice(1, 2).map((item, i) => (
                            <div key={i} className="listing">
                                <div className="listing-thumbnail">
                                    <Link to="/listing-details-v1"><img src={item.picture} style={{ width: '900px' }} alt="listing" /></Link>
                                    <div className="listing-badges">
                                        {
                                            item.subscribed === "featured" ? <span className="listing-badge featured"> <i className="fas fa-star" style={{ backgroundColor: "#F3C13C" }} /> </span> : ''
                                        }
                                        {
                                            item.type === "Sale" ? <span className="listing-badge sale">On Sale</span> : ''
                                        }
                                        {
                                            item.pending === true ? <span className="listing-badge pending"> Pending</span> : ''
                                        }
                                        {
                                            item.type === "Rent" ? <span className="listing-badge rent"> Rental</span> : ''
                                        }
                                    </div>
                                    <div className="listing-controls">
                                        <Link to="#" className="favorite"><i className="far fa-heart" onClick={(e) => onFav(item, e)} /></Link>

                                    </div>
                                </div>
                                <div className="listing-body">
                                    {/* <div className="listing-author">
                                        <img src={process.env.PUBLIC_URL + "/" + item.authorimg} alt="author" />
                                        <div className="listing-author-body">
                                            <p> <Link to="#">{item.authorname}</Link> </p>
                                            <span className="listing-date">{item.postdate}</span>
                                        </div>
                                        <Dropdown className="options-dropdown">
                                            <Dropdown.Toggle as={NavLink}><i className="fas fa-ellipsis-v" /></Dropdown.Toggle>
                                            <Dropdown.Menu className="dropdown-menu-right">
                                                <ul>
                                                    <li> <Link to="tel:+123456789"> <i className="fas fa-phone" /> Call Agent</Link> </li>
                                                    <li> <Link to="mailto:+123456789"> <i className="fas fa-envelope" /> Send Message</Link> </li>
                                                    <li> <Link to="/listing-details-v1"> <i className="fas fa-bookmark" /> Book Tour</Link> </li>
                                                </ul>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div> */}
                                    <h5 className="listing-title">{item.title}</h5>
                                    <p className="listing-title"> {item.description}</p>
                                    <span className="listing-price">{item.price}${item.type === "Rent" ? <span>/month</span> : ""}</span>
                                    <p className="listing-text">{item.text}</p>
                                    <div className="acr-listing-icons">
                                        {/* <OverlayTrigger overlay={bedstip}>
                                            <div className="acr-listing-icon">
                                                <i className="flaticon-bedroom" />
                                                <span className="acr-listing-icon-value">{item.beds}</span>
                                            </div>
                                        </OverlayTrigger>
                                        <OverlayTrigger overlay={bathstip}>
                                            <div className="acr-listing-icon">
                                                <i className="flaticon-bathroom" />
                                                <span className="acr-listing-icon-value">{item.bathrooms}</span>
                                            </div>
                                        </OverlayTrigger> */}
                                        <OverlayTrigger overlay={areatip}>
                                            <div className="acr-listing-icon">
                                                <i className="flaticon-ruler" />
                                                <span className="acr-listing-icon-value">{item.area}</span>
                                                <span >&nbsp;{item.unit}</span>

                                            </div>
                                        </OverlayTrigger>
                                    </div>
                                    <div className="listing-gallery-wrapper">
                                        <button onClick={() => showDetails(item)} className="btn-custom btn-sm secondary">View Details</button>
                                        {/* <OverlayTrigger overlay={gallerytip}>
                                            <Link to="#" className="listing-gallery"> <i className="fas fa-camera" /> </Link>
                                        </OverlayTrigger> */}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="col-lg-4">
                        {listing.slice(2, 4).map((item, i) => (
                            <div key={i} className="listing">
                                <div className="listing-thumbnail">
                                    <Link to="/listing-details-v1"><img src={item.picture} alt="listing" /></Link>
                                    <div className="listing-badges">
                                        {
                                            item.subscribed === "featured" ? <span className="listing-badge featured"> <i className="fas fa-star" style={{ backgroundColor: "#F3C13C" }} /> </span> : ''
                                        }
                                        {
                                            item.type === "Sale" ? <span className="listing-badge sale">On Sale</span> : ''
                                        }
                                        {
                                            item.pending === true ? <span className="listing-badge pending"> Pending</span> : ''
                                        }
                                        {
                                            item.type === "Rent" ? <span className="listing-badge rent"> Rental</span> : ''
                                        }
                                    </div>
                                    <div className="listing-controls">
                                        <Link to="#" className="favorite"><i className="far fa-heart" /></Link>

                                    </div>
                                </div>
                                <div className="listing-body">
                                    {/* <div className="listing-author">
                                        <img src={process.env.PUBLIC_URL + "/" + item.authorimg} alt="author" />
                                        <div className="listing-author-body">
                                            <p> <Link to="#">{item.authorname}</Link> </p>
                                            <span className="listing-date">{item.postdate}</span>
                                        </div>
                                        <Dropdown className="options-dropdown">
                                            <Dropdown.Toggle as={NavLink}><i className="fas fa-ellipsis-v" /></Dropdown.Toggle>
                                            <Dropdown.Menu className="dropdown-menu-right">
                                                <ul>
                                                    <li> <Link to="tel:+123456789"> <i className="fas fa-phone" /> Call Agent</Link> </li>
                                                    <li> <Link to="mailto:+123456789"> <i className="fas fa-envelope" /> Send Message</Link> </li>
                                                    <li> <Link to="/listing-details-v1"> <i className="fas fa-bookmark" /> Book Tour</Link> </li>
                                                </ul>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div> */}
                                    <h5 className="listing-title">{item.title} </h5>
                                    <p className="listing-title"> {item.description}</p>
                                    <span className="listing-price">{item.price}$ {item.type === "Rent" ? <span>/month</span> : ""} </span>
                                    <p className="listing-text">{item.text}</p>
                                    <div className="acr-listing-icons">
                                        {/* <OverlayTrigger overlay={bedstip}>
                                            <div className="acr-listing-icon">
                                                <i className="flaticon-bedroom" />
                                                <span className="acr-listing-icon-value">{item.beds}</span>
                                            </div>
                                        </OverlayTrigger>
                                        <OverlayTrigger overlay={bathstip}>
                                            <div className="acr-listing-icon">
                                                <i className="flaticon-bathroom" />
                                                <span className="acr-listing-icon-value">{item.bathrooms}</span>
                                            </div>
                                        </OverlayTrigger> */}
                                        <OverlayTrigger overlay={areatip}>
                                            <div className="acr-listing-icon">
                                                <i className="flaticon-ruler" />
                                                <span className="acr-listing-icon-value">{item.area}</span>
                                                <span >&nbsp;{item.unit}</span>
                                            </div>
                                        </OverlayTrigger>
                                    </div>
                                    <div className="listing-gallery-wrapper">
                                        <button onClick={() => showDetails(item)} className="btn-custom btn-sm secondary">View Details</button>
                                        {/* <OverlayTrigger overlay={gallerytip}>
                                            <Link to="#" className="listing-gallery"> <i className="fas fa-camera" /> </Link>
                                        </OverlayTrigger> */}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Recentlistings;