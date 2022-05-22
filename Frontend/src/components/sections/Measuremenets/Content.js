import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import './style.css';
import 'antd/dist/antd.css';
import { BsCameraFill, BsArrowRightShort, BsPencil, BsTrash, BsWindowSidebar } from 'react-icons/bs';
import 'antd/dist/antd.css';
import { message } from 'antd';
import { takeMeasurements, fetchMeasurements, deleteMeasurements, editMeasurements } from '../../../api/index';


const Content = (props) => {


    const [description, setDesc] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [formModal, setFormModal] = useState(false);
    const [length, setLength] = useState("");
    const [loading, setLoading] = useState(false);
    const [userMeasurements, setUserMeasurements] = useState([]);
    const [title, setTitle] = useState("");
    const [measuremenets, setMeasuremenets] = useState("");
    const [img, setImg] = useState("");
    const [shoulders, setShoulders] = useState("");
    const [fullLength, setFullLength] = useState("");
    const [KneeL, setKneeL] = useState("");
    const [armsL, setArmsL] = useState("");
    const [waistL, setWaistL] = useState("");
    const [shirtL, setShirtL] = useState("");
    const [bottomL, setBottomL] = useState("");
    const [check, setCheck] = useState(false);


    const item = {
        id: '5',
        title: 'Knee Length',
        img: '/images/modal1.png',
        desc: "Linear distance between the shoulder point and knee point",

    }

    useEffect(async () => {
        await fetchMeasurements({ uid: Cookies.get('id'), flag:"0" })
            .then((response) => {
                console.log("response: ", response.data.measurement[0])
                if (response.data.message === true) {
                    console.log("mes: ", response.data.measurement[0].tshirt)
                    setUserMeasurements(response.data.measurement)
                    setShoulders(response.data.measurement[0].shoulders)
                    setArmsL(response.data.measurement[0].arms)
                    setFullLength(response.data.measurement[0].fullLength)
                    setKneeL(response.data.measurement[0].knee)
                    setShirtL(response.data.measurement[0].tshirt)
                    setWaistL(response.data.measurement[0].waist)
                    setBottomL(response.data.measurement[0].bottom)
                  
                } else {
                    console.log(response.data.error)
                    
                }

            }).catch((err) => {
                console.log("error:", err.message)
            })

    }, [check])

    console.log("bottom:", bottomL)


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
       
        await takeMeasurements({ user: Cookies.get('id') })
            .then((res) => {
                if(res.data === "false"){
                    message.error("Body not detected")
                }
                console.log("server res: ",res.data)
                setCheck(!check)
            }).catch((err) => {
                console.log(err)
            })
    }

    const edit = async () => {
    
        await editMeasurements({ mid: userMeasurements[0]._id, shoulders, arms: armsL, fullLength, knee: KneeL })
            .then((response) => {
                if (response.data.message === true) {
                    setFormModal(false)
                    message.success("Measurements Updated")
                } else {
                    message.error(response.data.error)
                }
            }).catch((err) => {
                console.log("err", err.message)
            })
    }

    const deleteFunc = async () => {
        await deleteMeasurements({ mid: userMeasurements[0]._id })
            .then((response) => {
                if (response.data.message === true) {
                    setCheck(!check)
                    message.success("Deleted")
                    //window.location.reload()
                    
                } else {
                    message.error(response.data.error)
                }
            }).catch((err) => {
                console.log("err", err.message)
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
                                    Cookies.remove('id');
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
                                       
                                        <Link className='measurementBtn' onClick={() => setFormModal(true)}>Edit Measuremenets<span><BsPencil className="cameraIcon" /></span></Link>
                                    </div>
                                     {/* <p>Click on the below tabs to view your measurements seperately in inches.</p> */}
                                    <div className='list'>
                                        <List title="Shoulders Length" img={item.img} desc={item.desc} inch={shoulders} />
                                        <List title="Arm Length" img={item.img} desc={item.desc} inch={armsL} />
                                        <List title="Full Length" img={item.img} desc={item.desc} inch={fullLength} />
                                        <List title="Tshirt Length" img={item.img} desc={item.desc} inch={shirtL} />
                                        <List title="Knee Length" img={item.img} desc={item.desc} inch={KneeL} />
                                        <List title="Bottom Length" img={item.img} desc={item.desc} inch={bottomL} />
                                        <List title="Waist Length" img={item.img} desc={item.desc} inch={waistL} />

                                    </div>

                                    <div className="footer-buttons">

                                        <Link className='deleteBtn' onClick={()=>deleteFunc()}>Delete <span><BsTrash className="cameraIcon" /></span></Link>
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

                        {formModal ? (<>
                            <div className="modalWrapper">
                                <div className="modal2">
                                    <button onClick={() => setFormModal(false)} className='btnClose'> X </button>
                                    <form onSubmit={e => { e.preventDefault(); }} className='editForm'>
                                        <div className="auth-text">
                                            <h3>Edit Your Measurements</h3>
                                            <p>Enter your changed measurements using the inches scale.</p>
                                            {/* <h4 style={{ color: '#C72C2C', fontWeight: 20, fontSize: 20 }}>{error}</h4> */}
                                        </div>
                                        <div className='editContainer'>
                                            <div className="form-group">
                                                <label>Shoulders Length</label>
                                                <input type="text" className="form-control form-control-light" placeholder="Shoulders in inches" name="shoulders" value={shoulders} onChange={(e) => setShoulders(e.target.value)} required />
                                            </div>
                                            <div className="form-group">
                                                <label>Arms Length</label>
                                                <input type="text" className="form-control form-control-light" placeholder="Arms length in inches" name="armsL" value={armsL} onChange={(e) => setArmsL(e.target.value)}  required />
                                            </div>
                                            <div className="form-group">
                                                <label>Full Length</label>
                                                <input type="text" className="form-control form-control-light" placeholder="Full length in inches" name="fullL" value={fullLength} onChange={(e) => setFullLength(e.target.value)} required />
                                            </div>
                                            <div className="form-group">
                                                <label>Knee Length</label>
                                                <input type="text" className="form-control form-control-light" placeholder="Knee length in inches" name="KneeL" value={KneeL} onChange={(e) => setKneeL(e.target.value)} required />
                                            </div>
                                            <div className="form-group">
                                                <label>Waist Length</label>
                                                <input type="text" className="form-control form-control-light" placeholder="Waist length in inches" name="waistL" value={waistL} onChange={(e) => setWaistL(e.target.value)} required />
                                            </div>
                                            <div className="form-group">
                                                <label>Knee Length</label>
                                                <input type="text" className="form-control form-control-light" placeholder="Tshirt length in inches" name="TshirtL" value={shirtL} onChange={(e) => setShirtL(e.target.value)}  required />
                                            </div>
                                            <div className="form-group">
                                                <label>Bottom Length</label>
                                                <input type="text" className="form-control form-control-light" placeholder="Bottom length in inches" name="bottomL" value={bottomL} onChange={(e) => setBottomL(e.target.value)} required />
                                            </div>
                                            
                                        </div>
                                        <button className="btn-custom secondary btn-block" onClick={() => edit()}>Edit & Save</button>

                                    </form>
                                </div>

                            </div></>) : ""}

                    </div>

                </div>
            </div>


        </div>


    );
}

export default Content;