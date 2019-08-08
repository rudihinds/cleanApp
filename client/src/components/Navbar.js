import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import API from '../adapters/API'
import LoginControl from './LoginControl'



const Navbar = ({userLoggedIn, toggleModal, userLogIn, userLogOut, toggleUserLogIn}) => {
    
    
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


  const classes = useStyles();

  const submitLoginForm = () => {
      let user = {email, password}
      API.login(user).then(console.log)
  }

  return (
   
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>   
          <LoginControl toggleUserLogIn={toggleUserLogIn} />
        <Link to='/' className={classes.title}><h2>UmmyCleans</h2></Link>
      </Toolbar>
    </AppBar>
   
  )
}

export default Navbar;
