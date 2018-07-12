import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <a className="navbar-brand" href="">
        Deep Dishes
      </a>
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
            <a className="nav-link" href="">
              <i class="fas fa-store" /> Stores
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="">
              <i class="fas fa-tags" /> Tags
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="">
              <i class="fas fa-trophy" /> Top
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="">
              <i class="far fa-plus-square" /> Add
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="">
              <i class="fas fa-map-marker-alt" /> Map
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
