import React, { Component } from "react";
import StoreCard from "./StoreCard";

class Stores extends Component {
  render() {
    const { stores } = this.props;
    const storeCards = stores.map(store => (
      <StoreCard key={store._id} {...store} />
    ));
    return <div className="row">{storeCards}</div>;
  }
}

export default Stores;
