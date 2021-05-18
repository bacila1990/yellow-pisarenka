import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import logo from "../assets/img/logo.svg";
import logoMobile from "../assets/img/logo-mobile.png";
import filter from "../assets/img/filter-active.svg";
import burger from "../assets/img/menu.png";
import cancelBurger from "../assets/img/cancel-burger.svg";

function Header({ isFelter }) {
  const [burgerMenu, setBurgerMenu] = useState(false);

  const isBurgerMenu = () => {
    setBurgerMenu(!burgerMenu);
  };

  return (
    <div className={burgerMenu ? "header  open-burger" : "header "}>
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
        className={burgerMenu ? "filter" : "filter-mobile"}
        onClick={() => isFelter()}
        src={filter}
        alt="Filter"
        type="image"
      />
      <input
        className="burger"
        onClick={isBurgerMenu}
        src={burgerMenu ? cancelBurger : burger}
        alt="Burger"
        type="image"
      />
    </div>
  );
}

// className={burgerMenu ? "filter" : "no-filter"}

// function Header({ isFelter }) {
//   return (
//     <div className="header">
//       <Link to="/">
//         <img src={logo} alt="Sweet logo" />
//       </Link>
//       <div className="container">
//         <Link to="/JOGS" className="container__elem">
//           JOGS
//         </Link>
//         <Link to="/INFO" className="container__elem">
//           INFO
//         </Link>
//         <Link to="/CONTACT-US" className="container__elem">
//           CONTACT US
//         </Link>
//         <img
//           className="container__elem"
//           onClick={() => isFelter()}
//           src={filter}
//           alt="Filter"
//         />
//       </div>
//     </div>
//   );
// }

// function Header({ isFelter }) {
//   return (
//     <Navbar className="header" fixed="top" collapseOnSelect expand="md">
//       <Container>
//         <Navbar.Brand href="/">
//           <img src={logo} alt="Logo bear" />
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//         <Navbar.Collapse id="responsive-navbar-nav">
//           <Nav className="mr-auto">
//             <Nav.Link href="/">JOGS</Nav.Link>
//             <Nav.Link href="/JOGS">INFO</Nav.Link>
//             <Nav.Link href="/INFO">CONTACT US</Nav.Link>
//           </Nav>
//         </Navbar.Collapse>
//         <img
//           className="container__elem"
//           onClick={() => isFelter()}
//           src={filter}
//           alt="Filter"
//         />
//       </Container>
//     </Navbar>
//   );
// }

// { isFelter }

// <Navbar>
//   <Container>
//     <Navbar.brand href="/">
//       <img src={logo} alt="Sweet logo" />
//     </Navbar.brand>
//     <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//   </Container>
// </Navbar>

// function Header({ isFelter }) {
//   return (
//     <div className="header">
//       <Link to="/">
//         <img src={logo} alt="Sweet logo" />
//       </Link>
//       <div className="container">
//         <Link to="/JOGS" className="container__elem">
//           JOGS
//         </Link>
//         <Link to="/INFO" className="container__elem">
//           INFO
//         </Link>
//         <Link to="/CONTACT-US" className="container__elem">
//           CONTACT US
//         </Link>
//         <img
//           className="container__elem"
//           onClick={() => isFelter()}
//           src={filter}
//           alt="Filter"
//         />
//       </div>
//     </div>
//   );
// }

Header.propTypes = {
  isFelter: PropTypes.func,
};

export default Header;
