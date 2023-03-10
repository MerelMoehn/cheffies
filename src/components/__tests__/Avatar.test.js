import { render, screen, fireEvent, within } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { CurrentUserProvider } from "../../contexts/CurrentUserContext";
import Avatar from "../Avatar";

test("renders Avatar", async () => {
    render(
      <Router>
        <CurrentUserProvider>
        <Avatar />
        </CurrentUserProvider>
      </Router>
    );
  
    const avatar = screen.getByAltText("avatar")

    expect(avatar).toBeInTheDocument();
  });