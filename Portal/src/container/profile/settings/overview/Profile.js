import React, { useState } from 'react';
import { Row, Col, Form, Input, Select } from 'antd';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { Button } from '../../../../components/buttons/buttons';
import { BasicFormWrapper, TagInput } from '../../../styled';
import Heading from '../../../../components/heading/heading';
import { Tag } from '../../../../components/tags/tags';
//import useSelection from 'antd/lib/table/hooks/useSelection';
import { useDispatch } from 'react-redux';
import { Editprofile } from '../../../../redux/profileEdit/actionCreator';
const { Option } = Select;
const Profile = () => {
  const [form] = Form.useForm();
  //const profile = useSelector(state => state.Profile.profile);
  const [state, setState] = useState({
    tags: ['UI/UX', 'Branding', 'Product Design', 'Web Design'],
    values: null,
  });

  const dispatch = useDispatch();

  const handleSubmit=(user) =>{
    dispatch(Editprofile(user));
    

  }


  return (
    <Cards
      title={
        <div className="setting-card-title">
          <Heading as="h4">Edit Profile</Heading>
          <span>Set Up Your Personal Information</span>
        </div>
      }

    >
      
      <Row justify="center">
        <Col xl={12} lg={16} xs={24}>
          <BasicFormWrapper>
            <Form name="editProfile" onFinish={handleSubmit}>
              <Form.Item name="firstName" initialValue=""  label="First Name">
                <Input />
              </Form.Item>
              <Form.Item name="lastName" initialValue="" label="Last Name">
                <Input />
              </Form.Item>
              <Form.Item name="email" initialValue="" label="Email">
              <Input />
              </Form.Item>
              <div className="setting-form-actions">
                <Button size="default" htmlType="submit" type="primary">
                  Update Profile
                </Button>
              </div>
            </Form>
          </BasicFormWrapper>
        </Col>
      </Row>
    </Cards>
  );
};

export default Profile;
