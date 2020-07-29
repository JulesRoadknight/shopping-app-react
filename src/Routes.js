import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AppliedRoute from "./components/AppliedRoute";
import ShoppingFeed from "./ShoppingFeed";
import Login from "./containers/Login";
import Signup from "./containers/Signup";

export default function Routes({ appProps }) {
    return (
        <BrowserRouter>
          <Switch>
            <AppliedRoute path="/" exact component={ShoppingFeed} appProps={appProps} />
            <Route path="/login" component={Login} appProps={appProps} />
            <Route path="/signup" component={Signup} appProps={appProps} />
            { /* Finally, catch all unmatched routes */ }
            <Route component={ShoppingFeed} />
          </Switch>
        </BrowserRouter>
    );
}