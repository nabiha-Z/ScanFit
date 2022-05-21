import React, { useState } from 'react';
import Topbar from "./components/topbar/Topbar";
import { IntlProvider } from 'react-intl';
import Sidebar from "./components/sidebar/Sidebar";
import messages from './messages';
import "./App.css";
import Home from "./pages/Products/index";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewProduct from "./pages/newProduct/NewProduct";
import Product from "./pages/product/Product";
import Login from "./pages/Login/Login";
import Payment from "./pages/Payment/payment";
import Contact from "./pages/ContactMsgs/messages";
import './styles/app.scss';

function App() {
  const [locale, setLocale] = useState('en');

  const [rtl, setRtl] = useState(false);
  const [show, setShow] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [image, setImage] = useState(true);
  const [toggled, setToggled] = useState(false);

  const handleCollapsedChange = (checked) => {
    setCollapsed(checked);
  };

  const handleRtlChange = (checked) => {
    setRtl(checked);
    setLocale(checked ? 'ar' : 'en');
  };
  const handleImageChange = (checked) => {
    setImage(checked);
  };

  const handleToggleSidebar = (value) => {
    console.log("val:", value)
    setToggled(value);
  };

  return (
    <Router>
      {/* <Topbar /> */}
      <IntlProvider locale={locale} messages={messages[locale]}>
        <div className="container" style={{ margin:0,marginLeft:-20}}>
          {show ? (
            <Sidebar
              image={image}
              collapsed={collapsed}
              rtl={rtl}
              toggled={toggled}
              setCollapsed={setCollapsed}
              handleToggleSidebar={handleToggleSidebar}
              handleCollapsedChange={handleCollapsedChange} />

          ) : ""}

          <Switch>
            <Route exact path="/">
              <Login
                show={show}
                setShow={setShow} />
            </Route>

            <Route exact path="/home">
              <Home
               show={show}
               setShow={setShow}
                toggled={toggled}
                collapsed={collapsed}
                rtl={rtl}
                handleToggleSidebar={handleToggleSidebar}
                handleCollapsedChange={handleCollapsedChange}
                handleRtlChange={handleRtlChange}
                handleImageChange={handleImageChange} />
            </Route>

            <Route exact path="/users">
              <UserList
                toggled={toggled}
                collapsed={collapsed}
                rtl={rtl}
                handleToggleSidebar={handleToggleSidebar}
                handleCollapsedChange={handleCollapsedChange}
                handleRtlChange={handleRtlChange}
                handleImageChange={handleImageChange} />
            </Route>

            <Route exact path="/payment">
              <Payment
                toggled={toggled}
                collapsed={collapsed}
                rtl={rtl}
                handleToggleSidebar={handleToggleSidebar}
                handleCollapsedChange={handleCollapsedChange}
                handleRtlChange={handleRtlChange}
                handleImageChange={handleImageChange} />
            </Route>

            <Route exact path="/messages">
              <Contact
                toggled={toggled}
                collapsed={collapsed}
                rtl={rtl}
                handleToggleSidebar={handleToggleSidebar}
                handleCollapsedChange={handleCollapsedChange}
                handleRtlChange={handleRtlChange}
                handleImageChange={handleImageChange} />
            </Route>

            <Route exact path="/newProduct">
              <NewProduct
                toggled={toggled}
                collapsed={collapsed}
                rtl={rtl}
                handleToggleSidebar={handleToggleSidebar}
                handleCollapsedChange={handleCollapsedChange}
                handleRtlChange={handleRtlChange}
                handleImageChange={handleImageChange} />
            </Route>


          </Switch>
        </div>
      </IntlProvider>
    </Router>
  );

}

export default App;
