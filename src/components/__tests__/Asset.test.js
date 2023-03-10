import { render, screen, fireEvent, within } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { CurrentUserProvider } from "../../contexts/CurrentUserContext";
import PopularRecipes from "../../pages/recipes/PopularRecipes";
import Recipe from "../../pages/recipes/Recipe";
import Asset from "../Asset";

test("renders asset", async () => {
    render(
      <Router>
        <CurrentUserProvider>
        <Asset />
        </CurrentUserProvider>
      </Router>
    );
  
    const asset = screen.getByTestId("asset")

    expect(asset).toBeInTheDocument();
  });

  test("renders spinner when loading", async () => {
    render(
      <Router>
        <CurrentUserProvider>
        <Asset />
        <PopularRecipes />
        </CurrentUserProvider>
      </Router>
    );
  
    const spinner = await screen.getByTestId("spinner");
    expect(spinner).toBeInTheDocument();
  });