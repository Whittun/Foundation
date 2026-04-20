import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './HabitsMenu.module.css';

const habitsMock = [
  { id: 1, name: 'Sport' },
  { id: 2, name: 'Study' },
  { id: 3, name: 'Sleep' },
];

export const HabitsMenu = () => {
  const [isShowForm, setIsShowForm] = React.useState(false);

  const handleOpenForm = () => {
    setIsShowForm((prev) => !prev);
  };

  return (
    <section className={s.categories}>
      <button className={s.createCategory} onClick={handleOpenForm}>
        Create Category
      </button>
      {isShowForm && (
        <form className={s.createForm} action="">
          <input className={s.inputName} placeholder="Habit name" type="text" />
          <button className={s.createButton} type="button">
            Save
          </button>
        </form>
      )}
      <ul className={s.linksList}>
        {habitsMock.map((habit) => {
          return (
            <li className={s.linksItem}>
              <NavLink className={s.link} to={`${habit.id}`}>
                {habit.name}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
