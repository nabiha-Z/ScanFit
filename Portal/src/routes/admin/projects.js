import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';

const createProject =lazy(()=>import("../../container/Projects/createProject"));

const Project =()=>{
    const { path } = useRouteMatch();
    return(
        <Switch>
            <Route path={`${path}/create`} component={createProject} />
        </Switch>
    )
}
export default Project;