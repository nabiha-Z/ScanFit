import "./newProduct.css";
import React, { useState, useEffect } from "react";
import { FaBars } from 'react-icons/fa';
import { useHistory } from "react-router-dom";
import 'antd/dist/antd.css';
import { message } from 'antd';
import { addProducts } from "../../API/api";

export default function NewCategory({ handleToggleSidebar }) {

  const [picture, setPicture] = useState("");
  const [ARImage, setARImage] = useState("");
  const [title, settitle] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState();
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");
  const [colorCode, setColorCode] = useState("");
  const [selectedCategory, setSelected] = useState("");
  const [mainCategory, setMainCategory] = useState("");
  const colors = ['black', 'white', 'blue', 'red', 'orange', 'green', 'grey', 'yellow', 'pink', 'purple'];
  const categories = ['Shirts', "Jeans", "Suits", "Dress", "Trousers","Dress Pants"];
  const main_categories = ['Men', "Women"];
  let history = useHistory();

  const addProduct = async () => {

    await addProducts({ title, description, picture, price, mainCategory, selectedCategory, color, colorCode, ARImage })
      .then(res => {
        if (res.data.message === true) {
          message.success('Product Added!');
          history.push('/home')
        } else {
          message.error(res.data.error)
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

  const handleARImgChange = (e) => {

    var file = e.target.files[0];

    console.log("file: ", file)   
    getBase64(file)
      .then(result => {
        file["base64"] = result;
        console.log("res: ", result)
        setARImage(result)
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="newUser">
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
      <h1 className="newUserTitle">New Product</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label for="exampleFormControlInput1">Title</label>
          <input type="text" className="form-control" value={title} onChange={(e) => settitle(e.target.value)} placeholder="Product Title" />
        </div>
        <div className="form-group">
          <label for="exampleFormControlInput1">Price</label>
          <input type="text" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="e.g: 1500 " />
        </div>
        <div className="form-group">
          <label for="exampleFormControlInput1">Color Code</label>
          <input type="text" className="form-control" value={colorCode} onChange={(e) => setColorCode(e.target.value)} placeholder="e.g: #fffff" />
        </div>
        <div className="form-group">
          <label for="exampleFormControlInput1">Color Family</label>
          <select name="colors" className="form-control" id="colors" value={color} onChange={(e) => setColor(e.target.value)}>
            {colors.map((item, i) => {

              return <option key={i} value={item}>{item}</option>
            })}
          </select>
        </div>
        <div className="form-group">
          <label for="exampleFormControlInput1">Color Family</label>
          <select name="categories" className="form-control" id="categories" value={selectedCategory} onChange={(e) => setSelected(e.target.value)}>
            {categories.map((item, i) => {

              return <option key={i} value={item}>{item}</option>
            })}
          </select>
        </div>
        <div className="form-group">
          <label for="exampleFormControlInput1">Color Family</label>
          <select name="main_category" className="form-control" id="category" value={mainCategory} onChange={(e) => setMainCategory(e.target.value)}>
            {main_categories.map((item, i) => {

              return <option key={i} value={item}>{item}</option>
            })}
          </select>
        </div>
        <div className="form-group">
          <label for="exampleFormControlInput1">Color Family</label>
          <select name="category" className="form-control" id="category" value={color} onChange={(e) => setColor(e.target.value)}>
            {colors.map((item, i) => {

              return <option key={i} value={item}>{item}</option>
            })}
          </select>
        </div>
        <div class="form-group">
          <label for="exampleFormControlFile1">Select Display Image</label>
          <input type="file" class="form-control-file" id="exampleFormControlFile1" onChange={(e) => handleImgChange(e)} />
        </div>

        <div class="form-group">
          <label for="exampleFormControlFile1">Select AR Image (Transparent Background)</label>
          <input type="file" class="form-control-file" id="exampleFormControlFile2" onChange={(e) => handleARImgChange(e)} />
        </div>

        {/* <div className="form-group">
          <label for="exampleFormControlSelect1">Sizes</label>
          <select className="form-control" id="exampleFormControlSelect1">
            {categories.map((item, key) => (
              <option value={item} selected={item}>{item}</option>
            ))}
          </select>
        </div> */}

        {/* <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
            <label class="form-check-label" for="defaultCheck1">
             Small
            </label>
        </div> */}
        
        <button type="submit" class="btn btn-primary" style={{ width: '30%' }} onClick={() => addProduct()}>Add</button>
      </form>
    </div>
  );
}
