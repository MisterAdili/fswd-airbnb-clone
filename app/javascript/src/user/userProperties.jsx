import React from 'react';
import { getProperties } from '@utils/authenticator';
import './index.scss'

class UserProperties extends React.Component {
  state = {
    properties: [],
    userProperties: []
  }

  componentDidMount() {
    getProperties((data)=>{
      this.setState({properties: data.properties});
      let tempUserProperties = [];
      for (let i = 0; i < data.properties.length; i++){
        if (data.properties[i].user_id === this.props.loggedUserID){
          tempUserProperties.push(data.properties[i]);
        }
      }
      this.setState({userProperties : tempUserProperties});
      console.log(this.state.userProperties);
    });
  }


  render () {
    const { userProperties } = this.state;
    return (
      <React.Fragment>
        {userProperties.map(property => {
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
      </React.Fragment>
    )
  }
}

export default UserProperties
