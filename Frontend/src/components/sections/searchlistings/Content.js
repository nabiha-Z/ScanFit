import React, { Component, Fragment, useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { OverlayTrigger, Tooltip, Dropdown, NavLink } from 'react-bootstrap';
import Sidebar from '../../layouts/Shopsidebar';
import Dots from "react-activity/dist/Dots";
import "react-activity/dist/Dots.css";
import classNames from 'classnames';
import Cookies from 'js-cookie';
import { favourite } from '../../../api';
import jwt_decode from "jwt-decode";
import axios from 'axios';



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

export default function Content() {

    const routerHistory = useHistory();
    const [items, setitems] = useState([]);
    const [currentPage, setcurrentPage] = useState(1);
    const [itemsPerPage, setitemsPerPage] = useState(6);
    const [loading, setloading] = useState(false);
    const [searchedList, setsearchedList] = useState([]);

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
    const onFav = (item,e) => {
        e.preventDefault();

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
                        alert("Saved");
                    } else {
                        alert("Already in saved items");
                    }


                })
                .catch(function (error) {

                });
        }
    }
    const showDetails = (item) => {
      
        console.log("listing item: ", item.title);
        routerHistory.push({
            pathname: "/listing-details-v1",
            state: { listing:item }
        });

    }

    let location = useLocation();
    console.log(location.pathname);
    var featuredLists =[];
    var nonfeaturedLists =[];
    if(location.state != undefined){
        console.log("state= ", location.state.featured);
         featuredLists = location.state.featured;
         nonfeaturedLists = location.state.nonFeature;
         console.log("type of= ", location.state.featured);
    }


    //setsearchedList(featuredLists);
    // setsearchedList(...searchedList, nonfeaturedLists);
    const indexOfLastitem = currentPage * itemsPerPage;
    const indexOfFirstitem = indexOfLastitem - itemsPerPage;

    const listItems = featuredLists.slice(indexOfFirstitem, indexOfLastitem);


    const RenderItem = ({ list }) => {
        console.log("list length= ", list.length);
        return (
            list.map((item, i) => {

                return (<div key={i} className="col-md-4 col-sm-8" style={{justifyContent:'center'}}>
                    <div className="listing">
                        {console.log("TTitle= ", item.title)}
                        <div className="listing-thumbnail">
                            <Link to="/listing-details-v1"><img src={item.picture} alt="listing" style={{ width: 400, height: 200 }} /></Link>
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
                                <Link className="favorite"><i className="far fa-heart" onClick={(e) => onFav(item,e)} /></Link>
                               
                            </div>
                        </div>
                        <div className="listing-body">

                            <h5 className="listing-title"> <Link to="/listing-details-v1" title={item.title}>{item.title}</Link> </h5>
                            <p className="listing-text">{item.location}</p>
                            <span className="listing-price">{new Intl.NumberFormat().format((item.price).toFixed(2))}$ <span></span> </span>
                            <p className="listing-text">{item.description}</p>

                            <div className="acr-listing-icons">

                                <OverlayTrigger overlay={areatip}>
                                    <div className="acr-listing-icon">
                                        <i className="flaticon-ruler" />
                                        <span className="acr-listing-icon-value">{item.area}</span>
                                        <span>&nbsp;{item.unit}</span>
                                    </div>
                                </OverlayTrigger>
                            </div>
                            <div className="listing-gallery-wrapper">
                            <button onClick={()=>showDetails(item)} className="btn-custom btn-sm secondary">View Details</button>
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



    const EmptySearch = () => {
        return (
            <div className="container" style={{ textAlign: 'center' }}>
                <h4>No List found</h4>
            </div>
        );
    }

    return (
        <div className="section pagination-content">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <h3 style={{ textAlign: 'center', marginBottom: 30 }}>Searched Results</h3>
                        <div className="row">
                            {/* Listing Start */}
                            {setsearchedList.length != 0 ?
                                <>
                                    {featuredLists.length != 0 && <RenderItem list={featuredLists} />}
                                    {nonfeaturedLists.length != 0 && <RenderItem list={nonfeaturedLists} />}
                                </> : <EmptySearch />}
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
                </div>
            </div>
        </div>

    )
}
