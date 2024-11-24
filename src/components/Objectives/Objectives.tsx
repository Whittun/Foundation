import { useState } from "react";
import { Objective } from "../Objective/Objective";

import styles from "./Objectives.module.css";
import { Button } from "../Button/Button";

export type ObjectiveElem = {
  id: number;
  text: string;
};

export const Objectives = () => {
  const [objectives, setObjectives] = useState<ObjectiveElem[]>([
    {
      id: 0,
      text: `get up at 7:00 a.m.`,
    },
    {
      id: 1,
      text: `get up at 6:30 a.m.`,
    },
  ]);

  const [inputValue, setInputValue] = useState("");

  const addObjective = () => {
    const newObjective = {
      id: objectives.length + 1,
      text: inputValue,
    };

    setObjectives([...objectives, newObjective]);

    setInputValue("");
  };

  const deleteObjective = (id: number) => {
    const newObjectives = objectives.filter((objective) => {
      if (id !== objective.id) {
        return objective;
      }
    });

    setObjectives(newObjectives);
  };

  return (
    <div className={styles["objectives"]}>
      <form className={styles["objectives-form"]}>
        <textarea
          className={styles["objective-textarea"]}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        ></textarea>
        <Button
          text="add objective"
          disabled={!inputValue}
          onClick={addObjective}
        />
      </form>

      <ul className={styles["objectives-list"]}>
        {!!objectives.length &&
          objectives.map((objective) => (
            <Objective
              deleteObjective={deleteObjective}
              index={objective.id}
              key={objective.id}
              objective={objective}
            />
          ))}
      </ul>
    </div>
  );
};
