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
              Stores
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="">
              Tags
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="">
              Top
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="">
              Add
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="">
              Map
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
