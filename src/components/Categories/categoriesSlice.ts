import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

const initialState = [
  {
    id: 0,
    name: "Sleep",
  },
  {
    id: 1,
    name: "Study",
  },
  {
    id: 2,
    name: "Sport",
  },
];

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addCategory: (state, action) => {
      state.push(action.payload);
    },
  },
});

export default categoriesSlice.reducer;

export const selectCategories = (state: RootState) => state.categories;

export const { addCategory } = categoriesSlice.actions;
