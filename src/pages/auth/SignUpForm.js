import React, {useState} from "react";
import { Link, useHistory } from "react-router-dom";

import styles from "../../styles/SignForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

import { Form, Button, Image, Col, Row, Container } from "react-bootstrap";
import axios from "axios";

const SignUpForm = () => {
    // This code is based on the Code Institute Walkthrough project: Moments
    const [signUpData, setSignUpData] = useState({
        username: "",
        password1: "",
        password2: "",
      });
    const { username, password1, password2 } = signUpData;
    const history = useHistory();

    const handleChange = (event) => {
        setSignUpData({
          ...signUpData,
          [event.target.name]: event.target.value,
        });
      };

      const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          await axios.post("/dj-rest-auth/registration/", signUpData);
          history.push("/signin");
        } catch (err) {
          setErrors(err.response?.data);
        }
      };

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

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label className="d-none">username</Form.Label>
              <Form.Control className={styles.Input} type="text" placeholder="Enter Username" name="username" value={username} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="password1">
              <Form.Label className="d-none">password1</Form.Label>
              <Form.Control className={styles.Input} type="password" placeholder="Enter Password" name="password1" value={password1} onChange={handleChange}/>
            </Form.Group>
            <Form.Group controlId="password2">
              <Form.Label className="d-none">password2</Form.Label>
              <Form.Control className={styles.Input} type="password" placeholder="Confirm Password" name="password2" value={password2} onChange={handleChange} />
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
