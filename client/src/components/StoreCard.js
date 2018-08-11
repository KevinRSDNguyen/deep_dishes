import React, { Component } from "react";
import { connect } from "react-redux";
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
            <li className="list-group-item">
              {this.props.description
                .split(" ")
                .slice(0, 25)
                .join(" ")}
            </li>
            {this.props.author === this.props.user.userData.id ? (
              <li className="list-group-item">
                <button>
                  <Link to={`/stores/${this.props._id}/edit`}>
                    <i className="far fa-edit" /> Edit
                  </Link>
                </button>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(StoreCard);
