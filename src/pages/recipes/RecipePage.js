import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import CommentCreateForm from "../comments/CommentCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

import appStyles from "../../App.module.css";
import styles from "../../styles/RecipePage.module.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import Recipe from "./Recipe";
import Comment from "../comments/Comment";
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";
import PopularRecipes from "./PopularRecipes";
import useAlert from "../../hooks/useAlert";

function RecipePage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({ results: [] });
  const [ingredients, setIngredients] = useState({
    results: [],
  });
  const { setAlert } = useAlert();

  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [comments, setComments] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: recipe }, { data: ingredients }, { data: comments }] =
          await Promise.all([
            axiosReq.get(`/recipes/${id}`),
            axiosReq.get(`/ingredients/?recipe=${id}`),
            axiosReq.get(`/comments/?recipe=${id}`),
          ]);
        setRecipe({ results: [recipe] });
        setIngredients(ingredients);
        setComments(comments);
      } catch (err) {
        // console.log(err);
        setAlert("Something went wrong, try again!", "danger");
      }
    };

    handleMount();
  }, [id, setAlert]);

  return (
    <Row className="h-100 d-flex justify-content-between">
      <Col className="py-2 p-0 p-lg-4" lg={7}>
        <Recipe {...recipe.results[0]} setRecipes={setRecipe} recipePage />
        <Container className={`${appStyles.Content} ${styles.RecipeContent}`}>
          <p className={appStyles.Titles}>Ingredients:</p>
          {ingredients.results.map((ingredient) => (
            <ul>
              <li key={ingredient.id}>
                {ingredient.amount_required}
                {ingredient.measure_unit} {ingredient.name}
              </li>
            </ul>
          ))}
        </Container>
        <Container className={`${appStyles.Content} ${styles.RecipeContent}`}>
          <p className={appStyles.Titles}>Instructions:</p>
          {recipe.results.map((recipe) => (
            <p key={recipe.id}>{recipe.instructions}</p>
          ))}
        </Container>
        <Container className={appStyles.Content}>
          <p className={appStyles.Titles}>Comments:</p>
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
          {comments.results.length ? (
            <InfiniteScroll
              children={comments.results.map((comment) => (
                <Comment
                  key={comment.id}
                  {...comment}
                  setRecipe={setRecipe}
                  setComments={setComments}
                />
              ))}
              dataLength={comments.results.length}
              loader={<Asset spinner />}
              hasMore={!!comments.next}
              next={() => fetchMoreData(comments, setComments)}
            />
          ) : currentUser ? (
            <span>No comments yet, be the first to comment!</span>
          ) : (
            <span>No comments... yet</span>
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-4">
        <PopularRecipes />
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default RecipePage;
