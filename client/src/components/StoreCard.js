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
        src={this.props.storeData.photo || placeHolderImg}
        className="card-img-top"
        onError={this.onImgError}
        alt=""
      />
    );
    const { userData } = this.props.user;
    const { storeData } = this.props;
    return (
      <div className="col-md-4 col-lg-3">
        <div className="card">
          {img}
          <div className="card-body">
            <h2>
              <Link to={`/store/${storeData.slug}`}>{storeData.name}</Link>
            </h2>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              {storeData.description
                .split(" ")
                .slice(0, 25)
                .join(" ")}
            </li>

            <li className="list-group-item">
              {userData.isAuth ? (
                <React.Fragment>
                  {storeData.author === userData.id ? (
                    <button>
                      <Link to={`/stores/${storeData._id}/edit`}>
                        <i className="far fa-edit" /> Edit
                      </Link>
                    </button>
                  ) : null}
                  <button
                    onClick={() => this.onHeartClick(storeData._id)}
                    type="button"
                    className="btn btn-light mr-1"
                  >
                    <i
                      className={classnames("fas fa-heart", {
                        "text-danger": userData.hearts.includes(storeData._id)
                      })}
                    />
                  </button>
                </React.Fragment>
              ) : null}

              <i className="far fa-comment-alt" />
              <span>{storeData.reviews.length}</span>
            </li>
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
