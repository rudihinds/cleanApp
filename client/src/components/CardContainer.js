import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import CleanerCard from './CleanerCard'
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexGrow: 1,
    flexDirection: "row",
    justifyContent: 'center',
    marginTop: "2em",
    // marginRight: "auto"
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
  filterContainer: {
    border: "1px solid lightgrey ",
    flexDirection: 'column',
    width: "350px",
    // maxWidth: "100%",
    maxHeight: "100%",
    alignItems: 'flex-start',
    borderRadius: '5px',
  },
  cardsContainer: {
    width: "50%",
    justifyContent: 'flex-end'
  },
  cardDiv: {
    maxWidth: '240px'
  },
  listItem: {
    width: '100%',
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    borderBottom: 'solid 1px lightgrey',
    // marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    paddingLeft: 0
    
  },
  sliderRoot: {
    width: 120,
    marginTop: 15,
    paddingRight: 17,
    height: 5
  },
  pTag: {
    paddingRight: 17,
    paddingLeft: 17
  }

}));

export default function CardContainer(props) {
  // const [spacing, setSpacing] = React.useState(2);
  const [priceFilter, setPriceFilter] = React.useState([12, 20]);
  const [reviewFilter, setReviewFilter] = React.useState([1, 5]);
  const [minCleansFilter, setMinCleansFilter] = React.useState([1, 50]);

  const classes = useStyles();

  // function handleChange(event, value) {
  //   setSpacing(Number(value));
  // }

  const handlePriceFilterChange = (event, newValue) => {
    setPriceFilter(newValue)
    // props.filterByPrice(newValue)
  };

  const handleReviewFilterChange = (event, newValue) => {
    setReviewFilter(newValue);
    // props.filterByRating(newValue)

  };

  const handleMinCleansChange = (event, newValue) => {
    setMinCleansFilter(newValue);
    // props.filterByMinimumCleans(newValue)

  };


  function valuetext(value) {
    // console.log( value ) 
    // console.log( `${value[0]}°C`, ) 
  }

  const marks = [{value: 12,},{value: 13,},{value: 14,},{value: 15,},{value: 16,},{value: 17,},{value: 18,},{value: 19,},{value: 20,},];
  const reviewMarks = [{value: 1,},{value: 2,},{value: 3,},{value: 4,},{value: 5}]
  // const minCleansMarks = [{value: 1,},{value: 13,},{value: 14,},{value: 15,},{value: 16,},{value: 17,},{value: 18,},{value: 19,},{value: 20,},];

  return (
    <Grid container className={classes.root} spacing={2}>
      {/* filter container begins */}
      <div className={classes.filterContainer}>
      <div className={classes.listItem}>
                <h4 className={classes.pTag}>Filter: {props.availableCleaners.length} cleaners available</h4>
          </div>

      {/* price change slider item */}
          <div className={classes.listItem}>
          <p className={classes.pTag}>Price Per Hour</p>
            <div className={classes.sliderRoot}>
      <Slider
        value={priceFilter}
        onChangeCommitted={(e, newValue) => props.filterByPrice(newValue)}
        onChange={handlePriceFilterChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
        // marks={marks}
        defaultValue={[12, 20]}
        min={12}
        max={20}
      />
            </div>
          </div>

      {/* minimum rating slider */}
          <div className={classes.listItem}>
          <p className={classes.pTag}>Minimum Rating</p>
            <div className={classes.sliderRoot}>
      <Slider
        value={reviewFilter}
        onChange={handleReviewFilterChange}
        onChangeCommitted={(e, newValue) => props.filterByRating(newValue)}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
        marks={reviewMarks}
        defaultValue={[1, 5]}
        min={1}
        max={5}
      />
            </div>
          </div>
      {/* minimum cleans slider */}
          <div className={classes.listItem}>
          <p className={classes.pTag}>Minimum Cleans</p>
            <div className={classes.sliderRoot}>
      
      <Slider
        value={minCleansFilter}
        onChange={handleMinCleansChange}
        onChangeCommitted={(e, newValue) => props.filterByMinimumCleans(newValue)}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
        // marks={minCleansMarks}
        defaultValue={[1, 50]}
        min={1}
        max={50}
      />
            </div>
          </div>

          <div className={classes.listItem}>
              <p className={classes.pTag}>I have pets</p>
              <p className={classes.pTag}>Lots!</p>
          </div>
          <div className={classes.listItem}>
              <p className={classes.pTag}>I require Ironing</p>
              <p className={classes.pTag}>Heaps!</p>
          </div>
          </div>
          {/* end filter container */}

          {/* available cleaners container begins */}
          
      {/* <Grid item xs={6}> */}
        <Grid className={classes.cardsContainer} container spacing={2} >
            {
              props.availableCleaners.map(cleaner => 
                <CleanerCard key={cleaner.id} cleaner={cleaner} booking={props.booking} storeBookingRequirements={props.storeBookingRequirements} processBooking={props.processBooking} currentUser={props.currentUser} storeSelectedCleaner={props.storeSelectedCleaner}/>
              )
            }
            
         </Grid> 
        
      {/* <div className={classes.filterContainer}>Check Out My Style</div> */}

      {/* </Grid> */}
      {/* <Grid item xs={8}> */}
{/*           
        <Paper className={classes.control}>
        
        </Paper> */}
      {/* </Grid> */}
    </Grid>
  );
}