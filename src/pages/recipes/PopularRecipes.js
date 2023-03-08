import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import { Link } from "react-router-dom";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";

const PopularRecipes = () => {
  const { id } = useParams();
  const [popularRecipes, setPopularRecipes] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get("/recipes/?ordering=-likes_count");
        setPopularRecipes(data);
      } catch (err) {
        console.log(err);
      }
    };
    handleMount();
  }, [id]);

  return (
    <Container
    className={appStyles.Content}
    >
      {popularRecipes.results.length ? (
        <>
        <div className="my-3 d-flex flex-column">
            <span><i className="fa-regular fa-file-lines"></i>Top 5 Recipes:</span>
          {(
            popularRecipes.results.slice(0, 5).map((recipe) => (
              <Link to={`/recipes/${recipe.id}`}>
                <strong>{recipe.title}</strong>
              </Link>
            ))
          )}
          </div>
        </>
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
};

export default PopularRecipes;
