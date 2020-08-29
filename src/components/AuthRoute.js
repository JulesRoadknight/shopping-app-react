import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAppContext } from '../libs/contextLib';

const AuthRoute = ({ component: Component, data, onSend, ...rest}) => {
  const { isAuthenticated } = useAppContext();
  return(
    <Route
      {...rest}
      render={routerProps => {
        return(
          !isAuthenticated
            ? <Component {...routerProps} data={data} onSend={onSend} />
            : <Redirect to={'/'} />
        )
      }}
    />
  )
}

export default AuthRoute;