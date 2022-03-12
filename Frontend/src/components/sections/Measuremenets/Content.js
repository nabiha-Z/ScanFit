import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import './style.css';
import EditMeasurements from './EditMeasurement';
import 'antd/dist/antd.css';
import { BsCameraFill, BsArrowRightShort, BsPencil, BsTrash } from 'react-icons/bs';
import { useHistory } from 'react-router'
import axios from 'axios';
import { fetchMeasurements } from '../../../api/index';


const Content = (props) => {


    const [description, setDesc] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [length, setLength] = useState("");
    const [loading, setLoading] = useState(false);
    const [userMeasurements, setUserMeasurements] = useState([]);
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

    const item = {
        id: '5',
        title: 'Knee Length',
        img: '/images/model1.png',
        desc: "Linear distance between the shoulder point and knee point",

    }

    useEffect(async () => {
        await fetchMeasurements({ uid: Cookies.get('id') })
            .then((response) => {
                console.log("response: ", response.data)
                if (response.data.message === true) {
                    console.log("mes: ", response.data.measurement)
                    setUserMeasurements(response.data.measurement)
                } else {
                    console.log(response.data.error)
                }

            }).catch((err) => {
                console.log("error:", err.message)
            })

    }, [])



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

    const openCamera = async () => {
        alert("send")
        await axios.post('http://127.0.0.1:5000/', { user: Cookies.get('id') })
            .then((res) => {

                console.log(res.data)
            }).catch((err) => {

            })
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
                        {userMeasurements.length == 0 ? (
                            <>

                                <div className='void'>
                                    <h5>Start of with our body tracking feature to get your body measurements. </h5>
                                    <Link className='measurementBtn' onClick={() => openCamera()} >Take Measuremenets <span><BsCameraFill className="cameraIcon" /></span></Link>
                                </div>
                            </>
                        ) : (
                            <>
                                {console.log("meas: ", userMeasurements)}
                                <div className="acr-welcome-message">
                                    <div className='top-header'>
                                        <h3>Your Body Measurements</h3>
                                        <Link className='measurementBtn' onClick={() => { return (<EditMeasurements />) }}>Edit Measuremenets<span><BsPencil className="cameraIcon" /></span></Link>
                                    </div>
                                    <div className='list'>
                                        <List title="Shoulders Length" img={item.img} desc={item.desc} inch={userMeasurements[0].shoulders} />
                                        <List title="Arm Length" img={item.img} desc={item.desc} inch={userMeasurements[0].arms} />
                                        <List title="Full Length" img={item.img} desc={item.desc} inch={userMeasurements[0].fullLength} />
                                        <List title="Knee Length" img={item.img} desc={item.desc} inch={userMeasurements[0].knee} />

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
                                    <h4 className="heading" style={{ fontSize: 40 }}>{length} in</h4>
                                </div>

                            </div></>) : ""}

                    </div>

                </div>
            </div>


        </div>


    );
}

export default Content;