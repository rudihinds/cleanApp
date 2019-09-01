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



function SignUpButton(props) {

    const [open, setOpen] = React.useState(false);
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isCleaner, setIsCleaner] = React.useState('');
    const [errors, setErrors] = React.useState(null);


  
  
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
      button: {
          color: "white"
      },
      title: {
        flexGrow: 1,
        color: 'white',
        textDecoration: 'none',
        // flexDirection: "row",
        float: "right"
      }
    }));
  
    const handleClick = () => {
        console.log('you clicked Me!')
    }
  
    const classes = useStyles();
  
    // const submitLoginForm = () => {
    //     let user = {email, password}
    //     API.login(user).then(userObj => {
    //       if (userObj) {
    //         console.log("treated as successful/user valid")
    //         console.log(userObj)
    //         props.toggleLoggedIn()
    //         props.toggleUserLogIn()
    //         props.addCurrentUser(userObj)
    //         setOpen(false)
    //       } else {
    //         console.log("treated as unsuccessful/no user/data.errors")
    //         alert("Login failed, please enter valid email and password")
    //       }
    //     })
      
    // }

     const handleSubmit = (e) => {
        e.preventDefault();
        const errors = []
        if (firstName === '') errors.push('The first name cannot be blank')
        if (lastName === '') errors.push('The last name cannot be blank')
        if (password === '') errors.push('The password cannot be blank')
        if (email === '') errors.push('The email cannot be blank')
        if (errors.length !== 0) {
          setErrors({ errors })
        } else {
          let user = {
              first_name: firstName, 
              last_name: lastName, 
              email, 
              password, 
              is_cleaner: isCleaner}
          API.signUp(user).then(data => {
            console.log(data.user)
            if (data.errors) setErrors({errors: data.errors})
            if (data.user) 
            setFirstName("")
            setLastName("")
            setEmail("")
            setPassword("")
            setIsCleaner(false)
            setErrors(null)
            props.setUserToLoggedIn(data.user)
          })
    
        }
      }


    return (

        <div>
        <Button className="button" variant="outlined" color="white" onClick={handleClickOpen}>Sign Up</Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create an account</DialogTitle>
        <DialogContent>
        <DialogContentText>
            To start booking jobs please enter your details here
        </DialogContentText>
        <TextField
            autoFocus
            margin="dense"
            id="first_name"
            label="First Name"
            type="name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            fullWidth
        />
        <TextField
            autoFocus
            margin="dense"
            id="last_name"
            label="Last Name"
            type="name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            fullWidth
        />
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
        <Button onClick={handleSubmit} color="primary">
            Submit
        </Button>
        </DialogActions>
        </Dialog>
        </div>
     
    );
  }

export default SignUpButton