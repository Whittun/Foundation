"use client";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import clsx from "clsx";
import { useState } from "react";
import { Button } from "../Button/Button";
import Link from "next/link";

export default function Categories() {
  const [inputValue, setInputValue] = useState("");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const [categories, setCategories] = useState([
    { id: 0, name: "Sport" },
    { id: 1, name: "Study" },
    { id: 2, name: "Sleep" },
  ]);

  const buttonHandler = () => {
    if (inputValue === "") return;

    setCategories([
      ...categories,
      { id: Number(Date.now()), name: inputValue },
    ]);

    setInputValue("");
  };

  return (
    <>
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="sm:collapse fixed top-0 z-2 block h-full bg-[rgb(209, 209, 209)] border-none rounded-r-xl"
      >
        <ArrowForwardIosIcon
          className={clsx("rotate-0 duration-3", isMobileOpen && "rotate-180")}
        />
      </button>
      <div
        className={clsx(
          "md:max-sm:fixed md:max-sm:top-0 md:max-sm:left-0 md:max-sm:translate-x-[-300px]",
          "h-full m-0 p-5 bg-gray-100 first-line:rounded-r-xl overflow-y-auto duration-3 transition-transform",
          isMobileOpen && "w-full pl-12 opacity-100 translate-x-0 z-1"
        )}
      >
        <input
          aria-label={"enter name"}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          type="text"
          className={clsx(" w-full p-2 rounded-2xl border-2 border-gray-400")}
        />
        <Button
          className={clsx(
            "block w-full mt-5 bg-white focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 "
          )}
          text={"Add category"}
          onClick={buttonHandler}
        />
        <ul className={clsx("flex flex-col p-0 mt-5 list-none")}>
          {categories.map((category) => (
            <li
              className={clsx(
                "text-[#646cff] p-2 border-t border-neutral-300 last:border-b   last:border-neutral-300 font-semibold"
              )}
              key={category.id}
            >
              <Link
                onClick={() => setIsMobileOpen(false)}
                href={`/objectives/${category.name}`}
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
