import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import API from '../adapters/API'
import LoginControl from './LoginControl'
import { NavLink } from 'react-router-dom'



const Navbar = ({userLoggedIn, toggleModal, userLogIn, addCurrentUser, toggleUserLogIn, removeCurrentUser, user}) => {
    
    
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
//   const [credentials, setCredentials] = React.useState({email: '', password: ''})

  const useStyles = makeStyles(theme => ({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    title: {
      flexGrow: 1,
      color: 'white',
      textDecoration: 'none'
    }
  }));

  const link = {
    width: '100px',
    // padding: '12px',
    margin: '0 6px 6px',
    textDecoration: 'none',
    color: 'white',
  }


  const classes = useStyles();

  const submitLoginForm = () => {
      let user = {email, password}
      API.login(user).then(console.log)
  }

  return (
   
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar> 
        <NavLink to="/new-booking" style={link}>New Booking</NavLink>  
        { userLoggedIn ? <NavLink to="/users/:id/cleanings" style={link}>My Bookings</NavLink> : null }
        { !userLoggedIn ? <NavLink to="/signup" style={link}>Sign Up</NavLink> : null }
        <LoginControl toggleUserLogIn={toggleUserLogIn} addCurrentUser={addCurrentUser} removeCurrentUser={removeCurrentUser}/>
      </Toolbar>
    </AppBar>
   
  )
}

export default Navbar;

  // <Link to='/' className={classes.title}>UmmyCleans</Link> */}
        //  <NavLink to={`/MyBookings/${user.id}`} */}
        // // exact
        // style={link}
        // activeStyle={{
        //     background:'darkblue'
        // }}
        // >My Bookings</NavLink> 