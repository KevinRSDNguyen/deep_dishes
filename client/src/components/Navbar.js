import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
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
            <a className="nav-link" href="">
              <i className="fas fa-tags" /> Tags
            </a>
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
          <li className="nav-item">
            <a className="nav-link" href="">
              Register
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="">
              Login
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
