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
}));

function ConfirmDetailsPage({currentUser, selectedCleaner, bookingRequirements, rudiProps}) {

  useEffect(() => {
    debugger
    if (!((currentUser) && (selectedCleaner) && (bookingRequirements))) {
        rudiProps.history.push('new-booking')
        console.log("the gang is not here!!!")
    } else {
        console.log("the gang is here!!!")
        }
  }, [])

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
        <ProgressBar />
        <h1>Confirm Your Cleaning Address</h1>
        <CleaningAddress currentUser={currentUser} cleaner={selectedCleaner} bookingRequirements={bookingRequirements}/>
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


