import React from 'react'
import Link from 'react-router-dom'
import BookingCard from './BookingCard'
import API from '../adapters/API'


class MyBookings extends React.Component{

    state = {
      currentUser: {id: 1},
      myBookings: [],
    }
    
    componentDidMount(){
  
      API.getMyCleanings(this.state.currentUser.id)
        .then(myBookings => this.setState({ myBookings }))
        
    }

    componentDidUpdate(prevProps) {
        if (this.props.user !== prevProps.user) {
          this.setState({currentUser: this.props.user});
        }
      }

    renderMyBookings = () => this.state.myBookings.map(booking => <BookingCard booking={booking} deleteBooking={this.deleteBooking}/>)

    deleteBooking = (bookingId) => {
        API.deleteCleaning(bookingId)
            .then(this.setState({myBookings: this.state.myBookings.filter(booking => booking.id !== bookingId)}))
        // this.setState()
    }


render(){
 
    return (
            <div>
                {
                    this.state.currentUser ? this.renderMyBookings() : "there is no user!!!!"
                }
            </div>
        )
}
        
}

export default MyBookings


                // {  getMyBookings().then(bookings => bookings.map(booking => <li>{booking.id}</li>))  }

