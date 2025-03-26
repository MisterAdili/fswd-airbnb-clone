import React from 'react';
import Layout from '@src/layout';
import { editCall, deleteCall } from './editPropertyCall';
import './editProperty.scss';
import PropertyImage from './propertyImage';
import { safeCredentials, safeCredentialsForm, handleErrors } from '@utils/fetchHelper';

class EditProperty extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedUser: '',
      property: {},
      propertyInput: {},
      loading: true,
      imageURLs: [],
      owned: false,
      authenticated: false,
      imageInput: [],
      newImageURLs: []
    }
    this.inputHandler = this.inputHandler.bind(this);
    this.editPropertyCall = this.editPropertyCall.bind(this);
    this.imageInputHandler = this.imageInputHandler.bind(this);
    this.deleteProperty = this.deleteProperty.bind(this);
    this.cancelChanges = this.cancelChanges.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
  }

  componentDidMount(){
    fetch('/api/authenticated')
    .then(handleErrors)
    .then(data => {
      this.setState({
        loggedUser: data.username,
        authenticated: data.authenticated
      });
      fetch(`/api/properties/${this.props.property_id}`)
      .then(handleErrors)
      .then(data => {
        this.setState({
          property: data.property,
          propertyInput: data.property,
          loading: false,
        });
        let imgURLs = [];
        for (let i = 0; i < data.property.images.length; i++){
          imgURLs[i]=data.property.images[i].image_url
        }
        this.setState({imageURLs: imgURLs});
        this.setState({newImageURLs: imgURLs});
      })
      .then(()=>{
        if(this.state.loggedUser === this.state.property.user.username){
        this.setState({owned: true});
      }})
    })
  }

  inputHandler(event) {
    let eventID = event.target.id;
    let eventValue = event.target.value;
    this.setState({propertyInput: {...this.state.propertyInput, [eventID] : eventValue}});
  }

  editPropertyCall(event) {
    event.preventDefault();
  
    let imageFormData = new FormData();
  
    for (let i = 0; i < this.state.imageInput.length; i++){
      imageFormData.append('property[newImages][]', this.state.imageInput[i]);
    }
  
    imageFormData.set('property[title]', this.state.propertyInput.title);
    imageFormData.set('property[description]', this.state.propertyInput.description);
    imageFormData.set('property[city]', this.state.propertyInput.city);
    imageFormData.set('property[country]', this.state.propertyInput.country);
    imageFormData.set('property[property_type]', this.state.propertyInput.property_type);
    imageFormData.set('property[price_per_night]', this.state.propertyInput.price_per_night);
    imageFormData.set('property[max_guests]', this.state.propertyInput.max_guests);
    imageFormData.set('property[bedrooms]', this.state.propertyInput.bedrooms);
    imageFormData.set('property[beds]', this.state.propertyInput.beds);
    imageFormData.set('property[baths]', this.state.propertyInput.baths);
  
    console.log('imageFormData');
    console.log(imageFormData);
    if ((this.state.owned === true) && (this.state.authenticated === true)){
      editCall(imageFormData, this.props.property_id);
    } else {
      console.log('not logged in');
    }
  }

  imageInputHandler(event) {
    let files = [];
    for (let i = 0; i < event.target.files.length; i++){
      files.push(event.target.files[i]);
    }
    this.setState({ imageInput: files });
  }

  deleteProperty(){
    if ((this.state.owned === true) && (this.state.authenticated === true)){
      deleteCall(this.props.property_id);
    } else {
      console.log('not logged in');
    }
  }

  cancelChanges(event){
    event.preventDefault();
    window.location.replace('/property/'+this.props.property_id);
  }
  
  deleteImage(){
    return
  }
  
  render () {
    const { 
      propertyInput,
      newImageURLs,
      loading, 
      owned,
      loggedUser
    } = this.state;

    if (loading) {
      return <p>loading...</p>;
    } else if (owned === true) {
      return(
        <Layout user={loggedUser}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="border p-4">
                <form onSubmit={this.editPropertyCall}>
                  <legend>Edit your property</legend>
                  <div className='input-group mb-3'>
                    <label htmlFor='title' className='input-group-text'>Title</label>
                    <input 
                      type='text' 
                      id='title' 
                      value={propertyInput.title} 
                      onChange={this.inputHandler}
                      className='form-control' 
                    ></input>
                  </div>
                  <div className='input-group mb-3'>
                    <label htmlFor='description' className='input-group-text'>Description</label>
                    <input 
                      type='text' 
                      id='description' 
                      value={propertyInput.description}
                      onChange={this.inputHandler}
                      className='form-control' 
                    ></input>
                  </div>
                  <div className='input-group mb-3'>
                    <label htmlFor='city' className='input-group-text'>City</label>
                    <input 
                      type='text' 
                      id='city' 
                      value={propertyInput.city} 
                      onChange={this.inputHandler}
                      className='form-control' 
                    ></input>
                  </div>
                  <div className='input-group mb-3'>
                    <label htmlFor='country' className='input-group-text'>Country</label>
                    <input 
                      type='text' 
                      id='country' 
                      value={propertyInput.country} 
                      onChange={this.inputHandler}
                      className='form-control' 
                    ></input>
                  </div>
                  <div className='input-group mb-3'>
                    <label htmlFor='property_type' className='input-group-text'>Property Type</label>
                    <input 
                      type='text' 
                      id='property_type' 
                      value={propertyInput.property_type} 
                      onChange={this.inputHandler}
                      className='form-control' 
                    ></input>
                  </div>
                  <div className='input-group mb-3'>
                    <label htmlFor='price_per_night' className='input-group-text'>Price Per Night</label>
                    <input 
                      type='text' 
                      id='price_per_night' 
                      value={propertyInput.price_per_night} 
                      onChange={this.inputHandler}
                      className='form-control' 
                    ></input>
                  </div>
                  <div className='input-group mb-3'>
                    <label htmlFor='max_guests' className='input-group-text'>Max Guests</label>
                    <input 
                      type='text' 
                      id='max_guests' 
                      value={propertyInput.max_guests} 
                      onChange={this.inputHandler}
                      className='form-control' 
                    ></input>
                  </div>
                  <div className='input-group mb-3'>
                    <label htmlFor='bedrooms' className='input-group-text'>Bedrooms</label>
                    <input 
                      type='text' 
                      id='bedrooms' 
                      value={propertyInput.bedrooms} 
                      onChange={this.inputHandler}
                      className='form-control' 
                    ></input>
                  </div>
                  <div className='input-group mb-3'>
                    <label htmlFor='beds' className='input-group-text'>Beds</label>
                    <input 
                      type='text' 
                      id='beds' 
                      value={propertyInput.beds} 
                      onChange={this.inputHandler}
                      className='form-control' 
                    ></input>
                  </div>
                  <div className='input-group mb-3'>
                    <label htmlFor='baths' className='input-group-text'>Baths</label>
                    <input 
                      type='text' 
                      id='baths' 
                      value={propertyInput.baths} 
                      onChange={this.inputHandler}
                      className='form-control' 
                    ></input>
                  </div>

                  <div className='row'>
                    {newImageURLs.map((image) => {
                      return(<PropertyImage 
                        key={image}
                        imageURL={image}
                        owned={owned} 
                      />)
                    })}            
                  </div>
                  <div className='row'>
                    <div className='col-12 mb-3'>
                      <label htmlFor='propertyImages' className='form-label'>Add Property Images</label>
                      <input 
                        className='form-control' 
                        type='file'
                        id='propertyImages'
                        onChange={this.imageInputHandler}
                        multiple
                      ></input>
                    </div>
                  </div>
                  <button type='submit' className='btn btn-primary m-3'>Submit Changes</button>
                  <button className='btn btn-danger m-3' onClick={this.deleteProperty}>Delete Property</button>
                  <button className='btn btn-primary m-3' onClick={this.cancelChanges}>Cancel Changes</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Layout>
      )
    } else {
      return(
        <h1>You do not have permission to edit this property</h1>
      )
    }
  }
}

export default EditProperty