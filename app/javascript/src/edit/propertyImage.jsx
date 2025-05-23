import React from "react";

class PropertyImage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    }

  }

  makePrimary(){
    this.props.makePrimary(this.props.imageURL);
  }

  deleteImage(){
    this.props.deleteImage(this.props.imageURL);
  }

  render(){
    let { owned } = this.props;

    return(
    <React.Fragment>
      <div className='col-md-3 col-sm-6 col-xs-12'>
        <div className='card'>
          <img src={this.props.imageURL} className="card-img-top" />
          <div className="card-body">
            <h5 className="card-title">Image</h5>
          </div>
        </div>
      </div>
    </React.Fragment>
    )
  }

}

export default PropertyImage
