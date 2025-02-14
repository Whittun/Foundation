import { create } from "zustand";

export interface ObjectiveType {
  id: number;
  text: string;
  categoryName: string;
  objectiveValues: {
    id: number;
    active: boolean;
  }[];
}

type Store = {
  objectives: ObjectiveType[];
  addNewObjective: (objectives: ObjectiveType) => void;
  removeObjective: (id: number) => void;
  editTextObjective: (id: number, newText: string) => void;
  editDayObjective: (objectiveId: number, dayId: number) => void;
};

export const useObjectiveStore = create<Store>()((set) => ({
  objectives: [
    {
      id: 1,
      text: "Push-ups 10 times",
      categoryName: "Sport",
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
      text: "Push-ups 20 times",
      categoryName: "Sport",
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
      text: "Push-ups 30 times",
      categoryName: "Sport",
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
      text: "Study 1 hour",
      categoryName: "Study",
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
      text: "Study 2 hour",
      categoryName: "Study",
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
      id: 6,
      text: "Study 3 hour",
      categoryName: "Study",
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
      id: 7,
      text: "Going to bed at 0:00.",
      categoryName: "Sleep",
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
      id: 8,
      text: "Going to bed at 23:00.",
      categoryName: "Sleep",
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
      id: 9,
      text: "Going to bed at 22:00.",
      categoryName: "Sleep",
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
  ],
  addNewObjective: (objective) =>
    set((state) => ({ objectives: [...state.objectives, objective] })),
  removeObjective: (id) =>
    set((state) => ({
      objectives: state.objectives.filter((objective) => id !== objective.id),
    })),
  editTextObjective: (id, newText) =>
    set((state) => {
      const currentObjective = state.objectives.find(
        (objective) => id === objective.id
      );

      if (!currentObjective) throw new Error("currentObjective is not defined");

      currentObjective.text = newText;

      return { objectives: state.objectives };
    }),
  editDayObjective: (objectiveId, dayId) =>
    set((state) => {
      const currentObjective = state.objectives.find(
        (objective) => objectiveId === objective.id
      );

      if (!currentObjective) throw new Error("currentObjective is not defined");

      const currentDay = currentObjective.objectiveValues.find(
        (day) => dayId === day.id
      );

      if (!currentDay) throw new Error("currentDay is not defined");

      currentDay.active = !currentDay.active;

      return { objectives: state.objectives };
    }),
}));
