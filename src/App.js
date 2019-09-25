import React from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import logo from './logo.svg';
import './App.css';
import Blog from './Blog'; // ejemplo con high order component - withStyles
import Blog2 from './Blog2'; // ejemplos con hooks - makeStyles
import ListItem from './ListItem';

function App() {
  return (
    <div>
        <div className="App" style={{ backgroundColor: 'grey' }}>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <Blog />
          </header>
        </div>
    </div>
  );
}

export default App;
