import { configureStore } from "@reduxjs/toolkit";
import objectivesReducer from "../components/Objectives/ObjectivesSlice";
import categoriesReducer from "../components/Categories/CategoriesSlice";

export const store = configureStore({
  reducer: { objectives: objectivesReducer, categories: categoriesReducer },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
