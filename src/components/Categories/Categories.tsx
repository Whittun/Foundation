import styles from "./Categories.module.css";

export const Categories = () => {
  return (
    <div className={styles.categories}>
      <button>Add category</button>
      <ul>
        <li>Sport</li>
        <li>Study</li>
        <li>Music</li>
      </ul>
    </div>
  );
};
