import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import logo from "../assets/img/logo.svg";
import filter from "../assets/img/filter-active.svg";

function Header({ isFelter }) {
  return (
    <div className="header">
      <Link to="/">
        <img src={logo} alt="Sweet logo" />
      </Link>
      <div className="container">
        <Link to="/JOGS" className="container__elem">
          JOGS
        </Link>
        <Link to="/INFO" className="container__elem">
          INFO
        </Link>
        <Link to="/CONTACT-US" className="container__elem">
          CONTACT US
        </Link>
        <img
          className="container__elem"
          onClick={() => isFelter()}
          src={filter}
          alt="Filter"
        />
      </div>
    </div>
  );
}

Header.propTypes = {
  isFelter: PropTypes.func,
};

export default Header;
