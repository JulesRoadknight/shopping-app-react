import React, { useState } from 'react';
import './App.css';
import LoginBar from './LoginBar';
import Routes from './Routes';
import { AppContext } from './libs/contextLib';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <LoginBar data={isAuthenticated} />
      <Routes />
    </AppContext.Provider>
  );
}

export default App;
