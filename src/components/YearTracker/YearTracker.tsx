import React from 'react';
import s from './YearTracker.module.css';
import { RatingPicker } from '../RatingPicker/RatingPicker';
import { clsx } from 'clsx';
import { useDeleteDayRatingMutation, useGetYearRatingsQuery, useSetDayRatingMutation } from '../../api/dayRatingsApi';

type YearMap = Record<string, number | null>;
type CalendarDay = string | null;
type Month = CalendarDay[];
type Months = Month[];

const monthsNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

export const YearTracker = () => {
  const [currentYear, setCurrentYear] = React.useState(new Date().getFullYear());

  const { data, isLoading, isError } = useGetYearRatingsQuery(currentYear);
  const [ setDayRating ] = useSetDayRatingMutation();
  const [ deleteDayRating ] = useDeleteDayRatingMutation();

  const [dateForPicker, setDateForPicker] = React.useState<string | null>(null);

  const popoverRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const popoverRefCurrent = popoverRef.current;
      const eventTarget = event.target;

      if (popoverRefCurrent === null) {
        return
      }

      if (!(eventTarget instanceof Node)) {
        return; 
      }

      if (!(popoverRefCurrent.contains(eventTarget)) && dateForPicker !== null) {
        setDateForPicker(null);
      }
    }

    document.addEventListener('click', handleClick);

    return () => document.removeEventListener('click', handleClick);
  }, [dateForPicker]);

  if (isError) {
    return <div>error!</div>
  }

  if (isLoading) {
    return 'loading...'
  }

  if (!data) {
    return null
  }

  const dates = Object.keys(data);

  const months: Months = Array.from({length: 12}).map(() => []);

  dates.forEach((date) => {
    const [year, month, day] = date.split('-');

    const numIndexMonth = Number(month) - 1;

    const weekIndex = ((new Date(date)).getDay() + 6) % 7;

    if (months[numIndexMonth].length === 0) {
      const monthOffset = Array.from({length: weekIndex}).map(() => null);
      months[numIndexMonth].push(...monthOffset);
    }

    months[numIndexMonth].push(date);
  })

  const showPickerHandler = (date: string) => {
    if (date === dateForPicker) {
      setDateForPicker(null);
      return;
    }

    setDateForPicker(date);
  }

  const handlePickRating = (ratingVariant: number) => {
    if (dateForPicker === null) return;

    setDayRating({
      date: dateForPicker,
      rating: ratingVariant
    });
  }

  const handleRemoveRating = () => {
    if (dateForPicker === null) return;

    deleteDayRating({date: dateForPicker});
  }

  const handleYear = (direction: 'back' | 'next') => {
    if (direction === 'next') {
      setCurrentYear((prevYear) => {
        return prevYear + 1;
      })
    }

    if (direction === 'back') {
      setCurrentYear((prevYear) => {
        return prevYear - 1;
      })
    }
  }

  return <React.Fragment>
    <div className={s.yearPicker}>
      <button onClick={() => handleYear('back')}>
        prevYear
      </button>
      {currentYear} 
      <button onClick={() => handleYear('next')}>
        nextYear
      </button>
    </div>
    <div className={s.year}>
      {months.map((month, index) => {
        return (
          <div key={monthsNames[index]} className={s.month}>
            <h2 className={s.monthName}>{monthsNames[index]}</h2>
            {month.map((date, index) => {
              if (date === null) {
                return <p key={index} className={s.day}>
                  <span></span>
                </p>
              }

              const [year, month, day] = date.split('-');

              return <div key={date} className={clsx(s.day, data[date] !== null && s[`rating-${data[date]}`])}
                onClick={(event) => {
                  event.stopPropagation();
                  showPickerHandler(date)
                }}>
                {dateForPicker === date && <div ref={popoverRef}><RatingPicker removeRating={handleRemoveRating} addRating={handlePickRating}/></div>}
                <span>{day}</span>
              </div>
            })}
          </div>  
        )
      })}
    </div>
  </React.Fragment>
};
