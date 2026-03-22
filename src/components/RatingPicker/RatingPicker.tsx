import s from './RatingPicker.module.css';

export const RatingPicker = () => {
  return <div className={s.root}>
    <div className={s.ratingNumber}>1</div>
    <div className={s.ratingNumber}>2</div>
    <div className={s.ratingNumber}>3</div>
    <div className={s.ratingNumber}>4</div>
    <div className={s.ratingNumber}>5</div>
  </div>
}