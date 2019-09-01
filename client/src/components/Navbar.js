import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import API from '../adapters/API'
import LoginControl from './LoginControl'
import { NavLink } from 'react-router-dom'
import SignUpButton from './SignUpButton';



const Navbar = ({userLoggedIn, addCurrentUser, toggleUserLogIn, removeCurrentUser, currentUser, setUserToLoggedIn}) => {
    
    
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
//   const [credentials, setCredentials] = React.useState({email: '', password: ''})

  const useStyles = makeStyles(theme => ({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      flexDirection: "row"

    },
    title: {
      // flexGrow: 1,
      color: 'white',
      textDecoration: 'none',
      flexDirection: "row"

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

  // do not return on hompage
  if (window.location.pathname === '/') {
    return null;
  }

  return (
   <div>
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar> 
        <NavLink to="/new-booking" style={link}>New Booking</NavLink>  
        { currentUser ? <NavLink to={`/users/${currentUser.id}/cleanings`} style={link}>My Bookings</NavLink> : null }
        {/* { currentUser ? <NavLink to={`/users/:id/cleanings`} style={link}>My Bookings</NavLink> : null } */}

        {/* { !userLoggedIn ? <NavLink to="/signup" style={link}>Sign Up</NavLink> : null } */}
        { !userLoggedIn ? <SignUpButton setUserToLoggedIn={setUserToLoggedIn}/> : null }

        <LoginControl userLoggedIn={userLoggedIn} toggleUserLogIn={toggleUserLogIn} addCurrentUser={addCurrentUser} removeCurrentUser={removeCurrentUser}/>
      </Toolbar>
    </AppBar>
        <br />
        <br />
        <br />
        <br />
    </div>
   
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