import React, { useState } from 'react';
import { Row, Col, Form, Input, Select, Descriptions } from 'antd';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import FileBase64 from 'react-file-base64';
import MultiImageInput from 'react-multiple-image-input';

import { BasicFormWrapper } from '../styled';
import Heading from '../../components/heading/heading';
import axios from 'axios';

//import useSelection from 'antd/lib/table/hooks/useSelection';

const Products = () => {
  const [images, setImagePath] = useState([]);
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [color, setcolor] = useState("");
  const [category, setcategory] = useState("");
  const [subcategory, setSubC] = useState("");
  const [img, setimg] = useState(""); 
  const [error, seterror] = useState("");


  const crop = {
    unit: '%',
    aspect: 5 / 8,
    width: '100'
  };

  const onSubmit = () => {
    axios.post('http://localhost:5000/products/addproducts', {
      title, description, price, color, category, subcategory, images, picture: images[0]

    })
      .then(function (response) {
        // if(response.data.message===true){
        console.log(response.data.message);
        if (response.data.message === true) {
          settitle("");
          setdescription("");
          setprice("");
          setcategory("");
          setcolor("");
          setSubC("");
          setImagePath("");
          alert("Added");
          seterror("");

        } else {
          seterror("Item aleady existed");
        }
      })
  };

  return (
    <Cards
      title={
        <div className="setting-card-title">
          <Heading as="h4">Add Location</Heading>
          <span>Add a Location</span>
        </div>
      }
    >
      <Row justify="center">
        <Col xl={12} lg={16} xs={24}>
          <BasicFormWrapper>
            <Form onSubmit={(e) => { e.preventDefault() }}>
              <Form.Item label="Products Title">
                <Input type="text" className="form-control" placeholder="title" name="name" value={title} onChange={(e) => settitle(e.target.value)} required />
              </Form.Item>
              <Form.Item label="Description">
                <Input type="text" className="form-control" placeholder="desc" name="name" value={description} onChange={(e) => setdescription(e.target.value)} required />
              </Form.Item>
              <Form.Item label="Price">
                <Input type="text" className="form-control" placeholder="price" name="price" value={price} onChange={(e) => setprice(e.target.value)} required />
              </Form.Item>
              <Form.Item label="Color">
                <Input type="text" className="form-control" placeholder="color" name="color" value={color} onChange={(e) => setcolor(e.target.value)} required />
              </Form.Item>
              <Form.Item label="Category">
                <Input type="text" className="form-control" placeholder="Category Name" name="cat" value={category} onChange={(e) => setcategory(e.target.value)} required />
              </Form.Item>
              <Form.Item label="Sub Category">
                <Input type="text" className="form-control" placeholder="Sub Category" name="sub" value={subcategory} onChange={(e) => setSubC(e.target.value)} required />
              </Form.Item>

              <Form.Item label="Property Thumbnail">
                <div className="form-group">
                  <div className="custom-file">
                    <MultiImageInput
                      images={images}
                      setImages={setImagePath}
                      max={4}
                      cropConfig={{ crop, ruleOfThirds: true }}

                    />


                  </div>
                </div>
              </Form.Item>

              <Form.Item>
                <div className="setting-form-actions">
                  <Button size="default" htmlType="submit" onClick={() => onSubmit()} type="primary">
                    Add
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </BasicFormWrapper>
        </Col>
      </Row>
    </Cards>
  )

};

export default Products;