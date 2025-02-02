import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import styles from "./Categories.module.css";
import { addCategory, selectCategories } from "./CategoriesSlice";
import { Link } from "react-router-dom";
import { Button } from "../Button/Button";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export const Categories = () => {
  const [inputValue, setInputValue] = useState("");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const categories = useAppSelector(selectCategories);
  const dispatch = useAppDispatch();

  const buttonHandler = () => {
    if (inputValue === "") return;

    dispatch(addCategory({ id: categories.length, name: inputValue }));
    setInputValue("");
  };

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileOpen]);

  return (
    <>
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className={styles.burger}
      >
        <ArrowForwardIosIcon
          className={`${styles.arrow} ${isMobileOpen ? styles.arrowLeft : ""}`}
        />
      </button>
      <div
        className={`${styles.categories} ${
          isMobileOpen ? styles.mobileOpen : ""
        }`}
      >
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
              <Link
                onClick={() => setIsMobileOpen(false)}
                to={`objectives/${category.name}`}
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
