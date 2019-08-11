import React from 'react'
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import API from '../adapters/API'



function LogoutButton(props) {

    // const [open, setOpen] = React.useState(false);
    // const [email, setEmail] = React.useState('');
    // const [password, setPassword] = React.useState('');
  
  
  //   const [credentials, setCredentials] = React.useState({email: '', password: ''})
  
  
    const handleLogout = () => {
        API.clearToken();
        props.toggleLoggedIn()
        props.toggleUserLogIn()
        props.removeCurrentUser()

        
    //   setOpen(true);
    }
  
    // function handleClose() {
    //   setOpen(false);
    // }
  
      
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
  
    // const submitLoginForm = () => {
    //     let user = {email, password}
    //     API.login(user).then(console.log)
    // }


    return (

        <div>
        <Button variant="outlined" color="#ff9800" onClick={handleLogout}>Logout</Button>
        </div>
     
    );
  }

export default LogoutButton