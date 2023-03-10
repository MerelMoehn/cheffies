import { render, screen, fireEvent, within } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { CurrentUserProvider } from "../../contexts/CurrentUserContext";
import NavBar from "../NavBar";

test("renders NavBar including links", () => {
  render(
    <Router>
      <NavBar />
    </Router>
  );

  const signInLink = screen.getByRole("link", { name: "Sign-in" });
  const signUpLink = screen.getByRole("link", { name: "Sign-up" });
  const home = screen.getByRole("link", { name: "Home" });
  expect(signInLink).toBeInTheDocument();
  expect(signUpLink).toBeInTheDocument();
  expect(home).toBeInTheDocument();
});

test("renders signout within dropdown", async () => {
  render(
    <Router>
      <CurrentUserProvider>
      <NavBar />
      </CurrentUserProvider>
    </Router>
  );

  const dropDown = await screen.findByTestId("nav-dropdown");
  fireEvent.click(dropDown);

  const signOut = await screen.findByText("Sign out")
  expect(signOut).toBeInTheDocument();

});

test("renders signup after logout", async () => {
  render(
    <Router>
      <CurrentUserProvider>
      <NavBar />
      </CurrentUserProvider>
    </Router>
  );

  const dropDown = await screen.findByTestId("nav-dropdown");
  fireEvent.click(dropDown);

  const signOut = await screen.findByText("Sign out")
  fireEvent.click(signOut);

  const signUp = await screen.findByText("Sign-up")
  expect(signUp).toBeInTheDocument();
});