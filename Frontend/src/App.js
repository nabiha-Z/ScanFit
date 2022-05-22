import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import { loginuser, recommendations } from './api';



// Preloader
const Preloader = React.lazy(() => import("./components/layouts/Preloader"));

// Home Page
const Home = React.lazy(() => import("./components/pages/Homefour"));
// Pages
const About = React.lazy(() => import("./components/pages/About"));
const Faq = React.lazy(() => import("./components/pages/Faq"));
const Comingsoon = React.lazy(() => import("./components/pages/Comingsoon"));
const Error = React.lazy(() => import("./components/pages/Error"));
const Login = React.lazy(() => import("./components/pages/Login"));
const forgotPass = React.lazy(() => import("./components/pages/Forgotpassword"));
const resetPass = React.lazy(() => import("./components/pages/Resetpassword"));
const Register = React.lazy(() => import("./components/pages/Register"));
const Cart = React.lazy(() => import("./components/pages/Cart"));
const ProductsList = React.lazy(() => import("./components/pages/ProductsList"));
const ProductDetails = React.lazy(() => import("./components/pages/ProductDetails"));
const Listingdetailsone = React.lazy(() => import("./components/pages/Listingdetailsone"));
const Profile = React.lazy(() => import("./components/pages/Profile"));
const Measuremenets = React.lazy(() => import("./components/pages/Measurements"));
const SearchProduct = React.lazy(() => import("./components/pages/SearchProduct"));
const ViewFavourites = React.lazy(() => import("./components/pages/ViewFavourites"));

function App() {
  const [user, setuser] = useState({});
  const [check , setCheck] = useState(false);
  const [comingsoon, setcomingsoon] = useState(false);

  const fetch = async () => {
    await loginuser({
      token: Cookies.get('token')
    })
      .then(function (response) {
        //console.log(response);
        if (response.data.message == "true") {
          try {
            setuser(response.data.user);
            //  console.log(user);
          } catch (e) {
            return null;
          }
        } else if (response.data.message === "false") {

        }

      })
      .catch(function (error) {

      });
  }

  const recommendation = async () => {
    await recommendations({ counts: Cookies.get('counts') })
      .then(function (response) {
        //console.log(response);
        if (response.data.message == "true") {
          try {
            setuser(response.data.user);
            //  console.log(user);
          } catch (e) {
            return null;
          }
        } else if (response.data.message === "false") {

        }
      })
      .catch(function (error) {

      });
  }



  useEffect(() => {
    var counts = [0, 0, 0, 0, 0, 0];
    Cookies.set('counts', counts);
    fetch();
    recommendation();
  },[check])

  return (
    <Router>
      <Suspense fallback={<div></div>}>
        <Preloader />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/coming-soon" component={Comingsoon} />
          <Route path="/products" component={ProductsList} />
          <Route path="/details" component={ProductDetails} />
          <Route path="/login" component={Login} />
          <Route path="/forgotpassword" component={forgotPass} />
          <Route path="/resetpassword" component={resetPass} />
          <Route path="/register" component={Register} />
          <Route path="/profile" component={Profile} />
          <Route path="/measurements" component={Measuremenets} />
          <Route path="/favourites" component={ViewFavourites} />
          <Route path="/searchProducts" component={SearchProduct} />
          <Route path="/cart" component={Cart} />

          {/* Coming Soon Pages */}
          {!comingsoon ? <Redirect to="/coming-soon" />
            :
            <>
              <Route path="/about" component={About} />
              <Route path="/faq" component={Faq} />
              <Route path="/error-404" component={Error} />
              <Route path="/listing-details-v1" component={Listingdetailsone} />


            </>
          }


        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
