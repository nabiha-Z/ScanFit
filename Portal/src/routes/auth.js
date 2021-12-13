import React, { lazy, Suspense } from 'react';
import { Spin } from 'antd';
import { Switch, Route, Redirect } from 'react-router-dom';
import AuthLayout from '../container/profile/authentication/Index';

const Login = lazy(() => import('../container/profile/authentication/overview/SignIn'));
const SignUp = lazy(() => import('../container/profile/authentication/overview/Signup'));
const ForgotPass = lazy(() => import('../container/profile/authentication/overview/ForgotPassword'));
const ResetPass = lazy(() => import('../container/profile/authentication/overview/ResetPassword'));
const NotFound = () => {
  return <Redirect to="/" />;
};

const FrontendRoutes = () => {
  return (
    <Switch>
      <Suspense
        fallback={
          <div className="spin">
            <Spin />
          </div>
        }
      >
        <Route exact path="/forgotPassword" component={ForgotPass} />
        <Route exact path="/resetPassword/:user" component={ResetPass} />
        <Route exact path="/register" component={SignUp} />
        <Route exact path="/" component={Login} />
        {/* <Route path="*" component={NotFound} /> */}
      </Suspense>
    </Switch>
  );
};

export default AuthLayout(FrontendRoutes);
