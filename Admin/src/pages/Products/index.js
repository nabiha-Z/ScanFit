
import React, { useState, useEffect } from "react";
import {
    CalendarToday,
    LocationSearching,
    MailOutline,
    PermIdentity,
    PhoneAndroid,
    Publish,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./style.css";
import { FaBars } from 'react-icons/fa'
import { BsListTask } from 'react-icons/bs'
import 'antd/dist/antd.css';
import { message } from 'antd';
import { TiDeleteOutline } from 'react-icons/ti';
import MultiImageInput from 'react-multiple-image-input';
import image1 from '../../assests/illustration1.png';
import { getProducts, deleteProduct, editProduct } from "../../API/api";

export default function Products({ setShow, check, setCheck, handleToggleSidebar, products}) {
    setShow(true);
    const [selected, setSelected] = useState(null);
    const [visible, setVisible] = useState(false);
    const [imagePath, setImagePath] = useState([]);
    
    const { innerWidth: width, innerHeight: height } = window;
 
    const deleteFunc = async (id) => {
        console.log("id: ", typeof(id))
        await deleteProduct({pid:id})
        .then(res => {
            if(res.data.message === true){
                setCheck(!check)
                message.success("deleted")
            }
            
        })
        .catch(err => {
            alert(err);
        })
    }


    return (
        <main>

            <div className="userTitleContainer">
                <div
                    style={{
                        width: 35,
                        height: 35,
                        height: 35,
                        color: '#353535',
                        textAlign: 'center',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 20,
                        cursor: 'pointer'
                    }}
                    onClick={() => handleToggleSidebar(true)}>
                    <FaBars />
                </div>
                <h1 className="userTitle">Products</h1>
                <Link to="/newProduct">
                    <button className="userAddButton">Add</button>
                </Link>
            </div>
            <div className="userContainer" >
                <div className="userShow" style={{ height: height * 0.9, overflowY: 'scroll', width: width*0.7 }}>
                    <div className="userShowTop" >
                        <h3>All Products</h3>
                        {products.map((item, key) => (

                            <div className="category-container" >
                                <div className="category" >
                                    <div className="icon-container">
                                        <BsListTask />
                                    </div>
                                    <p className="text" >{item.title}</p>
                                </div>
                                <div
                                    className="EditBtn"
                                    onClick={() => {
                                        setSelected(item)
                                        setVisible(true)
                                    }}

                                    style={{ justifyContent: 'flex-end' }}>
                                    <p>Edit</p>
                                </div>
                                <div onClick={() => deleteFunc(item._id)}>
                                    <TiDeleteOutline className="deleteIcon" />
                                </div>

                            </div>
                        ))}

                    </div>
                </div>
                <div className="userUpdate">
                    <span className="userUpdateTitle">Edit</span>
                    <form className="userUpdateForm">

                        {visible ?
                            (
                                <>
                                    <div className="userUpdateLeft">
                                        <div className="userUpdateItem">
                                            <label>Title</label>
                                            <input
                                                type="text"
                                                className="userUpdateInput"
                                                value={selected.title}
                                            />
                                        </div>
                                        <div className="userUpdateItem">
                                            <label>Description</label>
                                            <input
                                                type="text"
                                                className="userUpdateInput"
                                                value={selected.description}
                                            />
                                        </div>
                                        <div className="userUpdateItem">
                                            <label>Price</label>
                                            <input
                                                type="text"
                                                className="userUpdateInput"
                                                value={selected.price}
                                            />
                                        </div>
                                        <div className="userUpdateItem">
                                            <label>Color</label>
                                            <input
                                                type="text"
                                                className="userUpdateInput"
                                                value={selected.color}
                                            />
                                        </div>
                                        <div className="userUpdateItem">
                                            <label>Color Code</label>
                                            <input
                                                type="text"
                                                className="userUpdateInput"
                                                value={selected.colorCode}
                                            />
                                        </div>

                                    </div>
                                    <div className="userUpdateRight">
                                        {/* <div className="userUpdateUpload">
                                            <img
                                                className="userUpdateImg"
                                                src={selected.img}
                                                alt=""
                                            />
                                         
                                        </div> */}
                                        <button className="userUpdateButton">Update</button>

                                    </div>
                                </>
                            ) : (
                                <div style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <img src={image1} style={{ width: 300, height: 300 }} />
                                    <label htmlFor="file">
                                        <h3 style={{ textAlign: 'center' }}>Select a Category to edit</h3>
                                    </label>
                                </div>
                            )}

                    </form>
                </div>
            </div>
        </main>
    );
}
