import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Header';
import Breadcrumb from '../layouts/Breadcrumb';
import Footer from '../layouts/Footer';
import Content from '../sections/listinggrid/Content';

class Listinggrid extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Outfit Adobe | Products</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <Header/>
                <Breadcrumb breadcrumb={{pagename:'Products'}} />
                <Content/>
                <Footer/>
            </Fragment>
        );
    }
}

export default Listinggrid;