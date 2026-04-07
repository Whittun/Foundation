import { NavLink } from 'react-router-dom';
import s from './AppMenu.module.css'
import { CalendarDays } from 'lucide-react';

export const AppMenu = () => {
  return <div className={s.root}>
    <h2 className={s.title}>Foundation</h2>
    <ul className= {s.linksList}>
      <li className={s.linksItem}>
        <NavLink className={s.link} to="/yearTracker">
          <CalendarDays className={s.icon} />
          Year Tracker
        </NavLink>
      </li>
    </ul>
  </div>;
}