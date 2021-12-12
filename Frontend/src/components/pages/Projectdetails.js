import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Header';
import HeaderFour from '../layouts/Headerfour';
import Footer from '../layouts/Footer';
import Cookies from 'js-cookie';
import Content from '../sections/project-details/Content';

class Projectdetails extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Acres - Real Estate React Template | Project Details</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                {Cookies.get('mail') === undefined ? <HeaderFour/> : <Header/>}
                <Content/>
                <Footer/>
            </Fragment>
        );
    }
}

export default Projectdetails;