import React from 'react'
import API from './adapters/API'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Dialog from '@material-ui/core/Dialog';
import LoginForm from './components/SignUpForm'
import SignUpForm from './components/SignUpForm'
import CssBaseline from '@material-ui/core/CssBaseline';
import Navbar from './components/Navbar'
import BookingForm from './components/BookingForm';
import moment from 'moment'
import CardContainer from './components/CardContainer'




class App extends React.Component{

  state = {
    userLoggedIn: false,
    currentUser: null,
    bookingRequirements: null,
    cleanings: [],
    availableCleaners: []
  }
  
  componentDidMount(){

    API.getCleanings()
      .then(cleanings => {

        this.setState({ cleanings: [...this.state.cleanings, ...cleanings] })
      })

    // API.validateUser().then(user => {
    //   console.log(user)
    //   if (!user.error && user.id) this.setState({loggedIn: true, showModal: false})
    // })
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

  storeBookingRequirements = (state) => {

    API.getAvailableCleaners(state.start_time, state.duration)
      .then(availableCleaners => this.setState({ availableCleaners }))
    this.setState({ bookingRequirements: state })

    let requestRange = state.bookingRequestTimeRange
    let start_time = this.state.cleanings[0].start_time
    let startTime = moment(start_time)
    let endTime = moment(start_time).add(this.state.cleanings[0].duration, 'minutes')
    const rangeArray = [startTime, endTime]

    console.log("incoming range: ", requestRange, "db range: ", rangeArray)
    
    const bookingRequestTimeRange = moment.range(rangeArray)

    requestRange.overlaps(bookingRequestTimeRange) ? console.log("it overlaps, choose another time") : console.log("it doesn't overlap, book away!")

    // debugger
    // console.log('start time:', startTime.toString())
   

    // console.log('end time: ', endTime.toString())
    // console.log('three: ', time)
    
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
    
    console.log(cleaning)
    // console.log(newBooking)
    // console.log(this.state.currentUser)

  }
  
  render(){

    let userLoggedIn = this.state.userLoggedIn
    
    // console.log(moment(cleaningTest.start_time))
    // cleaningTest === undefined ? console.log("it is undefined") 
    // : console.log(moment(cleaningTest.start_time))

    

    

    // let cleaning = this.state.cleanings.filter(cleaning => cleaning.id === 27)
    
    // if (this.state.cleanings.cleanings != undefined) {
    //   console.log(this.state.cleanings.cleanings[0])
    // } else {
    //   console.log('empty array!')
    // }

    // this.state.cleanings.cleanings[0] ? console.log(this.state.cleanings.cleanings[0]) : console.log("Not yet")
    // console.log(this.state.bookingRequirements)
    
    return (
      <div>
        <h1>The app component</h1>
        <BrowserRouter>
        <CssBaseline />
        <div id='modal-to-top' >         
              {userLoggedIn ? 
              // if the state is set to true then we need to show login, this is set by user clicking login
              <Dialog>
                <LoginForm userLogIn={this.toggleUserLogin} toggleModal={this.toggleModal} handleLogIn={this.userLogIn} />
              </Dialog>
              : null

              }
          
        </div>
        <Navbar toggleUserLogIn={this.toggleUserLogIn} userLoggedIn={userLoggedIn} toggleLoginModal={this.toggleLoginModal} userLogOut={this.userLogOut} addCurrentUser={this.addCurrentUser} removeCurrentUser={this.removeCurrentUser} />
        <BookingForm storeBookingRequirements={this.storeBookingRequirements} />
        <CardContainer availableCleaners={this.state.availableCleaners} booking={this.state.bookingRequirements} processBooking={this.processBooking} currentUser={this.state.currentUser}/>
        </BrowserRouter>
       
      </div>
    )
  }
}

export default App;

        /* {<Switch>
          <Route exact path='/' component={(props) => <Sidebar {...props} displayType='all' loggedIn={this.state.loggedIn} />} />

          <Route path='/search-results' component={(props) => <Sidebar {...props} displayType='search' loggedIn={this.state.loggedIn} />} />
          
          <PrivateRoute 
            loggedIn={this.state.loggedIn} 
            component={(props) => <Sidebar {...props} displayType='user' loggedIn={this.state.loggedIn} />} 
            path='/my-headlines' exact 
          />

          <PrivateRoute 
            loggedIn={this.state.loggedIn} 
            component={(props) => <Sidebar {...props} loggedIn={this.state.loggedIn}/>} 
            path='/user-sources' exact 
          />

         </Switch>} */