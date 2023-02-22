import React from "react";
import styles from "../styles/NavBar.module.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar className={styles.NavBar} expand="md" fixed="top">
      <Container>
        <NavLink to="/">
        <Navbar.Brand>
          <img src={logo} alt="logo" height="45" />
        </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-right">
            <NavLink exact to="/" className={styles.NavText} activeClassName={styles.Active}>
              <i class="fas fa-home"></i>Home
            </NavLink>
            <NavLink to="/signup" className={styles.NavText} activeClassName={styles.Active}>Sign-up</NavLink>
            <NavLink to="/signin" className={styles.NavText} activeClassName={styles.Active}>Sign-in</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
