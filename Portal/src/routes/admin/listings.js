import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';


const approved =lazy(()=>import("../../container/listings/approved"));
const pending = lazy(()=>import("../../container/listings/pending"));
const rejected = lazy(()=>import("../../container/listings/rejected"));

const listingsRoutes =()=>{
    const { path } = useRouteMatch();
    return(
        <Switch>
            <Route path={`${path}/approved`} component={approved} />
            <Route path={`${path}/pending`} component={pending} />
            <Route path={`${path}/rejected`} component={rejected} />
        </Switch>
    )
}
export default listingsRoutes;