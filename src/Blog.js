import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import logo from './logo.svg';
import './App.css';

const styles = theme => ({
  button: {
    margin: theme.spacing(10),
    // padding: theme.spacing(10)
  },
  input: {
    display: 'none',
  },
});

class Blog extends React.Component {

  render() {
    const { classes } = this.props; // this.props.classes
    return (
      <Button variant="contained" className={classes.button}>
        Default
      </Button>
    );
  }

}

Blog.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(Blog);
