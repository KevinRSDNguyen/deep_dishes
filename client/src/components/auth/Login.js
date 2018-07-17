import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { loginUser } from "./../../actions/authActions";
import clearErrors from "./../../actions/errorsActions";
import TextFieldGroup from "./../common/TextFieldGroup";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };
  componentWillUnmount() {
    this.props.clearErrors();
  }
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onSubmit = e => {
    e.preventDefault();
    const userData = { email: this.state.email, password: this.state.password };
    this.props.loginUser(userData);
  };
  render() {
    const { errors } = this.props;
    let authRedirect = this.props.auth.isAuthenticated ? (
      <Redirect to="/stores" />
    ) : null;

    return (
      <div className="login">
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
                  error={errors.email}
                />
                <TextFieldGroup
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.login}
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
    auth: state.auth,
    errors: state.errors
  };
};

export default connect(
  mapStateToProps,
  { loginUser, clearErrors }
)(Login);
