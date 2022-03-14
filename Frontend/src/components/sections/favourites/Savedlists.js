import React, { Component, Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { OverlayTrigger, Tooltip, Dropdown, NavLink, Button } from 'react-bootstrap';
import Sidebar from '../../layouts/Shopsidebar';
import listing from '../../../data/listings.json';
import classNames from 'classnames';
import Loader from '../../layouts/Loader';
import axios from 'axios';
import Cookies from 'js-cookie';
//import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";
import { unsaveList } from '../../../api';
import { message, Space } from 'antd';
import 'antd/dist/antd.css';

const gallerytip = (
    <Tooltip>
        Gallery
    </Tooltip>
);

const areatip = (
    <Tooltip>
        Square Feet
    </Tooltip>
);


const gridtip = (
    <Tooltip>
        Grid
    </Tooltip>
);

function Savedlists(props) {

    const [items, setitems] = useState(props.list);
    const [listItem, setListItem] = useState([]);
    const [currentPage, setcurrentPage] = useState(1);
    const [itemsPerPage, setitemsPerPage] = useState(6);
    const [loading, setloading] = useState(false);

    //         async function place(){
    //             console.log("here");
    //          const places =  await axios.get("http://localhost:5000/listings");
    //          setitems(places.data);
    //          console.log("in",places.data)
    //         }

    // useEffect(() => {
    //     //setitems(props.list);

    //   },[]); 


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

        //    setloading(true);
        //     setTimeout(() => {

        //             setcurrentPage(number);
        //             setloading(false);

        //     }, 2000);

    }

    const onunFav = (item) => {

        const token = Cookies.get("token");
        const user = jwt_decode(token);
        const user_id = user.id;
        console.log("currentuser", user_id);
        console.log(user_id);

       unsaveList({ item, user_id })

            .then(function (response) {
                console.log("response.data",response.data);
                if(response.data.message === true){
                    console.log(response.data.message);
                    message.success('List unsaved');
                    //window.location.reload(false);
                }
                
            })
            .catch(function (error) {

            });
    }


    // const { items, currentPage, itemsPerPage } = this.state;

    // Logic for displaying items
    const indexOfLastitem = currentPage * itemsPerPage;
    const indexOfFirstitem = indexOfLastitem - itemsPerPage;
    console.log("items", items[0].title);
     const currentitems = items.slice(indexOfFirstitem, indexOfLastitem);

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



        <div>
            <div className="row">
                {currentitems.map((item, i) => {
                    return <div className="col-md-6 col-sm-9" key={i}>
                        {/* <h1>item= {item.title}</h1> */}
                        <div className="listing">
                            <div className="listing-thumbnail">
                                <Link to="/listing-details-v1"><img src={item.picture} alt="listing" style={{ width: 400, height: 200 }} /></Link>
                                <div className="listing-badges">
                                    {
                                        item.star === true ? <span className="listing-badge featured"> <i className="fas fa-star" /> </span> : ''
                                    }
                                    {
                                        item.sale === true ? <span className="listing-badge sale">On Sale</span> : ''
                                    }
                                    {
                                        item.pending === true ? <span className="listing-badge pending"> Pending</span> : ''
                                    }
                                    {
                                        item.rental === true ? <span className="listing-badge rent"> Rental</span> : ''
                                    }
                                </div>
                                <div className="listing-controls">
                                    <Link className="favorite" style= {{backgroundColor:'#E52E2E'}}><i className="far fa-heart" style= {{color:'white'}} onClick={() => onunFav(item)} /></Link>
                                    {/* <Link to="#" className="compare"><i className="fas fa-sync-alt" /></Link> */}
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
                                <span className="listing-price">{new Intl.NumberFormat().format((item.price).toFixed(2))}$ <span></span> </span>
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
                                    <Link to="/listing-details-v1" className="btn-custom btn-sm secondary">View Details</Link>
                                    {/* <OverlayTrigger overlay={gallerytip}>
                                        <Link to="#" className="listing-gallery"> <i className="fas fa-camera" /> </Link>
                                    </OverlayTrigger> */}
                                </div>
                            </div>
                        </div>
                    </div>
                })}
                {/* Listing End */}

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

    );

}


export default Savedlists;