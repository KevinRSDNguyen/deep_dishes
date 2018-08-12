import React, { Component } from "react";
import { Link } from "react-router-dom";
import Spinner from "./../common/Spinner/Spinner";
import { connect } from "react-redux";
import StoreMap from "./StoreMap";
import StoreReviewForm from "./StoreReviewForm/StoreReviewForm";
import StoreReviewCard from "./StoreReviewCard";
import { getStoreBySlug } from "./../../actions/storeActions";
import placeHolderImg from "./../../assets/images/store.jpg";

class Store extends Component {
  state = {
    imgError: false
  };
  onImgError = () => {
    this.setState({ imgError: true });
  };
  componentDidMount() {
    this.props.getStoreBySlug(this.props.match.params.slug);
  }
  render() {
    const { store } = this.props.store;
    const { id } = this.props.user.userData;
    let storeContent = <Spinner />;

    if (store) {
      const img = this.state.imgError ? (
        <img
          src={placeHolderImg}
          className="img-fluid d-block mx-auto"
          onError={this.onImgError}
          alt=""
        />
      ) : (
        <img
          src={store.photo || placeHolderImg}
          className="img-fluid d-block mx-auto"
          onError={this.onImgError}
          alt=""
        />
      );
      const reviewAuthorIds = store.reviews.map(review => review.author._id);
      const showReviewForm = !reviewAuthorIds.includes(id);
      const tags = store.tags.map(tag => {
        return (
          <span key={tag}>
            <Link className="mx-3 btn btn-warning" to={`/tags/${tag}`}>
              {"#" + tag}
            </Link>
          </span>
        );
      });

      storeContent = (
        <div>
          <div className="row">
            <div className="col-md-6">{img}</div>
            <div className="col-md-6">
              <StoreMap location={store.location} />
            </div>
          </div>
          <h2>{store.name}</h2>
          <p>{store.location.address}</p>
          <p>{store.description}</p>
          {tags}
          {showReviewForm ? (
            <StoreReviewForm
              store={store}
              getStoreBySlug={() =>
                this.props.getStoreBySlug(this.props.match.params.slug)
              }
            />
          ) : null}

          {store.reviews.map(r => {
            return <StoreReviewCard review={r} key={r._id} />;
          })}
        </div>
      );
    }
    return <div>{storeContent}</div>;
  }
}

const mapStateToProps = state => {
  return {
    store: state.store,
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { getStoreBySlug }
)(Store);
