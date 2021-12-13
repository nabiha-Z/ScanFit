import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const Settings = lazy(() => import('../../container/profile/settings/Settings'));

const PagesRoute = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path} component={Settings} />
      <Route path={`${path}/settings`} component={Settings} />
    </Switch>
  );
};

export default PagesRoute;
