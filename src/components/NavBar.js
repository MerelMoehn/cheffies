import styles from "../styles/NavBar.module.css";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";

const NavBar = () => {
  const currentUser = useCurrentUser();

  const setCurrentUser = useSetCurrentUser();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  const loggedInIcons = (
    <>
      <NavLink
        to="/recipes/create"
        className={styles.NavText}
        activeClassName={styles.Active}
      >
        <i className={`far fa-plus-square ${styles.NavIcon}`}></i>
      </NavLink>
      <NavDropdown
        title={
          <span>
            <i data-testid="nav-dropdown" className={`fa-solid fa-bars ${styles.NavIcon}`}></i>
          </span>
        }
        id="basic-nav-dropdown"
      >
        <NavDropdown.Item>
          <NavLink
            className={styles.NavLink}
            activeClassName={styles.Active}
            to="/"
          >
            <i className="fa-solid fa-house"></i>Home
          </NavLink>
        </NavDropdown.Item>
        <NavDropdown.Item>
          <NavLink
            className={styles.NavLink}
            activeClassName={styles.Active}
            to="/feed"
          >
            <i className="fas fa-stream"></i>Feed
          </NavLink>
        </NavDropdown.Item>
        <NavDropdown.Item>
          <NavLink
            className={styles.NavLink}
            activeClassName={styles.Active}
            to="/liked"
          >
            <i className="fas fa-heart"></i>Liked
          </NavLink>
        </NavDropdown.Item>
        <NavDropdown.Item>
          <NavLink className={styles.NavLink} to="/" onClick={handleSignOut}>
            <i className="fas fa-sign-out-alt"></i>Sign out
          </NavLink>
        </NavDropdown.Item>
      </NavDropdown>
      <NavLink
        className={styles.NavLink}
        to={`/profiles/${currentUser?.profile_id}`}
      >
        <Avatar src={currentUser?.profile_image} height={40} />
      </NavLink>
    </>
  );
  const loggedOutIcons = (
    <>
      <NavLink
        exact
        to="/"
        className={styles.NavText}
        activeClassName={styles.Active}
      >
        Home
      </NavLink>
      <NavLink
        to="/signup"
        className={styles.NavText}
        activeClassName={styles.Active}
      >
        Sign-up
      </NavLink>
      <NavLink
        to="/signin"
        className={styles.NavText}
        activeClassName={styles.Active}
      >
        Sign-in
      </NavLink>
    </>
  );

  return (
    <Navbar className={styles.NavBar} fixed="top">
      <Container fluid>
        <NavLink to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="45" />
          </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-right" style={{alignItems: 'center'}}>
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
