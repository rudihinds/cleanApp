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
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'
import MyBookings from './components/MyBookings'
import ConfirmDetailsPage from './components/ConfirmDetailsPage'
import Landing from './components/Landing'
import PaymentForm from './components/PaymentForm';
import StripeConnect from './components/StripeConnect';
import StripeRedirect from './components/StripeRedirect'

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

    this.setState({ state: {
      userLoggedIn: false,
      currentUser: null,
      selectedCleaner: null,
      bookingRequirements: null,
      cleanings: [],
      availableCleaners: [],
      priceFilterRange: [],
      ratingFilterRange: [],
      minimumCleansFilterRange: []
    } })

    API.getCleanings()
      .then(cleanings => {
        this.setState({ 
          cleanings: [...this.state.cleanings, cleanings], 
          priceFilterRange: [12, 20], 
          ratingFilterRange: [1, 5],
          minimumCleansFilterRange: [1, 50]
         })
      })
      // if (this.state.pricefilterRange === [] && this.state.pricefilterRange === [] && this.state.pricefilterRange === []) {
        // this.setState({  
        //   priceFilterRange: [12, 20], 
        //   ratingFilterRange: [1, 5],
        //   minimumCleansFilterRange: [1, 50]
        // })
      // } else {
      //   return
      // }
  }

  toggleModal = () => this.setState({showModal: !this.state.showModal});

  // this will render the modal to login if set to true, starts off false
  toggleLoginModal = () => this.setState({showLoginModal: !this.state.showLoginModal});

  userLogOut = () => {
    API.clearToken();
    this.setState({ userLoggedIn: false })
  }

  toggleUserLogIn = () => this.setState({ userLoggedIn: !this.state.userLoggedIn})

  addCurrentUser = currentUser => this.setState({ currentUser }) 

  removeCurrentUser = () => this.setState({ currentUser: null })

  storeSelectedCleaner = (selectedCleaner) => { 
    // console.log(selectedCleaner, selectedCleaner.id)
    this.setState({ selectedCleaner })
  }
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
    return (cleaner.average_rating >= range[0] && cleaner.average_rating <= range[1])
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

  processBooking = () => {
    let hours = this.state.bookingRequirements.duration / 60
    let total_cost = this.state.cleanings.hourly_rate * hours
    const cleaning = {
      cleaner_id: this.state.selectedCleaner.id,
      user_id: this.state.currentUser.id,
      address_one: this.state.cleanings.address_one,
      adress_two: this.state.cleanings.adress_two,
      hourly_rate: this.state.selectedCleaner.hourly_rate,
      postcode: this.state.cleanings.postcode,
      total_cost: total_cost,
      start_time: this.state.bookingRequirements.bookingRequestTimeRange.start.toString().slice(0, -9),
      end_time: this.state.bookingRequirements.bookingRequestTimeRange.end.toString().slice(0, -9),
      duration: this.state.bookingRequirements.duration,
      location: this.state.bookingRequirements.town
    }
    API.createCleaning(cleaning)
    // console.log(cleaning)
      
    
    // console.log(cleaning)
    // console.log(newBooking)
    // console.log(this.state.currentUser)

  }

  getFilteredCleaners = () => this.state.availableCleaners.filter(cleaner => {
    return (cleaner.hourly_rate >= this.state.priceFilterRange[0] && cleaner.hourly_rate <= this.state.priceFilterRange[1]) && 
    (cleaner.average_rating >= this.state.ratingFilterRange[0] && cleaner.average_rating <= this.state.ratingFilterRange[1]) &&
    (cleaner.total_cleans >= this.state.minimumCleansFilterRange[0] && cleaner.total_cleans <= this.state.minimumCleansFilterRange[1])
  })

  changeAddressFilledOut = (addressDetails) => {

   if ( (this.state.cleanings[0][0]) || !((this.state.cleanings[0][0]) === undefined )) {

    this.setState({
      
      // cleanings[0][0].address_one: [this.state.cleanings[0][0].address_one], [addressDetails.addressOne]
      // cleanings: [this.state.cleanings[0][0].adress_two: addressDetails.addressTwo],
      // cleanings: [this.state.cleanings[0][0].postcode: addressDetails.postcode],

      cleanings: Object.entries(this.state.cleanings[0][0]).reduce ((obj, arr) => {
        if ('address_one' === arr[0]) {
          obj[arr[0]] = addressDetails.addressOne
          return obj
        } else if ('adress_two' === arr[0]) {
          obj[arr[0]] = addressDetails.addressTwo
          return obj
        } else if ('postcode' === arr[0]) {
          obj[arr[0]] = addressDetails.postcode
          return obj
        } else {
          obj[arr[0]] = arr[1]
          return obj
        }
      }, {})
    })
  } else {
    this.setState({

    cleanings: Object.entries(this.state.cleanings).reduce ((obj, arr) => {
      if ('address_one' === arr[0]) {
        obj[arr[0]] = addressDetails.addressOne
        return obj
      } else if ('adress_two' === arr[0]) {
        obj[arr[0]] = addressDetails.addressTwo
        return obj
      } else if ('postcode' === arr[0]) {
        obj[arr[0]] = addressDetails.postcode
        return obj
      } else {
        obj[arr[0]] = arr[1]
        return obj
      }
    }, {})
  })
  }
  }
  
  render(){
    console.log(this.state)

    console.log(this.state.selectedCleaner)
    // console.log(this.state.priceFilterRange, this.state.ratingFilterRange, this.state.minimumCleansFilterRange)

    const filteredCleaners = this.getFilteredCleaners()
    let userLoggedIn = this.state.userLoggedIn
    let cleanersToRender = this.state.availableCleaners.filter(cleaner => this.state.cleanersToRender.includes(cleaner.id))
   
    
    return (
      <div id="body">
        <Router>        
        <Navbar toggleUserLogIn={this.toggleUserLogIn} userLoggedIn={userLoggedIn} toggleLoginModal={this.toggleLoginModal} userLogOut={this.userLogOut} addCurrentUser={this.addCurrentUser} removeCurrentUser={this.removeCurrentUser} currentUser={this.state.currentUser} />
        <Switch>

            <Route exact path="/" render={(props) => <Landing {...props} />} />

            <Route path='/new-booking' render={() => <BookingForm 
            priceFilterRange={this.state.priceFilterRange} 
            ratingFilterRange={this.state.ratingFilterRange} 
            minimumCleansFilterRange={this.state.minimumCleansFilterRange} 
            filterByMinimumCleans={this.filterByMinimumCleans} 
            filterByRating={this.filterByRating} 
            filterByPrice={this.filterByPrice} 
            availableCleaners={filteredCleaners} 
            bookingRequirements={this.state.bookingRequirements} 
            storeBookingRequirements={this.storeBookingRequirements} 
            currentUser={this.state.currentUser} 
            processBooking={this.processBooking} 
            storeSelectedCleaner={this.storeSelectedCleaner} />} 
            />

          { this.state.currentUser ?
            <Route exact path="/users/:id/cleanings" render={() => <MyBookings user={this.state.currentUser}/>} />
          : null }

            <Route exact path="/signup" render={() => <SignUpForm user={this.state.currentUser}/>} />

            <Route exact path="/new-booking" render={() => <App/>} />

            <Route path="/checkout" render={(rudiProps) => <ConfirmDetailsPage 
            changeAddressFilledOut={this.changeAddressFilledOut} 
            processBooking={this.processBooking} 
            rudiProps={rudiProps} 
            selectedCleaner={this.state.selectedCleaner} 
            bookingRequirements={this.state.bookingRequirements} 
            currentUser={this.state.currentUser} />} 
            />
            

            <Route path="/cleaners/connect-your-stripe-account" render={(rudiProps) => <StripeConnect {...rudiProps}/>} />
            <Route path="/cleaners/stripe-redirect" render={(rudiProps) => <StripeRedirect {...rudiProps}/>} />
            

            
            {/* <Route path="/checkout/payment-form" render={(props) => <PaymentForm props={props} />}/> */}

            </Switch>

             {/* 
            changeAddressFilledOut={this.changeAddressFilledOut} 
            processBooking={this.processBooking} 
            rudiProps={rudiProps} 
            selectedCleaner={this.state.selectedCleaner} 
            bookingRequirements={this.state.bookingRequirements} 
            currentUser={this.state.currentUser} />}  */}

       

        </Router>
      </div>
    )
  }
}

export default App;


                