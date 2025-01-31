import React from "react";

type InputProps = {
  value: string;
  setValue: () => void;
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
