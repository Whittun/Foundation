import { render, screen } from "@testing-library/react";
import { Objectives } from "./Objectives";
import { ErrorBoundary } from "../ErrorBoundary/ErrorBoundary";

import { Provider } from "react-redux";
import { store } from "../../store/store";
import { useParams } from "react-router";
import userEvent from "@testing-library/user-event";

jest.mock("react-router", () => ({
  useParams: jest.fn(),
}));

const mockedUseParams = jest.mocked(useParams);

describe("Objectives", () => {
  test("should return the backup ui with an empty url", () => {
    console.error = jest.fn();

    mockedUseParams.mockReturnValue({ categoryName: "" });

    render(
      <Provider store={store}>
        <ErrorBoundary fallback={"page is not defined"}>
          <Objectives />
        </ErrorBoundary>
      </Provider>
    );

    const errorText = screen.getByText(/page is not defined/);

    expect(errorText).toBeInTheDocument();
  });

  test("objectives are properly created", async () => {
    mockedUseParams.mockReturnValue({ categoryName: "category" });

    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <ErrorBoundary fallback={"page is not defined"}>
          <Objectives />
        </ErrorBoundary>
      </Provider>
    );

    const submit = screen.getByRole("button", { name: /add objective/i });
    const textarea = screen.getByRole("textbox");

    await user.type(textarea, "new objective 1");
    await user.click(submit);

    await user.type(textarea, "new objective 2");
    await user.click(submit);

    expect(screen.getByText(/new objective 1/)).toBeInTheDocument();
    expect(screen.getByText(/new objective 2/)).toBeInTheDocument();
  });
});
