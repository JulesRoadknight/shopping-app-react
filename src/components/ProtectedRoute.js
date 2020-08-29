import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAppContext } from '../libs/contextLib';

const ProtectedRoute = ({ component: Component, data, onSend, ...rest}) => {
  const { isAuthenticated } = useAppContext();
  return(
    <Route
      {...rest}
      render={routerProps => (
        isAuthenticated
          ? <Component {...routerProps} data={data} onSend={onSend} />
          : <Redirect to={'/login'} data={data} onSend={onSend} />
      )}
    />
  )
}

export default ProtectedRoute;