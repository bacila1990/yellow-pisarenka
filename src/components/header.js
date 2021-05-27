import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import logo from "../assets/img/logo.svg";
import logoMobile from "../assets/img/logo-mobile.png";
import filterActive from "../assets/img/filter-active.svg";
import filterInactive from "../assets/img/filter-inactive.svg";
import burger from "../assets/img/menu.png";
import cancelBurger from "../assets/img/cancel-burger.svg";

function Header({ isFelter, filterBlock }) {
  const [burgerMenu, setBurgerMenu] = useState(false);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 830) setBurgerMenu(false);
    }
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isBurgerMenu = () => {
    setBurgerMenu(!burgerMenu);
  };

  return (
    <div
      data-testid="location-header"
      className={burgerMenu ? "header open-burger" : "header"}
    >
      <Link to="/">
        <img
          className="logo"
          src={burgerMenu ? logoMobile : logo}
          alt="Bear logo"
        />
      </Link>
      <div className={burgerMenu ? "container container-mobile" : "container"}>
        <Link
          to="/JOGS"
          className={
            burgerMenu
              ? "container__elem container__elem-mobile"
              : "container__elem"
          }
        >
          JOGS
        </Link>
        <Link
          to="/INFO"
          className={
            burgerMenu
              ? "container__elem container__elem-mobile"
              : "container__elem"
          }
        >
          INFO
        </Link>
        <Link
          to="/CONTACT-US"
          className={
            burgerMenu
              ? "container__elem container__elem-mobile"
              : "container__elem"
          }
        >
          CONTACT US
        </Link>
      </div>
      <input
        className={burgerMenu ? "filter-mobile" : "filter"}
        onClick={() => isFelter()}
        src={filterBlock ? filterActive : filterInactive}
        alt="Filter"
        type="image"
      />
      <input
        data-testid="header-burger-input"
        className="burger"
        onClick={isBurgerMenu}
        src={burgerMenu ? cancelBurger : burger}
        alt="Burger"
        type="image"
      />
    </div>
  );
}

Header.propTypes = {
  isFelter: PropTypes.func.isRequired,
  filterBlock: PropTypes.bool.isRequired,
};

Header.defaultProps = { isFelter: () => {}, filterBlock: false };

export default Header;
