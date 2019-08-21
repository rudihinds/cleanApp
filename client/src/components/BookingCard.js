import React from 'react'
import Link from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import moment from 'moment'
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 700,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export default function BookingCard (props){
  const classes = useStyles();

  const handleDelete = () => props.deleteBooking(props.booking.id)

  return (
    <List className={classes.root}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar src={props.booking.cleaner.image}/>
        </ListItemAvatar>
        <ListItemText
          primary={`${props.booking.cleaner.first_name} - ${moment(props.booking.start_time).format("dddd, MMMM Do, h:mm:ss a")}`}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {`Hours Booked: ${moment.utc(moment.duration(props.booking.duration, 'minutes').asMilliseconds()).format("H.mm")}`}
              </Typography>
            </React.Fragment>
            
          }
        />
            {/* <IconButton edge="end" aria-label="comments"> */}
            {/* <EditIcon /> */}
            {/* </IconButton> */}
            <IconButton edge="end" aria-label="comments">
            <DeleteIcon onClick={handleDelete} />
            </IconButton>
      </ListItem>
      
    </List>
  );
}


