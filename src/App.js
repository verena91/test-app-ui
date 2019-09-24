import React from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import logo from './logo.svg';
import './App.css';
import Blog from './Blog';


function App() {
  return (
    <div>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <Blog />
          </header>
        </div>
    </div>
  );
}

export default App;
