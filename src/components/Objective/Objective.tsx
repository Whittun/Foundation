import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { ObjectiveType, useObjectiveStore } from "@/stores/objectives-store";

interface Props {
  objective: ObjectiveType;
}

export default function Objective({ objective }: Props) {
  const [isCompleted, setCompleted] = useState(false);
  const [editing, setIsEditing] = useState(false);
  const [objectiveText, setObjectiveText] = useState(objective.text);

  const { editDayObjective, editTextObjective, removeObjective } =
    useObjectiveStore();

  const checkboxHandler = (checkboxId: number) => {
    editDayObjective(objective.id, checkboxId);

    const status = objective.objectiveValues.every(
      (checkbox) => checkbox.active
    );

    setCompleted(status);
  };

  const saveAndEditHandler = () => {
    if (editing) {
      editTextObjective(objective.id, objectiveText);
    }

    setIsEditing(!editing);
  };

  useEffect(() => {
    const status = objective.objectiveValues.every(
      (checkbox) => checkbox.active
    );

    setCompleted(status);
  }, [objective.objectiveValues]);

  return (
    <li className={clsx("relative p-5 pt-7 list-none rounded-3xl shadow-md")}>
      <button
        aria-label={"edit button"}
        onClick={saveAndEditHandler}
        className={`right-16 absolute top-2 block w-8 h-8 p-0 border-2 border-neutral-500 rounded-md bg-transparent cursor-pointer`}
      >
        {!editing ? <EditIcon /> : <SaveIcon />}
      </button>
      <button
        aria-label="delete button"
        onClick={() => removeObjective(objective.id)}
        className={`right-6 absolute top-2 block w-8 h-8 p-0 border-2 border-neutral-500 rounded-md bg-transparent cursor-pointer}`}
      >
        <DeleteForeverIcon />
      </button>
      {!editing ? (
        <p className={clsx(isCompleted && "opacity-30", "mt-5")}>
          {objectiveText}
        </p>
      ) : (
        <textarea
          className={
            "block w-full h-28 mt-5 resize-none text-base leading-5 font-normal border-none"
          }
          value={objectiveText}
          aria-label={"edit area"}
          onChange={(e) => setObjectiveText(e.target.value)}
        ></textarea>
      )}
      <ul
        className={clsx(
          `flex justify-center p-0 mt-14 gap-1 list-none`,
          isCompleted && "opacity-30 "
        )}
      >
        {objective.objectiveValues.map((item, index) => (
          <li key={item.id} className={"relative"}>
            <input
              aria-label={`${index + 1} day`}
              id={`${index + 1}day`}
              checked={item.active}
              className={clsx(
                "w-7 h-7 flex sm:w-10 sm:h-10 m-0 cursor-pointer",
                isCompleted && "pointer-events-none"
              )}
              type="checkbox"
              onChange={() => checkboxHandler(item.id)}
            />
            <label
              htmlFor={`${index + 1}day`}
              className={clsx(
                "absolute left-0 right-0 top-0 bottom-0 flex justify-center items-center pointer-events-none",
                isCompleted && "opacity-30",
                "text-[9px] sm:text-xs text-neutral-400"
              )}
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
          className={"text-green-700 text-xl font-semibold text-center"}
        >
          Completed!
        </p>
      )}
    </li>
  );
}
