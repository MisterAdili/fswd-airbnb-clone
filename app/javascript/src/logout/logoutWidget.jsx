// loginWidget.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

class LogoutWidget extends React.Component {
  state = {
    error: '',
  }

  componentDidMount(){
    return this.logout();
  }

  logout = () => {
    this.setState({
      error: '',
    });

    fetch('/api/sessions/1', safeCredentials({
      method: 'DELETE',
    }))
      .then(handleErrors)
      .then(data => {
        if (data.success) {
          const params = new URLSearchParams(window.location.search);
          const redirect_url = params.get('redirect_url') || '/';
          window.location = redirect_url;
        }
      })
      .catch(error => {
        this.setState({
          error: 'Could not log out.',
        })
      })
  }

  render () {
    const { error } = this.state;
    return (
      <React.Fragment>
        You are now logged out.
      </React.Fragment>
    )
  }
}

export default LogoutWidget