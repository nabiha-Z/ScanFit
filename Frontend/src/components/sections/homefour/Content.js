import React, { Component, Fragment } from 'react';
import Banner from './Banner';
import Categories from './Categories';
import Blockcta from '../../layouts/Blockcta';
import App from '../../layouts/App';
import CompanySlider from '../../layouts/CompanySlider';
import Faqs from './Faqs';
import Recentlistings from './Recentlistings';
import Latestblog from '../home/Latestblog';


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
                <CompanySlider/>
                <Recentlistings/>
                {/* <Latestblog/> */}
               
            </Fragment>
        );
    }
}

export default Content;