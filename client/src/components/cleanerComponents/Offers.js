import React, { useEffect, useState } from 'react';
import Divider from '@material-ui/core/Divider';
import moment from 'moment'
import List from '@material-ui/core/List';
import CLEANERS_API from '../../adapters/CLEANERS_API'
import { getDisplayDate } from '@material-ui/pickers/_helpers/text-field-helper';
import Card from '@material-ui/core/Card'
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';



const AntSwitch = withStyles(theme => ({
  root: {
    width: 48,
    height: 22,
    padding: 0,
    display: 'flex',
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    // '&$checked': {
    //   transform: 'translateX(12px)',
    //   color: theme.palette.common.white,
    //   '& + $track': {
    //     opacity: 1,
    //     backgroundColor: theme.palette.primary.main,
    //     borderColor: theme.palette.primary.main,
    //   },
    // },
  },
  thumb: {
    width: 18,
    height: 18,
    boxShadow: 'none',
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 28 / 2,
    opacity: 1,
    backgroundColor: theme.palette.primary.main,
  },
  checked: {},
}))(Switch);

export default function Offers (props) {

    const [state, setState] = React.useState({
      checkedA: true,
      checkedB: true,
      checkedC: true
    });
  
    const handleChange = name => event => {
      setState({ ...state, [name]: event.target.checked });
    };


  return (
    <div>
      <div className='container'>
      <h2 className='header'>Offers</h2>
      <div>    
      <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>Off</Grid>
          <Grid item>
            <AntSwitch
              checked={state.checkedC}
              onChange={handleChange('checkedC')}
              value="checkedC"
              size="medium"
            />
          </Grid>
          <Grid item>On</Grid>
        </Grid>
      </div>
      <Divider className='divider' />
      <List>
      <Card>Hello</Card>
      <Card>Hello</Card>
      <Card>Hello</Card>
      <h3></h3>
      <h3></h3>
      </List>
    </div>
    </div>
  );
}