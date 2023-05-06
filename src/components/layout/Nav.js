import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

function Navigation() {
  const { auth, setAuth } = useContext(AuthContext);

  const history = useNavigate();

  function logout() {
    setAuth(null);
    history("/");
  }

  const user = JSON.parse(localStorage.getItem("auth"))?.name;

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <NavLink to="/" exact="true">
          <Navbar.Brand>NorSocial</Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {user ? (
            <>
              <Nav className="me-auto">
                {" "}
                <NavLink to={`profiles/${user}`} className="nav-link">
                  My Profile
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
              </Nav>
              <Nav className="ml-auto">
                <Button onClick={logout} variant="light">
                  Log out
                </Button>
              </Nav>
            </>
          ) : (
            <>
              <Nav className="me-auto">
                <NavLink to="/register" className="nav-link">
                  Register
                </NavLink>
                <NavLink to="/login" className="nav-link">
                  Login
                </NavLink>
              </Nav>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
