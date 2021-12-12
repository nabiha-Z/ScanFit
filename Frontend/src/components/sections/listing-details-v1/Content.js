import React, { useState, Fragment } from 'react';
import Banner from './Banner';
import Listingwrapper from './Listingwrapper';
import { useLocation } from 'react-router';

function Content() {

    var listing = [];
    let location = useLocation();
    if(location.state != undefined){
    listing = location.state.listing;
    
    }

    
    
        return (
            <Fragment>
                <Banner list={listing}/>
                <Listingwrapper list={listing}/>
            </Fragment>
        );
    }


export default Content;