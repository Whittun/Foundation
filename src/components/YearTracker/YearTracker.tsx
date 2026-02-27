export const YearTracker = () => {
  const targetYear = 2026;

  const currentDate = new Date(targetYear, 0, 1);
  const processedDate = new Date(currentDate.getFullYear(), 0, 1);

  type yearMapType = Record<string, number>;

  const yearMap: yearMapType = {};

  const zeroFormatted = (number: number) => {
    return `${number}`.length < 2 ? `0${number}` : `${number}`;
  };

  while (currentDate.getFullYear() === processedDate.getFullYear()) {
    const year = processedDate.getFullYear();
    const month = processedDate.getMonth() + 1;
    const day = processedDate.getDate();

    const fullFormatDay = `${year}-${zeroFormatted(month)}-${zeroFormatted(day)}`;

    yearMap[fullFormatDay] = 0;

    processedDate.setDate(processedDate.getDate() + 1);
  }

  return <p>{String(new Date())}</p>;
};
