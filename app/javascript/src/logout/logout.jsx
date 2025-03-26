// logout.jsx
import React from 'react';
import Layout from '@src/layout';
import LogoutWidget from './logoutWidget';
import { handleErrors } from '@utils/fetchHelper';

import './logout.scss';

class Logout extends React.Component {
  state = {
    authenticated: false,
  }

  componentDidMount() {
    fetch('/api/authenticated')
      .then(handleErrors)
      .then(data => {
        this.setState({
          authenticated: data.authenticated,
        })
      })
  }

  render () {
    return (
      <Layout>
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-9 col-lg-6 mx-auto my-4">
              <div className="border p-4">
                <LogoutWidget toggle={this.toggle} />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default Logout;