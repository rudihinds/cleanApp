import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import "../index.css"


const homeBody = makeStyles({
    background: {
        backgroundColor: '#ccc',
        maxHeight: '500px'

    },
})

export default function BookingForm(props) {

const classes = homeBody();

    return(
        <div className={classes.homeBody}>
           
            <h1 className>Lets go champ!</h1>
          
        </div>
    )
}

