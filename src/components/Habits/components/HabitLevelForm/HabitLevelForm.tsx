import React from 'react';
import s from './HabitLevelForm.module.css';
import type { DraftInputsValues } from '../../Habits';
import clsx from 'clsx';

type HabitLevelFormProps = {
  habitLevelHandler: (inputsValues: DraftInputsValues) => void;
  cancelHandler: () => void;
  initialValues?: DraftInputsValues;
  errors?: { level: null | string };
  setErrors?: React.Dispatch<
    React.SetStateAction<{
      level: string | null;
    }>
  >;
};

export const HabitLevelForm = ({
  habitLevelHandler,
  cancelHandler,
  initialValues,
  errors,
  setErrors,
}: HabitLevelFormProps) => {
  const [draftValues, setDraftValues] = React.useState<DraftInputsValues>(
    initialValues ?? {
      levelValue: undefined,
      descriptionValue: '',
      targetValue: undefined,
    },
  );

  const isDisabledSave =
    draftValues.levelValue === undefined ||
    draftValues.levelValue < 1 ||
    draftValues.descriptionValue.trim().length === 0 ||
    draftValues.targetValue === undefined ||
    draftValues.targetValue < 1;

  React.useEffect(() => {
    return () => {
      setErrors?.({ level: null });
    };
  }, []);

  return (
    <div className={s.createLevel}>
      <p className={s.inputWrapper}>
        <label htmlFor="habit-level">level</label>
        <input
          className={s.input}
          id="habit-level"
          value={draftValues.levelValue}
          onChange={(event) => {
            setDraftValues((prev) => ({ ...prev, levelValue: Number(event.target.value) }));
            setErrors?.({ level: null });
          }}
          type="number"
        />
        <span className={s.error}>{errors?.level && errors.level}</span>
      </p>

      <p className={s.inputWrapper}>
        <label htmlFor="habit-description">description</label>
        <textarea
          className={s.input}
          rows={4}
          id="habit-description"
          value={draftValues.descriptionValue}
          onChange={(event) =>
            setDraftValues((prev) => ({
              ...prev,
              descriptionValue: event.target.value,
            }))
          }
        />
      </p>

      <p className={s.inputWrapper}>
        <label htmlFor="habit-target">target</label>
        <input
          className={s.input}
          id="habit-target"
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

      <div className={s.buttonsWrapper}>
        <button
          disabled={isDisabledSave}
          onClick={() => habitLevelHandler(draftValues)}
          className={clsx(s.createLevelButton, { [s.createLevelButtonDisabled]: isDisabledSave })}
        >
          Save
        </button>
        <button onClick={cancelHandler} className={s.createLevelButton}>
          Cancel
        </button>
      </div>
    </div>
  );
};
