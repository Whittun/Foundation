"use client";

import { Button } from "@/components/Button/Button";
import { useState } from "react";

export interface ObjectiveType {
  id: number;
  text: string;
  categoryName: string;
  objectiveValues: {
    id: number;
    active: boolean;
  }[];
}

export default function Objectives() {
  const [areaValue, setAreaValue] = useState("");
  const [objectives, setObjectives] = useState([
    {
      id: Date.now(),
      text: "test objective",
      categoryName: "test",
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
  ]);

  const buttonHandler = () => {
    if (areaValue === "") return;

    setObjectives([
      ...objectives,
      {
        id: Date.now(),
        text: areaValue,
        categoryName: "test",
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
    ]);

    setAreaValue("");
  };

  return (
    <section className={"ml-12 sm:ml-0 grow"}>
      <form className={"flex flex-col gap-5"}>
        <textarea
          className={
            "h-36 p-5 resize-none rounded-2xl border-2 border-neutral-700 border-solid"
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

      <ul className={"flex flex-col gap-5 p-0 list-none"}>
        {/* {!!objectives.length &&
          objectives.map((objective) => (
            <Objective
              deleteObjective={() => dispatch(deleteObjective(objective.id))}
              index={objective.id}
              key={objective.id}
            />
          ))} */}
      </ul>
    </section>
  );
}
