import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

export type ObjectiveElem = {
  id: number;
  text: string;
  categoryName: string;
};

const initialState: ObjectiveElem[] = [
  {
    id: 0,
    categoryName: "Sleep",
    text: `get up at 7:00 a.m.`,
  },
  {
    id: 1,
    categoryName: "Sleep",
    text: `get up at 6:30 a.m.`,
  },
  {
    id: 2,
    categoryName: "Sport",
    text: `push-up 10 times`,
  },
  {
    id: 3,
    categoryName: "Sport",
    text: `push-up 20 times`,
  },
  {
    id: 2,
    categoryName: "Study",
    text: `study for 2 hours`,
  },
  {
    id: 3,
    categoryName: "Study",
    text: `study for 3 hours`,
  },
];

const objectivesSlice = createSlice({
  name: "Objectives",
  initialState,
  reducers: {
    addValue: (state, action) => {
      state.push(action.payload);
    },
    deleteValue: (state, action) => {
      return state.filter((elem) => {
        return elem.id !== action.payload;
      });
    },
  },
});

export const selectObjectives = (state: RootState, categoryName: string) =>
  state.objectives.filter(
    (objective) => objective.categoryName === categoryName
  );

export const { addValue, deleteValue } = objectivesSlice.actions;

export default objectivesSlice.reducer;
