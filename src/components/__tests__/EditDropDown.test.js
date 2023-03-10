import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { CurrentUserProvider } from "../../contexts/CurrentUserContext";
import { EditDropDown } from "../EditDropDown";

test("renders EditDropDown for comment, recipe and profile", async () => {
  render(
    <Router>
      <CurrentUserProvider>
      <EditDropDown />
      </CurrentUserProvider>
    </Router>
  );

  const dropDown = await screen.findByTestId("edit-recipe");
  expect(dropDown).toBeInTheDocument();

});

test("renders delete and edit within EditDropDown", async () => {
  render(
    <Router>
      <CurrentUserProvider>
      <EditDropDown />
      </CurrentUserProvider>
    </Router>
  );

  const dropDown = await screen.findByTestId("edit-recipe");
  fireEvent.click(dropDown);

  const deleteDrop = await screen.findByLabelText("delete")
  const editDrop = await screen.findByLabelText("edit")
  expect(deleteDrop).toBeInTheDocument();
  expect(editDrop).toBeInTheDocument();
});

