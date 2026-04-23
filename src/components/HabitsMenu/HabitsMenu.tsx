import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './HabitsMenu.module.css';
import { useCreateHabitMutation, useGetAllHabitsQuery } from '../../api/habitsApi';
import clsx from 'clsx';

export const HabitsMenu = () => {
  const [isShowForm, setIsShowForm] = React.useState(false);
  const [name, setName] = React.useState('');
  const [isActiveSave, setIsActiveSave] = React.useState(false);

  const { data } = useGetAllHabitsQuery();
  const [createHabit] = useCreateHabitMutation();

  const handleOpenForm = () => {
    setIsShowForm((prev) => !prev);
  };

  const handleInputName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setName(value);

    if (value.trim().length < 5) {
      setIsActiveSave(false);
    } else {
      setIsActiveSave(true);
    }
  };

  const handleCreateHabit = (habitObj: { name: string }) => {
    createHabit(habitObj);
    setIsShowForm(false);
  };

  return (
    <section className={s.categories}>
      <button className={s.createCategory} onClick={handleOpenForm}>
        Create Category
      </button>
      {isShowForm && (
        <form className={s.createForm} action="">
          <input
            onChange={handleInputName}
            className={s.inputName}
            placeholder="Habit name"
            type="text"
          />
          <button
            disabled={!isActiveSave}
            onClick={() => handleCreateHabit({ name })}
            className={clsx(s.createButton, { [s.disabledSave]: !isActiveSave })}
            type="button"
          >
            Save
          </button>
        </form>
      )}
      <ul className={s.linksList}>
        {data &&
          data.map((habit) => {
            return (
              <li key={habit.id} className={s.linksItem}>
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
