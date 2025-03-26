// login.jsx
import React from 'react';
import Layout from '@src/layout';
import { authenticatorCall } from '@utils/authenticator';
import { createCall } from './createCall';

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedUser: '',
      titleInput: '',
      descriptionInput: '',
      cityInput: '',
      countryInput: '',
      propertyTypeInput: '',
      priceInput: '',
      maxGuestsInput: '',
      bedroomsInput: '',
      bedsInput: '',
      bathsInput: '',
      imageInput: [],
      authenticated: false,
      show_login: true,
    }
    this.createProperty = this.createProperty.bind(this);
    this.titleInputHandler = this.titleInputHandler.bind(this);
    this.descriptionInputHandler = this.descriptionInputHandler.bind(this);
    this.cityInputHandler = this.cityInputHandler.bind(this);
    this.countryInputHandler = this.countryInputHandler.bind(this);
    this.propertyTypeInputHandler = this.propertyTypeInputHandler.bind(this);
    this.priceInputHandler = this.priceInputHandler.bind(this);
    this.maxGuestsInputHandler = this.maxGuestsInputHandler.bind(this);
    this.bedroomsInputHandler = this.bedroomsInputHandler.bind(this);
    this.bedsInputHandler = this.bedsInputHandler.bind(this);
    this.bathsInputHandler = this.bathsInputHandler.bind(this);
    this.imageInputHandler = this.imageInputHandler.bind(this);
  }
  
  imageInputHandler(event) {
    let files = [];
    for (let i = 0; i < event.target.files.length; i++){
      files.push(event.target.files[i]);
    }

    this.setState({ imageInput: files }, () => { console.log(this.state.imageInput) });
  }

  createProperty(event) {
    event.preventDefault();

    let imageFormData = new FormData();
    for (let i = 0; i < this.state.imageInput.length; i++){
      imageFormData.append('property[images][]', this.state.imageInput[i]);
    }
    imageFormData.set('property[title]', this.state.titleInput);
    imageFormData.set('property[description]', this.state.descriptionInput);
    imageFormData.set('property[city]', this.state.cityInput);
    imageFormData.set('property[country]', this.state.countryInput);
    imageFormData.set('property[property_type]', this.state.propertyTypeInput);
    imageFormData.set('property[price_per_night]', this.state.priceInput);
    imageFormData.set('property[max_guests]', this.state.maxGuestsInput);
    imageFormData.set('property[bedrooms]', this.state.bedroomsInput);
    imageFormData.set('property[beds]', this.state.bedsInput);
    imageFormData.set('property[baths]', this.state.bathsInput);
    console.log('imageFormData');
    console.log(imageFormData);
    if (this.state.authenticated === true){
      console.log('create imageFormData');
      console.log('imageFormData');
      createCall(imageFormData);
    } else {
      console.log('not logged in');
    }
  }

  titleInputHandler(event) {
    this.setState({titleInput : event.target.value})
  }

  descriptionInputHandler(event) {
    this.setState({descriptionInput : event.target.value})
  }

  cityInputHandler(event) {
    this.setState({cityInput : event.target.value})
  }

  countryInputHandler(event) {
    this.setState({countryInput : event.target.value})
  }

  propertyTypeInputHandler(event) {
    this.setState({propertyTypeInput : event.target.value})
  }

  priceInputHandler(event) {
    this.setState({priceInput : event.target.value})
  }

  maxGuestsInputHandler(event) {
    this.setState({maxGuestsInput : event.target.value})
  }

  bedroomsInputHandler(event) {
    this.setState({bedroomsInput : event.target.value})
  }

  bedsInputHandler(event) {
    this.setState({bedsInput : event.target.value})
  }

  bathsInputHandler(event) {
    this.setState({bathsInput : event.target.value})
  }

  componentDidMount() {
    authenticatorCall((data)=>{this.setState({loggedUser: data.username, authenticated: data.authenticated})});
  }

  render () {
    const { 
      authenticated, 
      titleInput, 
      descriptionInput, 
      cityInput, 
      countryInput, 
      propertyTypeInput, 
      priceInput, 
      maxGuestsInput, 
      bedroomsInput, 
      bedsInput, 
      bathsInput,
      loggedUser
    } = this.state;
    if (authenticated) {
      return (
        <Layout user={loggedUser}>
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-9 col-lg-6 mx-auto my-4">
                <div className="border p-4">
                  <form onSubmit={this.createProperty}>
                    <legend>Create a new property</legend>
                    <div className='input-group mb-3'>
                      <label htmlFor='propertyTitle' className='input-group-text'>Title</label>
                      <input 
                        type='text' 
                        id='propertyTitle' 
                        value={titleInput} 
                        onChange={this.titleInputHandler}
                        className='form-control' 
                        placeholder='Title'
                      ></input>
                    </div>
                    <div className='input-group mb-3'>
                      <label htmlFor='propertyDescription' className='input-group-text'>Description</label>
                      <input 
                        type='text' 
                        id='propertyDescription' 
                        value={descriptionInput}
                        onChange={this.descriptionInputHandler}
                        className='form-control' 
                        placeholder='Description'
                      ></input>
                    </div>
                    <div className='input-group mb-3'>
                      <label htmlFor='propertyCity' className='input-group-text'>City</label>
                      <input 
                        type='text' 
                        id='propertyCity' 
                        value={cityInput} 
                        onChange={this.cityInputHandler}
                        className='form-control' 
                        placeholder='City'
                      ></input>
                    </div>
                    <div className='input-group mb-3'>
                      <label htmlFor='propertyCountry' className='input-group-text'>Country</label>
                      <input 
                        type='text' 
                        id='propertyCountry' 
                        value={countryInput} 
                        onChange={this.countryInputHandler}
                        className='form-control' 
                        placeholder='Country'
                      ></input>
                    </div>
                    <div className='input-group mb-3'>
                      <label htmlFor='propertyType' className='input-group-text'>Property Type</label>
                      <input 
                        type='text' 
                        id='propertyType' 
                        value={propertyTypeInput} 
                        onChange={this.propertyTypeInputHandler}
                        className='form-control' 
                        placeholder='Property Type'
                      ></input>
                    </div>
                    <div className='input-group mb-3'>
                      <label htmlFor='propertyPricePerNight' className='input-group-text'>Price Per Night</label>
                      <input 
                        type='text' 
                        id='propertyPricePerNight' 
                        value={priceInput} 
                        onChange={this.priceInputHandler}
                        className='form-control' 
                        placeholder='Price Per Night'
                      ></input>
                    </div>
                    <div className='input-group mb-3'>
                      <label htmlFor='propertyMaxGuests' className='input-group-text'>Max Guests</label>
                      <input 
                        type='text' 
                        id='propertyMaxGuests' 
                        value={maxGuestsInput} 
                        onChange={this.maxGuestsInputHandler}
                        className='form-control' 
                        placeholder='Max Guests'
                      ></input>
                    </div>
                    <div className='input-group mb-3'>
                      <label htmlFor='propertyBedrooms' className='input-group-text'>Bedrooms</label>
                      <input 
                        type='text' 
                        id='propertyBedrooms' 
                        value={bedroomsInput} 
                        onChange={this.bedroomsInputHandler}
                        className='form-control' 
                        placeholder='Bedrooms'
                      ></input>
                    </div>
                    <div className='input-group mb-3'>
                      <label htmlFor='propertyBeds' className='input-group-text'>Beds</label>
                      <input 
                        type='text' 
                        id='propertyBeds' 
                        value={bedsInput} 
                        onChange={this.bedsInputHandler}
                        className='form-control' 
                        placeholder='Beds'
                      ></input>
                    </div>
                    <div className='input-group mb-3'>
                      <label htmlFor='propertyBaths' className='input-group-text'>Baths</label>
                      <input 
                        type='text' 
                        id='propertyBaths' 
                        value={bathsInput} 
                        onChange={this.bathsInputHandler}
                        className='form-control' 
                        placeholder='Baths'
                      ></input>
                    </div>

                    <div className='mb-3'>
                      <label htmlFor='propertyImages' className='form-label'>Property Image(s)</label>
                      <input 
                        className='form-control' 
                        type='file'
                        id='propertyImages'
                        onChange={this.imageInputHandler}
                        multiple
                      ></input>
                    </div>                    

                    <button type='submit' className='btn btn-primary'>Create Property</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      );
    };

    return (
      <Layout>
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-9 col-lg-6 mx-auto my-4">
              <div className="border p-4">
                <a href='/login'>Please login</a>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default Create;