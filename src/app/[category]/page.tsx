"use client";

import { Button } from "@/components/Button/Button";
import Objective from "@/components/Objective/Objective";
import { useCategoryStore } from "@/stores/categories-store";
import { useObjectiveStore } from "@/stores/objectives-store";

import { usePathname, notFound } from "next/navigation";
import { useState } from "react";

export default function Objectives() {
  const { objectives, addNewObjective } = useObjectiveStore();

  const path = usePathname();
  const pathname = path.slice(1);

  const currentCategoryObjectives = objectives.filter(
    (objective) => objective.categoryName === pathname
  );

  const { categories } = useCategoryStore();

  if (!categories.map((category) => category.name).includes(pathname))
    notFound();

  const [areaValue, setAreaValue] = useState("");

  const buttonHandler = () => {
    if (areaValue === "") return;

    addNewObjective({
      id: Date.now(),
      text: areaValue,
      categoryName: pathname,
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
    });

    setAreaValue("");
  };

  return (
    <section className={"ml-10 sm:ml-0 p-5 flex-grow"}>
      <form className={"flex flex-col gap-5"}>
        <textarea
          className={
            "h-36 p-5 resize-none rounded-2xl border-2 border-gray-400 border-solid"
          }
          value={areaValue}
          onChange={(e) => setAreaValue(e.target.value)}
        ></textarea>
        <Button
          text="add objective"
          disabled={!areaValue}
          onClick={buttonHandler}
          className="bg-neutral-200"
        />
      </form>

      <ul className={"flex flex-col gap-5 p-0 list-none mt-5 pb-5"}>
        {!!currentCategoryObjectives.length &&
          currentCategoryObjectives.map((objective) => (
            <Objective key={objective.id} objective={objective} />
          ))}
      </ul>
    </section>
  );
}
