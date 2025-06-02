// property.jsx
import React from 'react';
import Layout from '@src/layout';

class Success extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }

  }

  render () {

    return(
      <Layout>
        <h3>Booking has been processed.</h3>
      </Layout>
    )
  }
}

export default Success