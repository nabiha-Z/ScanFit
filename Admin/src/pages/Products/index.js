
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
import { TiDeleteOutline } from 'react-icons/ti';
import MultiImageInput from 'react-multiple-image-input';
import image1 from '../../assests/illustration1.png';
import axios from 'axios';

export default function Categories({ setShow, image, collapsed, rtl, toggled, handleToggleSidebar }) {
    setShow(true);
    const [selected, setSelected] = useState(null);
    const [visible, setVisible] = useState(false);
    // const [categories, setCategories] = useState([
    //     {
    //         id: 1,
    //         title: "Cat1",
    //         img: image1
    //     },
    //     {
    //         id: 2,
    //         title: "Cat2",
    //         img: image1
    //     },
    //     {
    //         id: 3,
    //         title: "Cat3",
    //         img: image1
    //     },
    //     {
    //         id: 4,
    //         title: 'Cat4',
    //         img: image1
    //     }
    // ]);

    const [categories, setCategories] = useState([]);

    useEffect(() => {

        // axios.get('https://api-kearekisa.herokuapp.com/admin/category')
        //     .then(res => {
        //         const cat = res.data;
        //         console.log(cat.categories)
        //         // console.log(typeof(cat))

        //         setCategories(cat.categories)
        //         console.log("categories", categories)
        //     })
        //     .catch(err => {
        //         alert(err);
        //     })
    }, []);
    const [imagePath, setImagePath] = useState([]);
    const { innerWidth: width, innerHeight: height } = window;

    const crop = {
        unit: '%',
        aspect: 4 / 3,
        width: '100'
    };

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
            <div className="userContainer">
                <div className="userShow" style={{ height: height*0.7, overflowY: 'scroll', width:'100%'}}>
                    <div className="userShowTop" >
                        <h3>All Products</h3>
                        {categories.map((item, key) => (

                            <div className="category-container" >
                                <div className="category" >
                                    <div className="icon-container">
                                        <BsListTask />
                                    </div>
                                    <p className="text" >{item.name}</p>
                                </div>
                                <div
                                    className="EditBtn"
                                    onClick={() => {
                                        setSelected(item)
                                        setVisible(true)
                                    }}
                                    
                                    style={{justifyContent:'flex-end'}}>
                                    <p>Edit</p>
                                </div>
                                <div onClick={() => alert("Hi")}>
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
                                            <label>Category Name</label>
                                            <input
                                                type="text"
                                                placeholder="annabeck99"
                                                className="userUpdateInput"
                                                value={selected.name}
                                            />
                                        </div>
                                        {/* <div className="userUpdateItem">
                                            <label>Full Name</label>
                                            <input
                                                type="text"
                                                placeholder="Anna Becker"
                                                className="userUpdateInput"
                                            />
                                        </div> */}


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
                                        <h3 style={{textAlign:'center'}}>Select a Category to edit</h3>
                                    </label>
                                </div>
                            )}

                    </form>
                </div>
            </div>
        </main>
    );
}
