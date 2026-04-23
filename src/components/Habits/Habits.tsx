import clsx from 'clsx';
import s from './Habits.module.css';
import { Check, Plus, SquarePen, Trash } from 'lucide-react';
import {
  useCreateHabitLevelMutation,
  useDeleteHabitLevelMutation,
  useGetHabitLevelsByHabitQuery,
  useUpdateHabitLevelMutation,
} from '../../api/habitsApi';
import { useParams } from 'react-router-dom';
import React from 'react';
import type { UpdateHabitLevelArgs } from '../../types/habitsTypes';
import { HabitLevelForm } from './components/HabitLevelForm';

export type DraftInputsValues = {
  levelValue: undefined | number;
  descriptionValue: string;
  targetValue: undefined | number;
};

export const Habits = () => {
  const [habitLevelFormState, setHabitLevelFormState] = React.useState<{
    type: string;
    id?: number;
  } | null>();

  const { habitId } = useParams();

  const numericHabitId = Number(habitId);

  const { data } = useGetHabitLevelsByHabitQuery({ habitId: numericHabitId }, { skip: !habitId });
  const [createHabitLevel] = useCreateHabitLevelMutation();
  const [updateHabitLevel] = useUpdateHabitLevelMutation();
  const [deleteHabitLevel] = useDeleteHabitLevelMutation();

  const createOpenHandler = () => {
    setHabitLevelFormState({ type: 'create' });
  };

  const cancelHandler = () => {
    setHabitLevelFormState(null);
  };

  const editHandler = (habitLevelId: number) => {
    setHabitLevelFormState({ type: 'edit', id: habitLevelId });
  };

  const createHabitLevelHandler = (inputsValues: DraftInputsValues) => {
    if (
      !inputsValues.levelValue ||
      !inputsValues.targetValue ||
      !inputsValues.descriptionValue ||
      !numericHabitId
    ) {
      throw new Error('Habit args is missing');
    }

    createHabitLevel({
      level: inputsValues.levelValue,
      description: inputsValues.descriptionValue,
      target: inputsValues.targetValue,
      habitId: numericHabitId,
    });

    setHabitLevelFormState(null);
  };

  const editHabitLevelHandler = (inputsValues: DraftInputsValues, habitLevelId: number) => {
    if (
      !inputsValues.levelValue ||
      !inputsValues.targetValue ||
      !inputsValues.descriptionValue ||
      !numericHabitId
    ) {
      throw new Error('Habit args is missing');
    }

    updateHabitLevel({
      habitLevelId: habitLevelId,
      level: inputsValues.levelValue,
      description: inputsValues.descriptionValue,
      target: inputsValues.targetValue,
    });

    setHabitLevelFormState(null);
  };

  const updateHabitProgress = (updateArgs: UpdateHabitLevelArgs) => {
    updateHabitLevel(updateArgs);
  };

  const deleteHabitLevelHandler = (habitLevelId: number) => {
    deleteHabitLevel({ habitLevelId });
  };

  return (
    <div className={s.detailRoot}>
      {data &&
        data.map((habitLevel) => {
          const isCompleted = habitLevel.target <= habitLevel.progress;

          const isEdit =
            habitLevelFormState &&
            habitLevelFormState.type === 'edit' &&
            habitLevel.id === habitLevelFormState.id;

          return (
            <div className={clsx(s.habitLevel, isCompleted && s.habitLevelCompleted)}>
              {!isEdit ? (
                <React.Fragment>
                  <div className={s.upWrapper}>
                    <p className={s.habitLevelNumber}>lvl {habitLevel.level}</p>
                    <div className={s.controlButtons}>
                      <button
                        onClick={() => editHandler(habitLevel.id)}
                        className={s.controlButton}
                      >
                        <SquarePen />
                      </button>
                      <button
                        onClick={() => deleteHabitLevelHandler(habitLevel.id)}
                        className={s.controlButton}
                      >
                        <Trash />
                      </button>
                    </div>
                    {isCompleted && (
                      <div className={s.completedText}>
                        <div className={s.completedTextCircle}>
                          <Check className={s.checkIcon} />
                        </div>
                        Completed
                      </div>
                    )}
                  </div>
                  <p className={s.description}>{habitLevel.description}</p>
                  <div className={s.progressCircles}>
                    {Array.from({ length: habitLevel.target }, (_, i) => (
                      <div
                        key={`${habitLevel.id}-${i}`}
                        className={clsx(
                          s.progressCircle,
                          habitLevel.progress > i && s.completedCircle,
                        )}
                      ></div>
                    ))}
                  </div>
                  <div className={s.numProgressWrap}>
                    <p className={s.numProgress}>
                      {habitLevel.progress} / {habitLevel.target}
                    </p>
                  </div>
                  <div className={s.changeButtons}>
                    <button
                      onClick={() =>
                        updateHabitProgress({
                          habitLevelId: habitLevel.id,
                          progress: habitLevel.progress - 1,
                        })
                      }
                      className={s.changeProgress}
                    >
                      -1
                    </button>
                    <button
                      onClick={() =>
                        updateHabitProgress({
                          habitLevelId: habitLevel.id,
                          progress: habitLevel.progress + 1,
                        })
                      }
                      className={s.changeProgress}
                    >
                      +1
                    </button>
                  </div>{' '}
                </React.Fragment>
              ) : (
                <HabitLevelForm
                  cancelHandler={cancelHandler}
                  habitLevelHandler={(inputsValues) =>
                    editHabitLevelHandler(inputsValues, habitLevel.id)
                  }
                  initialValues={{
                    levelValue: habitLevel.level,
                    descriptionValue: habitLevel.description,
                    targetValue: habitLevel.target,
                  }}
                />
              )}
            </div>
          );
        })}
      <div className={clsx(s.habitLevel)}>
        {habitLevelFormState && habitLevelFormState.type === 'create' ? (
          <HabitLevelForm
            cancelHandler={cancelHandler}
            habitLevelHandler={createHabitLevelHandler}
          />
        ) : (
          <button onClick={createOpenHandler} className={clsx(s.habitLevel, s.habitCreateLevel)}>
            <Plus />
          </button>
        )}
      </div>
    </div>
  );
};
