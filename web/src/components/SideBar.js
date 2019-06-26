import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import LocationCity from '@material-ui/icons/LocationCity';
import { Link } from "react-router-dom";
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

const styles = {
  list: {
    width: 350,
  },
};

class TemporaryDrawer extends Component {
  state = {
    left: false,
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
       
        <List>
            <ListItem button component={Link} to="/">
              <ListItemIcon>{ <HomeIcon/>}</ListItemIcon>
              <ListItemText>{ "Home"}</ListItemText>
            </ListItem> 
        </List>

        <Divider />

        <List>
            <ListItem button component={Link} to="/books">
              <ListItemIcon>{ <LibraryBooksIcon/>}</ListItemIcon>
              <ListItemText>{ "Create / Update books"}</ListItemText>
            </ListItem>
            <ListItem button component={Link} to="/locations">
              <ListItemIcon>{ <LocationCity/>}</ListItemIcon>
              <ListItemText>{ "Create / Update locations"}</ListItemText>
            </ListItem>
            <ListItem button component={Link} to="/customers">
              <ListItemIcon>{ <LocationCity/>}</ListItemIcon>
              <ListItemText>{ "Add new Customer"}</ListItemText>
            </ListItem>
            <ListItem button component={Link} to="/inventory">
              <ListItemIcon>{ <LocationCity/>}</ListItemIcon>
              <ListItemText>{ "New Inventory registration"}</ListItemText>
            </ListItem>
            <ListItem button component={Link} to="/reports">
              <ListItemIcon>{ <LocationCity/>}</ListItemIcon>
              <ListItemText>{ "Reports"}</ListItemText>
            </ListItem>
        </List>

      </div>
    );

    return (
        
      <div>
        <AppBar position="static"> 
          <ToolBar>
            <IconButton
              color="inherit"
              aria-label="Open Left"
              onClick={this.toggleDrawer('left', true)}
            >
             <MenuIcon />
             </IconButton>
             <Typography variant="h6" color="inherit" noWrap>
              Warehouse managament application
            </Typography>    
          </ToolBar>
        </AppBar>
          
        <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            {sideList}
          </div>
        </Drawer>

      </div>
    );
  }
}

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TemporaryDrawer);