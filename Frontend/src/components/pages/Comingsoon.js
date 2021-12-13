import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Content from '../sections/comingsoon/Content';

class Comingsoon extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Outfit Adobe | Coming Soon</title>
                </MetaTags>
                <Content/>
            </Fragment>
        );
    }
}

export default Comingsoon;