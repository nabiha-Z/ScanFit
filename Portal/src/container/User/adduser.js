import React, { useState } from 'react';
import { Row, Col, Form, Input, Select, Modal, Upload } from 'antd';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { BasicFormWrapper, TagInput } from '../styled';
import Heading from '../../components/heading/heading';
import { Tag } from '../../components/tags/tags';
import { PlusOutlined } from '@ant-design/icons';
//import useSelection from 'antd/lib/table/hooks/useSelection';
import { useDispatch } from 'react-redux';
import { adduser } from '../../redux/users/actionCreator';

const { Option } = Select;
const user = () => {
  const [form] = Form.useForm();
  //const profile = useSelector(state => state.Profile.profile);
  const [state, setState] = useState({
    tags: ['UI/UX', 'Branding', 'Product Design', 'Web Design'],
    values: null,
  });
  const [previewVisible,setpreviewVisible] = useState(false);
  const [previewImage,setpreviewImage] = useState("");
  const [previewTitle,setpreviewTitle] = useState("");
  const [picture,setFileList] = useState({});

  const dispatch = useDispatch();

  const handleSubmit=(user) =>{
    user.picture= picture.fileList;
    dispatch(adduser(user));
    window.location.reload(false);
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
      setFileList({fileList});
    }

    console.log("in hook");
    console.log(picture);


  const handleCancel = () => {
    setpreviewVisible(false);
  };

  

  return (
    <Cards
      title={
        <div className="setting-card-title">
          <Heading as="h4">Add Company</Heading>
        </div>
      }
    >
      <Row justify="center">
        <Col xl={12} lg={16} xs={24}>
          <BasicFormWrapper>
            <Form name="editProfile" id="form" onFinish={handleSubmit}>
              <Form.Item name="name" initialValue="" label="Name">
                <Input />
              </Form.Item>
              <Form.Item name="email" initialValue="" label="Email">
                <Input />
              </Form.Item>
              <Form.Item name="address" initialValue="" label="Address">
                <Input />
              </Form.Item>
              <Form.Item name="phonenumber" initialValue="" label="Phonenumber">
                <Input />
              </Form.Item>
              <Form.Item name="password" initialValue="" label="Password">
                <Input type="password" />
              </Form.Item>

              <Form.Item label="Company Logo">
                <Upload
                  listType="picture-card"
                  //fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                  beforeUpload={() => false}
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
              </Form.Item>
            
              <div className="setting-form-actions">
                <Button size="default" htmlType="submit" type="primary">
                  Add Profile
                </Button>
              </div>
            </Form>
          </BasicFormWrapper>
        </Col>
      </Row>
    </Cards>
  );
};
export default user;
