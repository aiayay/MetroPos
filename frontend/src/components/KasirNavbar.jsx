import React from "react";
import "../index.css";
import { NavLink } from "react-router-dom";
import logo from "../logo.jpeg";

const KasirNavbar = () => {
  return (
    <div>
      <nav className="navbar is-fixed-top has-shadow" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <NavLink className="navbar-item" to="/dashboard">
            <h1>Metro Pos</h1>
          </NavLink>
          <a href="!#" role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <h2>02/09/2024</h2>
                <h1>nama</h1>
                <img src={logo} width="50" height="28" alt="" />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default KasirNavbar;
