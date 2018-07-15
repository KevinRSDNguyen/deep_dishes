import React, { Component } from "react";
import { choices } from "./../utility/tags";

class StoreForm extends Component {
  state = {
    name: this.props.store ? this.props.store.name : "",
    description: this.props.store ? this.props.store.description : "",
    tags: this.props.store ? this.props.store.tags : [],
    slug: this.props.store ? this.props.store.slug : "",
    location: this.props.store
      ? this.props.store.location
      : { address: "", coordinates: ["", ""] }
  };
  onSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
  };
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onAddressChange = e => {
    const copyState = {
      ...this.state,
      location: {
        ...this.state.location,
        coordinates: [...this.state.location.coordinates]
      }
    };

    const google = window.google; //reactjs use a linting rule that forbids unknown global variables.
    let dropdown = new google.maps.places.Autocomplete(e.target);
    dropdown.addListener("place_changed", () => {
      const place = dropdown.getPlace();
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      copyState.location.address = place.formatted_address;
      copyState.location.coordinates[1] = lat;
      copyState.location.coordinates[0] = lng;
      this.setState({ location: copyState.location });
    });

    copyState.location.address = e.target.value;
    this.setState({
      location: copyState.location
    });
  };
  onLngChange = e => {
    const copyState = {
      ...this.state,
      location: {
        ...this.state.location,
        coordinates: [...this.state.location.coordinates]
      }
    };
    copyState.location.coordinates[0] = e.target.value;
    this.setState({ location: copyState.location });
  };
  onLatChange = e => {
    const copyState = {
      ...this.state,
      location: {
        ...this.state.location,
        coordinates: [...this.state.location.coordinates]
      }
    };
    copyState.location.coordinates[1] = e.target.value;
    this.setState({ location: copyState.location });
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
            checked={this.state.tags.includes(choice)}
            onChange={this.onCheck}
          />
          <label className="form-check-label">{choice}</label>
        </div>
      );
    });

    return (
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            onChange={this.onChange}
            value={this.state.name}
            required
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
        {/* address, lng and lat */}
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            id="address"
            name="location[address]"
            className="form-control"
            onChange={this.onAddressChange}
            value={this.state.location.address}
            required
          />
        </div>
        <div className="form-group">
          <label>Address Lng</label>
          <input
            type="text"
            id="lng"
            name="location[coordinates][0]"
            className="form-control"
            onChange={this.onLngChange}
            value={this.state.location.coordinates[0] || ""}
          />
        </div>
        <div className="form-group">
          <label>Address Lat</label>
          <input
            type="text"
            id="lat"
            name="location[coordinates][1]"
            className="form-control"
            onChange={this.onLatChange}
            value={this.state.location.coordinates[1] || ""}
          />
        </div>

        {tagChoices}
        <input
          type="submit"
          value="Save"
          className="btn btn-warning btn-block"
        />
      </form>
    );
  }
}

export default StoreForm;
