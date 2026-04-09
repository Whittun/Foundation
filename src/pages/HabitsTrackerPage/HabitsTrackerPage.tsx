import React from 'react';
import s from './HabitsTrackerPage.module.css';
import { NavLink, Outlet } from 'react-router-dom';

const habitsMock = [
  { id: 1, name: "Sport" },
  { id: 2, name: "Study" },
  { id: 3, name: "Sleep" }
]

export const HabitsTrackerPage = () => {
  const [isShowForm, setIsShowForm] = React.useState(false);

  const handleOpenForm = () => {
    setIsShowForm((prev) => !prev);
  }

  return <div className={s.root}>
    <div className={s.lavelWrapper}>
      {<Outlet />}
    </div>

    <section className={s.categories}>
      <button className={s.createCategory} onClick={handleOpenForm}>Create Category</button>
      {
        isShowForm && <form action="">
          <p>Name:</p>
          <input type="text" />
          <button type='button'>Save</button>
        </form>
      } 
      <ul className={s.linksList}>
        {habitsMock.map((habit) => {
          return <li className={s.linksItem}>
            <NavLink className={s.link} to={`${habit.id}`}>{habit.name}</NavLink>
          </li>
        })}
      </ul>
    </section>
  </div>;
}