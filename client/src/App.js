import React from 'react'
import API from './adapters/API'
import Dialog from '@material-ui/core/Dialog';
import LoginForm from './components/SignUpForm'
import SignUpForm from './components/SignUpForm'
import CssBaseline from '@material-ui/core/CssBaseline';
import Navbar from './components/Navbar'
import BookingForm from './components/BookingForm';
import moment from 'moment'
import CardContainer from './components/CardContainer'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import MyBookings from './components/MyBookings'
import ConfirmDetailsPage from './components/ConfirmDetailsPage'

class App extends React.Component{

  state = {
    userLoggedIn: false,
    currentUser: null,
    selectedCleaner: null,
    bookingRequirements: null,
    cleanings: [],
    availableCleaners: [],
    priceFilterRange: [],
    ratingFilterRange: [],
    minimumCleansFilterRange: []
  }
  


  componentDidMount(){

    API.getCleanings()
      .then(cleanings => {

        this.setState({ cleanings: [...this.state.cleanings, cleanings] })
      })

  }

  toggleModal = () => this.setState({showModal: !this.state.showModal});

  // this will render the modal to login if set to true, starts off false
  toggleLoginModal = () => this.setState({showLoginModal: !this.state.showLoginModal});

  userLogOut = () => {
    API.clearToken();
    this.setState({ userLoggedIn: false})
  }

  toggleUserLogIn = () => this.setState({ userLoggedIn: !this.state.userLoggedIn})

  addCurrentUser = currentUser => this.setState({ currentUser }) 

  removeCurrentUser = () => this.setState({ currentUser: null })

  storeSelectedCleaner = (selectedCleaner) => this.setState({ selectedCleaner })
  // storeSelectedCleaner = (selectedCleaner) => console.log(selectedCleaner, selectedCleaner.id)

  filterByPrice = (newValue) => {
    this.setState({priceFilterRange: newValue})
  }

  filterByRating = (newValue) => {
    this.setState({ratingFilterRange: newValue})
  }

  filterByMinimumCleans = (newValue) => {
    this.setState({minimumCleansFilterRange: newValue})
  }

  getCleanersWithinPriceRange = (range) => this.state.availableCleaners.filter(cleaner => {
    return (cleaner.hourly_rate >= range[0] && cleaner.hourly_rate <= range[1])
  })

  getCleanersWithinRatingRange = (range, arr) => arr.filter(cleaner => {
    return (cleaner.average_rating >= range[0] && cleaner.total_cleans <= range[1])
  })

  getCleanersWithinMinimumCleansRange = (range, arr) => arr.filter(cleaner => {
    return (cleaner.total_cleans >= range[0] && cleaner.total_cleans <= range[1])
  })



  arrayUnique = (array) => {
    var a = array.concat()
      for(let i=0; i<a.length; ++i) {
        for(let j=i+1; j<a.length; ++j) {
          if(a[i] === a[j])
            a.splice(j--, 1)
        }
      }
      a = a.filter(item => typeof item === 'number')
      return a
    }

  

  storeBookingRequirements = (state) => {

    API.getAvailableCleaners(state.start_time, state.duration)
      .then(availableCleaners => this.setState({ availableCleaners, cleanersToRender: availableCleaners.map(cleaner => cleaner.id) }))


    this.setState({ bookingRequirements: state })
    let requestRange = state.bookingRequestTimeRange
    let start_time = this.state.cleanings[0].start_time
    let startTime = moment(start_time)
    let endTime = moment(start_time).add(this.state.cleanings[0].duration, 'minutes')
    const rangeArray = [startTime, endTime]

    console.log("incoming range: ", requestRange, "db range: ", rangeArray)
    
    const bookingRequestTimeRange = moment.range(rangeArray)

    requestRange.overlaps(bookingRequestTimeRange) ? console.log("it overlaps, choose another time") : console.log("it doesn't overlap, book away!")
    
  }

  processBooking = (cleaner_id, newBooking) => {
    const cleaning = {
      cleaner_id: cleaner_id,
      user_id: this.state.currentUser.id,
      address_one: newBooking.address_one,
      adress_two: newBooking.address_two,
      hourly_rate: newBooking.hourly_rate,
      postcode: newBooking.postcode,
      total_cost: newBooking.total_cost,
      start_time: this.state.bookingRequirements.bookingRequestTimeRange.start.toString().slice(0, -9),
      end_time: this.state.bookingRequirements.bookingRequestTimeRange.end.toString().slice(0, -9),
      duration: this.state.bookingRequirements.duration,
      location: this.state.bookingRequirements.town
    }
    API.createCleaning(cleaning)
      
    
    // console.log(cleaning)
    // console.log(newBooking)
    // console.log(this.state.currentUser)

  }
  
  render(){
    console.log(this.state.priceFilterRange, this.state.ratingFilterRange, this.state.minimumCleansFilterRange)
    const arr1 = this.getCleanersWithinPriceRange(this.state.priceFilterRange)
    console.log(arr1)
    const arr2 = this.getCleanersWithinRatingRange(this.state.ratingFilterRange, arr1)
    console.log(arr2)

    const arr3 = this.getCleanersWithinMinimumCleansRange(this.state.minimumCleansFilterRange, arr2)
    console.log(arr3)


    // let test = this.getCleanersWithinPriceRange()
    let userLoggedIn = this.state.userLoggedIn
    let cleanersToRender = this.state.availableCleaners.filter(cleaner => this.state.cleanersToRender.includes(cleaner.id))
   
    
    return (
      <div>
        <Navbar toggleUserLogIn={this.toggleUserLogIn} userLoggedIn={userLoggedIn} toggleLoginModal={this.toggleLoginModal} userLogOut={this.userLogOut} addCurrentUser={this.addCurrentUser} removeCurrentUser={this.removeCurrentUser} currentUser={this.state.currentUser} />
        <br />
        <br />
        <br />
        <br />
        <Switch>
            <Route exact path='/new-booking' render={() => <BookingForm filterByMinimumCleans={this.filterByMinimumCleans} filterByRating={this.filterByRating} filterByPrice={this.filterByPrice} availableCleaners={arr3} bookingRequirements={this.state.bookingRequirements} storeBookingRequirements={this.storeBookingRequirements} currentUser={this.state.currentUser} processBooking={this.processBooking} storeSelectedCleaner={this.storeSelectedCleaner} />} />
          { this.state.currentUser ?
            <Route exact path="/users/cleanings" render={() => <MyBookings user={this.state.currentUser}/>} />
          : null }
            <Route exact path="/signup" render={() => <SignUpForm user={this.state.currentUser}/>} />
            <Route exact path="/new-booking" render={() => <App/>} />
            <Route exact path="/checkout" render={(rudiProps) => <ConfirmDetailsPage rudiProps={rudiProps} selectedCleaner={this.state.selectedCleaner} bookingRequirements={this.state.bookingRequirements} currentUser={this.state.currentUser} />} />
        </Switch>
      </div>
    )
  }
}

export default App;


                