import { create } from "zustand";

type Category = {
  id: number;
  name: string;
};

type Store = {
  categories: Category[];
  addCategory: (categoryName: string) => void;
};

export const useCategoryStore = create<Store>()((set) => ({
  categories: [
    { id: 1, name: "Sport" },
    { id: 2, name: "Study" },
    { id: 3, name: "Sleep" },
  ],
  addCategory: (categoryName) =>
    set((state) => ({
      categories: [...state.categories, { id: Date.now(), name: categoryName }],
    })),
}));
