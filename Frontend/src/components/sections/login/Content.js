import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import Slider from 'react-slick';
import axios from 'axios';
import store from '../../../redux/store.js';
import Cookies from 'js-cookie';
import {login} from '../../../api/index';


const images = [
    { img: 'images/img8.jpg', title: "Quote of the day", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s" },
    { img: 'images/img1.png', title: "Quote of the day", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s" },
    { img: 'images/img2.png', title: "Quote of the day", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s" },
];

function Content(){


    const routerHistory = useHistory();
    const [password, setpassword] = useState("");
    const [email, setemail] = useState("");
    const [error, seterror] = useState([]);


    const settings = {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        dots: true,
        dotsClass: "d-flex slick-dots",
    }
    const API = async() => {
        console.log(email, password)
        await login( {
            email: email, password: password

        })
            .then(function (response) {
                //   console.log(response);
                if (response.data.message === true) {
                   console.log("token: ", response.data.token);
                   try {
                    Cookies.set('token', response.data.token);
                    const type= response.data.user.type;
                    Cookies.set('mail',email);
                    routerHistory.push('./profile');
                  } catch (e) {
                    return null;
                  }
                    
                } else if (response.data.message === "false") {
                    seterror("Login Failed");
                }

            })
            .catch(function (error) {

            });
    }

    return (
        <div className="acr-auth-container">
            <div className="acr-auth-content">
                <form onSubmit={e => { e.preventDefault(); }} >
                    <div className="auth-text">
                        <h3>Log Into Your Account</h3>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>

                        <h4 style={{ color: '#C72C2C', fontWeight: 20, fontSize: 20 }}>{error}</h4>
                    </div>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control form-control-light" placeholder="Username" name="username" value={email} onChange={(e) => setemail(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control form-control-light" placeholder="Password" name="password" value={password} onChange={(e) => setpassword(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <Link to="/forgotpassword" className="forgot-password">Forgot Password?</Link>
                    </div>
                    <button className="btn-custom secondary btn-block" onClick={() => API()}>Login</button>
                    <div className="auth-seperator">
                        <span>OR</span>
                    </div>
                    <div className="social-login">

                        <button type="button" className="acr-social-login google"><i className="fab fa-google" /> Continue with Google</button>
                    </div>
                    <p className="text-center mb-0">Don't have an account? <Link to="/register">Create One</Link> </p>
                </form>
            </div>
            <div className="acr-auth-bg">
                <Slider className="acr-auth-bg-slider acr-cs-bg-slider" {...settings}>
                    {images.map((item, i) => (
                        <div key={i}>
                            <div className="acr-cs-bg-item bg-cover bg-center" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/" + item.img + ")" }} >
                                <div className="acr-auth-quote">
                                    <h6>{item.title}</h6>
                                    <p>{item.text}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}


export default Content;