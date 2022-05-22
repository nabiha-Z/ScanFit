import React, { Component, Fragment, useState, useEffect } from 'react';
import Banner from './Banner';
import Categories from './Categories';

import CompanySlider from '../../layouts/CompanySlider';
import LatestProducts from './Latest';
import Cookies from 'js-cookie';
import 'antd/dist/antd.css';
import { message } from 'antd';
import RecommendationSlider from './RecommendationSlider';
import { recommendations } from '../../../api/index';


function Content (){

    const [check, setCheck] = useState(false);
    const [products, setProducts] = useState([]);

    const recommendation = async () => {
      console.log("Cookies.get('counts'):"  ,Cookies.get('counts'))
     
        await recommendations({ counts: Cookies.get('counts') })
          .then(function (response) {
            //console.log(response);
           
            if (response.data.message == true) {
              try {
                setProducts(response.data.products)
                console.log("true")
                // setCheck(!check)
              } catch (e) {
                return null;
              }
            } else {
              message.error(response.data.error)
            }
          })
          .catch(function (error) {
    
          });
      }
    
    
    
      useEffect(() => {
        recommendation();
      },[check])

        return (
            <Fragment>
                <Banner />
                <Categories />
                <div className="section section-padding pt-0">
                
                </div>
                <div className="acr-footer footer-2">
                    {/* <App /> */}
                </div>
                <RecommendationSlider products={products}/>
                <LatestProducts check={check} setCheck={setCheck}/>
                {/* <Latestblog/> */}
               
            </Fragment>
        );
    
}

export default Content;