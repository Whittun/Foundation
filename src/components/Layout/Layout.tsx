import { Outlet } from "react-router";
import { Categories } from "../Categories/Categories";
export const Layout = () => {
  return (
    <>
      <Categories />
      <Outlet />
    </>
  );
};
