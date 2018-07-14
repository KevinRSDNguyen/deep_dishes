import React, { Component } from "react";
import Spinner from "./../components/Spinner/Spinner";
import { connect } from "react-redux";
import { addStore } from "./../actions/storeActions";
import axios from "axios";
import StoreForm from "./StoreForm";

class AddStore extends Component {
  onSubmit = store => {
    this.props.addStore(store, this.props.history);
  };
  render() {
    return (
      <div>
        <h1>Add Store</h1>
        <StoreForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(
  null,
  { addStore }
)(AddStore);
