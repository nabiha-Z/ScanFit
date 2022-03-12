import React from 'react';
import { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import './login.css';
import { login } from '../../API/api';
import 'antd/dist/antd.css';
import { message } from 'antd';

export default function Login({ show, setShow }) {
    setShow(false);
    const { innerWidth: width, innerHeight: height } = window;
    const [loginData, setLoginData] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    let history = useHistory();

    const checkLogin = async () => {

        await login({
            email: email, password: password
        })
            .then(function (response) {
                console.log("res: ", response.data)
                if (response.data.message === true) {
                    setShow(true);
                    history.push("/home");

                } else {
                    message.error("Invalid User")
                }
            })
            .catch(function (error) {
                message.error("Invalid User")
            });

    }

    return (
        <div className='container' style={{ justifyContent: 'center', alignItems: 'center', width: width }}>
            <section>
                <div class="color"></div>
                <div class="color"></div>
                {/* <div class="color"></div> */}
                <div className='box'>
                    <div className='containerr' style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <div className='form' >
                            <h2>Login Form</h2>
                            <form onSubmit={(e) => e.preventDefault()}>
                                <div className='inputBox'>
                                    <input type="email" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                                <div className='inputBox'>
                                    <input type="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} required />
                                </div>

                                <div className='inputBox'>
                                    <input type="submit" value="Login" onClick={(e) => {
                                        if (e.keyCode === 13) {
                                            alert("error")
                                            e.preventDefault();
                                        } else {
                                            checkLogin();
                                        }
                                    }
                                    } />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </section>
        </div>
    );
}
