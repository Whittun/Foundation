import { useEffect, useState } from "react";

export const Input = ({ value, setValue }) => {
  return <input onChange={setValue} type="text" value={value} />;
};
