import React, { Component,useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { loginuser,requestListing } from '../../api';
import { useHistory } from 'react-router';

const Userbreadcrumb =()=>  {
    const [user,setuser]=useState({});
    let history = useHistory();

    useEffect(() => {
        loginuser({
            token:Cookies.get('token')
        })
            .then(function (response) {
                //   console.log(response);
                if (response.data.message == "true") {
                   try {
                   setuser(response.data.user);
                   
                  } catch (e) {
                    return null;
                  } 
                } else if (response.data.message === "false") {
                  
                }
    
            })
            .catch(function (error) {
    
            });
        
    }, [user])

    const Submit = ()=>{

        history.push('/submit-listing');

    }

    const onRequest = ()=>{
        
        requestListing({
            token: Cookies.get('token')
            
        })
        .then(function (response) {
            
            user=null;
            console.log(response.data.message);
            
        })
        
        .catch(function (error) {

        });
        
        

    }

    const checkLimit = () =>{
        console.log("user = ", user.limit)
        if(user.limit > 1){
            alert("you cannot add more listings")
        }
    }
        return (
            <div className="subheader subheader-2 user-subheader bg-cover bg-center" style={{ backgroundImage: "url(/homeImg.jpg)" }}>
                <div className="container">
                    <div className="media">
                        <img src={process.env.PUBLIC_URL + "/assets/img/people/1.jpg"} alt="agent" />
                        <div className="media-body">
                            <h3 className="text-white">{user.name}</h3>
                            <span className="user-email">{user.email}</span>
                        </div>
                    
                         {/* (<button  className="btn-custom secondary mr-0"  onClick={()=>onRequest()}>Request Listings <i className="fas mr-0 fa-plus" /> </button>)} */}
                        
                    </div>
                </div>
            </div>
        );
    }


export default Userbreadcrumb;