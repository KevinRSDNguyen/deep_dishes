import React, { Component } from "react";
import axios from "axios";
// import Aux from "./../hoc/Auxx/Auxx";
import { choices } from "./../utility/tags";

class EditStore extends Component {
  state = {
    name: "",
    description: "",
    tags: []
  };
  onSubmit = e => {
    e.preventDefault();
    axios.post("/api/stores/add", this.state).then(res => {
      console.log(res.data);
      this.props.history.push("/");
    });
  };
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onCheck = e => {
    let tags = [...this.state.tags];
    if (e.target.checked) {
      tags.push(e.target.value);
    } else {
      tags = tags.filter(tag => tag !== e.target.value);
    }
    this.setState({ tags });
  };
  render() {
    const tagChoices = choices.map(choice => {
      return (
        <div className="form-check form-check-inline" key={choice}>
          <input
            type="checkbox"
            className="form-check-input"
            id={choice}
            value={choice}
            onChange={this.onCheck}
          />
          <label className="form-check-label">{choice}</label>
        </div>
      );
    });

    return (
      <div>
        <h1>ADD STORE</h1>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              onChange={this.onChange}
              value={this.state.name}
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              className="form-control"
              onChange={this.onChange}
              value={this.state.description}
            />
          </div>
          {tagChoices}
          <input
            type="submit"
            value="Save"
            className="btn btn-warning btn-block"
          />
        </form>
      </div>
    );
  }
}

export default EditStore;
// encType="multipart/form-data"
