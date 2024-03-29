import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Headerfour';
import Footer from '../layouts/Footerthree';
import Content from '../sections/homefour/Content';

class Homefour extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Outfit Adobe | Homepage</title>
                </MetaTags>
                <Header/>
                <Content/>
                <Footer/>
            </Fragment>
        );
    }
}

export default Homefour;