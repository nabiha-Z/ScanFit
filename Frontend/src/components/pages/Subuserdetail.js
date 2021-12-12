import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Headerfour';
import Footer from '../layouts/Footerthree';
import Subusertable from '../sections/subUserDetail/Subusertable';

class Fetchcategory extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Subusers</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <Header/>
                     <Subusertable/>          
                <Footer/>
            </Fragment>
        );
    }
}
export default  Fetchcategory