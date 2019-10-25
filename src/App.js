import React from 'react';
// import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

import Blog from './components/old/Blog'; // ejemplo con high order component - withStyles
// import TaskList from './components/tasks/TaskList';
import TaskList from './components/tasks/TaskListHooks';
import TaskForm from './components/tasks/TaskForm';
import TaskForm2 from './components/tasks/TaskForm2';

import Home from './components/Home';
import About from './components/About';
import Axios from 'axios';

import MomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function Header() {
  return (
    <h1>ToDo List</h1>
  );
}

function Menu() {
  return (
    <MenuList>
      {/* TODO: En lugar de usar link, usar otra cosa */}
      <MenuItem><Link to="/">Home</Link></MenuItem>
      <MenuItem><Link to="/about">About</Link></MenuItem>
      <MenuItem><Link to="/tasks">Tasks</Link></MenuItem>
    </MenuList>
  );
}

// http://localhost:3000/tasks/new
// http://localhost:3000/tasks/edit/xxxxxxxxx

// const { match } = this.props;
// match.params.taskId

// Crear componente tasks para mapear las rutas
function Tasks({ match }) {
  return (
    <>
     <MuiPickersUtilsProvider utils={MomentUtils}>
        <Route exact path={`${match.path}/new`} component={TaskForm} />
        <Route
          exact
          path={`${match.path}/edit/:taskId`}
          component={TaskForm}
        />
        <Route exact path={`${match.path}/`} component={TaskList} />
      </MuiPickersUtilsProvider>
    </>
  );
}

function App() {

  const classes = useStyles();
  return (
    <Router>
      <div style={{padding: 30}}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper} style={{ backgroundColor: '#3f51b5', color: 'white'}}>
              <Header/>
            </Paper>
          </Grid>
          <Grid item xs={2}>
            <Paper className={classes.paper} style={{ backgroundColor: 'lightgrey'}}>
              <Menu/>
            </Paper>
          </Grid>
          <Grid item xs={10}>
            <Paper className={classes.paper} style={{ backgroundColor: 'lightgrey'}}>
              <Route path="/" exact component={Home} />
              <Route path="/about" component={About} />
              {/* Usar componente task, que segun la ruta redirigirá a la lista o al formulario */}
              <Route path="/tasks" component={Tasks} />
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Router>
  );
}

export default App;
