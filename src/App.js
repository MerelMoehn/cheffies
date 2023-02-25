import NavBar from "./components/NavBar";
import styles from "./App.module.css";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import RecipeCreateForm from "./pages/recipes/RecipeCreateForm";
import RecipePage from "./pages/recipes/RecipePage";
import RecipesPage from "./pages/recipes/RecipesPage";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import IngredientCreateForm from "./pages/recipes/IngredientCreateForm";

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      <NavBar />
      <Container fluid className={styles.Main}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <RecipesPage message="No recipes found. Please adjust your search." />
            )}
          />
          <Route
            exact
            path="/feed"
            render={() => (
              <RecipesPage message="No recipes found. Please adjust your search or follow a chef."
              filter={`owner__followed__owner__profile=${profile_id}&`} />
            )}
          />
          <Route
            exact
            path="/liked"
            render={() => (
              <RecipesPage message="No recipes found. Please adjust your search or like a recipe!"
              filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`} />
            )}
          />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route
            exact
            path="/recipes/create"
            render={() => <RecipeCreateForm />}
          />
            <Route
            exact
            path="/recipes/:id/ingredients"
            render={() => <IngredientCreateForm />}
          />
          <Route exact path="/recipes/:id" render={() => <RecipePage />} />
          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
