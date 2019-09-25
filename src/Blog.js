import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FolderIcon from '@material-ui/icons/Folder';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import logo from './logo.svg';
import './App.css';

const styles = theme => ({
  button: {
    margin: theme.spacing(10),
  },
  input: {
    display: 'none',
  },
});

class ItemComponent extends React.Component {
  render() {
    const { classes } = this.props; // this.props.classes
    console.log(classes);
    return (
      <p>
        prueba
      </p>
    );
  }
}

const Item = withStyles(styles)(ItemComponent);

// export {
//     Item
// };

class Blog extends React.Component {

  state = {
    count: 0,
    value: null
  }

  handleChange = (event, newValue) => {
    console.log(newValue);
    this.setState({ value: newValue });
  }

  render() {
    const { classes } = this.props; // this.props.classes
    const { count } = this.state;
    return (
      <>
        <Button variant="contained" className={classes.button}>
          Click me
        </Button>
        <Item />
      </>
    );
  }

}

Blog.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  // text: PropTypes.string,
};

// Blog.defaultProps = {
//   text: 'default'
// }

// export default Blog;
export default withStyles(styles)(Blog);
