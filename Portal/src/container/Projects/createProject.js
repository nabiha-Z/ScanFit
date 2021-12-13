import FileBase64 from 'react-file-base64';
import { useHistory } from 'react-router';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Row, Col, Form, Input, Select,Menu,Dropdown,Checkbox,Modal,Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { BasicFormWrapper, TagInput } from '../styled';
import Heading from '../../components/heading/heading';
import { useDispatch } from 'react-redux';
import {createProject} from '../../redux/projects/actionCreator';

  
// const features = [
//   { id: 1, icon: 'bone', title: 'Pet Friendly' },
//   { id: 2, icon: 'chair', title: 'Furnished' },
//   { id: 3, icon: 'fan', title: 'Cooling' },
//   { id: 4, icon: 'garage', title: 'Parking' },
//   { id: 5, icon: 'mailbox', title: 'Mailbox' },
//   { id: 6, icon: 'eye', title: 'City View' },
// ];
const features = [
  { label:'Pet-Friendly', value: 'Pet Friendly' },
  { label:'Furnished', value:'Furnished' },
  { label:'Cooling', value:'Cooling' },
  // { id: 4, icon: 'garage', title: 'Parking' },
  // { id: 5, icon: 'mailbox', title: 'Mailbox' },
  // { id: 6, icon: 'eye', title: 'City View' },
];

function project (){
  console.log("hvhgnbjm")

  const dispatch = useDispatch();

  //const [picture,setpicture] = useState("");
  const [previewVisible,setpreviewVisible] = useState(false);
  const [previewImage,setpreviewImage] = useState("");
  const [previewTitle,setpreviewTitle] = useState("");
  const [picture,setFileList] = useState({});
  //const [submit,setSubmit] = useState(false);
  const [form] = Form.useForm();
  
  const handleSubmit=(user) =>{
    
    //resetForm();
    user.picture= picture.fileList;
    console.log(user);
    dispatch(createProject(user));
    window.location.reload(false);
    
  }

  const resetForm = ()=>{
    console.log("in reset");
    form.resetFields();
  }
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );

    function getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    }
    const handleCancel=()=>{

      setpreviewVisible(false);

    }

    const handlePreview = async (file) => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      setpreviewImage(file.url || file.preview)
      setpreviewVisible(true)
      setpreviewTitle (file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
    }

      const handleChange = ({fileList}) => {
        console.log({fileList});
        //console.log(fileList[fileList]);
        setFileList({fileList});
        // setFileList(event.target)
        // console.log(fileList);
      }
      console.log("in hook");
console.log(picture);
    return(

    <Cards
    title={
      <div className="setting-card-title">
        <Heading as="h4">Create Project</Heading>
        {/* <span>Set Up Your Personal Information</span> */}
      </div>
    }
  >
    <Row justify="center">
      <Col xl={12} lg={16} xs={24}>
        <BasicFormWrapper>
          <Form name="createProject" onFinish={handleSubmit}>
            <Form.Item name="title" initialValue= ""  label="Title">
              <Input />
            </Form.Item>
            <Form.Item name="description" initialValue="" label="Description">
              <Input />
            </Form.Item>
            
            <Form.Item   initialValue="" label="Area" >
                {/* <Dropdown overlay={menu}>
                    <Input />
                </Dropdown> */}
                <Input.Group compact>
                  <Form.Item
                  name = "area"
                  
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                  name = "unit"
                  >
                  <Select
                  placeholder="unit">
                    <option value ="acres" >acres</option>
                    <option value ="canal">canal</option>
                    <option value ="marla">marla</option>
                </Select>
                  </Form.Item>
                  </Input.Group>

            </Form.Item>
            <Form.Item name="location"  initialValue="" label="Location">
            <Input/>
            </Form.Item>
            <Form.Item name="features"  initialValue="" label="Features">
              <Checkbox.Group options ={features}/>

            {/* <Input/> */}
            {/* <Select
            name="features"
            > */}
              {/* {features.map((item)=>(
                <Checkbox>{item.title}</Checkbox>
              ))} */}
            {/* </Select> */}
            </Form.Item>
            <Form.Item name="type"  initialValue="" label="Type">
            <Input/>
            </Form.Item>
            <Form.Item name="price"  initialValue="" label="Price">
            <Input/>
            </Form.Item>
            <Form.Item label="Property Image">

            <Upload
              
              listType="picture-card"
              //fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              beforeUpload= { ()=> false}
            >
              {picture.length >= 5 ? null : uploadButton}
        </Upload>
        <Modal
          name={picture}
          //name="picture"
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
            {/* <div className="form-group">
                      <div className="custom-file">
                        
                          <FileBase64
                              
                              type="file"
                              multiple={false}
                              onDone={({ base64 }) => setpicture(base64)}
                          />
                             
                      </div>
              </div> */}
              </Form.Item>
            <div className="setting-form-actions">
              <Button size="default" htmlType="submit" type="primary">
                Submit
              </Button>
              
            </div>
          </Form>
        </BasicFormWrapper>
      </Col>
    </Row>
  </Cards>
    );
    
}
export default project;