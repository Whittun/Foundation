import s from './YearTracker.module.css';

const zeroFormatted = (number: number) => {
  return `${number}`.length < 2 ? `0${number}` : `${number}`;
};

const getYearMap = (targetYear: number) => {
  const yearMap:  Record<string, number> = {};

  const processedDate = new Date(targetYear, 0, 1);   

  while (targetYear === processedDate.getFullYear()) {
    const year = processedDate.getFullYear();
    const month = processedDate.getMonth() + 1;
    const day = processedDate.getDate();

    const fullFormatDay = `${year}-${zeroFormatted(month)}-${zeroFormatted(day)}`;

    yearMap[fullFormatDay] = 0;

    processedDate.setDate(processedDate.getDate() + 1);
  }

  return yearMap;
}

const yearMap = getYearMap(2026);

const dates = Object.keys(yearMap);

type  CalendarDay = string | null;

type Month = CalendarDay[];
type Months = Month[];

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

          return <p className={s.day}>
              <span>{day}</span>
          </p>
        })}
      </div>
    )
  })}</div>;
};
