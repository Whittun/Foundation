import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useState } from "react";
import { ObjectiveType } from "@/app/objectives/page";

interface Props {
  objective: ObjectiveType;
}

export default function Objective({ objective }: Props) {
  const [isCompleted, setCompleted] = useState(false);
  const [editing, setIsEditing] = useState(false);
  const [objectiveText, setObjectiveText] = useState(objective.text);

  const checkboxHandler = (id: number) => {
    const newCheckBoxes = objective.objectiveValues.map((checkbox) =>
      id === checkbox.id ? { ...checkbox, active: !checkbox.active } : checkbox
    );

    const status = newCheckBoxes.every((checkbox) => checkbox.active);

    setCompleted(status);

    // dispatch(
    //   addObjectiveValue({
    //     objectiveId: index,
    //     checkboxId: id,
    //   })
    // );
  };

  return (
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
        // onClick={() => deleteObjective(index)}
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
        {objective.objectiveValues.map((item, index) => (
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
  );
}
