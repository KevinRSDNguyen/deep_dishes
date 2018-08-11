import React, { Component } from "react";
import { connect } from "react-redux";
import { heartStore } from "./../actions/userActions";
import { auth } from "./../actions/authActions";
import classnames from "classnames";
import { Link } from "react-router-dom";
import placeHolderImg from "./../assets/images/store.jpg";

class StoreCard extends Component {
  state = {
    imgError: false
  };
  onImgError = () => {
    this.setState({ imgError: true });
  };
  onHeartClick = id => {
    heartStore(id)
      .then(() => this.props.auth())
      .catch(e => {});
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
    // const heartClass = classnames("fas fa-heart", {
    //   "text-danger": this.props.user.userData.hearts.includes(this.props._id)
    // });
    const { isAuth, hearts, id } = this.props.user.userData;
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
            {isAuth ? (
              <li className="list-group-item">
                {this.props.author === id ? (
                  <button>
                    <Link to={`/stores/${this.props._id}/edit`}>
                      <i className="far fa-edit" /> Edit
                    </Link>
                  </button>
                ) : null}
                <button
                  onClick={() => this.onHeartClick(this.props._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i
                    className={classnames("fas fa-heart", {
                      "text-danger": hearts.includes(this.props._id)
                    })}
                  />
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

export default connect(
  mapStateToProps,
  { auth }
)(StoreCard);
