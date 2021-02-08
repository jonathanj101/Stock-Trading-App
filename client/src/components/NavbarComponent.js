import React, { useState } from "react";
import { Navbar, Nav, Modal, Button, Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const NavbarComponent = ({ modalClicked }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div style={{ fontSize: "1.5rem" }}>
      <Modal show={show} onHide={handleClose} centered size="lg">
        <div className="w-100 d-flex">
          <div>
            <Modal.Header closeButton>
              <Modal.Title>Log In</Modal.Title>
            </Modal.Header>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
            </Form>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </div>
          <hr style={styles.veticalLine}></hr>
          <div>
            <Modal.Header closeButton>
              <Modal.Title>Register</Modal.Title>
            </Modal.Header>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
            </Form>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </div>
        </div>
      </Modal>

      <Navbar className="d-flex justify-content-between" bg="dark" variant="dark">
        <Navbar.Brand>
          {/* <img
                        alt="twitter bird"
                        width="125"
                        height="100"
                        className="d-inline-block align-top"
                    /> */}
        </Navbar.Brand>
        <Nav variant="pills" className="">
          <NavLink
            onClick={handleShow}
            className="nav-link mr-3 "
            activeStyle={{ fontWeight: "bold", color: "blue", backgroundColor: "#007bff" }}
            to={{ pathname: "" }}
            exact
          >
            Log In / Register
          </NavLink>
          <NavLink to="/" exact className="nav-link mr-3 ">
            Home
          </NavLink>
          <NavLink to="/summary" exact className="nav-link mr-3">
            Market
          </NavLink>
          <NavLink to="/my-stocks" exact className="nav-link ">
            My Stocks
          </NavLink>
        </Nav>
      </Navbar>
    </div>
  );
};

var styles = {
  veticalLine: {
    borderTop: "1000px solid red",
    width: "10px",
    height: "10px",
    backgroundColor: "black",
  },
};

export default NavbarComponent;
