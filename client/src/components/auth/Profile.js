import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import TextFieldGroup from "./../common/TextFieldGroup";
import { connect } from "react-redux";
import { updateProfile } from "./../../actions/authActions";

class Profile extends Component {
  state = {
    name: this.props.user.name,
    email: this.props.user.email
  };
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onSubmit = e => {
    e.preventDefault();
    this.props
      .updateProfile(this.state)
      .then(response => {
        toast.success("Successfully Updated your info");
      })
      .catch(e => {
        toast.error(e[0].detail);
      });
  };
  render() {
    // const { user } = this.props;
    return (
      <div>
        <ToastContainer />
        <form onSubmit={this.onSubmit}>
          <TextFieldGroup
            type="text"
            label="Name"
            name="name"
            onChange={this.onChange}
            value={this.state.name}
            required
          />
          <TextFieldGroup
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.onChange}
            required
          />
          <input
            type="submit"
            className="btn btn-warning btn-block mt-4"
            value="Update my Account"
          />
        </form>
      </div>
    );
  }
}

// const mapStateToProps = state => ({
//   auth: state.auth
// });

export default connect(
  null,
  { updateProfile }
)(Profile);
