
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
import { BsListTask } from 'react-icons/bs';
import axios from "axios";
import 'antd/dist/antd.css';
import { message } from 'antd';
import { useHistory } from "react-router-dom";
import { TiDeleteOutline } from 'react-icons/ti';
import MultiImageInput from 'react-multiple-image-input';
import image1 from '../../assests/illustration1.png';
import { deleteProduct, editProduct } from "../../API/api";

export default function Products({ setShow, check, setCheck, handleToggleSidebar, products }) {
    setShow(true);
    let history = useHistory();
    var [uploadInput, setUploadInput] = useState("");
    const [selected, setSelected] = useState(null);
    const [visible, setVisible] = useState(false);
    const [change, setChange] = useState(false);
    const [imagePath, setImagePath] = useState([]);
    const [picture, setPicture] = useState("");
    const [itemId, setItemId] = useState("");
    const [title, settitle] = useState("");
    const [color, setColor] = useState("");
    const [price, setPrice] = useState();
    const [description, setDescription] = useState("");
    const [file, setFile] = useState("");
    const [colorCode, setColorCode] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [main_category, setmain_category] = useState("");
    const colors = ['black', 'white', 'blue', 'red', 'orange', 'green', 'grey', 'yellow', 'pink', 'purple'];
    const categories = ['Shirts', "Jeans", "Suits", "Dress", "Trousers", "Dress Pants"];
    const main_categories = ['Men', "Women"];
    const sizes = ['S', 'M', 'L'];

    const { innerWidth: width, innerHeight: height } = window;

    const deleteFunc = async (id) => {
        console.log("id: ", typeof (id))
        await deleteProduct({ pid: id })
            .then(res => {
                if (res.data.message === true) {
                    setCheck(!check)
                    message.success("deleted")
                }

            })
            .catch(err => {
                alert(err);
            })
    }
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
                console.log("res: ", result)
                setPicture(result)
            })
            .catch(err => {
                console.log(err);
            });
    };

    const updateProduct = async () => {

        console.log("selectedCategory: ", selectedCategory, main_category)
        await editProduct({ pid:selected._id, title, description, picture, price, main_category, category: selectedCategory, color, colorCode, sizes })
            .then(res => {
                if (res.data.message === true) {

                    console.log(typeof (res.data.id))
                    console.log("responseid: ", res.data.id)
                    var id = res.data.id;
                    id = id.toString();
                    console.log(id)
                    console.log(typeof (id))
                    {
                        change ? addArImage(id) :
                            message.success('Product Updated!');
                        history.push('/home')
                    }


                } else {
                    message.error(res.data.error)
                }

            })
            .catch(err => {
                alert(err);
            })

    }

    const addArImage = (filename) => {
        console.log("name: ", filename)
        const data = new FormData();
        data.append('file', uploadInput.files[0]);
        data.append('filename', filename);

        fetch(`http://192.168.100.8:5000/upload?filename=${filename}`, {
            mode: "no-cors",
            method: 'POST',
            body: data,
        }).then((response) => {

            message.success('Product Updated!');
            history.push('/home')
        });
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
                <div className="userShow" style={{ height: height * 0.9, overflowY: 'scroll', width: width * 0.7 }}>
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
                                        settitle(item.title)
                                        setDescription(item.description)
                                        setColor(item.color)
                                        setColorCode(item.colorCode)
                                        setPrice(item.price)
                                        setPicture(item.picture)
                                        setmain_category(item.main_category)
                                        setSelectedCategory(item.category)
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
                    <form className="userUpdateForm" onSubmit={(e) => e.preventDefault()}>

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
                                                onChange={(e) => settitle(e.target.value)}
                                            />
                                        </div>
                                        <div className="userUpdateItem">
                                            <label>Description</label>
                                            <input
                                                type="text"
                                                className="userUpdateInput"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                            />
                                        </div>
                                        <div className="userUpdateItem">
                                            <label>Price</label>
                                            <input
                                                type="text"
                                                className="userUpdateInput"
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                            />
                                        </div>
                                        <div className="userUpdateItem">
                                            <label>Color</label>
                                            <select name="colors" className="form-control" id="colors" value={color} onChange={(e) => setColor(e.target.value)}>
                                                {colors.map((item, i) => {

                                                    return <option key={i} value={item}>{item}</option>
                                                })}
                                            </select>
                                        </div>
                                        <div className="userUpdateItem">
                                            <label>Color Code</label>
                                            <input name="colorCode" className="form-control" id="colors" value={colorCode} onChange={(e) => setColorCode(e.target.value)} />

                                        </div>
                                        <div class="form-group">
                                            <label for="exampleFormControlFile1">Select Display Image</label>
                                            <input type="file" class="form-control-file" id="exampleFormControlFile1" onChange={(e) => handleImgChange(e)} />
                                        </div>

                                        <div class="form-group">
                                            <label for="exampleFormControlFile1">Select AR Image (Transparent Background)</label>
                                            <input ref={(ref) => { uploadInput = ref; }} type="file" class="form-control-file" id="exampleFormControlFile2" onChange={() => setChange(true)} />
                                        </div>

                                    </div>
                                    <div className="userUpdateRight">

                                        <button className="userUpdateButton" onClick={() => updateProduct()}>Update</button>

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
