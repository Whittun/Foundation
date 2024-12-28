import { useState } from "react";
import { Objective } from "../Objective/Objective";

import styles from "./Objectives.module.css";
import { Button } from "../Button/Button";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { addValue, deleteValue, selectObjectives } from "./ObjectivesSlice";
import { useParams } from "react-router";

export const Objectives = () => {
  const [inputValue, setInputValue] = useState("");

  const { categoryName } = useParams();

  if (!categoryName) {
    throw new Error("page is not defined");
  }

  const objectives = useAppSelector((state) =>
    selectObjectives(state, categoryName)
  );
  const dispatch = useAppDispatch();

  const addObjective = () => {
    const newObjective = {
      id: objectives.length + 1,
      text: inputValue,
      categoryName,
    };

    dispatch(addValue(newObjective));

    setInputValue("");
  };

  const deleteObjective = (id: number) => {
    dispatch(deleteValue(id));
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
