import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Notifications from './Notifications'
import Schedule from './Schedule'
import Offers from './Offers'
import Fees from './Chat'
import Availability from './Availability';
import MyCustomers from './MyCustomers';
import ProfileSettings from './ProfileSettings';
import MyRatings from './MyRatings'

const drawerWidth = 142;
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
}));


export default function DashboardProvider() {
  const [categories, setCategories] = useState(['Notifications', 'Offers', 'Schedule', 'Chat'])
  const [more, setMore] = useState(['Availability', 'MyRatings', 'MyCustomers', 'ProfileSettings'])
  const [selected, setSelected] = useState('Offers')

  
  const classes = useStyles();
 
  const handleClick = (e) => {
    setSelected(e.target.innerText)
  }

  const renderComponentInViewPane = () => {
      if (selected !== null)
    {
      if (selected === 'Notifications') 
        return <Notifications />
      if (selected === 'Offers') 
        return <Offers />
      if (selected === 'Schedule') 
        return <Schedule />
      if (selected === 'Chat') 
        return <Fees />
      if (selected === 'Availability') 
      return <Availability />
      if (selected === 'MyRatings') 
      return <MyRatings />
      if (selected === 'MyCustomers') 
      return <MyCustomers />
      if (selected === 'ProfileSettings') 
      return <ProfileSettings />
    }
      else return 
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <List>
        <ListItem>
            <h3>Main</h3>
          </ListItem>
          {categories.map((text, index) => (
            <ListItem button key={text} onClick={handleClick}>
              <ListItemText primary={text} />
            </ListItem>   
          ))}
        </List>
        <Divider />
        <List>
          <ListItem>
            <h3>More</h3>
          </ListItem>
          {more.map((text, index) => (
            <ListItem button key={text} onClick={handleClick}>
              <ListItemText primary={text} />
            </ListItem>   
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        {renderComponentInViewPane()} 
      </main>
    </div>
  );
}
