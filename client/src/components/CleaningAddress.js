import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import moment from 'moment'
import AddressForm from './AddressForm'
import PaymentForm from './PaymentForm'
// import PaymentFormTest from './PaymentFormTest'
import 'react-credit-cards/lib/styles.scss'
import CreditCardInput from 'react-credit-card-input';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'



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
  },

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
  h3: {
    fontColor: 'white'
  }
}));

function CleaningAddress(props) {
  
  console.log(props)
  const classes = useStyles();
  

  // const handleChange = name => event => {
  //   setValues({ ...values, [name]: event.target.value });
  // };

  return (
    <Container className={classes.container}>
    <form className={classes.form} noValidate autoComplete="off">

    {/* <Route exact path="/checkout" render={(rudiProps) => <ConfirmDetailsPage rudiProps={rudiProps} selectedCleaner={this.state.selectedCleaner} bookingRequirements={this.state.bookingRequirements} currentUser={this.state.currentUser} />} /> */}

    <Switch>
    <Route path={props.match.url + '/address-form'} render={(rudiProps) => <AddressForm 
    {...rudiProps} 
    addressComponentShowing={props.addressComponentShowing} 
    toggleAddressFilledOut={props.toggleAddressFilledOut}
    changeAddressFilledOut={props.changeAddressFilledOut} 
    cleaner={props.cleaner} 
    addressFilledOut={props.addressFilledOut}  />} 
    />
    
    {/* <AddressForm changeAddressFilledOut={props.changeAddressFilledOut} /> */}
    <Route path={props.match.url + '/payment-form'} render={(rudiProps) => <PaymentForm 
    processBooking={props.processBooking} 
    rudiProps={rudiProps} 
    paymentComponentShowing={props.paymentComponentShowing} 
    changeAddressFilledOut={props.changeAddressFilledOut}  />} 
    />
    </Switch>
     
    </form>
    <div className={classes.div}>
        {/* <h3 className={classes.h3}>* </h3> */}

      <Container className={classes.summaryContainer}>
          <Container className={classes.listItem}>
                <h4>Your Booking Summary</h4>
          </Container>
          <Container className={classes.listItem}>
              <p>Frequency</p>
              <p>{props.bookingRequirements.frequency}</p>
          </Container>
          <Container className={classes.listItem}>
              <p>Duration</p>
              <p>{`${moment.utc(moment.duration(props.bookingRequirements.duration, 'minutes').asMilliseconds()).format("H.m")} hrs`}</p>
          </Container>
          <Container className={classes.listItem}>
              <p>Time</p>
              {/* <p>{`${moment.utc(moment.duration(props.booking.duration, 'minutes').asMilliseconds()).format("H.mm")}`}</p> */}
              <p>{`${moment(props.bookingRequirements.start_time).format("h:mm a")}`}</p>
          </Container>
          <Container className={classes.listItem}>
              <p>Date</p>
              <p>{`${moment(props.bookingRequirements.start_time).format("ddd, MMM Do")}`}</p>              
          </Container>
          <Container className={classes.listItem}>
              <p>Price Per Hour</p>
              <p>£{props.cleaner.hourly_rate}</p>
          </Container>
          <Container className={classes.listItem}>
              <h3>Total Cost</h3>
              <h3>£{( props.bookingRequirements.duration / 60 ) * props.cleaner.hourly_rate}</h3>
          </Container>
      </Container>


    </div>
    </Container>
  );
}

export default withRouter(CleaningAddress)

// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
// import Grid from '@material-ui/core/Grid';
// import List from '@material-ui/core/List'
// import ListItem from '@material-ui/core/ListItem'
// import ListItemText from '@material-ui/core/ListItemText'
// import InputLabel from '@material-ui/core/Input'



// const useStyles = makeStyles(theme => ({
//   root: {
//     flexGrow: 1,
//   },
//   paper: {
//     padding: theme.spacing(5),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//   },
// }));

// export default function CenteredGrid() {
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       <Grid container spacing={1} direction="column" label="Hello" >
//         <Grid item xs={6}>
//           <Paper className={classes.paper} label="Hello dude">
//         <InputLabel 
//             htmlFor="outlined-age-simple"
//             value="address"
//             label="Address One">
//           Location
//         </InputLabel>
//           <List className={classes.root}>
//             <ListItem alignItems="flex-start" width="100%">
              
//             </ListItem>
//              </List>
//              </Paper>
//         </Grid>
//         {/* <Grid item xs={6}>
//           <Paper className={classes.paper}>xs=6</Paper>
//         </Grid> */}
//         <Grid item xs={6}>
//           <Paper className={classes.paper}>xs=6</Paper>
//         </Grid>
//         <Grid item xs={6}>
//           <Paper className={classes.paper}>xs=6</Paper>
//         </Grid>
//       </Grid>
//     </div>
//   );
// }






// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import GridList from '@material-ui/core/GridList';
// import GridListTile from '@material-ui/core/GridListTile';
// import GridListTileBar from '@material-ui/core/GridListTileBar';
// import ListSubheader from '@material-ui/core/ListSubheader';
// import IconButton from '@material-ui/core/IconButton';
// import InfoIcon from '@material-ui/icons/Info';


// const useStyles = makeStyles(theme => ({
//   root: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     justifyContent: 'space-around',
//     overflow: 'hidden',
//     backgroundColor: theme.palette.background.paper,
//   },
//   gridList: {
//     width: 500,
//     height: 450,
//   },
//   icon: {
//     color: 'rgba(255, 255, 255, 0.54)',
//   },
// }));


  

 

//  const tileData = [
//     {
//       AddressOne: "props.bookingRequiements.",
//       title: 'Image',
//       author: 'author',
//     },
//     {}
//   ];
 
// export default function CleaningAddress(props) {
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       <GridList item xs={12} cellHeight='auto' className={classes.gridList} >
//         <GridListTile  key="Subheader" cols={1} style={{ height: 'auto', border: 'solid' }}>
//           <ListSubheader component="div">December</ListSubheader>
//         </GridListTile>
//         {tileData.map(tile => (
//           <GridListTile key={1} style={{ height: 'auto', border: 'solid' }}>
//             <img src={tile.img} alt={tile.title} />
//             <GridListTileBar
//               title={tile.title}
//               subtitle={<span>by: {tile.author}</span>}
//               style={{ height: 'auto', border: 'solid' }}
//               actionIcon={
                  
//                 <IconButton aria-label={`info about ${tile.title}`} className={classes.icon}>
//                   <InfoIcon />
//                 </IconButton>
//               }
//             />
//           </GridListTile>
//         ))}
//       </GridList>
//     </div>
//   );
// }