import React, { lazy, Suspense, useEffect } from 'react';
import { Spin } from 'antd';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Pages from './pages';
import withAdminLayout from '../../layout/withAdminLayout';
import Listings from './listings';
import Project from './projects';

const Myprofile = lazy(() => import('../../container/profile/myProfile/Index'));
const userlisting = lazy(() => import('../../container/User/userListing/Userlisting'));
const property = lazy(() => import('../../container/User/propertyDealers/Propertydealer'));
const nonapprovedusers = lazy(() => import('../../container/User/nonApprovedUsers/NonApprovedUsers'));
const products = lazy (() => import('../../container/Products/products'));
const Location= lazy (() => import('../../container/Location/Location'));
const Subscription = lazy (()=> import('../../container/Features/feature'))
const adduser = lazy (()=> import('../../container/User/adduser'))

const Admin = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Suspense
        fallback={
          <div className="spin">
            <Spin />
          </div>
        }
      >
        <Route path={`${path}/listings`} component={Listings} />
        <Route path={`${path}`} component={Pages} />
        <Route path={`${path}/projects`} component={Project} />
        <Route path={`${path}/profile/myProfile`} component={Myprofile} />
        <Route path={`${path}/userlisting`} component={userlisting} />
        <Route path={`${path}/propertydealers`} component={property} />
        <Route path={`${path}/nonapprovedusers`} component={nonapprovedusers} />
        <Route path={`${path}/category`} component={products} />
        <Route path={`${path}/location`} component={Location} />
        <Route path={`${path}/updatefeatures`} component={Subscription} />
        <Route path={`${path}/adduser`} component={adduser} />
      </Suspense>
    </Switch>
  );
};

export default withAdminLayout(Admin);
