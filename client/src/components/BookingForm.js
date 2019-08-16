import React, { Fragment, useState, setOpen } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  DatePicker
} from '@material-ui/pickers';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import CardContainer from './CardContainer'

// import React, { Fragment, useState } from "react";
// import { DatePicker, KeyboardDatePicker } from "@material-ui/pickers";

const moment = extendMoment(Moment);
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  grid: {
    width: '60%',
  },
  fab: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function BookingForm(props) {
    
  const classes = useStyles();
  const [town, setTown] = React.useState("");
  const [frequency, setFrequency] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState(Date.parse('2019-08-24T05:30:00+01:00'));
  const [duration, setDuration] = React.useState(180);


//   const [selectedDate, handleDateChange] = useState(new Date());

  const handleSubmit = () => {
    const startTime = moment(selectedDate)
    const endTime = moment(selectedDate).add(duration, "minutes")
    const rangeArray = [startTime, endTime]
    const bookingRequestTimeRange = moment.range(rangeArray)
    const state = {
      town,
      frequency,
      duration,
      bookingRequestTimeRange,
      start_time: startTime.toString()
    }

    props.storeBookingRequirements(state)
    console.log(state)
  }

    // bookingRequestTimeRange.overlaps(bookingRequestTimeRange2) ? console.log("It overlaps! Choose another time") : console.log("it doesn't overlap, book away!") 
    // let bookingRequestTimeRange2 = bookingRequestTimeRange
    //create the range using chosen time and duration
    // const mom1 = moment(selectedDate)
    // const mom2 = moment(selectedDate).add(duration, "minutes")
    //moment range accepts an array of two times, new Booking is that array
  

//   state.selectedDate = selectedDate
      

        // const mom3 = moment(mom2).add(60, "minutes")
        // const mom4 = moment(mom3).add(120, "minutes")
        //const anotherBooking = [mom3, mom4]
        // const range2 = moment.range(anotherBooking)

    //   if(range.overlaps(range2)) {
    //       console.log("It overlaps! Choose another time")
    //   } else {
    //       console.log("it doesn't overlap, book away!")
    //   }

      


    //   state.startTime = mom1
    //   state.endTime = mom2
    //   console.log(state)
    //   props.storeBookingRequirements(state)

  

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleTown = e => setTown(e.target.value)
  const handleFrequency = e => setFrequency(e.target.value)
  const handleDuration = e => setDuration(e.target.value)
  const handleDateChange = (date) => setSelectedDate(date) 
  

  return (
    <>
    <form className={classes.root} autoComplete="off">
        {/* dropdown for choosing your town */}
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
          Location
        </InputLabel>
        <Select
          value={town}
          onChange={handleTown}
          input={<OutlinedInput labelWidth={labelWidth} name="age" id="outlined-age-simple" />}
        >
          <MenuItem value="">
            <em>Choose a Location</em>
          </MenuItem>
          <MenuItem value={"London"}>London</MenuItem>
          <MenuItem value={"Birmingham"}>Birmingham</MenuItem>
          <MenuItem value={"Manchester"}>Manchester</MenuItem>
          <MenuItem value={"Gloucester"}>Gloucester</MenuItem>
        </Select>
      </FormControl>

      {/* dropdown for frequency */}
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
          Frequency?
        </InputLabel>
        <Select
          value={frequency}
          onChange={handleFrequency}
          input={<OutlinedInput labelWidth={labelWidth} name="age" id="outlined-age-simple" />}
        >
          <MenuItem value="">
            <em>How Often?</em>
          </MenuItem>
          <MenuItem value={"Weekly"}>Weekly</MenuItem>
          <MenuItem value={"Fortnightly"}>Fortnightly</MenuItem>
          <MenuItem value={"One Off"}>One Off</MenuItem>
          
        </Select>
      </FormControl>
    
      {/* dropdown for start date*/}

    <FormControl>
      <MuiPickersUtilsProvider utils={DateFnsUtils} >
        <DatePicker
          margin="normal"
          id="mui-pickers-date"
          label="Start Date"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </MuiPickersUtilsProvider>
        </FormControl>

      {/* dropdown for duration*/}

    <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
          For How Long?
        </InputLabel>
        <Select
          value={duration}
          onChange={handleDuration}
          input={<OutlinedInput labelWidth={labelWidth} name="age" id="outlined-age-simple" />}
        >
          <MenuItem value="">
            <em>Duration</em>
          </MenuItem>
          <MenuItem value={120}>2 hours</MenuItem>
          <MenuItem value={150}>2.5 hours</MenuItem>
          <MenuItem value={180}>3 hours</MenuItem>
          <MenuItem value={210}>3.5 hours</MenuItem>
          <MenuItem value={240}>4 hours</MenuItem>
        </Select>
      </FormControl>

      {/* dropdown for start time*/}


      <FormControl>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardTimePicker
          margin="normal"
          id="mui-pickers-time"
          label="Start Time"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
       </MuiPickersUtilsProvider>
       </FormControl>
      <FormControl onClick={handleSubmit}>
       <Fab variant="extended" aria-label="submit" className={classes.fab}>
        <NavigationIcon className={classes.extendedIcon} />
        Find Cleaners
      </Fab>
      </FormControl>
    </form>
        <CardContainer filterByMinimumCleans={props.filterByMinimumCleans} filterByRating={props.filterByRating} filterByPrice={props.filterByPrice} availableCleaners={props.availableCleaners} booking={props.bookingRequirements} storeBookingRequirements={props.storeBookingRequirements} processBooking={props.processBooking} currentUser={props.currentUser} storeSelectedCleaner={props.storeSelectedCleaner}/>
                
          </>
  );
}