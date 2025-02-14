import clsx from "clsx";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
};

export const Button: React.FC<ButtonProps> = ({
  text,
  className,
  ...props
}) => {
  return (
    <>
      <button
        {...props}
        className={clsx(
          className,
          "rounded-lg border border-transparent py-[0.6em] px-[1.2em] cursor-pointer duration-250 transition-colors",
          "text-base font-semibold",
          "hover:border-[#646cff] disabled:pointer-events-none disabled:opacity-50 active:bg-gray-200"
        )}
      >
        {text}
      </button>
    </>
  );
};
