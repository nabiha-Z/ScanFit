import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import  './style.css';
import EditMeasurements from './EditMeasurement';
import 'antd/dist/antd.css';
import { BsCameraFill, BsArrowRightShort, BsPencil, BsTrash } from 'react-icons/bs';
import { useHistory } from 'react-router'
import 'bootstrap/dist/css/bootstrap.min.css';



const Content = (props) => {

   
    const [description, setDesc] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [length, setLength] = useState("");
    const [title, setTitle] = useState("");
    const [measuremenets, setMeasuremenets] = useState("");
    const [img, setImg] = useState("");
    const [list, setList] = useState(
        [
            {
                id: '1',
                title: 'Shoulders Length',
                img: '/images/model1.png',
                desc: "Linear distance between the two shoulder points",
                inch: '14'
            },
            {
                id: '2',
                title: 'Arms Length',
                img: '/images/model1.png',
                desc: "Linear distance between the the shoulder point and hand",
                inch: '21'
            },
            {
                id: '3',
                title: 'Full Length',
                img: '/images/model1.png',
                desc: "Linear distance between the shoulder point and foot point",
                inch: '57'
            },
            {
                id: '4',
                title: 'Chest Front Length',
                img: '/images/model1.png',
                desc: "Linear distance between the two chest points",
                inch: '19'
            },
            {
                id: '5',
                title: 'Knee Length',
                img: '/images/model1.png',
                desc: "Linear distance between the shoulder point and knee point",
                inch: '30'
            },


        ]);


    const List = (props) => {
        return (
            <>
                <div className='list-container' onClick={() => {

                    setModalOpen(true)
                    setTitle(props.title)
                    setImg(props.img)
                    setDesc(props.desc)
                    setLength(props.inch)
                    
                }}>
                    
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
                                        <Link className='measurementBtn' onClick={()=>{return(<EditMeasurements/>)}}>Edit Measuremenets<span><BsPencil className="cameraIcon" /></span></Link>
                                    </div>

                                    <div className='list'>
                                        {list.map((item, key) => (
                                            <>
                                                <List title={item.title} img={item.img} desc={item.desc} inch={item.inch}/>
                                            </>
                                        ))}
                                    </div>

                                    <div className="footer-buttons">

                                        <Link className='deleteBtn'>Delete <span><BsTrash className="cameraIcon" /></span></Link>
                                    </div>

                                </div>

                            </>

                        )}
                        {modalOpen ? (<>
                            <div className="modalWrapper">
                                <div className="modal">
                                    <button onClick={() => setModalOpen(false)} className='btnClose'> X </button>
                                    <h5 className="heading">{title}</h5>
                                    <img src={img} className='bodyModal' />
                                    <p className="body">{description}</p>
                                    <h4 className="heading" style={{fontSize:40}}>{length} in</h4>
                                </div>

                            </div></>) : ""}

                    </div>

                </div>
            </div>


        </div>


    );
}

export default Content;