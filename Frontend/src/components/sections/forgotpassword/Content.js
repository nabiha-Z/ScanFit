import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import Slider from 'react-slick';
import { forgotPassword } from '../../../api';
import 'antd/dist/antd.css';
import { message, Space } from 'antd';


const images = [
    { img: 'assets/img/coming-soon/1.jpg', title: "Quote of the day", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s" },
    { img: 'assets/img/coming-soon/2.jpg', title: "Quote of the day", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s" },
    { img: 'assets/img/coming-soon/3.jpg', title: "Quote of the day", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s" },
];

function Content() {


    const routerHistory = useHistory();
    const [email, setEmail] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [check, setCheck] = useState(false);
    const [OTP, setOTP] = useState("");
    const [data, setData] = useState({
        digit1:"", 
        digit2:"", 
        digit3:"", 
        digit4:"", 
        isValidOTP:false
    })


    const settings = {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        dots: true,
        dotsClass: "d-flex slick-dots",
    }


    const sendCode = async () => {
        setLoading(true);
        await forgotPassword({
            email: email

        })
            .then(function (response) {
                console.log(response.data);
                if (response.data.message === true) {
                    setLoading(false);
                    message.success(response.data.success)
                    console.log("resetCode: ", response.data.resetCode)
                    setOTP(response.data.resetCode)
                    setCheck(true)
                } else {
                    //alert("not found");
                    message.error(response.data.error)
                }

            })
            .catch(function (error) {

            });
    }

    const verifyOTP = () =>{
        const userCode = data.digit1 + '' + data.digit2 + '' + data.digit3 + '' + data.digit4;
        let code = OTP.toString();
        if (code === userCode) {
            setData({
                ...data,
                isValidOTP: true
            })
            routerHistory.push({pathname:'/resetpassword', state:{email:email}});
        } else {
            console.log("wrong");
            message.error("Invalid OTP")
            setData({
                ...data,
                isValidOTP: false
            })
        }
    }
    return (
        <div className="acr-auth-container">
            <div className="acr-auth-content">
                {check?(
                    <>
                    <form onSubmit={e => { e.preventDefault(); }} >
                    <div className="auth-text">
                        <h3>Enter OTP Code</h3>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>

                    </div>
                    <div className="form-group">
                        <label>Code</label>
                        <div style={{display:'flex',flexDirection:'row', margin:10,}}>
                        <input type="text" className="form-control form-control-light" placeholder="" name="digit1" style={{width:50, margin:6, textAlign:'center'}} value={data.digit1} onChange={(e) => setData({...data, digit1:e.target.value})} required />
                        <input type="text" className="form-control form-control-light" placeholder="" name="digit2" style={{width:50, margin:6, textAlign:'center'}} value={data.digit2} onChange={(e) => setData({...data, digit2:e.target.value})} required />
                        <input type="text" className="form-control form-control-light" placeholder="" name="digit3" style={{width:50, margin:6, textAlign:'center'}} value={data.digit3} onChange={(e) => setData({...data, digit3:e.target.value})} required />
                        <input type="text" className="form-control form-control-light" placeholder="" name="digit4" style={{width:50, margin:6, textAlign:'center'}} value={data.digit4} onChange={(e) => setData({...data, digit4:e.target.value})} required />
                        </div>
                        
                    </div>


                    <button className="btn-custom secondary btn-block" onClick={() => verifyOTP()}>Verify</button>
                </form>
                    </>
                ):(
                    <>
                    <form onSubmit={e => { e.preventDefault(); }} >
                    <div className="auth-text">
                        <h3>Forgot Password?</h3>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>


                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="text" className="form-control form-control-light" placeholder="Your Email" name="username" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>


                    <button className="btn-custom secondary btn-block" onClick={() => sendCode()}>{isLoading?"... sending":"Send OTP Code"}</button>

                    <p className="text-center mb-0" style={{textAlign:"left"}}>Don't have an account? <Link to="/register">Create One</Link> </p>
                </form></>
                )}
                
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