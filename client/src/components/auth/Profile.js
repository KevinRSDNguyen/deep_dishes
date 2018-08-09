import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import TextFieldGroup from "./../common/TextFieldGroup";
import { connect } from "react-redux";

class Profile extends Component {
  state = {
    name: "",
    email: ""
  };
  componentDidMount() {
    this.setState({ name: this.props.user.name, email: this.props.user.email });
  }
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    // e.preventDefault();
    // const newUser = {
    //   name: this.state.name,
    //   email: this.state.email,
    //   password: this.state.password,
    //   password2: this.state.password2
    // };
    // if (newUser.password !== newUser.password2) {
    //   return toast.error("Passwords must match.");
    // }
    // registerUser(newUser)
    //   .then(response => {
    //     toast.success(
    //       "Successfully Registered. You will be redirected in a few seconds."
    //     );
    //     setTimeout(() => {
    //       this.props.history.push("/login");
    //     }, 4000);
    //   })
    //   .catch(e => {
    //     toast.error(e[0].detail);
    //   });
  };
  render() {
    const { user } = this.props;
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

export default connect()(Profile);
