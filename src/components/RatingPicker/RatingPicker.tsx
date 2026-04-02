import s from './RatingPicker.module.css';

type RatingPickerProps = {
  addRating: (ratingVariant: number) => void;
  removeRating: () => void;
}

export const RatingPicker = ({ addRating, removeRating }: RatingPickerProps) => {
  const ratingVariants = [1, 2, 3, 4, 5];

  return <div className={s.root}>
    {ratingVariants.map((ratingVariant) => {
      return <div key={ratingVariant} onClick={() => addRating(ratingVariant)} className={s.ratingNumber}>{ratingVariant}</div>
    })}
    <button onClick={removeRating}>
      clear
    </button>
  </div>
}