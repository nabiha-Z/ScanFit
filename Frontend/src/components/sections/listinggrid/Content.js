import React, { Component, Fragment, useEffect, useState } from 'react';
import { Link, } from 'react-router-dom';
import { useHistory } from 'react-router';
import { OverlayTrigger, Tooltip, Dropdown, NavLink, Button } from 'react-bootstrap';
import Sidebar from '../../layouts/Shopsidebar';
import Bounce from "react-activity/dist/Bounce";
import "react-activity/dist/Bounce.css";
import classNames from 'classnames';
import axios from 'axios';
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";
import { fetchListings, favourite } from '../../../api/index';


const gallerytip = (
    <Tooltip>
        Gallery
    </Tooltip>
);
const gridtip = (
    <Tooltip>
        Grid
    </Tooltip>
);
const listtip = (
    <Tooltip>
        List
    </Tooltip>
);
const maptip = (
    <Tooltip>
        Map
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

    const routerHistory = useHistory();
    const [items, setitems] = useState([]);
    const [nonfeatured, setnonfeatured] = useState([]);
    const [currentPage, setcurrentPage] = useState(1);
    const [itemsPerPage, setitemsPerPage] = useState(6);
    const [loading, setloading] = useState(false);
    


    async function place() {
        setloading(true);
        console.log("here");
        await fetchListings()
            .then(function (response) {

                if (response.data.message === true) {

                    setitems(response.data.featured);
                    setnonfeatured(response.data.nonFeatured);
                    console.log("res= ", response.data.nonFeatured);
                    setloading(false);
                }

                //console.log("items= ", items); 



            })
            .catch(function (error) {

            });

    }

    useEffect(() => {
        place();
    }, []);


    const LoadingData = () => {
        return (
            <>
                <div className="container" style={{ textAlign: "center", marginTop: "50%", color: "#59B0CD", fontSize: "80" }}>
                    <Bounce size='20' />
                </div>
            </>
        );
    };

    // this.state = {
    //     items: places,
    //     currentPage: 1,
    //     itemsPerPage: 6,
    //     loading: false
    // };

    // this.handleClick = this.handleClick.bind(this);



    const handleClick = (number) => {
        // var paginationContent = event.target.closest('.pagination-content');

        // if (paginationContent) {
        //     paginationContent.scrollIntoView();
        // }

        setloading(true);
        setTimeout(() => {

            setcurrentPage(number);
            setloading(false);


        }, 2000);

    }

    const onFav = async(item, e) => {
        e.preventDefault();
        console.log("onFav");
        if (Cookies.get("token") != undefined) {
            const token = Cookies.get("token");

            const user = jwt_decode(token);
            const user_id = user.id;
            console.log("currentuser");
            console.log(user_id);

            await favourite({ item, user_id })

                .then(function (response) {
                    console.log("onFav= ", response.data)
                    if (response.data.message === true) {
                        alert("Saved");
                    } else {
                        alert("Already in saved items");
                    }


                })
                .catch(function (error) {

                });
        } else {
            alert("You need to login first!");
        }
    }
    const showDetails = (item) => {

        console.log("listing item: ", item.title);
        routerHistory.push({
            pathname: "/listing-details-v1",
            state: { listing: item }
        });

    }

    // const { items, currentPage, itemsPerPage } = this.state;

    // const { items, currentPage, itemsPerPage } = this.state;

    // Logic for displaying items
    const indexOfLastitem = currentPage * itemsPerPage;
    const indexOfFirstitem = indexOfLastitem - itemsPerPage;


    const RenderItem = ({ list }) => {
        //console.log("list length= ", list.length);
        const currentitems = list.slice(indexOfFirstitem, indexOfLastitem);


        return (
            currentitems.map((item, i) => {

                return (<div key={i} className="col-md-6 col-sm-8" style={{ justifyContent: 'center' }}>
                    <div className="listing">
                        <div className="listing-thumbnail">
                            <Link to="/listing-details-v1"><img src={item.picture} alt="listing" style={{ width: 300, height: 250 }} /></Link>
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
                                <Link to="#" className="compare"><i className="fas fa-sync-alt" /></Link>
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
                            <p className="listing-text">{item.location}</p>
                            <span className="listing-price">{item.price}$ {item.type ==="Rent"?<span>/month</span> :""} </span>
                            <p className="listing-text">{item.description}</p>

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
                </div>

                )

            })
        );
    }
    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(items.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }
    const renderPagination = pageNumbers.map(number => {
        const activeCondition = currentPage === number ? 'active' : ''
        return (
            <Fragment key={number}>
                {pageNumbers.length > 1 ? <li className={classNames("page-item", { "active": activeCondition })}>
                    <Link className="page-link" to="#" data-page={number} onClick={() => handleClick(number)}>{number}</Link>
                </li> : ''}
            </Fragment>
        );
    });

    return (
        <div className="section pagination-content">
            <div className="container">
                <div className="row">
                    {/* Sidebar Start */}
                    <div className="col-lg-4">
                        <Sidebar />
                    </div>
                    {/* Sidebar End */}
                    {/* Posts Start */}
                    <div className="col-lg-8">
                        {/* Controls Start */}
                        {/* <div className="acr-global-listing-controls">
                            <div className="acr-listing-active-filters">
                                <Link to="#">
                                    <div className="close-btn close-dark">
                                        <span />
                                        <span />
                                    </div>
                                    Any Status
                                </Link>
                                <Link to="#">
                                    <div className="close-btn close-dark">
                                        <span />
                                        <span />
                                    </div>
                                    West Roxbury, MA
                                </Link>
                                <Link to="#">
                                    <div className="close-btn close-dark">
                                        <span />
                                        <span />
                                    </div>
                                    House
                                </Link>
                            </div>
                            <div className="acr-toggle-views">
                                <OverlayTrigger placement="top" overlay={gridtip}>
                                    <Link to="/listing-grid" className="active"><i className="fas fa-th-large" /></Link>
                                </OverlayTrigger>
                                <OverlayTrigger placement="top" overlay={listtip}>
                                        <Link to="/listing-list"><i className="fas fa-th-list" /></Link>
                                    </OverlayTrigger>
                                    <OverlayTrigger placement="top" overlay={maptip}>
                                        <Link to="/listing-map"><i className="fas fa-map" /></Link>
                                    </OverlayTrigger> 
                            </div>
                        </div> */}
                        {/* Controls End */}
                        <div className="row" >
                            {/* Listing Start */}
                            {loading === false ?
                                       <>
                                    {items.length != 0 && <RenderItem list={items} />}
                                    {nonfeatured.length != 0 && <RenderItem list={nonfeatured} />}
                                    </> 
                                    
                             : <LoadingData />}
                            

                            {/* Listing End */}
                        </div>
                        {/* Pagination Start */}
                        {pageNumbers.length > 1 ?
                            <ul className="pagination">
                                {/* Prev */}
                                {/* to show previous, we need to be on the 2nd or more page */}
                                {pageNumbers.length > 1 && currentPage !== 1 ?
                                    <li className="page-item">
                                        <Link className="page-link" to="#" data-page={currentPage - 1} onClick={() => handleClick}>
                                            <i className="fas fa-chevron-left" />
                                        </Link>
                                    </li>
                                    : ''}
                                {/* Prev */}
                                {renderPagination}
                                {/* Next */}
                                {/* to show next, we should not be on the last page */}
                                {pageNumbers.length > 1 && currentPage !== pageNumbers.length ? <li className="page-item">
                                    <Link className="page-link" to="#" data-page={parseInt(currentPage + 1)} onClick={() => handleClick}>
                                        <i className="fas fa-chevron-right" />
                                    </Link>
                                </li>
                                    : ''}
                                {/* Next */}
                            </ul> : ''}
                        {/* Pagination End */}
                    </div>
                    {/* Posts End */}
                </div>
            </div>
        </div>
    );

}

export default Content;