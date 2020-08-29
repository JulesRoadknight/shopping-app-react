import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
// import AppliedRoute from "./components/AppliedRoute";
import ShoppingFeed from "./containers/ShoppingFeed";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Account from "./containers/Account";
import LoginBar from "./containers/LoginBar";
import RouteController from "./components/RouteController";
import { useAppContext } from './libs/contextLib';

const Routes = ({ data, onSend }) => {
    const { isAuthenticated } = useAppContext();
    return (
        <BrowserRouter>
          {/* NOTE: LoginBar is here because <Link> elements must be in a <Router>/<BrowserRouter>, as above */}
          <LoginBar onSend={onSend} /> 
          <Switch>

            {/* <AppliedRoute exact path="/" component={ShoppingFeed} data={data} /> */}
            {/* NOTE: {...props} object below is the match object, necessary but not useful here */}
            {/* NOTE: Data passed like this is only updated on initial mount */}
            {/* <Route path="/login" render={(props) => <Login {...props} data={data} onSend={onSend} />} /> */}
            {/* <Route path="/signup" component={Signup} data={data} /> */}
            {/* <Route path="/account" render={(props) => <Account {...props} data={data} onSend={onSend} />} /> */}
            { /* Finally, catch all unmatched routes */ }
            {/* <Route component={ShoppingFeed} /> */}

            {/* NOTE: Commented section above is unprotected alternative to section below */}

          <RouteController
            routeType={'public'}
            isAuthenticated={isAuthenticated}
            component={ShoppingFeed}
            path={'/'}
            exact
            data={data}
            onSend={onSend}
          />
          <RouteController
            routeType={'protected'}
            isAuthenticated={isAuthenticated}
            component={Account}
            path={'/account'}
            exact
            data={data}
            onSend={onSend}
          />
          <RouteController
            routeType={'auth'}
            isAuthenticated={isAuthenticated}
            component={Login}
            path={'/login'}
            exact
            data={data}
            onSend={onSend}
          />
          <RouteController
            routeType={'auth'}
            isAuthenticated={isAuthenticated}
            component={Signup}
            path={'/signup'}
            exact
            data={data}
            onSend={onSend}
          />
        </Switch>
        </BrowserRouter>
    );
}

export default Routes;