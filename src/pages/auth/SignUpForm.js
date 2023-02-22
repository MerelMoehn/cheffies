import React from "react";
import { Link } from "react-router-dom";

import styles from "../../styles/SignForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

import { Form, Button, Image, Col, Row, Container } from "react-bootstrap";

const SignUpForm = () => {
  return (
    <Row>
      <Col md={6} className={`my-auto d-none d-md-block ${styles.SignUpCol}`}>
        <Image
          className={`${appStyles.SignImage}`}
          src={
            "https://res.cloudinary.com/duz5vkvkt/image/upload/v1675883837/rachel-park-hrlvr2ZlUNk-unsplash_eseqep.jpg"
          }
        />
      </Col>
      <Col className="my-auto" md={6}>
        <Container className={`${appStyles.Content} p-4`}>
          <h1 className={styles.Header}>sign up</h1>

          <Form>
            <Form.Group controlId="username">
              <Form.Label className="d-none">username</Form.Label>
              <Form.Control className={styles.Input} type="text" placeholder="Enter Username" name="username" />
            </Form.Group>
            <Form.Group controlId="password1">
              <Form.Label className="d-none">password1</Form.Label>
              <Form.Control className={styles.Input} type="password1" placeholder="Enter Password" name="password1" />
            </Form.Group>
            <Form.Group controlId="password2">
              <Form.Label className="d-none">password2</Form.Label>
              <Form.Control className={styles.Input} type="password" placeholder="Confirm Password" name="password2" />
            </Form.Group>
            <Button className={`${btnStyles.Button} ${btnStyles.Stretch}`} type="submit">
              Sign me Up!
            </Button>
          </Form>
        </Container>
        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/signin">
            Already have an account? <span>Sign in</span>
          </Link>
        </Container>
      </Col>
    </Row>
  );
};

export default SignUpForm;
