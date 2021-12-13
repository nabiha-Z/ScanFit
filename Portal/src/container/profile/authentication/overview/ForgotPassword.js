import React, { useState,useEffect } from 'react';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { Form, Input, Button,Alert} from 'antd';
import { AuthWrapper } from './style';
import Heading from '../../../../components/heading/heading';
// import M from 'materialize-css';
import axios from 'axios';
import { useHistory } from 'react-router';
import { render } from 'react-dom';
import {forgotPassword} from '../../../../api/index';

function ForgotPassword () {
  
  const [email, setEmail] = useState("");
  const[showalert,setshowalert]=useState(false);
  const [form] = Form.useForm();
  const routerHistory = useHistory();

  
  const resetPassword = async () => {
    console.log("email: ", email)
    // form.resetFields();
    

    await forgotPassword({
      email: email
      

    })
      .then(function (response) {
        console.log(response.data.message);
        if (response.data.message === true) {
          setEmail("");
          //setshowalert(true);
          // M.toast({ html: response.data.success, classes: "#43a047 green darken-1" })
          
          
          // showalert && <Alert
          //  message={response.data.success}
          //  //description="jhgkj"
          // type="success"
          // showIcon
          // />
          //alert("helllo");
          //alert1();
          setshowalert(
           true
          );
          form.resetFields();
          //setEmail("");

          //Form.reset();
        // (
        // <Alert
        //   message="ghjk"
        //   //description="jhgkj"
        //  type="success"
        //  showIcon />);
          
          //routerHistory.push('./');
        } else {
          //alert("not found");
          // M.toast({ html: response.data.error, classes: "#c62828 red darken-3" })
        }

      })
      .catch(function (error) {

      });
  }

  return (
    <AuthWrapper>
      {showalert ===true? (
        <div>
          <Alert
        message="ghjk"
        //description="jhgkj"
       type="success"
       showIcon
       banner
       closable
       />
        </div>
      ):("") }
      <div className="auth-contents">
        <Form name="forgotPass" layout="vertical">
          <Heading as="h3">Forgot Password?</Heading>
          <p className="forgot-text">
            Enter the email address you used when you joined and we’ll send you instructions to reset your password.
          </p>
          <Form.Item
            label="Email Address"
            name="email"
            rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          >
            <Input placeholder="name@example.com" />
          </Form.Item>
          <Form.Item>
            <Button className="btn-reset" htmlType="submit" type="primary" size="large" onClick={() => resetPassword()}>
              Send Reset Instructions
            </Button>
          </Form.Item>
          <p className="return-text">
            Return to <NavLink to="/">Sign In</NavLink>
          </p>
        </Form>
      </div>
    </AuthWrapper>
  );
};

export default ForgotPassword;
