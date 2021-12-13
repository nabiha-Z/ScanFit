import React, { useState } from 'react';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { FacebookOutlined, TwitterOutlined } from '@ant-design/icons';
import { Form, Input, Button } from 'antd';
import { AuthWrapper } from './style';
import { Checkbox } from '../../../../components/checkbox/checkbox';
import Heading from '../../../../components/heading/heading';
import { useHistory } from 'react-router';
import Cookies from 'js-cookie';
import { signup } from '../../../../api/index';


const SignUp = () => {
  const [first, setfirst] = useState("");
  const [last, setlast] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const routerHistory = useHistory();
  

  const signupBtn = async() =>{
    console.log("email: ", email)
    await signup({
      first, last, email, password

    })
      .then(function (response) {
        console.log("response=",response.data.message);
        if (response.data.message === true) {
        
            console.log("token: ", response.data.token);
            try {
                Cookies.set('token', response.data.token);
                Cookies.set('mail', email);
                
                // M.toast({ html: response.data.success, classes: "#43a047 green darken-1" })
                routerHistory.push('./');
            } catch (e) {
                console.log("error");
            }
            
        } else  if (response.data.message === false) {
          alert("already")
          // M.toast({ html: response.data.error, classes: "#c62828 red darken-3" })
        
         
        } 
      })
      .catch(function (error) {

      });
  }

  return (
    <AuthWrapper>
      <p className="auth-notice">
        Already have an account? <NavLink to="/">Sign In</NavLink>
      </p>
      <div className="auth-contents">
        <Form name="register" layout="vertical">
          <Heading as="h3">
            Sign Up to <span className="color-secondary">Admin</span>
          </Heading>
          <Form.Item label="Name" name="first" value={first} onChange={(e) => setfirst(e.target.value)} rules={[{ required: true, message: 'Please input your Full name!' }]}>
            <Input placeholder="First name" />
          </Form.Item>
          <Form.Item label="Name" name="last" value={last} onChange={(e) => setlast(e.target.value)} rules={[{ required: true, message: 'Please input your Full name!' }]}>
            <Input placeholder="Last name" />
          </Form.Item>
         
          <Form.Item
            name="email"
            label="Email Address"
            rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
            value={email}
            onChange={(e) => setemail(e.target.value)}
          >
            <Input placeholder="name@example.com" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <div className="auth-form-action">
            <Checkbox >
              Creating an account means you’re okay with our Terms of Service and Privacy Policy
            </Checkbox>
          </div>
          <Form.Item>
            <Button className="btn-create" htmlType="submit" type="primary" size="large" onClick={()=>signupBtn()}>
              Create Account
            </Button>
          </Form.Item>
          <p className="form-divider">
            <span>Or</span>
          </p>
          <ul className="social-login signin-social">
            <li>
              <a className="google-signup" href="/">
                <img src={require('../../../../static/img/google.png')} alt="" />
                <span>Sign up with Google</span>
              </a>
            </li>
            <li>
              <a className="facebook-sign" href="/">
                <FacebookOutlined />
              </a>
            </li>
            <li>
              <a className="twitter-sign" href="/">
                <TwitterOutlined />
              </a>
            </li>
          </ul>
        </Form>
      </div>
    </AuthWrapper>
  );
};

export default SignUp;
