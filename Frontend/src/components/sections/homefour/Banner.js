import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import dropDown from './drop-down.css';
import { fetchCategory, fetchLocations, searchLists } from '../../../api';
import './home.css'

const units = ["acre", "sqft", "marla", "canal", "sqyd"];
const pricelist = ["60-90", "90-120", "120-150", "150-200", "600-800", "1000-1200"]

function Banner() {

    const routerHistory = useHistory();
    const [locations, setlocations] = useState([]);
    const [categories, setcategories] = useState([]);
    const [categ, setcateg] = useState();
    const [price, setprice] = useState("60-90");

    const [area, setarea] = useState(70);
    const [loc, setloc] = useState();
    const [unit, setunit] = useState("acre");
    const [address, setAddress] = useState("");
    const [searched, setsearched] = useState([]);


    return (
        <div className="banner banner-1 banner-3 light-overlay bg-cover bg-center" style={{ backgroundColor:'white' }}>
            <div className="container-fluid" style={{justifyContent:'center', alignContent:'center', alignItems:'center'}}>
                <div className="banner-item" >
                <div className="banner-inner" style={{display:'flex', flexDirection:'row'}}>
                        <div id='box'> 
                        <h2 className="animate__animated animate__fadeInLeft" id='boxText2' style={{ animationDelay:'0s', animationDuration:'3s'}}>TRY THE NEW</h2>
                        <h2 className="animate__animated animate__fadeInLeft" id="boxText3" style={{ animationDelay:'0s', animationDuration:'3s'}}>LOOK</h2>
                        <p className="animate__animated animate__fadeInLeft" id="boxText" style={{ animationDelay:'1s', animationDuration:'2s'}}>The forecast says that dress season has officially arrived! Spring forward with our swing, springy, dress shop.</p>
                        </div>
                    <img className="animate__animated animate__fadeInUp" src="/images/headerImg1.jpg" id="image2" style={{ animationDelay:'0.1s', animationDuration:'3s'}}/>
                        {/* <div className="banner-text">
                            <h1 className="title text-white">Don't Fear It <br/> Just Wear It</h1>
                            <p className="subtitle text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
                        </div> */}
                        
                        {/* <div className="acr-filter-form" style={{ width: '90%' }}>
                           
                        </div> */}
                   <img className="animate__animated animate__fadeInUp" src="/images/headerImg2.jpg" id="image1" style={{ animationDelay:'0.5s', animationDuration:'3s'}}/>
                </div>  
                
                </div>
            </div>
        </div>
    );

}

export default Banner;