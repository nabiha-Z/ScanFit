import React, { Component, Fragment } from 'react';
import Banner from './Banner';
import Categories from './Categories';
import CompanySlider from '../../layouts/CompanySlider';
import LatestProducts from './Latest';


class Content extends Component {
    render() {
        return (
            <Fragment>
                <Banner />
                <Categories />
                <div className="section section-padding pt-0">
                
                </div>
                <div className="acr-footer footer-2">
                    {/* <App /> */}
                </div>
                <LatestProducts/>
                {/* <Latestblog/> */}
               
            </Fragment>
        );
    }
}

export default Content;