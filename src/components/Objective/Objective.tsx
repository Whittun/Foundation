import { useEffect, useState } from "react";
import styles from "./Objective.module.css";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { ObjectiveElem } from "../Objectives/Objectives";

type ObjectiveProps = {
  objective: ObjectiveElem;
  index: number;
  deleteObjective: (index: number) => void;
};

export const Objective: React.FC<ObjectiveProps> = ({
  objective,
  index,
  deleteObjective,
}) => {
  const [checkboxes, setCheckboxes] = useState([
    {
      id: 1,
      active: false,
    },
    { id: 2, active: false },
    { id: 3, active: false },
    { id: 4, active: false },
    { id: 5, active: false },
    { id: 6, active: false },
  ]);

  const [isCompleted, setCompleted] = useState(false);
  const [editing, setIsEditing] = useState(false);
  const [objectiveText, setObjectiveText] = useState(objective.text);

  useEffect(() => {
    setObjectiveText(objective.text);
  }, [objective.text]);

  const checkboxHandler = (id: number) => {
    const newCheckBoxes = checkboxes.map((checkbox) =>
      id === checkbox.id ? { ...checkbox, active: !checkbox.active } : checkbox
    );

    const status = newCheckBoxes.every((checkbox) => checkbox.active);

    setCheckboxes(newCheckBoxes);

    setCompleted(status);
  };

  return (
    <>
      <li
        className={`${styles.objective} ${isCompleted ? styles.completed : ""}`}
      >
        <button
          onClick={() => setIsEditing(!editing)}
          className={`${styles["objective-edit"]} ${styles["button"]}`}
        >
          {!editing ? <EditIcon /> : <SaveIcon />}
        </button>
        <button
          onClick={() => deleteObjective(index)}
          className={`${styles["objective-delete"]} ${styles["button"]}`}
        >
          <DeleteForeverIcon />
        </button>
        {!editing ? (
          <p className={styles["objective-text"]}>{objectiveText}</p>
        ) : (
          <textarea
            className={styles["editing-input"]}
            value={objectiveText}
            onChange={(e) => setObjectiveText(e.target.value)}
          ></textarea>
        )}
        <ul className={styles["objective-list"]}>
          {checkboxes.map((item, index) => (
            <li key={item.id} className={styles["objective-item"]}>
              <input
                checked={item.active}
                className={styles["objective-checkbox"]}
                type="checkbox"
                onChange={() => checkboxHandler(item.id)}
              />
              <span className={styles["objective-day"]}>
                {!item.active ? index + 1 + " day" : ""}
              </span>
            </li>
          ))}
        </ul>
        {isCompleted && (
          <p id="completed" className={styles["completed-text"]}>
            Completed!
          </p>
        )}
      </li>
    </>
  );
};
