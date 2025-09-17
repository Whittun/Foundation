"use client";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import clsx from "clsx";
import { useState } from "react";
import { Button } from "../Button/Button";
import Link from "next/link";
import { useCategoryStore } from "@/stores/categories-store";

export default function Categories() {
  const [inputValue, setInputValue] = useState("");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const { categories, addCategory } = useCategoryStore();

  const buttonHandler = () => {
    if (inputValue === "") return;

    addCategory(inputValue);

    setInputValue("");
  };

  return (
    <section className="flex">
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="sm:collapse fixed top-0 z-2 block h-screen bg-neutral-200 border-none rounded-r-3xl px-1"
      >
        <ArrowForwardIosIcon
          className={clsx("rotate-0 duration-3", isMobileOpen && "rotate-180")}
        />
      </button>
      <div
        className={clsx(
          {
            ["fixed translate-x-0 w-full h-full opacity-100 z-10"]:
              isMobileOpen,
            ["absolute translate-x-[-400px]"]: !isMobileOpen,
          },
          "sm:translate-x-0 sm:relative",
          "flex flex-col grow m-0 p-5 bg-gray-100 rounded-r-3xl overflow-y-auto duration-3 transition-transform"
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
                href={`/${category.name}`}
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
  