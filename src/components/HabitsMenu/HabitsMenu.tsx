import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './HabitsMenu.module.css';
import {
  useCreateHabitMutation,
  useDeleteHabitMutation,
  useGetAllHabitsQuery,
  useUpdateHabitMutation,
} from '../../api/habitsApi';
import clsx from 'clsx';
import { SquarePen, Trash } from 'lucide-react';

export const HabitsMenu = () => {
  const [isShowForm, setIsShowForm] = React.useState(false);
  const [name, setName] = React.useState('');
  const [isActiveSave, setIsActiveSave] = React.useState(false);
  const [isActiveEdit, setIsActiveEdit] = React.useState(false);
  const [habitEditingId, setHabitEditingId] = React.useState<number | null>(null);
  const [draftHabitName, setDraftHabitName] = React.useState('');

  const { data } = useGetAllHabitsQuery();
  const [createHabit] = useCreateHabitMutation();
  const [deleteHabit] = useDeleteHabitMutation();
  const [updateHabit] = useUpdateHabitMutation();

  const handleOpenForm = () => {
    setIsShowForm((prev) => !prev);
  };

  const handleInputName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setName(value);

    if (value.trim().length < 3) {
      setIsActiveSave(false);
    } else {
      setIsActiveSave(true);
    }
  };

  const handleCreateHabit = (habitObj: { name: string }) => {
    createHabit(habitObj);
    setIsShowForm(false);
  };

  const handleEditCategories = () => {
    setIsActiveEdit((prev) => !prev);
  };

  const handleDeleteCategory = (habitId: number) => {
    deleteHabit({ habitId });
  };

  const handleEditHabit = (habitId: number, name: string) => {
    setHabitEditingId(habitId);
    setDraftHabitName(name);
  };

  const handleHabitEditSave = (habitId: number) => {
    updateHabit({ habitId, name: draftHabitName });
    setHabitEditingId(null);
  };

  const handleExitHabitEdit = () => {
    setHabitEditingId(null);
  };

  return (
    <section className={s.categories}>
      <div className={s.upButtonsWrapper}>
        <button className={s.createCategory} onClick={handleOpenForm}>
          Create Category
        </button>
        {data && data.length > 0 && (
          <button onClick={handleEditCategories}>
            <SquarePen />
          </button>
        )}
      </div>
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
                {habitEditingId === habit.id ? (
                  <div>
                    <input
                      value={draftHabitName}
                      onChange={(event) => setDraftHabitName(event.target.value)}
                      type="text"
                    ></input>
                    <button onClick={() => handleHabitEditSave(habit.id)}>Save</button>
                    <button onClick={handleExitHabitEdit}>Cancel</button>
                  </div>
                ) : (
                  <React.Fragment>
                    <NavLink className={s.link} to={`${habit.id}`}>
                      {habit.name}
                    </NavLink>
                    {isActiveEdit && (
                      <div className={s.bottomButtonsWrapper}>
                        <button onClick={() => handleEditHabit(habit.id, habit.name)}>
                          <SquarePen />
                        </button>
                        <button onClick={() => handleDeleteCategory(habit.id)}>
                          <Trash />
                        </button>
                      </div>
                    )}
                  </React.Fragment>
                )}
              </li>
            );
          })}
      </ul>
    </section>
  );
};
