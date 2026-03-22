import React from 'react';
import s from './YearTracker.module.css';
import { RatingPicker } from '../RatingPicker/RatingPicker';

type YearMap = Record<string, number | null>;
type CalendarDay = string | null;
type Month = CalendarDay[];
type Months = Month[];

const zeroFormatted = (number: number) => {
  return `${number}`.length < 2 ? `0${number}` : `${number}`;
};

const getYearMap = (targetYear: number) => {
  const yearMap: YearMap = {};

  const processedDate = new Date(targetYear, 0, 1);   

  while (targetYear === processedDate.getFullYear()) {
    const year = processedDate.getFullYear();
    const month = processedDate.getMonth() + 1;
    const day = processedDate.getDate();

    const fullFormatDay = `${year}-${zeroFormatted(month)}-${zeroFormatted(day)}`;

    yearMap[fullFormatDay] = null;

    processedDate.setDate(processedDate.getDate() + 1);
  }

  return yearMap;
}

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
  const [yearMap, setYearMap] = React.useState<YearMap>(getYearMap(2026));
  const [dateForPicker, setDateForPicker] = React.useState<string>('');

  const popoverRef = React.useRef<HTMLDivElement>(null);

  const dates = Object.keys(yearMap);

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

  const ratingHandler = (date: string) => {
    if (date === dateForPicker) {
      setDateForPicker('');
      return;
    }

    setDateForPicker(date);
  }

  React.useEffect(() => {
    const handleClick = (event: PointerEvent) => {
      const popoverRefCurrent = popoverRef.current;
      const eventTarget = event.target;

      if (popoverRefCurrent === null) {
        return
      }

      if (!(eventTarget instanceof Node)) {
        return; 
      }

      if (!(popoverRefCurrent.contains(eventTarget)) && dateForPicker !== '') {
        setDateForPicker('');
      }
    }

    document.addEventListener('click', handleClick);

    return () => document.removeEventListener('click', handleClick);
  }, [dateForPicker]);

  return <div className={s.year}>{months.map((month, index) => {

    return (
      <div className={s.month}>
        <h2 className={s.monthName}>{monthsNames[index]}</h2>
        {month.map((date) => {
          if (date === null) {
            return <p className={s.day}>
              <span></span>
            </p>
          }

          const [year, month, day] = date.split('-');

          return <div className={s.day} 
          onClick={(event) => {
            event.stopPropagation();
            ratingHandler(date)
          }}>
              {dateForPicker === date && <div ref={popoverRef}><RatingPicker/></div>}
              <span>{day}</span>
          </div>
        })}
      </div>  
    )
  })}</div>;
};
