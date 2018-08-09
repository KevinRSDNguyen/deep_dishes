import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "./../actions/authActions";

class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <React.Fragment>
        <li className="nav-item">
          <Link to="/profile" className="nav-link">
            <img
              className="rounded-circle"
              src={user.avatar}
              alt={user.name}
              style={{ width: "25px", marginRight: "5px" }}
            />
          </Link>
        </li>
        <li className="nav-item">
          <a href="" onClick={this.onLogoutClick} className="nav-link">
            Logout
          </a>
        </li>
      </React.Fragment>
    );

    const guestLinks = (
      <React.Fragment>
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </React.Fragment>
    );
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">
          Deep Dishes
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="navbarNav"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/stores">
                <i className="fas fa-store" /> Stores
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tags">
                <i className="fas fa-tags" /> Tags
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="">
                <i className="fas fa-trophy" /> Top
              </a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add">
                <i className="far fa-plus-square" /> Add
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="">
                <i className="fas fa-map-marker-alt" /> Map
              </a>
            </li>
          </ul>

          <ul className="navbar-nav ml-auto">
            {isAuthenticated ? authLinks : guestLinks}
          </ul>
        </div>
      </nav>
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
  { logoutUser }
)(Navbar);
