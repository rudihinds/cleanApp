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
import API from '../../adapters/API'



function LoginButton(props) {

    const [open, setOpen] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
  
  
  //   const [credentials, setCredentials] = React.useState({email: '', password: ''})
  
  
    function handleClickOpen() {
      setOpen(true);
    }
  
    function handleClose() {
      setOpen(false);
    }
  
      
    const useStyles = makeStyles(theme => ({
      appBar: {
        zIndex: theme.zIndex.drawer + 1,
      },
      title: {
        flexGrow: 1,
        color: 'white',
        textDecoration: 'none',
        flexDirection: "row"

      }
    }));
  
    const handleClick = () => {
        console.log('you clicked Me!')
    }
  
    const classes = useStyles();
  
    const submitLoginForm = () => {
        let user = {email, password}
        API.login(user).then(userObj => {
          if (userObj) {
            console.log("treated as successful/user valid")
            console.log(userObj)
            props.addCurrentUser(userObj)
            setOpen(false)
          } else {
            console.log("treated as unsuccessful/no user/data.errors")
            alert("Login failed, please enter valid email and password")
          }
        })
      
    }


    return (

        <div>
        <Button variant="outlined" color="#ff9800" onClick={handleClickOpen}>Login</Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Login to your account</DialogTitle>
        <DialogContent>
        <DialogContentText>
            To book a job please enter your email and password here
        </DialogContentText>
        <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
        />
        <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
        />
        </DialogContent>
        <DialogActions>
        <Button onClick={handleClose} color="primary">
            Cancel
        </Button>
        <Button onClick={submitLoginForm} color="primary">
            Submit
        </Button>
        </DialogActions>
        </Dialog>
        </div>
     
    );
  }

export default LoginButton