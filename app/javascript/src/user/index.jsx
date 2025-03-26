// home.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';
import { authenticatorCall } from '@utils/authenticator';
import UserProperties from './userProperties'
import UserBookings from './userBookings'
import './index.scss'

class User extends React.Component {
  state = {
    loggedUser: '',
    loggedUserID: '',
    authenticated: false,
  }

  componentDidMount() {

    authenticatorCall((data)=>{
      this.setState({loggedUser: data.username, loggedUserID: data.user_id, authenticated: data.authenticated});
    });
    
  }


  render () {
    const { loggedUser, loggedUserID } = this.state;
    return (
      <Layout user={loggedUser}>
        <div className="container pt-4">
          <h2 className="mb-1">{loggedUser}'s Properties</h2>
          <div className="row">
            <UserProperties loggedUser={loggedUser} loggedUserID={loggedUserID} />
          </div>
          <h2 className="mb-1">{loggedUser}'s Bookings</h2>
          <div className="row">
            <UserBookings loggedUser={loggedUser}  loggedUserID={loggedUserID} />
          </div>
        </div>
      </Layout>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <User />,
    document.body.appendChild(document.createElement('div')),
  )
})