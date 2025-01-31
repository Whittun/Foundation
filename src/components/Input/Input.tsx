export const Input = ({ value, setValue, ariaLabel }) => {
  return (
    <input
      aria-label={ariaLabel}
      onChange={setValue}
      type="text"
      defaultValue={value}
    />
  );
};
