import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import { useLocation } from "react-router-dom";
import { resetPassword } from '../../../api';
import 'antd/dist/antd.css';
import { message, Space } from 'antd';


const images = [
    { img: 'assets/img/coming-soon/1.jpg', title: "Quote of the day", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s" },
    { img: 'assets/img/coming-soon/2.jpg', title: "Quote of the day", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s" },
    { img: 'assets/img/coming-soon/3.jpg', title: "Quote of the day", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s" },
];

function Content() {


    const routerHistory = useHistory();
    const location = useLocation();
    const [pass, setpassword] = useState("");
    const [error, setError] = useState("");
    const [confirmpassword, setconfirmpassword] = useState("");


    const settings = {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        dots: true,
        dotsClass: "d-flex slick-dots",
    }
    const user_email = location.state.email

    const validate = () => {
        console.log("validation");
        console.log("password= ", pass);
        console.log("confrim= ", confirmpassword);
        if (pass != confirmpassword) {
            setError("Passowrd doesn't match.")
            return false;
        } else {
            setError("");
            return true;
        }
    }

    const reset = async () => {
        if(validate()){
          await resetPassword({
            email: user_email, pass
      
          })
            .then(function (response) {
              console.log(response.data.message);
              if (response.data.message === true) {
      
               message.success(response.data.success);
               routerHistory.push('/login');
              }else{
                message.success(response.data.error);
              }
      
            })
            .catch(function (error) {
      
            });
        }
       
      }

    return (
        <div className="acr-auth-container">
            <div className="acr-auth-content">
                <form onSubmit={e => { e.preventDefault(); }} >
                    <div className="auth-text">
                        <h3>Reset your password</h3>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>


                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control form-control-light" placeholder="password" name="password" value={pass} onChange={(e) => setpassword(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input type="password" className="form-control form-control-light" placeholder="Confirm password" name="confirmpass" value={confirmpassword} onChange={(e) => setconfirmpassword(e.target.value)} required />
                    </div>
                    <h4 style={{ color: '#C72C2C', fontWeight:17, fontSize: 17 }}>{error}</h4>

                    <button className="btn-custom secondary btn-block" onClick={() => reset()}>Reset Password</button>

                    
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