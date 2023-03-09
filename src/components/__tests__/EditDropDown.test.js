import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { CurrentUserProvider } from "../../contexts/CurrentUserContext";
import { EditDropDown } from "../EditDropDown";

test("renders EditDropDown at recipe", () => {
  render(
    <Router>
      <EditDropDown />
    </Router>
  );


});