import React from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

// export default Test;
// import Test from './test';

// export {
//   Test,
//   Test2,
//   Test3
// };
// import { Test as Pepe, Test2, Test3 } from './test';

import logo from './logo.svg';
import './App.css';
import Blog from './Blog'; // ejemplo con high order component - withStyles
// import Topics from './Topic';

function Index() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function People() {
  return <><h2>Star Wars People</h2><Blog/></>;
}

function Header() {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/people">People</Link>
      </li>
      <li>
        <Link to="/topics">Topics</Link>
      </li>
    </ul>
  );
}

function Topic({ match }) {
  return (
    <div>
      <h3>{match.params.id}</h3>
    </div>
  );
}

function Topics({ match }) {
  return (
    <div>
      <h2>Topics</h2>

      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
        </li>
      </ul>

      <Route path={`${match.path}/:id`} component={Topic}/>
      <Route
        exact
        path={match.path}
        render={() => <h3>Please select a topic.</h3>}
      />
    </div>
  );
}

function App() {
  return (
    <Router>
      <div>
        <Header/>

        <Route path="/" exact component={Index} />
        <Route path="/about" component={About} />
        <Route path="/people" component={People} />
        <Route path="/topics" component={Topics} />

      </div>
    </Router>
  );
}

export default App;
