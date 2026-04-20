import { ChartNoAxesColumnIncreasing, Plus } from 'lucide-react';
import s from './emptyHabits.module.css';

export const EmptyHabits = () => {
  return (
    <div className={s.root}>
      <div className={s.emptyMessageWrapper}>
        <ChartNoAxesColumnIncreasing className={s.icon} />
        <p>Create your first Habit</p>
        <button className={s.createButton}>Create</button>
      </div>
    </div>
  );
};
