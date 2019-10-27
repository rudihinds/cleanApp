import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
// import Link from '@material-ui/core/Link'
import { Link, Router } from 'react-router-dom'

import { makeStyles, withStyles } from '@material-ui/core/styles';

// import Container from '@material-ui/core'
import "../../style.css"


export default function Landing(props) {

    


    return(
        
        // <div className="color-change-2x home-body">
        <div className="color-change-2x smimg home-body">
            <Link to="/new-booking" style={{ textDecoration: 'none' }} className="middle">
                <p className="bgimg">Start</p>
            </Link>
            <p className="topleftlogo">UmmyCleans</p>
            {/* <p classNme='bottomleft'>By Rudi Hinds</p> */}
        </div>
        
    )
}

