import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import moment from 'moment'
import { Link, Redirect} from 'react-router-dom'
import PaymentForm from './PaymentForm'


const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      // marginLeft: '-32px',
      // marginRight: 'auto',
      direction: 'column',
      justifyContent: 'center'
      // width: '70%'
    },
  
    div: {
      marginLeft: '20px',
      width: '45%',
    },
  
    button: {
      margin: theme.spacing(1),
    },
    input: {
      display: 'none',
    },
  
    listItem: {
        width: '100%',
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-between',
        borderBottom: 'solid 1px lightgrey',
    },
  
    summaryContainer: {
      border: 'solid 1px lightgrey',
      borderRadius: "4px",
      // marginLeft: "25px",
      padding: 0
  
    },
  
    form: {
  
      width: '45%',
      alignItems: 'flex-start',
  
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      // width: 'auto',
      // alignItems: 'flex-start'
      width: '100%'
    },
    dense: {
      marginTop: theme.spacing(2),
    },
    menu: {
      width: 200,
    },
  }}));


export default function AddressForm(props) {
  console.log(props)

  // need to add if statement, if props. address details is true (sent down if they filled it in it will be stored
  // by app, then fill out the details for you. also if user has details in the user object then fill it out)

    const classes = useStyles();
    const [firstName, setFirstName] = React.useState("")
    const [lastName, setLastName] = React.useState("")
    const [addressOne, setAddressOne] = React.useState("")
    const [addressTwo, setAddressTwo] = React.useState("")
    const [postcode, setPostcode] = React.useState("")
    const [errors, setErrors] = React.useState([])

    useEffect(() => {
      props.addressComponentShowing()
   });
    

    
      // need to send down state at some point of location
    //   firstName: '',
    //   lastName: '',
    //   addressOne: '',
    //   addressTwo: '',
    //   postcode: '',

    // });
    
    const handleFirstNameChange = (e) => {
      setFirstName(e.target.value)
     
    }

    const handleLastNameChange = (e) => {
      setLastName(e.target.value)
      

    }

    const handleAddressOneChange = (e) => {
      setAddressOne(e.target.value)
     

    }

    const handleAddressTwoChange = (e) => {
      setAddressTwo(e.target.value)
      
      

    }

    const handlePostcodeChange = (e) => {
      setPostcode(e.target.value)
   
      

    }

    const handleClick = () => {
      const addressFormDetails = {
        firstName, 
        lastName, 
        addressOne,  
        addressTwo, 
        postcode,
      }
      const errors = []
      if (firstName === '') errors.push('You must enter your first name')
      if (lastName === '') errors.push('You must enter your last name')
      if (addressOne === '') errors.push('You must enter the first line of your address')
      if (addressTwo === '') errors.push('You must enter the second line of your address')
      if (postcode === '') errors.push('You must enter a postcode')
      if (errors.length !== 0) {
        setErrors(errors)
        console.log(errors)
      } else { 
        props.changeAddressFilledOut(addressFormDetails)
        props.history.push('/checkout/payment-form')
      }
    }

    return (

      <div>

      <TextField
        id="outlined-full-width"
        label="First Name"
        style={{ margin: 8 }}
        placeholder="Placeholder"
        className={classes.textField}        
        maxWidth="50%"
        // margin="normal"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
      onChange={handleFirstNameChange}
        
      />
      <TextField
        id="outlined-full-width"
        label="Last Name"
        style={{ margin: 8 }}
        placeholder="Placeholder"
        className={classes.textField}        
        // maxWidth="100%"
        // margin="normal"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
      onChange={handleLastNameChange}

      />
      <TextField
        id="outlined-full-width"
        label="Address One"
        style={{ margin: 8 }}
        placeholder="Placeholder"
        // maxWidth="100%"
        fullWidth
        // margin="normal"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
      onChange={handleAddressOneChange}

      />
      <TextField
        id="outlined-full-width"
        label="Address Two"
        style={{ margin: 8 }}
        placeholder="Placeholder"
        // maxWidth="100%"
        fullWidth
        // margin="normal"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
      onChange={handleAddressTwoChange}

      /><TextField
      id="outlined-full-width"
      label="Postcode"
      style={{ margin: 8 }}
      placeholder="Placeholder"
      // maxWidth="100%"
      fullWidth
      // margin="normal"
      variant="outlined"
      InputLabelProps={{
        shrink: true,
      }}
      onChange={handlePostcodeChange}
    />
    
    {/* <Link to="/checkout/payment-form" style={{ textDecoration: 'none' }}>  */}
    
    <Button variant="contained" color="primary" className={classes.button} fullWidth onClick={handleClick}>
        Next
      </Button>
      
    
      
        
    
      </div>
    )}