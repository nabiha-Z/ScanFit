import React, { Fragment, useState, useEffect } from 'react';
import Menu from '../layouts/Menu';
import Mobilemenu from '../layouts/Mobilemenu';
import HeaderComponent from '../../helper/Navigationhelper';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import Cookies from 'js-cookie';
import './header.css';
import { loginuser } from '../../api';
import { useHistory } from 'react-router';



const Headerfour = () => {
    const [user, setuser] = useState({});
    const [navtoggle, setnavtoggle] = useState(false);
    const [navbar, setNavbar] = useState(false)


    const changeBackground = () => {
      
        if (window.scrollY >= 300) {
            setNavbar(true)
        } else {
            setNavbar(false)
        }
    }

    useEffect(() => {
        loginuser({
            id: Cookies.get('id')
        })
            .then(function (response) {
                //  console.log("header rewsponse", response);
                if (response.data.message == true) {
                    try {
                        setuser(response.data.user);

                    } catch (e) {
                        return null;
                    }
                } else if (response.data.message === false) {

                }

            })
            .catch(function (error) {

            });

            window.addEventListener("scroll", () => {
                
                     changeBackground()
                
            })
            
        
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
            <header className="main-header" id={navbar? "coloredHeader":"transparentHeader" }>
                <nav className="navbar" >
                    <div className="container">
                        {/* Menu */}
                        <Menu />
                        <div className="header-controls">
                            <ul className="header-controls-inner d-none d-lg-flex">

                                {Cookies.get('mail') === undefined ? <>
                                    <li className="menu-item menu-item-has-children" > <Link to="/login" id="loginBtn">Login</Link> </li>
                                    <li>or</li>
                                    <li className="menu-item menu-item-has-children" > <Link to="/register" id="loginBtn"> Signup</Link> </li></> : <li>
                                    <Link>
                                        <img
                                            src={"/cart.png"}
                                            alt="cart"
                                            style={{ width: '40%', height: 'auto' }}
                                        />
                                    </Link>
                                </li>}


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