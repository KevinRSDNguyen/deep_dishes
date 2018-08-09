import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { loginUser } from "./../../actions/authActions";
import TextFieldGroup from "./../common/TextFieldGroup";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onSubmit = e => {
    e.preventDefault();
    this.props.loginUser(this.state).catch(e => {
      toast.error(e[0].detail);
    });
  };
  render() {
    let authRedirect = this.props.auth.isAuthenticated ? (
      <Redirect to="/stores" />
    ) : null;

    return (
      <div className="login">
        <ToastContainer />
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              {authRedirect}
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your Deep Dishes account
              </p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  required
                />
                <TextFieldGroup
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  required
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
