import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import { Button } from "./Button";

test("button is rendered with the correct content", async () => {
  const { rerender } = render(<Button text="i am button" />);

  const button = screen.getByRole("button", { name: "i am button" });

  expect(button).toBeInTheDocument();

  rerender(<Button text="I'm a button, too" />);

  const secondButton = screen.getByRole("button", {
    name: "I'm a button, too",
  });

  expect(secondButton).toBeInTheDocument();
});
