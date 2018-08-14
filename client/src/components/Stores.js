import React, { Component } from "react";
import StoreCard from "./StoreCard";

class Stores extends Component {
  render() {
    const { stores } = this.props;
    const storeCards = stores.map(store => {
      return <StoreCard key={store._id} storeData={store} />;
    });
    return <div className="row">{storeCards}</div>;
  }
}

export default Stores;
