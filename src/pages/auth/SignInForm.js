import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import styles from "../../styles/SignForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import { useRedirect } from "../../hooks/useRedirect";
import { setTokenTimestamp } from "../../utils/utils";

function SignInForm() {
  const setCurrentUser = useSetCurrentUser();
  useRedirect("loggedIn");

  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = signInData;

  const [errors, setErrors] = useState({});

  const history = useHistory();
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.post("/dj-rest-auth/login/", signInData);
      setCurrentUser(data.user);
      setTokenTimestamp(data);
      history.goBack();
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  const handleChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Row>
      <Col md={6} className={`my-auto d-none d-md-block ${styles.SignCol}`}>
        <Image
          className={`${appStyles.SignImage}`}
          src={
            "https://res.cloudinary.com/duz5vkvkt/image/upload/v1675883837/rachel-park-hrlvr2ZlUNk-unsplash_eseqep.jpg"
          }
        />
      </Col>
      <Col className="my-auto mx-auto" md={4}>
        <Container className={`${appStyles.Content} p-4`}>
          <h1 className={styles.Header}>Sign In</h1>
          <p className="text-center">Welcome to Cheffies! A recipe sharing social platform</p>
          
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label className="d-none">username</Form.Label>
              <Form.Control
                className={styles.Input}
                type="text"
                placeholder="Enter Username"
                name="username"
                value={username}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.username?.map((message, idx) => (
              <Alert variant="danger" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group controlId="password">
              <Form.Label className="d-none">password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Enter Password"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password1?.map((message, idx) => (
              <Alert key={idx} variant="danger">
                {message}
              </Alert>
            ))}

            <Button
              className={`${btnStyles.Button} ${btnStyles.Stretch}`}
              type="submit"
            >
              Sign In!
            </Button>
            {errors.non_field_errors?.map((message, idx) => (
              <Alert key={idx} variant="danger" className="mt-2">
                {message}
              </Alert>
            ))}
          </Form>
        </Container>
        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/signup">
            Don't have an account yet? <span>Sign up!</span>
          </Link>
        </Container>
      </Col>
    </Row>
  );
}

export default SignInForm;
