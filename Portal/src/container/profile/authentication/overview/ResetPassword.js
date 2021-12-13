import React, { useState } from 'react';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { useParams } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { AuthWrapper } from './style';
import Heading from '../../../../components/heading/heading';
// import M from 'materialize-css';
import axios from 'axios';
import { useHistory } from 'react-router';
import { resetpassword } from '../../../../api/index.js';

function ResetPassword() {

  const [pass, setpassword] = useState("");
  const [error, setError] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const routerHistory = useHistory();

 console.log(useParams());
 let email = useParams();
  console.log("email",typeof(email.user));
  const user_email = email.user;
 

  const resetPassword = async () => {
    console.log("confirm: ", confirmpassword);
    if(validate()){
       console.log("password l",typeof(pass));
      await resetpassword({
        pass, user_email
  
      })
        .then(function (response) {
          console.log(response.data.message);
          if (response.data.message === true) {
  
            // M.toast({ html: response.data.success, classes: "#43a047 green darken-1" })
            //routerHistory.push('./');
          }else{
            // M.toast({ html: response.data.error, classes: "#43a047 red darken-3" })
          }
  
        })
        .catch(function (error) {
  
        });
    }
   
  }

  const validate = () =>{
    console.log("validation");
    console.log("password= ", pass);
    console.log("confrim= ", confirmpassword);
    if(pass!=confirmpassword){
      setError("Passowrd doesn't match.")
      return false;
    }else{
      setError("");
      return true;
    }
  }

  return (
    <AuthWrapper>
      <div className="auth-contents">
        <Form name="forgotPass" layout="vertical">
          <Heading as="h3">Reset Password</Heading>
          <p className="forgot-text">
            Enter the new password.
          </p>
          <Form.Item
           
            label="New Password"
            name="password"
            rules={[{ required: true, message: 'Please enter new password!' }]}
            value={pass}
            onChange={(e) => setpassword(e.target.value)}
          >
            <Input placeholder="new password" />
          </Form.Item>
          <Form.Item
           
            label="Confirm Password"
            name="confirmpassword"
           
            value={confirmpassword}
            onChange={(e) => setconfirmpassword(e.target.value)}
          >
             
            <Input placeholder="conform password" />
            <h4 style={{ color: '#C72C2C', fontWeight:17, fontSize: 17 }}>{error}</h4>
          </Form.Item>
          <Form.Item>
            <Button className="btn-reset" htmlType="submit" type="primary" size="large" onClick={() => resetPassword()}>
              Change Password
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

export default ResetPassword;
