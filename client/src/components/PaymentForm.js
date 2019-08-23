import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import moment from 'moment'
import Cards from 'react-credit-cards';
import { withRouter } from 'react-router-dom'
import swal from 'sweetalert';



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

    smallField: {
        width: '30%'
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


function PaymentForm(props) {

  

    const classes = useStyles();
    const [number, setNumber] = React.useState('')
    const [name, setName] = React.useState('')
    const [expiry, setExpiry] = React.useState('')
    const [cvc, setCvc] = React.useState('')
    const [focused, setFocused] = React.useState('')

    useEffect(() => {
        props.paymentComponentShowing()

     });

    const handleNumberChange = (e) => {
        e.preventDefault()
        setFocused('number')
        setNumber(e.target.value)
        console.log(number, name, expiry, cvc)
    }

    const handleNameChange = (e) => {
        e.preventDefault()
        setFocused('name')
        setName(e.target.value)
    }

    const handleExpiryChange = (e) => {
        e.preventDefault()
        setFocused('expiry')
        setExpiry(e.target.value)
    }

    const handleCvcChange = (e) => {
        e.preventDefault()
        setFocused('cvc')
        setCvc(e.target.value)
    }

    const handleClick = (e) => {
      
        props.processBooking()
        swal({
          title: "Booking Complete",
          text: "Click to navigate back to your bookings",
          icon: "success",
          button: "My Bookings",
        }).then(buttonClicked => {
          if (buttonClicked) 
          { 
            props.rudiProps.history.push("/users/:id/cleanings")
          } return 
        })

        // swal("Booking Complete", "Taking you back to your bookings", "success");
        // props.rudiProps.history.push('/my-bookings')
        // props.rudiProps.history.push("/users/:id/cleanings")

    }

    return (
        
      <div>
        <Cards
      number={number}
      name={name}
      expiry={expiry}
      cvc={cvc}
      focused={focused}
    />
        <TextField
        id="outlined-full-width"
        label="Card Number"
        style={{ margin: 8 }}
        placeholder="Your 16 digit card number"
        // maxWidth="100%"
        fullWidth
        // margin="normal"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleNumberChange}

      />
      <TextField
        id="outlined-full-width"
        label="Full Name"
        style={{ margin: 8 }}
        placeholder="e.g Mr Abraham Lincoln"
        // className={classes.textField}        
        // maxWidth="70%"
        className={classes.smallField}
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleNameChange}

      />

        <TextField
        id="outlined-full-width"
        label="Expiry XX/XX"
        style={{ margin: 8 }}
        placeholder="e.g 02/22"
        className={classes.smallField}

        // maxWidth="100%"
        // fullWidth
        // margin="normal"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleExpiryChange}
      />

      <TextField
        id="outlined-full-width"
        label="CVC"
        style={{ margin: 8 }}
        placeholder="e.g 222"
        className={classes.smallField}

        // className={classes.textField}        
        // maxWidth="100%"
        // margin="normal"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleCvcChange}

      />
      
      
    
    <Button variant="contained" color="primary" className={classes.button} fullWidth onClick={handleClick}>
        Next
      </Button>
      </div>
    )}

// export default withRouter(CleaningAddress)
export default withRouter(PaymentForm)