import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import styles from './style.css';
import 'antd/dist/antd.css';
import { message, Space } from 'antd';
import UpArrow from '@material-ui/icons/ExpandLessTwoTone';
import jwt_decode from "jwt-decode";
import { useHistory } from 'react-router';
import { loginuser, subuserCount, updateProfile, updatepassword } from '../../../api';



const Content = (props) => {

    const [showButton, setShowButton] = useState(false);
    const routerHistory = useHistory();
    const [useremail, setuseremail] = useState("");
    const [contact, setcontact] = useState("");
    const [username, setusername] = useState("");
    const [user, setuser] = useState({});
    const [error, seterror] = useState("");
    const [password, setpassword] = useState("");
    const [newPassword, setnewPassword] = useState("");
    useEffect(() => {


        window.addEventListener("scroll", () => {
            if (window.pageYOffset > 300) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        });

        loginuser({
            token: Cookies.get('token')
        })
            .then(function (response) {
                //   console.log(response);
                if (response.data.message === "true") {
                    try {
                        setuser(response.data.user);
                        setusername(response.data.user.name);
                        setuseremail(response.data.user.email);
                        setcontact(response.data.user.phonenumber);



                    } catch (e) {
                        return null;
                    }
                } else if (response.data.message === "false") {

                }

            })
            .catch(function (error) {

            });
    }, [])


    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    };

    const addSubuser = async () => {

        const token = Cookies.get("token");
        const user = jwt_decode(token);
        const user_id = user.id;
        console.log(user_id);
        await subuserCount({ user_id })
            .then(function (response) {
                console.log(response.data.count);
                const subcount = response.data.count;
                if (subcount === 10) {
                    alert("no more users can be added!");
                    routerHistory.push('./profile');
                }
                else {
                    routerHistory.push('./register');
                }

            }).catch(function (error) {

            });


    }
    const location = {
        pathname: "/profile-listings", state: { data: user }
    }

    const changeProfile = async () => {

        console.log("username, email, contact= ", username, useremail, contact)
        await updateProfile({ username, useremail, contact })
            .then(function (response) {
                console.log(response.data);
                if (response.data.message === true) {

                    message.success('Profile Updated!');
                }



            }).catch(function (error) {

            });


    }
    const changePassword = async () => {

        if (password != user.password) {
            seterror("Enter correct password");
        } else {
            seterror("");
            await updatepassword({ newPassword, useremail })
                .then(function (response) {
                    console.log(response.data);
                    if (response.data.message === true) {

                        setpassword("");
                        setnewPassword("");
                        message.success('Password Changed.');
                    }



                }).catch(function (error) {

                });
        }

    }

    return (
        <div className="section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="sidebar sticky-sidebar user-nav sidebar-left">
                            <ul>

                                <li> <Link className="active" to="/profile"> Edit Profile</Link> </li>
                                <li> <Link  to="/profile"> Favourites </Link> </li>
                                <li> <Link  to="/measuremenets"> Body Measurements </Link> </li>
                                <li> <Link className="logout" to="/" onClick={() => {
                                    Cookies.remove('token');
                                    Cookies.remove('mail');
                                }}><i className="flaticon-shut-down-button" /> Logout</Link> </li> </ul>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="acr-welcome-message">
                            <h3>Welcome Back,{user.name}</h3>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                        </div>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className="row">
                                {/* <div className="col-lg-6 form-group">
                                    <label>Full Name</label>
                                    <input type="text" className="form-control" placeholder={user.name} defaultValue={user.name} />
                                </div> */}
                                <div className="col-lg-6 form-group">
                                    <label>Username</label>
                                    <input type="text" className="form-control" placeholder={user.name} defaultValue={user.name} value={username} onChange={(e) => setusername(e.target.value)} />
                                </div>
                                {/* <div className="col-lg-6 form-group">
                                    <label>Email Address</label>
                                    <input type="email" className="form-control" placeholder={user.email} defaultValue={user.email} value={useremail} onChange={(e) => setuseremail(e.target.value)} />
                                </div> */}
                                <div className="col-lg-6 form-group">
                                    <label>Phone Number</label>
                                    <input type="text" className="form-control" placeholder={user.contact} defaultValue={user.phonenumber} value={contact} onChange={(e) => setcontact(e.target.value)} />
                                </div>
                                {/* <div className="col-lg-6 form-group">
                                        <label>Address One</label>
                                        <input type="text" className="form-control" placeholder="Address" />
                                    </div> */}
                                {/* <div className="col-lg-6 form-group">
                                        <label>Address Two</label>
                                        <input type="text" className="form-control" placeholder="Address" />
                                    </div> */}
                                {/* <div className="col-lg-12 form-group">
                                        <label>About Me</label>
                                        <textarea name="about" rows={4} className="form-control" placeholder="About Me" />
                                    </div> */}
                            </div>
                            <button type="submit" name="submit" className="btn-custom" onClick={() => changeProfile()}>Save Changes</button>
                        </form>
                        <hr />
                        <div className="acr-welcome-message">
                            <h3>Change Password</h3>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                        </div>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className="row">
                                <div className="col-lg-6 form-group">
                                    <label>Current Password</label>
                                    <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setpassword(e.target.value)} required />
                                </div>
                                <div className="col-lg-6 form-group">
                                    <label>New Password</label>
                                    <input type="password" className="form-control" placeholder="New Password" value={newPassword} onChange={(e) => setnewPassword(e.target.value)} required />
                                </div>
                                {/* <div className="col-lg-12 form-group">
                                        <label>Upload Your ID</label>
                                        <div className="custom-file">
                                            <input type="file" className="custom-file-input" id="propertyThumbnail" />
                                            <label className="custom-file-label" htmlFor="propertyThumbnail">Choose file</label>
                                        </div>
                                    </div> */}
                            </div>
                            <h4 style={{ color: '#C72C2C', fontWeight: 14, fontSize: 16, margin: '15px' }}>{error}</h4>
                            <button type="submit" className="btn-custom" onClick={() => changePassword()}>Save Changes</button>

                        </form>
                    </div>
                </div>
            </div>
            {showButton && (
                <button onClick={() => scrollToTop()} className="back-to-top" >
                    <UpArrow />
                </button>
            )}
        </div>

    );
}

export default Content;