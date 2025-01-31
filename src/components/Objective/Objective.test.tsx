import { render, screen } from "@testing-library/react";
import { Objective } from "./Objective";
import * as hooks from "../../hooks";
import * as actions from "../Objectives/ObjectivesSlice";
import userEvent from "@testing-library/user-event";

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

const mockedDispatch = jest.fn();

jest.spyOn(hooks, "useAppDispatch").mockImplementation(() => mockedDispatch);
const mockedSelector = jest
  .spyOn(hooks, "useAppSelector")
  .mockImplementation(() => {
    return objective;
  });

const deleteObjective = jest.fn();

describe("Objective", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should work editing and save", async () => {
    const mockedEditObjective = jest.spyOn(actions, "editObjective");

    const user = userEvent.setup();

    render(
      <Objective deleteObjective={deleteObjective} index={objective.id} />
    );

    const editButton = screen.getByRole("button", { name: "edit button" });

    await user.click(editButton);

    const textarea = screen.getByRole("textbox", { name: "edit area" });

    const inputText = " hello world!";

    await user.type(textarea, inputText);

    await user.click(editButton);

    const savedText = screen.getByRole("paragraph");

    expect(savedText.textContent).toBe(objective.text + inputText);
    expect(mockedDispatch).toHaveBeenCalledTimes(1);
    expect(mockedEditObjective).toHaveBeenCalledTimes(1);
  });

  test("should be removed", async () => {
    const user = userEvent.setup();

    render(
      <Objective deleteObjective={deleteObjective} index={objective.id} />
    );

    const deleteButton = screen.getByRole("button", { name: "delete button" });

    await user.click(deleteButton);

    expect(deleteObjective).toHaveBeenCalledTimes(1);
    expect(deleteObjective).toHaveBeenCalledWith(objective.id);
  });

  test("should change the checkboxes", async () => {
    const mockedAddObjectiveValue = jest.spyOn(actions, "addObjectiveValue");

    const user = userEvent.setup();

    render(
      <Objective deleteObjective={deleteObjective} index={objective.id} />
    );

    const dayInput = screen.getByRole("checkbox", { name: "1 day" });

    await user.click(dayInput);

    expect(mockedDispatch).toHaveBeenCalledTimes(1);
    expect(mockedAddObjectiveValue).toHaveBeenCalledTimes(1);
    expect(mockedAddObjectiveValue).toHaveBeenCalledWith({
      objectiveId: objective.id,
      checkboxId: objective.objectiveValues[0].id,
    });
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

    mockedSelector.mockImplementation(() => completedObjective);

    render(
      <Objective deleteObjective={deleteObjective} index={objective.id} />
    );

    const completedText = screen.getByRole("paragraph", {
      name: "completed text",
    });

    expect(completedText).toBeInTheDocument();
  });
});
