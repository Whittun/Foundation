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

export const Habits = () => {
  const [isActiveCreate, setIsActiveCreate] = React.useState(false);
  const [level, setLevel] = React.useState<number>();
  const [description, setDescription] = React.useState('');
  const [target, setTarget] = React.useState<number>();

  const { habitId } = useParams();

  const numericHabitId = Number(habitId);

  const { data } = useGetHabitLevelsByHabitQuery({ habitId: numericHabitId }, { skip: !habitId });
  const [createHabitLevel] = useCreateHabitLevelMutation();
  const [updateHabitLevel] = useUpdateHabitLevelMutation();
  const [deleteHabitLevel] = useDeleteHabitLevelMutation();

  const createOpenHandler = () => {
    setIsActiveCreate(true);
  };

  const createHabitLevelHandler = () => {
    if (!level || !target || !description || !numericHabitId) {
      throw new Error('Habit args is missing');
    }

    createHabitLevel({ level, description, target, habitId: numericHabitId });
    setIsActiveCreate(false);
  };

  const updateHabitProgress = (updateArgs: UpdateHabitLevelArgs) => {
    updateHabitLevel(updateArgs);
  };

  const deleteHabitLevelHandler = (habitLevelId: number) => {
    deleteHabitLevel({ habitLevelId });
  };

  const cancelHandler = () => {
    setIsActiveCreate(false);
  };

  return (
    <div className={s.detailRoot}>
      {data &&
        data.map((habitLevel) => {
          const isCompleted = habitLevel.target <= habitLevel.progress;

          return (
            <div className={clsx(s.habitLevel, isCompleted && s.habitLevelCompleted)}>
              <div className={s.upWrapper}>
                <p className={s.habitLevelNumber}>lvl {habitLevel.level}</p>
                <div className={s.controlButtons}>
                  <button className={s.controlButton}>
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
                    className={clsx(s.progressCircle, habitLevel.progress > i && s.completedCircle)}
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
              </div>
            </div>
          );
        })}
      <div className={clsx(s.habitLevel)}>
        {!isActiveCreate ? (
          <button onClick={createOpenHandler} className={clsx(s.habitLevel, s.habitCreateLevel)}>
            <Plus />
          </button>
        ) : (
          <div className={s.createLevel}>
            <p>
              <label>level</label>
              <input onChange={(event) => setLevel(Number(event.target.value))} type="number" />
            </p>

            <p>
              <label htmlFor="">description</label>
              <textarea onChange={(event) => setDescription(event.target.value)} />
            </p>

            <p>
              <label htmlFor="">target</label>
              <input onChange={(event) => setTarget(Number(event.target.value))} type="number" />
            </p>

            <div>
              <button onClick={createHabitLevelHandler} className={s.createLevelButton}>
                Save
              </button>
              <button onClick={cancelHandler} className={s.createLevelButton}>
                cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
