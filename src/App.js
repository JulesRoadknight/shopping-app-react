import React, { useState } from 'react';
import Routes from './Routes';
import { AppContext } from './libs/contextLib';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [userDetailsState, setUserDetailsState] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const updateUserDetails = (details) => {
    setIsAuthenticated(true);
    setUserDetailsState(details);
  }

  return (
    <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <Routes data={ userDetailsState } onSend={updateUserDetails} />
    </AppContext.Provider>
  );
}

export default App;
