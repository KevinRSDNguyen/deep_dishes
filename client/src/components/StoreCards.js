import React, { Component } from "react";
import Spinner from "./Spinner/Spinner";
import StoreCard from "./StoreCard";

class StoreCards extends Component {
  render() {
    const { loading, stores } = this.props;
    const storeCards = loading ? (
      <Spinner />
    ) : (
      stores.map(store => <StoreCard key={store._id} {...store} />)
    );
    return <div className="row">{storeCards}</div>;
  }
}

export default StoreCards;
