import React from 'react';
import { authenticatorCall, getProperty, getUserBookings } from '@utils/authenticator';
import './index.scss'

class UserBookings extends React.Component {
  state = {
    userBookings: [],
    bookingProperties: [],
    loggedUser: '',
    loggedUserID: '',
    finalBookingsList: []
  }

  componentDidMount() {
    authenticatorCall((data)=>{
      this.setState({loggedUser: data.username, loggedUserID: data.user_id, authenticated: data.authenticated});
      getUserBookings((this.state.loggedUserID), data => {
        let tempUserBookings = data.bookings;
        this.setState({
          userBookings: tempUserBookings
        });
        console.log(this.state.userBookings);
      });
    })
  }


  render () {
    const {finalBookingsList,userBookings} = this.state;

    return (
      <React.Fragment>
        {userBookings.map(booking => {
          return (
            <div key={booking.id} className="col-6 col-lg-4 mb-4 property">
              <a href={`/property/${booking.id}`} className="text-body text-decoration-none">
                <p className="text-uppercase mb-0 text-secondary"><small><b>{booking.property_city}</b></small></p>
                <h6 className="mb-0">{booking.property_title}</h6>
                <p className="mb-0"><small>${booking.price_per_night} USD/night</small></p>
                <p className="mb-0"><small>{booking.start_date} to {booking.end_date}</small></p>
              </a>
            </div>
          )
        })}
      </React.Fragment>
    )
  }
}

export default UserBookings