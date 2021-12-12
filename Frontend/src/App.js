<<<<<<< HEAD
import React, { Suspense, useEffect,useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { loginuser } from './api';



// Preloader
const Preloader = React.lazy(() => import("./components/layouts/Preloader"));

// Home Pages
const Home = React.lazy(() => import("./components/pages/Homefour"));
// Blog
const Bloggrid = React.lazy(() => import("./components/pages/Bloggrid"));
const Bloglist = React.lazy(() => import("./components/pages/Bloglist"));
const Blogsingle = React.lazy(() => import("./components/pages/Blogsingle"));
// Pages
const About = React.lazy(() => import("./components/pages/About"));
const Services = React.lazy(() => import("./components/pages/Services"));
const Faq = React.lazy(() => import("./components/pages/Faq"));
const Pricing = React.lazy(() => import("./components/pages/Pricing"));
const Contact = React.lazy(() => import("./components/pages/Contact"));
const Comingsoon = React.lazy(() => import("./components/pages/Comingsoon"));
const Error = React.lazy(() => import("./components/pages/Error"));
const Login = React.lazy(() => import("./components/pages/Login"));
const forgotPass = React.lazy(() => import("./components/pages/Forgotpassword"));
const resetPass = React.lazy(() => import("./components/pages/Resetpassword"));
const Register = React.lazy(() => import("./components/pages/Register"));
const Legal = React.lazy(() => import("./components/pages/Legal"));
// Listings
const Listinggrid = React.lazy(() => import("./components/pages/Listinggrid"));
const Listinglist = React.lazy(() => import("./components/pages/Listinglist"));
const Listingmap = React.lazy(() => import("./components/pages/Listingmap"));
const Listingdetailsone = React.lazy(() => import("./components/pages/Listingdetailsone"));
const Listingdetailstwo = React.lazy(() => import("./components/pages/Listingdetailstwo"));
const Listingdetailsthree = React.lazy(() => import("./components/pages/Listingdetailsthree"));
const Submitlisting = React.lazy(() => import("./components/pages/Submitlisting"));
const Comparelistings = React.lazy(() => import("./components/pages/Comparelistings"));
// Agents
const Profile = React.lazy(() => import("./components/pages/Profile"));
const FilterList = React.lazy(() => import("./components/pages/Searchlist"));
const Profilelistings = React.lazy(() => import("./components/pages/Profilelistings"));
const Profilesavedlistings = React.lazy(() => import("./components/pages/Profilesavedlistings"));


const Fetchcategories = React.lazy(() => import("./components/pages/Fetchcategory"));

const Projectgrid = React.lazy(() => import("./components/pages/Projectgrid"));
const Projectdetails = React.lazy(() => import("./components/pages/Projectdetails"));

const Subuserdetail = React.lazy(() => import("./components/pages/Subuserdetail"));

function App() {
  const [user,setuser]=useState({});
  const [comingsoon, setcomingsoon] = useState(true);

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
          {/* Homepages */}
          <Route exact path="/" component={Home} />
          {/* <Route path="/home-v2" component={Hometwo} />
          <Route path="/home-v3" component={Homethree} />
          <Route path="/home-v4" component={Homefour} />
          <Route path="/home-v5" component={Homefive} /> */}
          {/* Blog */}
          <Route path="/blog-grid" component={Bloggrid} />
          <Route path="/blog-list" component={Bloglist} />
          <Route path="/coming-soon" component={Comingsoon} />
          <Route path="/blog-single" component={Blogsingle} />
          {/* Pages */}
          {!comingsoon? <Redirect to="/coming-soon" />
          :
          <>
          <Route path="/about" component={About} />
          <Route path="/services" component={Services} />
          <Route path="/faq" component={Faq} />
          <Route path="/pricing" component={Pricing} />
          <Route path="/contact" component={Contact} />
          <Route path="/error-404" component={Error} />
          <Route path="/login" component={Login} />
          <Route path="/forgotpassword" component={forgotPass} />
          <Route path="/resetpassword/:user" component={resetPass} />
          <Route path="/register" component={Register} />
          <Route path="/legal" component={Legal} />
          
          <Route path="/listing-grid" component={Listinggrid} />
          <Route path="/listing-list" component={Listinglist} />
          <Route path="/listing-map" component={Listingmap} />
          <Route path="/listing-details-v1" component={Listingdetailsone} />
          <Route path="/listing-details-v2" component={Listingdetailstwo} />
          <Route path="/listing-details-v3" component={Listingdetailsthree} />
          <Route path="/submit-listing" component={Submitlisting} />
          
          <Route path="/compare-listings" component={Comparelistings} />
         
          
          <Route path="/profile" component= {Profile} />
          <Route path="/filterList" component={FilterList} />
         
          <Route path="/profile-listings" component={Profilelistings} />
          <Route path="/profile-saved-listings" component={Profilesavedlistings} />
          
  
          <Route path="/categories/:category" component={Fetchcategories} />
          <Route path="/project-grid" component={Projectgrid}/>
          <Route path="/project-details" component={Projectdetails}/>
          <Route path="/subuserdetail" component={Subuserdetail} />
          </>
        }
          
         
        </Switch>
      </Suspense>
    </Router>
=======
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
>>>>>>> 5540d54a8763a067394209d24c81b73923fb9850
  );
}

export default App;
