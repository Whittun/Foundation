import { useEffect, useState } from "react";
import styles from "./Objective.module.css";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  addObjectiveValue,
  editObjective,
  selectObjective,
} from "../Objectives/ObjectivesSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";

type ObjectiveProps = {
  index: number;
  deleteObjective: (index: number) => void;
};

export const Objective: React.FC<ObjectiveProps> = ({
  index,
  deleteObjective,
}) => {
  const [isCompleted, setCompleted] = useState(false);
  const [editing, setIsEditing] = useState(false);

  const dispatch = useAppDispatch();

  const objectiveRedux = useAppSelector((state) =>
    selectObjective(state, index)
  );

  if (!objectiveRedux) throw new Error("objective is not defined");

  const [objectiveText, setObjectiveText] = useState(objectiveRedux.text);

  useEffect(() => {
    const status = objectiveRedux.objectiveValues.every(
      (checkbox) => checkbox.active
    );

    setCompleted(status);
  }, [setCompleted, objectiveRedux.objectiveValues]);

  const checkboxHandler = (id: number) => {
    const newCheckBoxes = objectiveRedux.objectiveValues.map((checkbox) =>
      id === checkbox.id ? { ...checkbox, active: !checkbox.active } : checkbox
    );

    const status = newCheckBoxes.every((checkbox) => checkbox.active);

    setCompleted(status);

    dispatch(
      addObjectiveValue({
        objectiveId: index,
        checkboxId: id,
      })
    );
  };

  const saveAndEditHandler = () => {
    if (editing) {
      dispatch(
        editObjective({
          objectiveId: index,
          text: objectiveText,
        })
      );
    }

    setIsEditing(!editing);
  };

  return (
    <>
      <li
        className={`${styles.objective} ${isCompleted ? styles.completed : ""}`}
      >
        <button
          aria-label={"edit button"}
          onClick={saveAndEditHandler}
          className={`${styles["objective-edit"]} ${styles["button"]}`}
        >
          {!editing ? <EditIcon /> : <SaveIcon />}
        </button>
        <button
          aria-label="delete button"
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
            aria-label={"edit area"}
            onChange={(e) => setObjectiveText(e.target.value)}
          ></textarea>
        )}
        <ul className={styles["objective-list"]}>
          {objectiveRedux.objectiveValues.map((item, index) => (
            <li key={item.id} className={styles["objective-item"]}>
              <input
                aria-label={`${index + 1} day`}
                id={`${index + 1}day`}
                checked={item.active}
                className={styles["objective-checkbox"]}
                type="checkbox"
                onChange={() => checkboxHandler(item.id)}
              />
              <label
                htmlFor={`${index + 1}day`}
                className={styles["objective-day"]}
              >
                {!item.active ? index + 1 + " day" : ""}
              </label>
            </li>
          ))}
        </ul>
        {isCompleted && (
          <p
            aria-label="completed text"
            id="completed"
            className={styles["completed-text"]}
          >
            Completed!
          </p>
        )}
      </li>
    </>
  );
};
