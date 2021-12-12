import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Header';
import Breadcrumb from '../layouts/Userbreadcrumb';
import Footer from '../layouts/Footer';
import Content from '../sections/profile/Content';

class Profile extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>My Account</title>
                </MetaTags>
                <Header/>
                <Breadcrumb/>
                <Content/>
                <Footer/>
            </Fragment>
        );
    }
}

export default Profile;