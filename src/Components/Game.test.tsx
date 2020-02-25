import React from "react";
import { render } from "@testing-library/react";
import Game from "./Game";

test("renders Game", () => {
  const { getByText } = render(<Game />);
  const button = getByText(/foo/i);
  expect(button).toBeInTheDocument();
});