import s from './HabitsPage.module.css';
import { Outlet } from 'react-router-dom';
import { HabitsMenu } from '../../components/HabitsMenu';

export const HabitsPage = () => {
  return (
    <div className={s.root}>
      <div className={s.levelsWrapper}>{<Outlet />}</div>
      <HabitsMenu />
    </div>
  );
};
