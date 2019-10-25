import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import logo from './logo.svg';
import './App.css';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(10),
  },
  input: {
    display: 'none',
  },
}));

export default function BlogP (){
  const classes = useStyles();
  const [count, setCount] = useState(0);
  // const [userRequest, setUserRequest] = useState({
  //   loading: false,
  //   user: null,
  // });

  return (
    <Button variant="contained" className={classes.button} onClick={() => { setCount(count + 1);}}>
      Click me {count}
    </Button>
  );
}
