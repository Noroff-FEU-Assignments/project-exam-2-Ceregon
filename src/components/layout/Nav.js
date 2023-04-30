import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom";

import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

function Navigation() {
  const { auth, setAuth } = useContext(AuthContext);

  const history = useNavigate();

  function logout() {
    setAuth(null);
    history("/");
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <NavLink to="/" exact="true">
          <Navbar.Brand>React App</Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
            <NavLink to="/login" className="nav-link">
              Login
            </NavLink>

            {auth ? (
              <>
                |{" "}
                <NavLink to="/profile" className="nav-link">
                  Profile
                </NavLink>{" "}
                <NavLink to="/posts" className="nav-link">
                  Posts
                </NavLink>{" "}
                <NavLink to="/profiles" className="nav-link">
                  Profiles
                </NavLink>{" "}
                <NavLink to="/create-post" className="nav-link">
                  Create post
                </NavLink>{" "}
                | <button onClick={logout}>Log out</button>
              </>
            ) : (
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
