import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const user = lazy(() => import('../../container/User/userListing/Userlisting'));
const property = lazy(() => import('../../container/User/propertyDealers/Propertydealer'));
const nonapprovedusers = lazy(() => import('../../container/User/nonApprovedUsers/NonApprovedUsers'));
const User = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
     
      <Route path={`${path}/userlisting`} component={user} />
      <Route path ={`${path}/propertydealers`} component={property}/>
      <Route path ={`${path}/nonapprovedusers`} component={nonapprovedusers}/>
    
    </Switch>
  );
};

export default User;