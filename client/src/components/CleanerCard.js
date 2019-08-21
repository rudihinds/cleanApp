import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle'
import moment from 'moment'
import Avatar from '@material-ui/core/Avatar';
import { NavLink } from 'react-router-dom'

const useStyles = makeStyles({
  card: {
    maxWidth: 240,
    maxHeight: 250,
    width: 200
  },
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
});

export default function CleanerCard(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [address_one, setAddressOne] = React.useState("");
  const [address_two, setAddressTwo] = React.useState("");
  const [postcode, setPostcode] = React.useState("");



  // const time = moment(props.booking.start_time)



  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  const handleClick = () => {
    props.storeSelectedCleaner(props.cleaner)

  }


  const getTotalCost = () => getDurationInHours() * props.cleaner.hourly_rate

  const getDurationInHours = () => props.booking.duration / 60

  const handleBooking = () => {
    // build object and pass it
    const total_cost = getTotalCost()
    const newBooking = {
      hourly_rate: props.cleaner.hourly_rate,
      total_cost,
      address_one,
      address_two,
      postcode,
    }

    // props.currentUser ? props.processBooking(props.cleaner.id, newBooking) : console.log("there's no user!, please log in first")
    props.currentUser ?  props.processBooking(props.cleaner.id, newBooking): alert("Please log in first")

  }

  

  return (

    
    <Grid item className={classes.cardDiv} key={props.cleaner.id}>
    <Card className="{classes.card} slit-in-vertical">
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="110"
          image={props.cleaner.image}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h5">
            {props.cleaner.first_name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Price Per Hour: £{props.cleaner.hourly_rate}.00
            <br/>
            Average rating: {props.cleaner.average_rating}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {/* <Button size="small" color="primary" >
          See Reviews
        </Button> */}
        {/* <Button size="small" color="primary" onClick={handleClickOpen}> */}
        <NavLink to="/checkout/address-form">
          <Button size="medium" color="primary" onClick={handleClick}>
          Book Cleaner
          </Button>
        </NavLink> 
        
      </CardActions>
    </Card>

{
  open && <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
  <DialogTitle id="form-dialog-title">You Are Booking {props.cleaner.first_name}</DialogTitle>
  <DialogContent>
    <Avatar alt="Remy Sharp" src={props.cleaner.image} className={classes.bigAvatar} />
    <DialogContentText>
      Date: {props.booking.start_time}
      <br/>
      Duration: {getDurationInHours()} hrs
      <br/>
      Frequency: {props.booking.frequency}
      <br/>
      hourly: £{props.cleaner.hourly_rate} per hour
      <br/>
    </DialogContentText>
    <DialogContentText variant="h5" component="h5">
     Total Cost: £{getTotalCost()}
    </DialogContentText>
  
    <TextField
      autoFocus
      margin="dense"
      id="Address 1"
      label="Address 1"
      type="text"
      fullWidth
    />
    <TextField
      autoFocus
      margin="dense"
      id="Address 2"
      label="Address 2"
      type="text"
      fullWidth
    />
    <TextField
      autoFocus
      margin="dense"
      id="postcode"
      label="Postcode"
      type="text"
      fullWidth
    />
    <TextField
      autoFocus
      margin="dense"
      id="postcode"
      label="Enter Card Number"
      type="card"
      fullWidth
    />
  </DialogContent>
  <DialogActions>
    <Button onClick={handleClose} color="primary">
      Cancel
    </Button>
    <Button onClick={handleBooking} color="primary">
      Pay Now
    </Button>
  </DialogActions>
  </Dialog>
}
</Grid>

  );
}