import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Headerfour';
import Footer from '../layouts/Footerthree';
import Content from '../sections/fetchCategories/fetchCategories';

class Fetchcategory extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Category</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <Header/>
                <Content/>
                <Footer/>
            </Fragment>
        );
    }
}
export default  Fetchcategory