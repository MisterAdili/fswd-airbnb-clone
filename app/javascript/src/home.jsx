// home.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';
import { handleErrors } from '@utils/fetchHelper';
import { authenticatorCall, getProperties } from '@utils/authenticator';
import './home.scss';

class Home extends React.Component {
  state = {
    loggedUser: '',
    authenticated: false,
    properties: [],
    total_pages: null,
    next_page: null,
    loading: true,
  }

  componentDidMount() {

    authenticatorCall((data)=>{this.setState({loggedUser: data.username, authenticated: data.authenticated})});
    getProperties((data)=>{this.setState({
      properties: data.properties,
      total_pages: data.total_pages,
      next_page: data.next_page
    })})

  }

  loadMore = () => {
    if (this.state.next_page === null) {
      return;
    }
    this.setState({ loading: true });
    fetch(`/api/properties?page=${this.state.next_page}`)
      .then(handleErrors)
      .then(data => {
        this.setState({
          properties: this.state.properties.concat(data.properties),
          total_pages: data.total_pages,
          next_page: data.next_page,
          loading: false
        })
      })
  }

  render () {
    const { loggedUser, properties, next_page, loading } = this.state;
    return (
      <Layout user={loggedUser}>
        <div className="container pt-4">
          <h4 className="mb-1">Top-rated places to stay</h4>
          <p className="text-secondary mb-3">Explore some of the best-reviewed stays in the world</p>
          <div className="row">
            {properties.map(property => {
              return (
                <div key={property.id} className="col-6 col-lg-4 mb-4 property">
                  <a href={`/property/${property.id}`} className="text-body text-decoration-none">
                    <div className="property-image mb-1 rounded" style={{ backgroundImage: `url(${property.images[0].image_url})` }} />
                    <p className="text-uppercase mb-0 text-secondary"><small><b>{property.city}</b></small></p>
                    <h6 className="mb-0">{property.title}</h6>
                    <p className="mb-0"><small>${property.price_per_night} USD/night</small></p>
                  </a>
                </div>
              )
            })}
          </div>
          {loading && <p>loading...</p>}
          {(loading || next_page === null) ||
            <div className="text-center">
              <button
                className="btn btn-light mb-4"
                onClick={this.loadMore}
              >load more</button>
            </div>
          }
        </div>
      </Layout>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Home />,
    document.body.appendChild(document.createElement('div')),
  )
})