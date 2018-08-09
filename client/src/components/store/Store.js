import React, { Component } from "react";
import { Link } from "react-router-dom";
import Spinner from "./../common/Spinner/Spinner";
import { connect } from "react-redux";
import StoreMap from "./StoreMap";
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
        </div>
      );
    }
    return <div>{storeContent}</div>;
  }
}

const mapStateToProps = state => {
  return {
    store: state.store
  };
};

export default connect(
  mapStateToProps,
  { getStoreBySlug }
)(Store);
