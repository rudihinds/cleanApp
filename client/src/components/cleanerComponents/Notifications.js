import React, { useEffect, useState } from 'react';
import Divider from '@material-ui/core/Divider';
import moment from 'moment'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import CLEANERS_API from '../../adapters/CLEANERS_API'
import { getDisplayDate } from '@material-ui/pickers/_helpers/text-field-helper';


const getLastMonthName = () => {
  var lastMonthName =  moment().subtract(1, "month").startOf("month").format('MMMM');
  return lastMonthName
}

const getCurrentMonthName = () => {
  var currentMonthName =  moment().startOf("month").format('MMMM');
  return currentMonthName
}

const getNextMonthName = () => {
  var nextMonthName =  moment().add(1, "month").startOf("month").format('MMMM');
  return nextMonthName
}

export default function Notifications(props) {

  const [thisMonth, setThisMonth] = useState(0)
  const [lastMonth, setLastMonth] = useState(0)
  const [nextMonth, setNextMonth] = useState(0)

  useEffect(() => {
    CLEANERS_API.getThisMonthsEarnings(12).then(data => setThisMonth(data.this_months_earnings))
    CLEANERS_API.getLastMonthsEarnings(12).then(data => setLastMonth(data.last_months_earnings))
    CLEANERS_API.getNextMonthsEarnings(12).then(data => setNextMonth(data.next_months_earnings))
  })

  // earnings()

  return (
    <div className='container'>
      
      <h2 className='header'>My Earnings</h2>
      <Divider className='divider' />
      <List>
      <h3>In {getCurrentMonthName()}: £{thisMonth}</h3>
      <h3>In {getLastMonthName()}: £{lastMonth}</h3>
      <h3>Est {getNextMonthName()}: £{nextMonth}</h3>
      </List>
    </div>
  );
  }