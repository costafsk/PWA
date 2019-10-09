import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './../views/Home/Home.js'

const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home}></Route>
        </Switch>
    </BrowserRouter>
);

export default Router;

