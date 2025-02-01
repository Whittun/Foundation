import React, { ChangeEvent } from "react";

type InputProps = {
  value: string;
  setValue: (event: ChangeEvent<HTMLInputElement>) => void;
  ariaLabel: string;
};

export const Input: React.FC<InputProps> = ({ value, setValue, ariaLabel }) => {
  return (
    <input
      aria-label={ariaLabel}
      onChange={setValue}
      type="text"
      defaultValue={value}
    />
  );
};
