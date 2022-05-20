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
import { loginuser, updateProfile, updatepassword, updatePicture } from '../../../api';



const Content = (props) => {

    const [showButton, setShowButton] = useState(false);
    const routerHistory = useHistory();
    const [useremail, setuseremail] = useState("");
    const [contact, setcontact] = useState("");
    const [address, setAddress] = useState("");
    const [username, setusername] = useState("");
    const [user, setuser] = useState({});
    const [error, seterror] = useState("");
    const [password, setpassword] = useState("");
    const [file, setFile] = useState("");
    const [picture, setPicture] = useState("");
    const [newPassword, setnewPassword] = useState("");

    const currentuser = async () => {

        await loginuser({
            user: Cookies.get('id')
        })
            .then(function (response) {
                console.log(response);
                if (response.data.message === true) {
                    console.log("response:", response.data)
                    try {
                        setuser(response.data.user);
                        setusername(response.data.user.name);
                        setuseremail(response.data.user.email);
                        setcontact(response.data.user.phonenumber);


                        console.log("user: ", user)

                    } catch (e) {
                        return null;
                    }
                } else if (response.data.message === false) {
                    console.log("falsee")
                }

            })
            .catch(function (error) {

            });
    }

    useEffect(() => {


        window.addEventListener("scroll", () => {
            if (window.pageYOffset > 300) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        });
        currentuser()

    }, [])

    const getBase64 = (file) => {
        return new Promise(resolve => {
            let baseURL = "";
            // Make new FileReader
            let reader = new FileReader();
            // Convert the file to base64 text
            reader.readAsDataURL(file);

            // on reader load somthing...
            reader.onload = () => {
                // Make a fileInfo Object

                baseURL = reader.result;
                resolve(baseURL);
            };
        });
    };

    const handleImgChange = (e) => {

        var file = e.target.files[0];

        console.log("file: ", file)
        setFile(file.name)
        getBase64(file)
            .then(result => {
                file["base64"] = result;
                //console.log("res: ", result)
                setPicture(result)
            })
            .catch(err => {
                console.log(err);
            });


    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    };

    const changeProfile = async () => {

        console.log("username, contact= ", username, contact)
        await updateProfile({ username, contact, address, id:Cookies.get('id') })
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

    const uploadImage = async () => {
        console.log("converted img: ", picture)
        await updatePicture({ user: Cookies.get('id'), picture })

            .then(function (response) {
                console.log(response.data);
                try {
                    if (response.data.message === true) {
                      
                        message.success("Picture Changed");
                    } else {
                        message.error(response.data.error)
                    }

                } catch (err) {
                    console.log(err);
                };
            })
            .catch(err => {
                console.log("error: ", err.message);
            });
    }

    return (
        <div className="section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="sidebar sticky-sidebar user-nav sidebar-left">
                            <ul>

                                <li> <Link className="active" to="/profile"> Edit Profile</Link> </li>
                                <li> <Link to="/favourites"> Favourites </Link> </li>
                                <li> <Link to="/measuremenets"> Body Measurements </Link> </li>
                                <li> <Link className="logout" to="/" onClick={() => {
                                    Cookies.remove('token');
                                    Cookies.remove('mail');
                                    Cookies.remove('id');
                                }}><i className="flaticon-shut-down-button" /> Logout</Link> </li> </ul>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="acr-welcome-message">
                            <h3>Welcome Back,{username}</h3>
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
                                <div className="col-lg-6 form-group">
                                    <label>Phone Number</label>
                                    <input type="text" className="form-control" placeholder={user.contact} defaultValue={user.phonenumber} value={contact} onChange={(e) => setcontact(e.target.value)} />
                                </div>
                                <div className="col-lg-6 form-group">
                                    <label>Address</label>
                                    <input type="text" className="form-control" placeholder={user.address} defaultValue={user.address} value={address} onChange={(e) => setAddress(e.target.value)} />
                                </div>
                            </div>
                            <button type="submit" name="submit" className="btn-custom" onClick={() => changeProfile()}>Save Changes</button>
                        </form>
                        <hr />
                        <div className="acr-welcome-message">
                            <h3>Change Password</h3>
                            <p>You can change your password by verifying your current password for security purposes</p>
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
                        <hr />
                        <div className="acr-welcome-message">
                            <h3>Upload Picture</h3>
                            <p>Select your display picture from ypur gallery</p>

                        </div>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <input type="file" class="form-control-file" id="exampleFormControlFile1" onChange={(e) => handleImgChange(e)} />
                        </form>
                        <br />
                        <button type="submit" className="btn-custom" onClick={() => uploadImage()}>Upload Picture</button>
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