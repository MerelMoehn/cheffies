import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import Link from "react-router-dom/Link";
import ListGroup from "react-bootstrap/ListGroup";
import appStyles from "../../App.module.css";
import styles from "../../styles/PopularRecipes.module.css";
import Asset from "../../components/Asset";
import useAlert from "../../hooks/useAlert";

const PopularRecipes = () => {
  const { id } = useParams();
  const [popularRecipes, setPopularRecipes] = useState({ results: [] });
  const { setAlert } = useAlert();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get("/recipes/?ordering=-likes_count");
        setPopularRecipes(data);
      } catch (err) {
        // console.log(err);
        setAlert("Something went wrong, try again!", "danger");
      }
    };
    handleMount();
  }, [id, setAlert]);

  return (
    <Container className={`${appStyles.Content} ${styles.PopRecipesBack}`}>
      {popularRecipes.results.length ? (
        <>
          <div className="d-flex flex-column">
            <p className={appStyles.Titles}>Top 5 Recipes:</p>
            <ListGroup>
              {popularRecipes.results.slice(0, 5).map((recipe) => (
                <ListGroup.Item key={recipe.id} className={styles.Recipe}>
                  <Link to={`/recipes/${recipe.id}`}>
                    <span>
                      <img
                        className={styles.RecipePicture}
                        src={recipe.image}
                        height="40"
                        width="50"
                        alt="recipe"
                      />
                    </span>
                    <strong>{recipe.title}</strong>
                  </Link>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </>
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
};

export default PopularRecipes;
