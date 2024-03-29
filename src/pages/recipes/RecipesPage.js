import React, { useEffect, useState } from "react";
import Recipe from "./Recipe";
import Asset from "../../components/Asset";
import NoResults from "../../assets/no-results.png";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import styles from "../../styles/RecipesPage.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";
import PopularRecipes from "./PopularRecipes";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import useAlert from "../../hooks/useAlert";


function RecipesPage({ message, filter = "" }) {
  const currentUser = useCurrentUser();
  const { setAlert } = useAlert();

  const [recipes, setRecipes] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const { data } = await axiosReq.get(
          `/recipes/?${filter}search=${query}`
        );
        setRecipes(data);
        setHasLoaded(true);
      } catch (err) {
        // console.log(err);
        setAlert("Something went wrong, try again!", "danger");
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchRecipes();
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname, currentUser, setAlert]);

  return (
    <Row className="h-100 d-flex justify-content-between">
      <Col className="py-2 p-0 p-lg-4" lg={6}>
        <PopularRecipes />
        <i />
        <Form
          className={styles.SearchBar}
          onSubmit={(event) => event.preventDefault()}
        >
          <Form.Control
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="text"
            className="mr-sm-2"
            placeholder="Search recipes"
          />
        </Form>
        {hasLoaded ? (
          <>
            {recipes.results.length ? (
              <InfiniteScroll
                children={recipes.results.map((recipe) => (
                  <Recipe key={recipe.id} {...recipe} setRecipes={setRecipes} />
                ))}
                dataLength={recipes.results.length}
                loader={<Asset spinner />}
                hasMore={!!recipes.next}
                next={() => fetchMoreData(recipes, setRecipes)}
              />
            ) : (
              <Container className={appStyles.Content}>
                <Asset src={NoResults} message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-4">
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default RecipesPage;
