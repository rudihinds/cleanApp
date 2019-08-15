import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import CleanerCard from './CleanerCard'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function CardContainer(props) {
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();

  // function handleChange(event, value) {
  //   setSpacing(Number(value));
  // }

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={9} justify="center">
        <Grid container spacing={3} >      
            {
              props.availableCleaners.map(cleaner => 
                <Grid item >
                <CleanerCard cleaner={cleaner} booking={props.booking} storeBookingRequirements={props.storeBookingRequirements} processBooking={props.processBooking} currentUser={props.currentUser} storeSelectedCleaner={props.storeSelectedCleaner}/>
                </Grid>
              )
            }
            
        </Grid>
      </Grid>
      <Grid item xs={8}>
          
        <Paper className={classes.control}>
        
        </Paper>
      </Grid>
    </Grid>
  );
}