import React, { Component, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
// import listing from '../../../data/listings.json';
import { OverlayTrigger, Tooltip, Dropdown, NavLink } from 'react-bootstrap';
import Dots from "react-activity/dist/Dots";
import axios from 'axios';
import 'antd/dist/antd.css';
import { message, Space } from 'antd';
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";
import { useHistory } from 'react-router';
import { fetchuserlistings, loginuser, addsubuser, featureList, subuserCount, deleteListing} from '../../../api';


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
function Content() {

    const [loading, setloading] = useState(false);
    const [listing, setlisting] = useState([]);
    const routerHistory = useHistory();
    // const location = useLocation();
    // const {data}= location.state;
    const [user, setuser] = useState([]);
    
    const mail = Cookies.get('mail');
    

    const API = async () => {
        setloading(true);
        await fetchuserlistings({
            mail
        })
            .then(function (response) {
                console.log("response.data", response.data);
                setlisting(response.data.listings);
                console.log("response= ", response.data.listings);
                setloading(false);
            })
            .catch(function (error) {

            });

    }

   
    const request = async (user_id) => {

        
        await addsubuser({
            user_id

        })
            .then(function (response) {
                setlisting(response.data.listings);
                //console.log("requestlistings" + response.data.listings);
                //console.log("user"+user);

            })
            .catch(function (error) {

            });
    }



    const subusersListing = async () => {
        await loginuser( {
            token: Cookies.get('token')
        })
            .then(function (response) {
                //console.log(response);
                if (response.data.message === "true") {
                    try {
                        //console.log("response user= ", response.data.user);
                        setuser(response.data.user);
                        //console.log("user = ", user);
                        const userID= response.data.user._id;
                        // console.log("u=df= ", userID)
                        const userType = Cookies.get("type");

                        //console.log("user type == " + userType);
                        if (userType === "company") {
                            
                            request(userID);

                        }
                        else {

                            API();
                        }
                    } catch (e) {
                        return null;
                    }
                } else if (response.data.message === "false") {

                }

            })
            .catch(function (error) {

            });
    }
    const check = () => {




    }
    useEffect(async () => {

        // const token = Cookies.get("token");
        // const user1 = jwt_decode(token);
        // const user_id = user1.id;
        //console.log(user)
        // userData(user_id);
        subusersListing();
        // check();
        // console.log("user"+user);
        // if(user.type==="company"){

        //     request(user._id);

        // }
        // else{

        //     API();
        // }

    }, []);

    const featurelist = async (id) => {

        await featureList({
            id

        })
            .then(function (response) {
                console.log("response" + response.data.updated);
                alert("Request Send");
            })
            .catch(function (error) {

            });

    }

    const addSubuser = () => {

        const token = Cookies.get("token");
        const user = jwt_decode(token);
        const user_id = user.id;
        console.log(user_id);
        subuserCount({ user_id })
            .then(function (response) {
                console.log(response.data.count);
                const subcount = response.data.count;
                if (subcount === 10) {
                    alert("no more users can be added!");
                    routerHistory.push('./profile');
                }
                else {
                    routerHistory.push('./register');
                }

            }).catch(function (error) {

            });


    }
    
    const LoadingData = () => {

        return (
            <>
            <h6 style={{textAlign:'center'}}>... loading</h6>
                <div className="container" style={{ textAlign: "center", marginTop: "50%", color: "#59B0CD", fontSize: "80" }}>
                    <Dots size='20' />
                </div>
            </>
        );
    };

    const onDel = async(id, title)=>{
        
        const token = Cookies.get("token");
        const user = jwt_decode(token);
        const user_id = user.id;
        
        console.log("Deleteion ", title)
        await deleteListing( { id,user_id })
        .then(function (response) {
            console.log(response.data);
            if(response.data.message === true){
                message.success('List Deleted!');
            }
            
            window.location.reload(false);

        }).catch(function (error) {

        });


    }

     const showDetails = (item) => {
      
        //console.log("listing item: ", item.title);
        routerHistory.push({
            pathname: "/listing-details-v1",
            state: { listing:item }
        });

    }
    return (
        <div className="section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="sidebar sticky-sidebar user-nav sidebar-left">
                            <ul>
                                <li> <Link to="/profile"> Edit Profile</Link> </li>
                                {user.type === "company" ? (
                                    <>
                                        <li> <Link to="" onClick={() => addSubuser()}>Add subuser</Link> </li>
                                        <li> <Link to="/profile-listings">My Listings</Link> </li>
                                        <li> <Link to="/subuserdetail">Subuser List</Link> </li>
                                    </>

                                ) : (
                                    <>
                                        <li> <Link to="/profile-listings">My Listings</Link> </li>
                                        <li> <Link to="/profile-saved-listings">Saved Listings</Link> </li>
                                    </>
                                )}

                                {/* <li> <Link className="active" to="/profile-listings">My Listings</Link> </li>
                                    <li> <Link to="/profile-saved-listings">Saved Listings</Link> </li> */}
                                <li> <Link className="logout" to="/" onClick={() => {
                                    Cookies.remove('token');
                                    Cookies.remove('mail');
                                }}><i className="flaticon-shut-down-button" /> Logout</Link> </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        {/* Listing Start */}
                        {loading === false ?
                        <>
                        {listing.length!=0? listing.map((item, i) => (
                            <div key={i} className="listing listing-list">
                                <div className="listing-thumbnail">
                                    <Link to="/listing-details-v1"><img src={item.picture} alt="listing"  style={{ width: 500, height: 250 }}/></Link>
                                    <div className="listing-badges">
                                        
                                        {
                                            item.subscribed === "featured" ? <span className="listing-badge featured"> <i className="fas fa-star" /> </span> : ''
                                        }
                                        {
                                            item.type === "Sale" ? <span className="listing-badge sale">On Sale</span> : ''
                                        }
                                        {
                                            item.status === "pending" ? <span className="listing-badge pending"> Pending</span> : ''
                                        }
                                        {
                                            item.type === "Rent" ? <span className="listing-badge rent"> Rental</span> : ''
                                        }
                                    </div>
                                    <div className="listing-controls">
                                       
                                        <Link className="compare"><i className="fas fa-trash-alt" onClick={()=> onDel(item._id, item.title)}/></Link>
                                        <Link to="#" className="edit"><i className="fas fa-edit" /></Link>
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
                                    <h5 className="listing-title"> <Link to="/listing-details-v1" title={item.title}>{item.title}</Link> </h5>
                                    <span className="listing-price">{item.price}$ {item.type ==="Rent"?<span>/month</span> :""}</span>
                                    <p className="listing-text">{item.description}</p>
                                    <p className="listing-text">{item.category}</p>
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
                                                <span className="acr-listing-icon-value">{new Intl.NumberFormat().format((item.area))}</span>
                                                <span className="acr-listing-icon-value">&nbsp;{item.unit}</span>
                                            </div>
                                        </OverlayTrigger>
                                    </div>
                                    <div className="listing-gallery-wrapper">
                                    <button onClick={()=>showDetails(item)} className="btn-custom btn-sm secondary">View Details</button>
                                        <OverlayTrigger overlay={gallerytip}>
                                            <>
                                                {item.status === "approved" ? (
                                                    <Link to="#" className="listing-gallery" onClick={() => featurelist(item._id)}> <i className="fas fa-star" /> </Link>

                                                ) : (
                                                    ""
                                                )}
                                            </>

                                        </OverlayTrigger>
                                    </div>
                                </div>
                            </div>
                        )):(  (
                                       
                            <div className="acr-empty-section">
                                <i className="flaticon-home" />
                                <h3 >You haven't Added any listings yet.</h3>
                                <p>You still havent added any listings yet, Go to the submit listings page and add some of your own listings.</p>
                                <Link to="/submit-listing" className="btn-custom primary" >Submit Listing <i className="fas fa-plus" style={{fontSize:'15px'}}/> </Link>
                                
                            </div>
                       ))}</> :<LoadingData />}
                        {/* Listing End */}
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Content;