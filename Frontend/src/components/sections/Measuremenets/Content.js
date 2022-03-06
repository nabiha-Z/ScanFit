import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import styles from './style.css';
import 'antd/dist/antd.css';
import { message, Space } from 'antd';
import UpArrow from '@material-ui/icons/ExpandLessTwoTone';
import jwt_decode from "jwt-decode";
import { BsCameraFill, BsArrowRightShort, BsPencil, BsTrash } from 'react-icons/bs';
import { useHistory } from 'react-router';
import { loginuser, subuserCount, updateProfile, updatepassword } from '../../../api';



const Content = (props) => {

    const [showButton, setShowButton] = useState(false);
    const routerHistory = useHistory();
    const [useremail, setuseremail] = useState("");
    const [contact, setcontact] = useState("");
    const [list, setList] = useState(
        [
            {
                id: '1',
                title: 'Shoulders Length',
                img: '/images/model1.png'
            },
            {
                id: '2',
                title: 'Arms Length',
                img: '/images/model1.png'
            },
            {
                id: '3',
                title: 'Full Length',
                img: '/images/model1.png'
            },
            {
                id: '4',
                title: 'Chest Front Length',
                img: '/images/model1.png'
            },
            {
                id: '5',
                title: 'Knee Length',
                img: '/images/model1.png'
            },


        ]);
    const [user, setuser] = useState({});
    const [error, seterror] = useState("");
    const [password, setpassword] = useState("");
    const [measuremenets, setMeasuremenets] = useState("");
    const [newPassword, setnewPassword] = useState("");

    useEffect(() => {


        window.addEventListener("scroll", () => {
            if (window.pageYOffset > 300) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        });

    }, [])


    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    };

    const List = (props) => {
        return (
            <>
                <div className='list-container'>
                    <img src="/images/humanIcon.png" className='human-icon' />
                    <p>{props.title}</p>
                    <BsArrowRightShort className='right-arrow' />
                </div>
            </>

        );
    }

    return (
        <div className="section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="sidebar sticky-sidebar user-nav sidebar-left">
                            <ul>

                                <li> <Link to="/profile"> Edit Profile</Link> </li>
                                <li> <Link to="/profile"> Favourites </Link> </li>
                                <li> <Link className="active" to="/profile"> Body Measurements </Link> </li>
                                <li> <Link className="logout" to="/" onClick={() => {
                                    Cookies.remove('token');
                                    Cookies.remove('mail');
                                }}><i className="flaticon-shut-down-button" /> Logout</Link> </li> </ul>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        {measuremenets.length !== 0 ? (
                            <>
                                <div className='void'>
                                    <h5>Start of with our body tracking feature to get your body measurements. </h5>
                                    <Link className='measurementBtn'>Take Measuremenets <span><BsCameraFill className="cameraIcon" /></span></Link>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="acr-welcome-message">
                                    <div className='top-header'>
                                        <h3>Your Body Measurements</h3>
                                        <Link className='measurementBtn'>Edit Measuremenets<span><BsPencil className="cameraIcon" /></span></Link>
                                    </div>

                                    <div className='list'>
                                        {list.map((item, key) => (
                                            <>
                                                <List title={item.title} img={item.img} />
                                            </>
                                        ))}
                                    </div>

                                    <div className="footer-buttons">
                    
                                        <Link className='deleteBtn'>Delete <span><BsTrash className="cameraIcon" /></span></Link>
                                    </div>

                                </div>

                            </>

                        )}
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