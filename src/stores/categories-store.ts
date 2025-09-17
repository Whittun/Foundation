import { create } from "zustand";
import { persist } from "zustand/middleware";

type Category = {
  id: number;
  name: string;
};

type Store = {
  categories: Category[];
  addCategory: (categoryName: string) => void;
};

export const useCategoryStore = create<Store>()(
  persist(
    (set) => ({
      categories: [
        { id: 1, name: "Sport" },
        { id: 2, name: "Study" },
        { id: 3, name: "Sleep" },
      ],
      addCategory: (categoryName) =>
        set((state) => ({
          categories: [
            ...state.categories,
            { id: Date.now(), name: categoryName },
          ],
        })),
    }),
    {
      name: "categories",
    }
  )
);
