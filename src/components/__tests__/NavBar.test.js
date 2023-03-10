import { render, screen, fireEvent, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
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

// test("renders Sign in and Sign up buttons again after log out", async () => {
//   render(
//     <Router>
//       <CurrentUserProvider>
//         <NavBar />
//       </CurrentUserProvider>
//     </Router>
//   );

//   const dropdown = screen.getByRole("button");

//   act(() => {
//     fireEvent.click(dropdown);
//   });

//   const logOut = within(dropdown).getByDisplayValue("Sign out")

//   expect(dropdown).toBeInTheDocument();

// });