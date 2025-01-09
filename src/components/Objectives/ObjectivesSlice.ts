import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

type ObjectiveValue = {
  id: number;
  active: boolean;
};

export type ObjectiveElem = {
  id: number;
  text: string;
  categoryName: string;
  objectiveValues: ObjectiveValue[];
};

const initialState: ObjectiveElem[] = [
  {
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
  },
  {
    id: 1,
    categoryName: "Sleep",
    text: `get up at 6:30 a.m.`,
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
  },
  {
    id: 2,
    categoryName: "Sport",
    text: `push-up 10 times`,
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
  },
  {
    id: 3,
    categoryName: "Sport",
    text: `push-up 20 times`,
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
  },
  {
    id: 4,
    categoryName: "Study",
    text: `study for 2 hours`,
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
  },
  {
    id: 5,
    categoryName: "Study",
    text: `study for 3 hours`,
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
  },
];

const objectivesSlice = createSlice({
  name: "Objectives",
  initialState,
  reducers: {
    addObjective: (state, action) => {
      state.push(action.payload);
    },
    deleteObjective: (state, action) => {
      return state.filter((elem) => {
        return elem.id !== action.payload;
      });
    },
    addObjectiveValue: (state, action) => {
      const currentObjective = state.find(
        (objective) => objective.id === action.payload.objectiveId
      );

      if (!currentObjective) throw new Error("currentObjective is not defined");

      const newCheckBoxes = currentObjective.objectiveValues.map((checkbox) =>
        action.payload.checkboxId === checkbox.id
          ? { ...checkbox, active: !checkbox.active }
          : checkbox
      );

      currentObjective.objectiveValues = newCheckBoxes;
    },
    editObjective: (state, action) => {
      const currentObjective = state.find(
        (objective) => objective.id === action.payload.objectiveId
      );

      if (!currentObjective) throw new Error("currentObjective is not defined");

      currentObjective.text = action.payload.text;
    },
  },
});

export const selectObjectives = (state: RootState) => state.objectives;

export const selectObjective = (state: RootState, objectiveId: number) =>
  state.objectives.find((objective) => objective.id === objectiveId);

export const {
  addObjective,
  deleteObjective,
  addObjectiveValue,
  editObjective,
} = objectivesSlice.actions;

export default objectivesSlice.reducer;
