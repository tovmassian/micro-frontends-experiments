import React, { useState, Fragment } from "react";
import clsx from "clsx";
import { Router, Route, Link } from "react-router-dom";
import { createBrowserHistory } from "history";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Label from "@material-ui/icons/Label";
import HomeIcon from "@material-ui/icons/Home";
import ExtensionIcon from "@material-ui/icons/Extension";

// This is for using shared design-system
// import { materialUI, materialUIIcons } from "@tovmassian/material-ui";
// const { AppBar, Avatar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, ListItemIcon, IconButton, withStyles } = materialUI;
// const { MenuIcon, Label, HomeIcon, ExtensionIcon } = materialUIIcons;

const drawerWidth = 240;
const history = createBrowserHistory();

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    '& header':{
      zIndex: 30,
    }
  },
  flex: {
    flex: 1,
    justifyContent: true,
  },
  headerBlock: {
    marginLeft: 10,
    marginRight: 10,
  },
  drawerPaper: {
    position: "relative",
    width: drawerWidth,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  toolbarMargin: theme.mixins.toolbar,
  aboveDrawer: {
    // zIndex: theme.zIndex.drawer + 1,
    zIndex: 20,
  },
});

const NavBar = withStyles(styles)(({ classes, title, onMenuClick }) => (
  <Fragment>
    <AppBar className={classes.aboveDrawer}>
      <Toolbar className={classes.headerBlock}>
        <IconButton
          className={classes.menuButton}
          color="inherit"
          aria-label="Menu"
          onClick={onMenuClick}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" color="inherit" className={classes.flex} align={'left'}>
          {title}
        </Typography>
        <Avatar alt="Remy Sharp" src="../assets/logo_inverse.png" className={classes.headerBlock}/>
        <Typography variant="h6" color="inherit" className={classes.flex} align={'right'}>
          AI Tools Platform
        </Typography>
      </Toolbar>
    </AppBar>
    <div className={classes.toolbarMargin} />
  </Fragment>
));

const SideDrawer = withStyles(styles)(
  ({ classes, variant, open, onClose, onItemClick }) => (
    <Router history={history}>
      <Drawer
        variant={variant}
        open={open}
        onClose={onClose}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div
          className={clsx({
            [classes.toolbarMargin]: variant === "persistent",
          })}
        />
        <List>
          <ListItem
            button
            component={Link}
            to="/"
            onClick={onItemClick("Home")}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText>Home</ListItemText>
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/annotations"
            onClick={onItemClick("Annotations")}
          >
            <ListItemIcon>
              <Label />
            </ListItemIcon>
            <ListItemText>Annotations</ListItemText>
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/landmarks"
            onClick={onItemClick("Landmarks")}
          >
            <ListItemIcon>
              <ExtensionIcon />
            </ListItemIcon>
            <ListItemText>Landmarks</ListItemText>
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <Route exact path="/" />
        <Route path="/annotations" />
        <Route path="/landmarks" />
      </main>
    </Router>
  )
);

function NavBarApp({ classes, variant }) {
  const [drawer, setDrawer] = useState(false);
  const [title, setTitle] = useState("Home");

  const toggleDrawer = () => {
    setDrawer(!drawer);
  };

  const onItemClick = (title) => () => {
    setTitle(title);
    setDrawer(variant === "temporary" ? false : drawer);
    setDrawer(!drawer);
  };

  return (
    <div className={classes.root}>
      <NavBar title={title} onMenuClick={toggleDrawer} />
      <SideDrawer
        open={drawer}
        onClose={toggleDrawer}
        onItemClick={onItemClick}
        variant={variant}
      />
    </div>
  );
}

export default withStyles(styles)(NavBarApp);
