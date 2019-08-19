import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ProgressBar from './ProgressBar'
import CleaningAddress from './CleaningAddress'
import { withRouter } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
  h3: {
    paddingLeft: '180px'
    // justify: 'center'
  }
}));

// function ConfirmDetailsPage({currentUser, selectedCleaner, bookingRequirements, rudiProps}) {
function ConfirmDetailsPage(props) {


  // useEffect(() => {
  // }
    
  //   if (!((currentUser) && (selectedCleaner) && (bookingRequirements))) {
  //       rudiProps.history.push('new-booking')
  //       console.log("the gang is not here!!!")
  //   } else {
  //       console.log("the gang is here!!!")
  //       }
  // }, [])


  const [currentUser, setCurrentUser] = React.useState({id:1});
  const [selectedCleaner, setSelectedCleaner] = React.useState({
    first_name: "Carmina", 
    last_name: "Murazik", 
    hourly_rate: 15, 
    image: "https://robohash.org/possimussitexpedita.png?size=..."
  })
  const [bookingRequirements, setBookingRequirements] = React.useState({
      town: "London", 
      frequency: "Weekly", 
      duration: 180, 
      start_time: "Sat Aug 24 2019 05:30:00 GMT+0100"
  })
  const [addressFilledOut, setAddressFilledOut] = React.useState(false);

  const changeAddressFilledOut = (addressDetailsObj) => {
    console.log(addressFilledOut)
    console.log(addressDetailsObj)
    setAddressFilledOut(true)
    console.log(addressFilledOut)
  } 

  const addressComponentShowing = () => setAddressFilledOut(false)
  const paymentComponentShowing = () => setAddressFilledOut(true)




  // const [currentUser, setCurrentUser] = React.useState({currentUser});
  // const [selectedCleaner, setSelectedCleaner] = React.useState({selectedCleaner})
  // const [bookingRequirements, setBookingRequirements] = React.useState({bookingRequirements})
  const classes = useStyles();

  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          {/* This is a sheet of paper. */}
        </Typography>
        <Typography component="p">
          {/* Paper can be used to build surface or other elements for your application. */}
        </Typography>
        <ProgressBar addressFilledOut={addressFilledOut} />
        <br/>

        <h3 className={classes.h3}>Complete Your Booking</h3>
        <br/>
        

         
        <CleaningAddress paymentComponentShowing={paymentComponentShowing} addressComponentShowing={addressComponentShowing} addressFilledOut={addressFilledOut} changeAddressFilledOut={changeAddressFilledOut} currentUser={currentUser} cleaner={selectedCleaner} bookingRequirements={bookingRequirements}/>
        {/* <BookingSummary />  */}
      </Paper>
    </div>
  );
}


export default withRouter(ConfirmDetailsPage);

// id: 1, 
      // first_name: "Carmina", 
      // last_name: "Murazik", 
      // hourly_rate: 15, 
      // image: "https://robohash.org/possimussitexpedita.png?size=..."

      // town: "London", 
      // frequency: "Weekly", 
      // duration: 180, 
      // start_time: "Sat Aug 24 2019 05:30:00 GMT+0100"


