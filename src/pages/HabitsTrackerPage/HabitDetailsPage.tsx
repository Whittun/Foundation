import s from './HabitsTrackerPage.module.css';
import clsx from 'clsx';
import { Check, Plus } from 'lucide-react';
import React from 'react';

export const habitLevelsMock = [
  {
    id: 1,
    habitId: 1,
    level: 1,
    description: 'Читать 5 минут в день',
    progress: 12,
    target: 12,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    habitId: 1,
    level: 2,
    description: 'Читать 10 минут в день',
    progress: 3,
    target: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    habitId: 1,
    level: 3,
    description: 'Читать 15 минут в день',
    progress: 0,
    target: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    habitId: 1,
    level: 4,
    description: 'Читать 20 минут в день',
    progress: 0,
    target: 7,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 5,
    habitId: 1,
    level: 5,
    description: 'Читать 30 минут в день',
    progress: 0,
    target: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 6,
    habitId: 1,
    level: 6,
    description: 'Читать 45 минут в день',
    progress: 0,
    target: 7,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const HabitDetailsPage = () => {
  // const { habitId } = useParams();

  const [isCreate, setIsCreate] = React.useState(false);

  return (
    <div className={s.detailRoot}>
      {/* <p>Page of habit: {habitId}</p> */}
      {habitLevelsMock.map((habitLevel) => {
        const isCompleted = habitLevel.target === habitLevel.progress;

        return (
          <div className={clsx(s.habitLevel, isCompleted && s.habitLevelCompleted)}>
            <div className={s.upWrapper}>
              <p className={s.habitLevelNumber}>lvl {habitLevel.level}</p>
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
                <div key={`${habitLevel.id}-${i}`} className={clsx(s.progressCircle, habitLevel.progress > i && s.completedCircle)}></div>
              ))}
            </div>
            <div className={s.numProgressWrap}>
              <p className={s.numProgress}>
                {habitLevel.progress} / {habitLevel.target}
              </p>
            </div>
            <div className={s.changeButtons}>
              <button className={s.changeProgress}>-1</button>
              <button className={s.changeProgress}>+1</button>
            </div>
          </div>
        );
      })}
      <button className={clsx(s.habitLevel, s.habitCreateLevel)}>
        <Plus />
      </button>
    </div>
  );
};
