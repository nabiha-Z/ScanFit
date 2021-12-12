import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { OverlayTrigger, Tooltip, Dropdown, NavLink, Accordion, Card } from 'react-bootstrap';
import listing from '../../../data/listings.json';
import Calculator from '../../layouts/Calculator';
import $ from 'jquery';
import 'magnific-popup'
import 'antd/dist/antd.css';
import { message, Space} from 'antd';
import classNames from 'classnames';    
import Cookies from 'js-cookie';
import { similarListings,loginuser,messageSend } from '../../../api';

const listinggallery = [
    { img: 'assets/img/listing-single/2.jpg' },
    { img: 'assets/img/listing-single/3.jpg' },
    { img: 'assets/img/listing-single/4.jpg' },
    { img: 'assets/img/listing-single/5.jpg' },
];

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

function Listingwrapper(props) {

    const listing = props.list;
    const [similarLists, setsimilarLists] = useState([]);
    const routerHistory = useHistory();
    const [showmore, setshowmore] = useState(false);
    const [user,setuser] = useState({});
    const [email,setemail] = useState("");
    const [phonenumber,setphonenumber] = useState(0);
    const [msg,setmsg] = useState("");

    let featuresArray = []; 
    let features = listing.features;
    featuresArray = features.split(',');
    var images = [];
    var temp = [];
    images = listing.picture;

    for (var i = 0; i < Object.keys(images).length; i++) {
        temp[i] = images[i].thumbUrl;
    }

    const similar = async() => {
        const category = listing.category;
        const unit = listing.unit;
        
       await similarListings({
            category, unit
        })
            .then(function (response) {
                // console.log("response= ", response.data);
                if (response.data.message === true) {
                   
                    setsimilarLists(response.data.listing);
                    //console.log("response= ", response.data.listing)
                    
                }


                //console.log("items= ", items); 



            })
            .catch(function (error) {

            });
    }

    const userdata = ()=>{
        loginuser({
            token: Cookies.get('token')
        })
            .then(function (response) {
                console.log("header rewsponse", response);
                if (response.data.message == "true") {
                    try {
                        setuser(response.data.user);
                        setemail(response.data.user.email);
                        console.log("email");
                        console.log(email);
                        setphonenumber(response.data.user.phonenumber);
                        console.log("limit=", response.data.user.limit)
                    } catch (e) {
                        return null;
                    }
                } else if (response.data.message === "false") {

                }

            })
            .catch(function (error) {

            });

        }

        useEffect(() => {
            similar()
            userdata()
    
    
        }, []);

        const showmoretoggle = () => {
            setshowmore(!showmore)
        }    

        const componentDidMount = (e) => {
            e.preventDefault();
            function popup() {
                $('.gallery-thumb').magnificPopup({
    
                    type: 'image',
                    tLoading: 'Loading image #%curr%...',
                    gallery: {
                        enabled: true,
                        navigateByImgClick: true,
                        preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
                    },
                    mainClass: 'mfp-fade',
                    removalDelay: 300,
                    image: {
                        tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
                        verticalFit: true
                        /*titleSrc: function(item) {
                          return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
                        }*/
                    },
                    zoom: {
                        enabled: true,
                        duration: 400, // don't foget to change the duration also in CSS
                        easing: 'ease-in-out'
                    },
                    callbacks: {
                        elementParse: function (item) {
                            item.type = 'image';
    
                        }
                    },
                });
    
            }
            popup()
        };

        const sendMessage = (e) => {
            e.preventDefault();
            console.log("in msg func");
            if (Cookies.get("token") === undefined) {
                message.error('You need to login first!');
            } else {
                console.log(email,phonenumber,msg);
                message.success('Message Sent.');
                messageSend({
                    email,phonenumber,msg
                })
                .then(function(response){
                    console.log(response.data.message);
                }).catch(function (error) {
    
                });
            } 
        }

        const showDetails = (e, item) => {

            e.preventDefault();
            routerHistory.push({
                pathname: "/listing-details-v1",
                state: { listing: item }
            });
        }

    return(
        <div className="section listing-wrapper">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="listing-content">
                            <h4>Property Overview</h4>
                            <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
                                galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
                                Letraset sheets
                                containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
                            </p>
                            <div className="row">
                            {temp.map((item, i) => {
                                    return (
                                        <>
                                            <div key={i} className="col-md-6 mb-3">
                                                <a href={item} onClick={(e) => componentDidMount(e)} className="gallery-thumb">
                                                    <img src={item} style={{ width: 300, height: 250 }} alt="post" />
                                                </a>
                                            </div>
                                        </>
                                    );



                                })}
                            </div>
                            <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. <Link to="#">Lorem Ipsum has been the industry's</Link> standard dummy text ever since the 1500s, when an unknown printer took a  galley of type and scrambled it to make a type specimen book.
                            </p>
                        </div>
                        <div className="section section-padding pt-0 acr-listing-features">
                            <h4>Features</h4>
                            <div className="row">
                                <div className="col-lg-6 col-md-6">
                                    <div className="listing-feature-wrapper">
                                        <div className="listing-feature">
                                            <i className="flaticon-picture" />
                                            <h6 className="listing-feature-label">Propery Type</h6>
                                            <span className="listing-feature-value">{listing.category}</span>
                                        </div>
                                        <div className="listing-feature">
                                            <i className="flaticon-bone" />
                                            <h6 className="listing-feature-label">Pet Friendly</h6>
                                            <span className="listing-feature-value">{featuresArray.includes('Pet Friendly') ? 'Yes' : 'No'}</span>
                                        </div>
                                        <div className="listing-feature">
                                            <i className="flaticon-chair" />
                                            <h6 className="listing-feature-label">Furnished</h6>
                                          
                                            <span className="listing-feature-value">{featuresArray.includes('Furnished') ? 'Yes' : 'No'}</span>
                                        </div>
                                        <div className="listing-feature">
                                            <i className="flaticon-fan" />
                                            <h6 className="listing-feature-label">Cooling</h6>
                                            <span className="listing-feature-value">{featuresArray.includes('Cooling') ? 'Yes' : 'No'}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                    <div className="listing-feature-wrapper">
                                        <div className="listing-feature">
                                            <i className="flaticon-garage" />
                                            <h6 className="listing-feature-label">Parking</h6>
                                            <span className="listing-feature-value">{featuresArray.includes('Parking') ? 'Yes' : 'No'}</span>
                                        </div>
                                        <div className="listing-feature">
                                            <i className="flaticon-history" />
                                            <h6 className="listing-feature-label">Year Built</h6>
                                            <span className="listing-feature-value">{listing.year}</span>
                                        </div>
                                        <div className="listing-feature">
                                            <i className="flaticon-mailbox" />
                                            <h6 className="listing-feature-label">Mail box</h6>
                                            <span className="listing-feature-value">{featuresArray.includes('Mailbox') ? 'Yes' : 'No'}</span>
                                        </div>
                                        <div className="listing-feature">
                                            <i className="flaticon-ruler" />
                                            <h6 className="listing-feature-label">Property Size</h6>
                                            <span className="listing-feature-value">{listing.area}</span>
                                            <span className="listing-feature-value">&nbsp;{listing.unit}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button type="button" className={classNames("load-more-features btn-custom-2 light-grey btn-block", { "d-none": showmore })} onClick={() => showmoretoggle()}>Show More</button>
                            <div className={classNames("hidden-listing-features", { "d-block": showmore })}>
                                <div className="row">
                                    <div className="col-lg-6 col-md-6">
                                        <div className="listing-feature">
                                            <i className="flaticon-eye" />
                                            <h6 className="listing-feature-label">View</h6>
                                            <span className="listing-feature-value">{featuresArray.includes('City View') ? 'Yes' : 'No'}</span>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                        <div className="listing-feature">
                                            <i className="flaticon-new" />
                                            <h6 className="listing-feature-label">Condition</h6>
                                            <span className="listing-feature-value">New</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="section pt-0">
                            <h4>Property Video</h4>
                            <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
                            </p>
                            <div className="embed-responsive embed-responsive-21by9">
                                <iframe title="video" className="embed-responsive-item" src="https://www.youtube.com/embed/Sz_1tkcU0Co" />
                            </div>
                        </div>
                        {/* <div className="section section-padding">
                            <h4>Similar Listings</h4>
                            <div className="row">
                                {similarLists != undefined ? similarLists.slice(0, 4).map((item, i) =>(
                                    <div key={i} className="col-md-6">
                                        <Link onClick={(e) => showDetails(e, item)}>
                                            <div className="listing">
                                                <div className="listing-thumbnail">
                                                <Link to="/project-details"><img src={item.picture} alt="listing" /></Link>
                                                <div className="listing-badges">
                                                        {
                                                            item.subscribed === "featured" ? <span className="listing-badge featured"> <i className="fas fa-star" /> </span> : ''
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

                                                </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))
                            </div>
                        </div> */}
                    </div>
                    <div className="col-lg-4">
                        <div className="sidebar sticky-sidebar">
                            <div className="sidebar-widget">
                                <h5>Meet The Agent</h5>
                                <div className="media sidebar-author listing-agent">
                                    <Link to="#"><img src={process.env.PUBLIC_URL + "/assets/img/people/1.jpg"} alt="agent" /></Link>
                                    <div className="media-body">
                                        <h6>Company Agent</h6>
                                        <span></span>
                                    </div>
                                    <Dropdown className="options-dropdown">
                                    <Dropdown.Toggle as={NavLink}><i className="fas fa-ellipsis-v" /></Dropdown.Toggle>
                                        <Dropdown.Menu className="dropdown-menu-right">
                                            <ul>
                                                <li> <Link to="tel:+123456789"> <i className="fas fa-phone" /> Call Agent</Link> </li>
                                                <li> <Link to="/listing-grid"> <i className="fas fa-th-list" /> View Listings</Link> </li>
                                                <li> <Link to="#"> <i className="fas fa-star" /> Save Agent</Link> </li>
                                            </ul>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                                <form onSubmit={(e) => e.preventDefault()}></form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Listingwrapper;