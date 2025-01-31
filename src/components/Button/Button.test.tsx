import { render, screen } from "@testing-library/react";
import { Button } from "./Button";

test("button is rendered with the correct content", async () => {
  render(<Button text="i am button" />);

  const button = screen.getByRole("button", { name: "i am button" });

  expect(button).toBeInTheDocument();
});
