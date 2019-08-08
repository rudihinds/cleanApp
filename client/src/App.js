import React from 'react'
import API from './adapters/API'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Dialog from '@material-ui/core/Dialog';
import LoginForm from './components/SignUpForm'
import SignUpForm from './components/SignUpForm'
import CssBaseline from '@material-ui/core/CssBaseline';
import Navbar from './components/Navbar'
import BookingForm from './components/BookingForm';



class App extends React.Component{

  state = {
    userLoggedIn: false,
    bookingRequirements: null
  }
  
  componentDidMount(){
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

  storeBookingRequirements = (state) => {
    API.getCleanings()
    this.setState({ bookingRequirements: state })
  }

  render(){

    let userLoggedIn = this.state.userLoggedIn
    console.log(this.state.bookingRequirements)

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
        <Navbar toggleUserLogIn={this.toggleUserLogIn} userLoggedIn={userLoggedIn} toggleLoginModal={this.toggleLoginModal} userLogOut={this.userLogOut} />
        <BookingForm storeBookingRequirements={this.storeBookingRequirements} />
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