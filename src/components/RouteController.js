import React from 'react';
import { Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import AuthRoute from './AuthRoute';

const RouteController = (props) => {
  const { routeType, ...routeProps } = props;

  return(
    <>
      { routeType === 'public' &&
        <Route
          {...routeProps}
          data={props.data}
          onSend={props.onSend}
        />
      }
      {(routeType === 'protected') && (<ProtectedRoute {...routeProps} onSend={props.onSend} data={props.data} />)}
      {(routeType === 'auth') && (<AuthRoute {...routeProps} onSend={props.onSend} data={props.data} />)}
    </>
  )
}

export default RouteController;