import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import Objective from "./Objective";
import userEvent from "@testing-library/user-event";
import { useObjectiveStore } from "../../stores/objectives-store";

jest.mock("../../stores/objectives-store", () => ({
  useObjectiveStore: jest.fn(),
}));

const mockedUseObjectiveStore = jest.mocked(useObjectiveStore);

const removeObjectiveMock = jest.fn();
const editDayObjectiveMock = jest.fn();
const editTextObjectiveMock = jest.fn();

mockedUseObjectiveStore.mockImplementation(() => ({
  editDayObjective: editDayObjectiveMock,
  editTextObjective: editTextObjectiveMock,
  removeObjective: removeObjectiveMock,
}));

const objective = {
  id: 0,
  categoryName: "Sleep",
  text: `get up at 7:00 a.m.`,
  objectiveValues: [
    {
      id: 1,
      active: false,
    },
    { id: 2, active: false },
    { id: 3, active: false },
    { id: 4, active: false },
    { id: 5, active: false },
    { id: 6, active: false },
  ],
};

describe("Objective", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should work editing and save", async () => {
    const user = userEvent.setup();

    render(<Objective objective={objective} />);

    const editButton = screen.getByRole("button", { name: "edit button" });

    await act(async () => {
      await user.click(editButton);
    });

    const textarea = screen.getByRole("textbox", { name: "edit area" });

    const inputText = " hello world!";

    await act(async () => {
      await user.type(textarea, inputText);
      await user.click(editButton);
    });

    const savedText = await screen.findByRole("paragraph");

    expect(savedText.textContent).toBe(objective.text + inputText);

    expect(editTextObjectiveMock).toHaveBeenCalledTimes(1);
    expect(editTextObjectiveMock).toHaveBeenCalledWith(
      objective.id,
      objective.text + inputText
    );
  });

  test("should be removed", async () => {
    const user = userEvent.setup();

    render(<Objective objective={objective} />);

    const deleteButton = screen.getByRole("button", { name: "delete button" });

    await user.click(deleteButton);

    expect(removeObjectiveMock).toHaveBeenCalledTimes(1);
    expect(removeObjectiveMock).toHaveBeenCalledWith(objective.id);
  });

  test("should change the checkboxes", async () => {
    const user = userEvent.setup();

    render(<Objective objective={objective} />);

    const dayInput = screen.getByRole("checkbox", { name: "1 day" });

    await user.click(dayInput);

    expect(editDayObjectiveMock).toHaveBeenCalledTimes(1);
    expect(editDayObjectiveMock).toHaveBeenCalledWith(
      objective.id,
      objective.objectiveValues[0].id
    );
  });

  test("should become executed", async () => {
    const completedObjective = {
      id: 0,
      categoryName: "Sleep",
      text: `get up at 7:00 a.m.`,
      objectiveValues: [
        {
          id: 1,
          active: true,
        },
        { id: 2, active: true },
        { id: 3, active: true },
        { id: 4, active: true },
        { id: 5, active: true },
        { id: 6, active: true },
      ],
    };

    render(<Objective objective={completedObjective} />);

    const completedText = screen.getByRole("paragraph", {
      name: "completed text",
    });

    expect(completedText).toBeInTheDocument();
  });
});
