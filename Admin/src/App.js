import React, { useState, useEffect } from 'react';
import Topbar from "./components/topbar/Topbar";
import { IntlProvider } from 'react-intl';
import Sidebar from "./components/sidebar/Sidebar";
import messages from './messages';
import "./App.css";
import Cookies from 'js-cookie';
import Home from "./pages/Products/index";
import Product from "./pages/product/Product";
import User from "./pages/user/User";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/Login/Login";
import Payment from "./pages/Payment/payment";
import Contact from "./pages/ContactMsgs/messages";
import AllOrders from "./pages/orders/AllOrders";
import Completed from "./pages/orders/Completed";
import Pending from "./pages/orders/Pending";
import './styles/app.scss';
import { getOrders, getProducts } from './API/api';
import PageNotFound from './404Page';
import { message } from 'antd';


function App() {
  const [locale, setLocale] = useState('en');

  const [rtl, setRtl] = useState(false);
  const [show, setShow] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [image, setImage] = useState(true);
  const [orders, setOrders] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [pending, setPending] = useState([]);
  const [products, setProducts] = useState([]);
  const [check, setCheck] = useState(false);
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

  async function fetch() {
    await getOrders()
      .then(res => {
        
        setOrders(res.data.orders)
        var arr=[], arr2=[];
        res.data.orders.map((item) => {
          if (item.status === 'pending') {
            arr.push(item);
            console.log("pending: ",arr)
            setPending(arr)
          } else {
            arr2.push(item);
            setCompleted(arr2)
          }
        })

      })
      .catch(err => {
        alert(err);
      })
  }

  async function fetchProducts() {
    await getProducts()
      .then(res => {
        console.log("es.data.products: ", res.data.products)
        setProducts(res.data.products)

      })
      .catch(err => {
        message.error(err);
      })
  }
  useEffect(() => {

    fetch();
    fetchProducts();

  }, [check]);

  return (
    <Router>
      {/* <Topbar /> */}
     
      <IntlProvider locale={locale} messages={messages[locale]}>
        <div className="container" style={{ margin: 0, marginLeft: -20 }}>
          {Cookies.get('id') !== undefined ? show ? (
            <Sidebar
              image={image}
              collapsed={collapsed}
              rtl={rtl}
              toggled={toggled}
              setCollapsed={setCollapsed}
              handleToggleSidebar={handleToggleSidebar}
              handleCollapsedChange={handleCollapsedChange} />

          ) : "" :""}

          <Switch>
            <Route exact path="/">
              <Login
                show={show}
                setShow={setShow} />
            </Route>
            {console.log("cookie: ", Cookies.get('id'))}
            {Cookies.get('id') !== undefined ? (<> <Route exact path="/home">
              <Home
                show={show}
                check={check}
                setCheck={setCheck}
                products={products}
                setShow={setShow}
                toggled={toggled}
                handleToggleSidebar={handleToggleSidebar}
              />
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

              <Route exact path="/allorders">
                <AllOrders
                  orders={orders}
                  show={show}
                  setShow={setShow}
                  toggled={toggled}
                  handleToggleSidebar={handleToggleSidebar} />
              </Route>

              <Route exact path="/completed">
                <Completed
                  orders={completed}
                  show={show}
                  setShow={setShow}
                  toggled={toggled}
                  handleToggleSidebar={handleToggleSidebar} />
              </Route>

              <Route exact path="/pending">
                <Pending
                  orders={pending}
                  show={show}
                  setShow={setShow}
                  toggled={toggled}
                  handleToggleSidebar={handleToggleSidebar} />
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
              </Route></>) : (<PageNotFound/>)}

          </Switch>
        </div>
      </IntlProvider>
    </Router>
  );

}

export default App;
