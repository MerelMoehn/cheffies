import React, { useEffect, useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";

import Upload from "../../assets/uploadimage.png";

import styles from "../../styles/RecipeCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Asset from "../../components/Asset";
import { Image } from "react-bootstrap";
import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { useParams } from "react-router-dom/cjs/react-router-dom";

function RecipeEditForm() {
  const [errors, setErrors] = useState({});

  const [recipeData, setRecipeData] = useState({
    title: "",
    instructions: "",
    image: "",
    cooking_time: "",
    prep_time: "",
    category: "",
  });
  const { title, instructions, image, cooking_time, prep_time, category } =
    recipeData;
  const imageInput = useRef(null);
  const history = useHistory();
  const {id} = useParams();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/recipes/${id}/`);
        const { title, instructions, image, category, cooking_time, prep_time, is_owner } = data;

        is_owner ? setRecipeData({ title, instructions, image, category, cooking_time, prep_time }) : history.push("/");
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [history, id]);

  const handleChange = (event) => {
    setRecipeData({
      ...recipeData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setRecipeData({
        ...recipeData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("instructions", instructions);
    formData.append("image", imageInput.current.files[0]);
    formData.append("cooking_time", cooking_time);
    formData.append("prep_time", prep_time);
    formData.append("category", category);

    try {
      const { data } = await axiosReq.post("/recipes/", formData);
      history.push(`/recipes/${data.id}/ingredients`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>Category</Form.Label>
        <Form.Control as="select" name="category" onChange={handleChange}>
          <option value="starter">Starter</option>
          <option value="main">Main</option>
          <option value="snack">Snack</option>
          <option value="dessert">Dessert</option>
        </Form.Control>
      </Form.Group>
      {errors?.category?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>Instructions</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="instructions"
          value={instructions}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.instructions?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>Preparation time:</Form.Label>
        <Form.Control
          type="integer"
          name="prep_time"
          value={prep_time}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.prep_time?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>Cooking time:</Form.Label>
        <Form.Control
          type="integer"
          name="cooking_time"
          value={cooking_time}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.cooking_time?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Button
        className={`${btnStyles.Button}`}
        onClick={() => history.goBack()}
      >
        Cancel
      </Button>
      <Button className={`${btnStyles.Button}`} type="submit">
        Save
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              {image ? (
                <>
                  <figure>
                    <Image className={appStyles.Image} src={image} />
                  </figure>
                  <div>
                    <Form.Label
                      className={`${btnStyles.Button} btn`}
                      htmlFor="image-upload"
                    >
                      Change Image
                    </Form.Label>
                  </div>
                </>
              ) : (
                <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="image-upload"
                >
                  <Asset src={Upload} message="Click to upload an image" />
                </Form.Label>
              )}

              <Form.File
                className="d-none"
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
              />
            </Form.Group>
            {errors?.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default RecipeEditForm;
