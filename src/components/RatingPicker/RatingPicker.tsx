import s from './RatingPicker.module.css';

type RatingPickerProps = {
  onClick: (ratingVariant: number) => void;
}

export const RatingPicker = ({ onClick }: RatingPickerProps) => {
  const ratingVariants = [1, 2, 3, 4, 5];

  return <div className={s.root}>
    {ratingVariants.map((ratingVariant) => {
      return <div key={ratingVariant} onClick={() => onClick(ratingVariant)} className={s.ratingNumber}>{ratingVariant}</div>
    })}
  </div>
}