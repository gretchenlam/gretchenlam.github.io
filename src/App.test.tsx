import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the portfolio hero", () => {
  render(<App />);
  expect(
    screen.getByRole("heading", { level: 1, name: /i'm gretchen lam/i })
  ).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /see work/i })).toBeInTheDocument();
});
