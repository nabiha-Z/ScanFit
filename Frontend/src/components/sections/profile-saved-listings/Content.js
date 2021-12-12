//import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import Saved from './Savedlists';
import { savedListings } from '../../../api';
import Bounce from "react-activity/dist/Bounce";
import "react-activity/dist/Bounce.css";


function Content () {

    const[saved,setSaved] = useState([]);
    const[isFetching,setFetching] = useState(false);
    const savedLists = [];

   
    
    const loadSaved =async()=>{
        setFetching(true);
        const token = Cookies.get("token");
        const user=jwt_decode(token);
        const id = user.id;

        console.log(id);
        console.log("in funct");
    
        await savedListings({id})
    
        .then(function (response) {
            console.log("response", response.data);
           if(response.data.message === true){
             console.log("type="+typeof(response.data.favorites));
            // console.log("list "+response.data.favorites[0].title);
            
            setSaved(response.data.favorites);
            
            // console.log("fdsfdferwed2342");
            // console.log("saved "+saved[0].title);
            // console.log("savedlength"+saved.length);
           }
            setFetching(false);
           })
           .catch(function (error) {
    
           });
    
    }
    useEffect(()=>{

        loadSaved();
        
    },[saved.length===0]);

    const LoadingData = () => {
        return (
            <>
                <div lassName="col-lg-8" style={{  justifyContent:"center", color: "#59B0CD", fontSize: "80" }}>
                    <Bounce size='20'/>;
                </div>
            </>
        );
    };

    const SavedLists = () => {
        return (
            <>
               <div className="col-lg-8" >
                    <Saved list={saved}/>
                </div>
            </>
        );
    };

        return (
            <div className="section">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-4">
                            <div className="sidebar sticky-sidebar user-nav sidebar-left">
                                <ul>
                                    <li> <Link to="/profile"> Edit Profile</Link> </li>
                                    <li> <Link to="/profile-listings">My Listings</Link> </li>
                                    <li> <Link className="active" to="/profile-saved-listings">Saved Listings</Link> </li>
                                    <li> <Link className="logout" to="/" onClick={()=>{Cookies.remove('token');
                                Cookies.remove('mail');
                                }}><i className="flaticon-shut-down-button" /> Logout</Link> </li> </ul>
                            </div>
                        </div>
                        {/* <h1>hii</h1> */}
                        {saved.length===0 ? (
                        <div className="col-lg-8">
                            <div className="acr-empty-section">
                                <i className="flaticon-home" />
                                <h3>You Haven't Saved Any Listings</h3>
                                <p>You still havent saved any listings yet, Go back to the listings page and check some of your favorite listings</p>
                                <Link to="/listing-map" className="btn-custom">Go to Listings</Link>
                            </div>
                        </div>) :
                            
                            // isFetching || saved.length===0? <LoadingData/> : 
                             <SavedLists list={savedLists}/>
                            
                              
                              
                        }   
                        {/* 
                        <div className="col-lg-8">
                             <div className="acr-empty-section">
                                 <i className="flaticon-home" />
                                 <h3>You Haven't Saved Any Listings</h3>
                                 <p>You still havent saved any listings yet, Go back to the listings page and check some of your favorite listings</p>
                                 <Link to="/listing-map" className="btn-custom">Go to Listings</Link>
                             </div>
                         </div> */}
                    </div>
                </div>
            </div>
        );
        
   // }
}

export default Content;