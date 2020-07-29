import React from 'react';
import './App.css';
import LoginBar from './LoginBar';
import ShoppingFeed from './ShoppingFeed';
import Routes from './Routes';

function App() {
  return (
    <div className="App">
      <LoginBar />
      <Routes />
    </div>
  );
}

export default App;
