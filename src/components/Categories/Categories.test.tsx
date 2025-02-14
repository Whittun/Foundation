import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import Categories from "./Categories";
import userEvent from "@testing-library/user-event";

describe("Categories", () => {
  test("Categories are created correctly", async () => {
    const user = userEvent.setup();

    render(<Categories />);

    const input = screen.getByRole("textbox", { name: /enter name/i });
    const button = screen.getByRole("button", { name: /add category/i });

    await user.type(input, "new category");
    await user.click(button);

    expect(
      screen.getByRole("link", { name: "new category" })
    ).toBeInTheDocument();
  });
});
