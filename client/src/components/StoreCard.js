import React, { Component } from "react";
import { Link } from "react-router-dom";
import placeHolderImg from "./../assets/images/store.jpg";

class StoreCard extends Component {
  state = {
    imgError: false
  };
  onImgError = () => {
    this.setState({ imgError: true });
  };
  render() {
    // Display placeholder img if invalid link
    const img = this.state.imgError ? (
      <img
        src={placeHolderImg}
        className="card-img-top"
        onError={this.onImgError}
        alt=""
      />
    ) : (
      <img
        src={this.props.photo || placeHolderImg}
        className="card-img-top"
        onError={this.onImgError}
        alt=""
      />
    );

    return (
      <div className="col-md-3">
        <div className="card">
          {img}

          <div className="card-body">
            <h2>
              <Link to={`/store/${this.props.slug}`}>{this.props.name}</Link>
            </h2>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">{this.props.description}</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default StoreCard;
