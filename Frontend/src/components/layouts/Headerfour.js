import React, { Fragment, useState, useEffect } from 'react';
import Menu from '../layouts/Menu';
import Mobilemenu from '../layouts/Mobilemenu';
import HeaderComponent from '../../helper/Navigationhelper';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import Cookies from 'js-cookie';
import { loginuser, requestListing } from '../../api';
import { useHistory } from 'react-router';



const Headerfour = () => {
    const [user, setuser] = useState({});
    const [navtoggle, setnavtoggle] = useState(false);
    let history = useHistory();

    useEffect(() => {
        loginuser({
            token: Cookies.get('token')
        })
            .then(function (response) {
                console.log("header rewsponse", response);
                if (response.data.message == "true") {
                    try {
                        setuser(response.data.user);
                        console.log("limit=", response.data.user.limit)
                    } catch (e) {
                        return null;
                    }
                } else if (response.data.message === "false") {

                }

            })
            .catch(function (error) {

            });

    }, []);

    const navtoggleClass = () => {
        setnavtoggle(!navtoggle)
    }

    return (
        <Fragment>
            {/* Aside (Mobile Navigation) */}
            <aside className={classNames("main-aside", { "open": navtoggle })}>
                <div className="aside-title">
                    <div className="aside-controls aside-trigger">
                        <h4>Menu</h4>
                        <div className="close-btn close-dark" onClick={() => navtoggleClass()} >
                            <span />
                            <span />
                        </div>
                    </div>
                </div>
                <Mobilemenu />
            </aside>
            <div className="aside-overlay aside-trigger" onClick={() => navtoggleClass()} />
            {/* Header Start */}
            <header className="main-header">
                {/* Top Header Start */}
                <div className="top-header">
                    <div className="container">
                        <div className="top-header-inner">

                            <ul className="top-header-nav">
                                {Cookies.get('mail') === undefined ? <><li> <Link to="/login">Login</Link> </li>
                                    <li>or</li>
                                    <li> <Link to="/register"> Signup</Link> </li></> : <Link className="logout" to="/" onClick={() => {
                                        Cookies.remove('token');
                                        Cookies.remove('mail');
                                    }}><i className="flaticon-shut-down-button" /> Logout</Link>}
                            </ul>
                        </div>
                    </div>
                </div>
                {/* Top Header End */}
                <nav className="navbar" >
                    <div className="container">
                        {/* Menu */}
                        <Menu />
                        <div className="header-controls">
                            <ul className="header-controls-inner d-none d-lg-flex">

                                <li>
                                    <Link>
                                    <img
                                        src={"/cart.png"}
                                        alt="cart"
                                        style={{ width: '40%', height: 'auto' }}
                                    />
                                    </Link>
                                </li>

                            </ul>
                            {/* Toggler */}
                            <div className="aside-toggler aside-trigger" onClick={() => navtoggleClass()} >
                                <span />
                                <span />
                                <span />
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
            {/* Header End */}
        </Fragment>
    );
}


export default Headerfour;