import React from 'react';
import s from './HabitLevelForm.module.css';
import type { DraftInputsValues } from '../../Habits';

type HabitLevelFormProps = {
  habitLevelHandler: (inputsValues: DraftInputsValues) => void;
  cancelHandler: () => void;
  initialValues?: DraftInputsValues;
};

export const HabitLevelForm = ({
  habitLevelHandler,
  cancelHandler,
  initialValues,
}: HabitLevelFormProps) => {
  const [draftValues, setDraftValues] = React.useState<DraftInputsValues>(
    initialValues ?? {
      levelValue: undefined,
      descriptionValue: '',
      targetValue: undefined,
    },
  );

  return (
    <div className={s.createLevel}>
      <p>
        <label>level</label>
        <input
          value={draftValues.levelValue}
          onChange={(event) =>
            setDraftValues((prev) => ({ ...prev, levelValue: Number(event.target.value) }))
          }
          type="number"
        />
      </p>

      <p>
        <label htmlFor="">description</label>
        <textarea
          value={draftValues.descriptionValue}
          onChange={(event) =>
            setDraftValues((prev) => ({
              ...prev,
              descriptionValue: event.target.value,
            }))
          }
        />
      </p>

      <p>
        <label htmlFor="">target</label>
        <input
          value={draftValues.targetValue}
          onChange={(event) =>
            setDraftValues((prev) => ({
              ...prev,
              targetValue: Number(event.target.value),
            }))
          }
          type="number"
        />
      </p>

      <div>
        <button onClick={() => habitLevelHandler(draftValues)} className={s.createLevelButton}>
          Save
        </button>
        <button onClick={cancelHandler} className={s.createLevelButton}>
          cancel
        </button>
      </div>
    </div>
  );
};
