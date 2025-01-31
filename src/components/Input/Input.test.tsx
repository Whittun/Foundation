import { render, screen } from "@testing-library/react";
import { Input } from "./Input";
import userEvent from "@testing-library/user-event";

test("input works correctly", async () => {
  const mockCallBack = jest.fn();
  const initialValue = "test";

  const user = userEvent.setup();

  render(
    <Input
      ariaLabel="base input"
      setValue={mockCallBack}
      value={initialValue}
    />
  );

  const input = screen.getByRole("textbox", { name: /base input/i });

  await user.type(input, " World!");

  expect(input).toBeInTheDocument();
  expect(input).toHaveValue("test World!");
  expect(mockCallBack).toHaveBeenCalledTimes(7);
});
