import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
class Menu extends Component {
 
  render() {
    return (
      <Fragment>
        {/* Logo */}
        <Link className="navbar-brand" to="/">
          
          <img
            src={ "/logo2.png"}
            alt="logo"
            style={{width:'100%', height:'auto'}}
          />
        </Link>
        {/* Menu */}
        <ul className="navbar-nav">
          <li className="menu-item menu-item-has-children">
            <Link to="/" >Home</Link>
          </li>
          <li className="menu-item menu-item-has-children">
            <Link to="/products">Products</Link>
          </li>
          <li className="menu-item menu-item-has-children">
            <Link to="/about" >About Us</Link>
          </li>
          <li className="menu-item menu-item-has-children">
            <Link to="/faq">Cart</Link>
          </li>

        
          <li className="menu-item menu-item-has-children">
            {Cookies.get("mail") === undefined ? (
              ""
            ) : (
              <Link to="/profile">My Account</Link>
            )}

          
          </li>
        
        </ul>
      </Fragment>
    );
  }
}

export default Menu;
