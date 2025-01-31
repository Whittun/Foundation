import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import styles from "./Categories.module.css";
import { addCategory, selectCategories } from "./CategoriesSlice";
import { Link } from "react-router-dom";
import { Button } from "../Button/Button";

export const Categories = () => {
  const [inputValue, setInputValue] = useState("");
  const categories = useAppSelector(selectCategories);
  const dispatch = useAppDispatch();

  const buttonHandler = () => {
    if (inputValue === "") return;

    dispatch(addCategory({ id: categories.length, name: inputValue }));
    setInputValue("");
  };

  return (
    <div className={styles.categories}>
      <input
        aria-label={"enter name"}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        type="text"
        className={styles.input}
      />
      <Button
        className={styles.button}
        text={"Add category"}
        onClick={buttonHandler}
      />
      <ul className={styles.categoriesList}>
        {categories.map((category) => (
          <li className={styles.categoriesItem} key={category.id}>
            <Link to={`objectives/${category.name}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
