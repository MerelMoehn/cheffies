import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import CommentCreateForm from "../comments/CommentCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

import appStyles from "../../App.module.css";
import styles from "../../styles/Recipe.module.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import Recipe from "./Recipe";

function RecipePage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({ results: [] });
  const [ingredients, setIngredients] = useState({
    results: [],
  });

  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [comments, setComments] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: recipe }, { data: ingredients }] = await Promise.all([
          axiosReq.get(`/recipes/${id}`),
          await axiosReq.get(`/ingredients/?recipe=${id}`),
        ]);
        setRecipe({ results: [recipe] });
        setIngredients(ingredients);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <Recipe {...recipe.results[0]} setRecipes={setRecipe} recipePage />
        <Container className={appStyles.Content}>
          <p className={styles.Titles}>Ingredients:</p>
          {ingredients.results.map((ingredient) => (
            <ul>
              <li key={ingredient.id}>
                {ingredient.amount_required}
                {ingredient.measure_unit} {ingredient.name}
              </li>
            </ul>
          ))}
        </Container>
        <Container className={appStyles.Content}>
          <p className={styles.Titles}>Instructions:</p>
          {recipe.results.map((recipe) => (
            <p key={recipe.id}>{recipe.instructions}</p>
          ))}
        </Container>
        <Container className={appStyles.Content}>
          <p className={styles.Titles}>Comments:</p>
          {currentUser ? (
            <CommentCreateForm
              profile_id={currentUser.profile_id}
              profileImage={profile_image}
              recipe={id}
              setRecipe={setRecipe}
              setComments={setComments}
            />
          ) : comments.results.length ? (
            "Comments"
          ) : null}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        Popular profiles for desktop
      </Col>
    </Row>
  );
}

export default RecipePage;
