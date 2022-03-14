import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Headerfive';
import Content from '../sections/resetpassword/Content';

class Forgotpassword extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Outfit Adobe | Reset Password</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <Header/>
                <Content/>
            </Fragment>
        );
    }
}

export default Forgotpassword;