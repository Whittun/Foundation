import "@testing-library/jest-dom";

import { act, render, screen } from "@testing-library/react";
import Objectives from "./page";
import userEvent from "@testing-library/user-event";
import { usePathname, notFound } from "next/navigation";
import { useCategoryStore } from "../../stores/categories-store";

const mockedNotFound = jest.fn();

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
  notFound: jest.fn(),
}));

const mockedUseCategoryStore = jest.mocked(useCategoryStore);

const mockedUsePathname = jest.mocked(usePathname);

jest.mock("../../stores/categories-store", () => ({
  useCategoryStore: jest.fn(),
}));

describe("Objectives", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("objectives are properly created", async () => {
    console.error = jest.fn();
    mockedUsePathname.mockImplementation(() => "/test1");
    mockedUseCategoryStore.mockImplementation(() => ({
      categories: [{ name: "test1" }, { name: "test2" }, { name: "test3" }],
    }));

    const user = userEvent.setup();

    render(<Objectives />);

    expect(notFound).not.toHaveBeenCalled();

    const submit = screen.getByRole("button", { name: /add objective/i });
    const textarea = screen.getByRole("textbox");

    await act(async () => {
      await user.type(textarea, "new objective 1");
      await user.click(submit);
    });

    await act(async () => {
      await user.type(textarea, "new objective 2");
      await user.click(submit);
    });

    expect(screen.getByText(/new objective 1/)).toBeInTheDocument();
    expect(screen.getByText(/new objective 2/)).toBeInTheDocument();
  });
});
