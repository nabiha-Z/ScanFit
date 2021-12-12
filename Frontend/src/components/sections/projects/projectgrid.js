import React, { Component, Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { OverlayTrigger, Tooltip, Dropdown, NavLink, Button } from 'react-bootstrap';
import Sidebar from '../../layouts/Shopsidebar';
import Bounce from "react-activity/dist/Bounce";
import "react-activity/dist/Bounce.css";
import classNames from 'classnames';
import axios from 'axios';
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";
import {projects} from '../../../api/index';

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

function Content (){

    const routerHistory = useHistory();
    const [items, setitems] = useState([]);
    const [nonfeatured, setnonfeatured] = useState([]);
    const [currentPage, setcurrentPage] = useState(1);
    const [itemsPerPage, setitemsPerPage] = useState(6);
    const [loading, setloading] = useState(false);

    async function place() {

        setloading(true);
        console.log("here");
        await projects()
            .then(function (response) {

                if (response.data.message === true) {

                    
                    setitems(response.data.projects);
                    console.log("response project= ", response.data.projects);
                    setloading(false);
                    
                    // setnonfeatured(response.data.nonFeatured);
                    // console.log("res= ", response.data.nonFeatured);
                    
                }

                //console.log("items= ", items); 



            })
            .catch(function (error) {

            });

    }

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

    const showDetails = (item) => {

        console.log("listing item: ", item.title);
        routerHistory.push({
            pathname: "/project-details",
            state: { listing: item }
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


    const indexOfLastitem = currentPage * itemsPerPage;
    const indexOfFirstitem = indexOfLastitem - itemsPerPage;


    const RenderItem = ({ list }) => {
        console.log("list length= ", list.length);
        const currentitems = list.slice(indexOfFirstitem, indexOfLastitem);
        return (
            currentitems.map((item, i) => {
                return (
                    <div key={i} className="col-md-4 col-sm-8" style={{ justifyContent: 'center' }}>
                        <div className="listing">
                        <div className="listing-thumbnail">
                        <Link to="/project-details"><img src={item.picture[0].thumbUrl} alt="listing" style={{ width: 300, height: 250 }} /></Link>
                            {/* <div className="listing-badges">
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
                            </div> */}
                            <div className="listing-controls">
                                {/* <Link to="#" className="favorite"><i className="far fa-heart" onClick={(e) => onFav(item, e)} /></Link>
                                <Link to="#" className="compare"><i className="fas fa-sync-alt" /></Link> */}
                            </div>
                        </div>
                        <div className="listing-body">
                        <h5 className="listing-title"> <Link to="/project-details" title={item.title}>{item.title}</Link> </h5>
                            <p className="listing-text">{item.location}</p>
                            <span className="listing-price">{item.price}$ {item.type ==="Rent"?<span>/month</span> :""} </span>
                            <p className="listing-text">{item.description}</p>
                            <div className="acr-listing-icons">
                            <OverlayTrigger overlay={areatip}>
                                    <div className="acr-listing-icon">
                                        <i className="flaticon-ruler" />
                                        <span className="acr-listing-icon-value">{item.area} {item.units}</span>
                                    </div>
                                </OverlayTrigger>
                            </div>
                            <div className="listing-gallery-wrapper">
                            <button className="btn-custom btn-sm secondary" onClick={() => showDetails(item)}>View Details</button>
                            </div>
                        </div>
                        </div>
                    </div>
                
            )

        })
        );

    }

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



    return(
       
        <div className="section pagination-content">
            <div className="container">
            <div className="row">
                {/* <div className="col-lg-4">
                    <Sidebar />
                </div> */}
                <div className="col-lg-12">
                <h3 style={{ textAlign: 'center', marginBottom: 30, fontWeight:'bold' }}>Current Projects</h3>
                <div className="row" >
                {loading === false ?
                     <>
                    {items.length != 0 && <RenderItem list={items} />}
                    {/* {nonfeatured.length != 0 && <RenderItem list={nonfeatured} />} */}
                    </> 
                                    
                    : <LoadingData />}
                </div>
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
                                    {renderPagination}
                                    {pageNumbers.length > 1 && currentPage !== pageNumbers.length ? <li className="page-item">
                                    <Link className="page-link" to="#" data-page={parseInt(currentPage + 1)} onClick={() => handleClick}>
                                        <i className="fas fa-chevron-right" />
                                    </Link>
                                    </li>
                                    : ''}
                                     </ul> : ''}
                </div>
            </div>
            </div>
        </div>
            
        
    );


}
export default Content;