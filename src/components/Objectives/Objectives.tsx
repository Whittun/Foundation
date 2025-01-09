import { useState } from "react";
import { Objective } from "../Objective/Objective";

import styles from "./Objectives.module.css";
import { Button } from "../Button/Button";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  addObjective,
  deleteObjective,
  selectObjectives,
} from "./ObjectivesSlice";
import { useParams } from "react-router";

export const Objectives = () => {
  const [inputValue, setInputValue] = useState("");

  const { categoryName } = useParams();

  if (!categoryName) {
    throw new Error("page is not defined");
  }

  const allObjectives = useAppSelector((state) => selectObjectives(state));

  const objectives = allObjectives.filter(
    (objective) => objective.categoryName === categoryName
  );

  const dispatch = useAppDispatch();

  const buttonHandler = () => {
    const newObjective = {
      id: Date.now(),
      text: inputValue,
      categoryName,
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
    };

    dispatch(addObjective(newObjective));

    setInputValue("");
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
          onClick={buttonHandler}
        />
      </form>

      <ul className={styles["objectives-list"]}>
        {!!objectives.length &&
          objectives.map((objective) => (
            <Objective
              deleteObjective={() => dispatch(deleteObjective(objective.id))}
              index={objective.id}
              key={objective.id}
            />
          ))}
      </ul>
    </div>
  );
};
