import React from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import s from './HabitsMenu.module.css';
import {
  useCreateHabitMutation,
  useDeleteHabitMutation,
  useGetAllHabitsQuery,
  useUpdateHabitMutation,
} from '../../api/habitsApi';
import clsx from 'clsx';
import { SquarePen, Trash } from 'lucide-react';

type HabitsMenuProps = {
  isShowForm: boolean;
  handleOpenForm: () => void;
  setIsShowForm: React.Dispatch<React.SetStateAction<boolean>>;
};

export const HabitsMenu = ({ isShowForm, handleOpenForm, setIsShowForm }: HabitsMenuProps) => {
  const [name, setName] = React.useState('');
  const [isActiveSave, setIsActiveSave] = React.useState(false);
  const [isActiveEdit, setIsActiveEdit] = React.useState(false);
  const [habitEditingId, setHabitEditingId] = React.useState<number | null>(null);
  const [draftHabitName, setDraftHabitName] = React.useState('');

  const inputRef = React.useRef<HTMLInputElement>(null);

  const { data } = useGetAllHabitsQuery();
  const [createHabit] = useCreateHabitMutation();
  const [deleteHabit] = useDeleteHabitMutation();
  const [updateHabit] = useUpdateHabitMutation();

  const navigate = useNavigate();

  const { habitId: habitQueryId } = useParams();

  const handleInputName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setName(value);

    if (value.trim().length < 3) {
      setIsActiveSave(false);
    } else {
      setIsActiveSave(true);
    }
  };

  const handleCreateHabit = async (habitObj: { name: string }) => {
    const newHabit = await createHabit(habitObj).unwrap();
    navigate(`/habits/${newHabit.id}`);
    setIsShowForm(false);
  };

  const handleEditCategories = () => {
    setIsActiveEdit((prev) => !prev);
  };

  const handleDeleteCategory = async (habitId: number) => {
    await deleteHabit({ habitId }).unwrap();

    if (`${habitId}` === habitQueryId) {
      localStorage.removeItem('lastOpenedHabitId');
      navigate('/habits', { replace: true });
    }
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

  React.useEffect(() => {
    if (isShowForm) {
      inputRef.current?.focus();
    }
  }, [isShowForm]);

  return (
    <section className={s.categories}>
      <div className={s.upButtonsWrapper}>
        <button className={s.createCategory} onClick={handleOpenForm}>
          Create Category
        </button>
        {data && data.length > 0 && (
          <button className={s.editCategory} onClick={handleEditCategories}>
            <SquarePen />
          </button>
        )}
      </div>
      {isShowForm && (
        <form className={s.createForm} action="">
          <input
            ref={inputRef}
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
                  <div className={s.habitEditWrapper}>
                    <input
                      className={s.habitInput}
                      value={draftHabitName}
                      onChange={(event) => setDraftHabitName(event.target.value)}
                      type="text"
                    ></input>
                    <div className={s.editHabitButtons}>
                      <button
                        className={s.editHabitButton}
                        onClick={() => handleHabitEditSave(habit.id)}
                      >
                        Save
                      </button>
                      <button className={s.editHabitButton} onClick={handleExitHabitEdit}>
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <React.Fragment>
                    <NavLink
                      className={({ isActive }) => clsx(s.link, isActive && s.activeLink)}
                      to={`${habit.id}`}
                    >
                      {habit.name}
                    </NavLink>
                    {isActiveEdit && (
                      <div className={s.bottomButtonsWrapper}>
                        <button
                          className={s.habitControlButton}
                          onClick={() => handleEditHabit(habit.id, habit.name)}
                        >
                          <SquarePen />
                        </button>
                        <button
                          className={s.habitControlButton}
                          onClick={() => handleDeleteCategory(habit.id)}
                        >
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
