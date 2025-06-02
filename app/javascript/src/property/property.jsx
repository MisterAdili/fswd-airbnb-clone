// property.jsx
import React from 'react';
import Layout from '@src/layout';
import BookingWidget from './bookingWidget';
import { handleErrors } from '@utils/fetchHelper';
import PropertyImage from './propertyImage';
import './property.scss';

class Property extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedUser: '',
      property: {},
      loading: true,
      imageURLs: [],
      authenticated:false
    }

  }

  authenticateUser () {
    fetch('/api/authenticated')
    .then(handleErrors)
    .then(data => {
      this.setState({
        loggedUser: data.username,
        authenticated: false
      })
    })
  }

  getProperty(){
    fetch(`/api/properties/${this.props.property_id}`)
    .then(handleErrors)
    .then(data => {
      this.setState({
        property: data.property,
        loading: false,
      })
      let imgURLs = [];
      for (let i = 0; i < data.property.images.length; i++){
        imgURLs[i]=data.property.images[i].image_url
      }
      this.setState({imageURLs: imgURLs});
    })
  }


  componentDidMount() {
    this.authenticateUser();
    this.getProperty();
  }


  render () {
    const { 
      property, 
      loading, 
      imageURLs, 
    } = this.state;

    const {
      id,
      title,
      description,
      city,
      property_type,
      price_per_night,
      max_guests,
      bedrooms,
      beds,
      baths,
      user,
    } = property;

    if (loading) {
      return <p>loading...</p>;
    } else {
      return(
        <Layout>
          <div className="property-image mb-3" style={{ backgroundImage: `url(${property.images[0].image_url})` }} />
          <div className="container">
            <div className="row">
              <div className="info col-12 col-lg-7">
                <div className="mb-3">
                  <h3 className="mb-0">{title}</h3>
                  <a href={'/property/'+this.props.property_id+'/edit'}>Edit</a>
                  <p className="text-uppercase mb-0 text-secondary"><small>{city}</small></p>
                  <p className="mb-0"><small>Hosted by <b>{user.username}</b></small></p>
                </div>
                <div>
                  <p className="mb-0 text-capitalize"><b>{property_type}</b></p>
                  <p>
                    <span className="me-3">{max_guests} guests</span>
                    <span className="me-3">{bedrooms} bedroom</span>
                    <span className="me-3">{beds} bed</span>
                    <span className="me-3">{baths} bath</span>
                  </p>
                </div>
                <hr />
                <p>{description}</p>
              </div>
              <div className="col-12 col-lg-5">
                <BookingWidget property_id={id} price_per_night={price_per_night} />
              </div>
            </div>
            <div className='row'>
              {imageURLs.map((image) => {
                return(<PropertyImage 
                  key={image} 
                  imageURL={image}
                />)
              })}
            </div>
          </div>
        </Layout>
      )
    }
  }
}

export default Property