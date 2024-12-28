import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import styles from "./Categories.module.css";
import { addCategory, selectCategories } from "./CategoriesSlice";
import { Link } from "react-router";

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
      <button onClick={buttonHandler}>Add category</button>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        type="text"
      />
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <Link to={`/${category.name}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
