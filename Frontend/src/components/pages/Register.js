import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Headerfour';
import Content from '../sections/register/Content';

class Register extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Outfit Adobe | Register</title>
                
                </MetaTags>
                <Header/>
                <Content/>
            </Fragment>
        );
    }
}

export default Register;