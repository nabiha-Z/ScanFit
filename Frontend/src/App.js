import React, { Suspense, useEffect,useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import { loginuser } from './api';



// Preloader
const Preloader = React.lazy(() => import("./components/layouts/Preloader"));

// Home Page
const Home = React.lazy(() => import("./components/pages/Homefour"));
// Pages
const About = React.lazy(() => import("./components/pages/About"));
const Faq = React.lazy(() => import("./components/pages/Faq"));
const Contact = React.lazy(() => import("./components/pages/Contact"));
const Comingsoon = React.lazy(() => import("./components/pages/Comingsoon"));
const Error = React.lazy(() => import("./components/pages/Error"));
const Login = React.lazy(() => import("./components/pages/Login"));
const forgotPass = React.lazy(() => import("./components/pages/Forgotpassword"));
const resetPass = React.lazy(() => import("./components/pages/Resetpassword"));
const Register = React.lazy(() => import("./components/pages/Register"));
// Listings
const ProductsList = React.lazy(() => import("./components/pages/ProductsList"));
const Listingdetailsone = React.lazy(() => import("./components/pages/Listingdetailsone"));
const Submitlisting = React.lazy(() => import("./components/pages/Submitlisting"));
const Profile = React.lazy(() => import("./components/pages/Profile"));
const FilterList = React.lazy(() => import("./components/pages/Searchlist"));
const SavedFavourites = React.lazy(() => import("./components/pages/Profilesavedlistings"));
const Fetchcategories = React.lazy(() => import("./components/pages/Fetchcategory"));

function App() {
  const [user,setuser]=useState({});
  const [comingsoon, setcomingsoon] = useState(false);

  useEffect(()=>{

    loginuser({
        token:Cookies.get('token')
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


  })
  return (
    <Router>
      <Suspense fallback={<div></div>}>
        <Preloader />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/coming-soon" component={Comingsoon} />
          <Route path="/products" component={ProductsList} />
          <Route path="/login" component={Login} />
          <Route path="/forgotpassword" component={forgotPass} />
          <Route path="/resetpassword/:user" component={resetPass} />
          <Route path="/register" component={Register} />
          <Route path="/profile" component= {Profile} />
          <Route path="/favourites" component={SavedFavourites} />
          
          {/* Coming Soon Pages */}
          {!comingsoon? <Redirect to="/coming-soon" />
          :
          <>
          <Route path="/about" component={About} />
          <Route path="/faq" component={Faq} />
          <Route path="/error-404" component={Error} />
          <Route path="/listing-details-v1" component={Listingdetailsone} />
          <Route path="/submit-listing" component={Submitlisting} />
          <Route path="/filterList" component={FilterList} />
          <Route path="/categories/:category" component={Fetchcategories} />
          </>
        }
          
         
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
