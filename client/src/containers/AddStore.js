import React, { Component } from "react";
import axios from "axios";
import StoreForm from "./StoreForm";

class AddStore extends Component {
  onSubmit = store => {
    axios.post("/api/stores/add", store).then(res => {
      console.log(res.data);
      this.props.history.push("/");
    });
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

export default AddStore;
// encType="multipart/form-data"
