import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Header';
import Breadcrumb from '../layouts/Breadcrumb';
import Footer from '../layouts/Footer';
import Content from '../sections/projects/projectgrid';

class Projectgrid extends Component {
   
    render() {
      
        return (
            <Fragment>
                <MetaTags>
                    <title>Re Marketing | Listing Grid</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <Header/>
                <Breadcrumb breadcrumb={{pagename:'Project Grid'}} />
                <Content/>
                <Footer/>
            </Fragment>
        );
    }
}

export default Projectgrid;