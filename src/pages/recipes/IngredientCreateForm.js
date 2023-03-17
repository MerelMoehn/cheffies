import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";

import styles from "../../styles/IngredientsCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useHistory, useParams } from "react-router";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useRedirect } from "../../hooks/useRedirect";

function IngredientCreateForm() {
  useRedirect("loggedOut");
  const [errors, setErrors] = useState({});
  const [alertMessage, setAlertMessage] = useState("");
  const [show, setShow] = useState(false);
  const { id } = useParams();

  const currentUser = useCurrentUser();

  const [recipeSubmitted, setRecipeSubmitted] = useState("");
  const [ingredientSubmitted, setIngredientSubmitted] = useState({
    results: [],
  });

  const [ingredientData, setIngredientData] = useState({
    recipe: id,
    name: "",
    amount_required: "",
    measure_unit: "",
  });
  const { recipe, name, amount_required, measure_unit } = ingredientData;
  const history = useHistory();

  const handleDisplayIngredients = async () => {
    try {
      const { data } = await axiosReq.get(`/ingredients/?recipe=${id}`);
      setIngredientSubmitted(data);
    } catch (err) {
      // console.log(err);
    }
  };

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: recipe }] = await Promise.all([
          axiosReq.get(`/recipes/${id}`),
        ]);
        setRecipeSubmitted(recipe);
        handleDisplayIngredients();
      } catch (err) {
        // console.log(err);
      }
    };

    handleMount();

    // the comment below was recommended by a tutor
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleChange = (event) => {
    setIngredientData({
      ...ingredientData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("recipe", recipe);
    formData.append("name", name);
    formData.append("amount_required", amount_required);
    formData.append("measure_unit", measure_unit);
    formData.append("owner", currentUser?.profile_id);

    try {
      await axiosReq.post("/ingredients/", formData);
      setAlertMessage("");
      handleDisplayIngredients();
      setIngredientData({
        recipe: id,
        name: "",
        amount_required: "",
        measure_unit: "g",
      });
    } catch (err) {
      // console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const handleDelete = async (ingredientId) => {
    try {
      await axiosRes.delete(`/ingredients/${ingredientId}/`);
      handleDisplayIngredients();
    } catch (err) {
      // console.log(err);
    }
  };

  const handleDone = () => {
    if (ingredientSubmitted.results.length === 0) {
      console.log(ingredientSubmitted);
      setAlertMessage("Every recipe needs ingredients!");
      setShow(true);
    } else {
      history.push(`/recipes/${id}`);
    }
  };

  const textFields = (
    <div className="text-center">
      <Row>
        <Col>
          <Form.Group>
            <Form.Label>Ingredient:</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
            />
          </Form.Group>
          {errors?.name?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Amount:</Form.Label>
            <Form.Control
              type="integer"
              name="amount_required"
              value={amount_required}
              onChange={handleChange}
            />
          </Form.Group>
          {errors?.amount_required?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Unit:</Form.Label>
            <Form.Control
              as="select"
              name="measure_unit"
              defaultValue="g"
              onChange={handleChange}
            >
              <option value="cup">cup(s)</option>
              <option value="g">gram</option>
              <option value="tablespoon">tablespoon(s)</option>
              <option value="item">item</option>
              <option value="ml">ml</option>
              <option value="l">L</option>
              <option value="kg">kg</option>
              <option value="ounce">ounce</option>
            </Form.Control>
          </Form.Group>
          {errors?.measure_unit?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
        </Col>
      </Row>

      <Button className={btnStyles.Button} onClick={() => history.goBack()}>
        Cancel
      </Button>
      <Button className={btnStyles.Button} type="submit">
        Add
      </Button>
      <Button className={btnStyles.Button} onClick={() => handleDone()}>
        Done
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      {alertMessage && show && (
        <Alert variant="warning" onClose={() => setShow(false)} dismissible>
          {alertMessage}
        </Alert>
      )}
      <Row className="justify-content-between">
        <Col className="py-2 p-0 p-md-4" lg={6}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Card className={styles.Recipe}>
              <Card.Header>
                <p className={appStyles.Titles}>{recipeSubmitted.title}</p>
                <Badge className={styles.Category} pill variant="secondary">
                  {recipeSubmitted.category}
                </Badge>
              </Card.Header>
              <Card.Img
                src={recipeSubmitted.image}
                alt={recipeSubmitted.title}
              />
              <Card.Body>
                <Card.Text>
                  <div>
                    <strong>Cooking time:</strong>{" "}
                    {recipeSubmitted.cooking_time}min
                  </div>
                  <div>
                    <strong>Preparation time:</strong>{" "}
                    {recipeSubmitted.prep_time}min
                  </div>
                </Card.Text>
                <Card.Text>
                  <strong>Instructions:</strong>
                  {recipeSubmitted.instructions}
                </Card.Text>
              </Card.Body>
            </Card>
          </Container>
        </Col>
        <Col className="py-2 p-0 p-md-4" lg={4}>
          <Container className={appStyles.Content}>{textFields}</Container>
          <Container
            className={`${appStyles.Content}  ${styles.IngredientContent}`}
          >
            <p className={appStyles.Titles}>Ingredients added:</p>
            <ul>
              {ingredientSubmitted.results.map((ingredient) => (
                <li>
                  <p key={ingredient.id}>
                    {`${ingredient.amount_required}
                ${ingredient.measure_unit}
                 of 
                ${ingredient.name}
                `}
                    <i
                      className={`fas fa-trash-alt ${styles.IngredientIcon}`}
                      onClick={() => handleDelete(ingredient.id)}
                      aria-label="delete"
                    />
                  </p>
                </li>
              ))}
            </ul>
          </Container>
        </Col>
      </Row>
    </Form>
  );
}

export default IngredientCreateForm;
