import styles from "./Button.module.css";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
};

export const Button: React.FC<ButtonProps> = ({
  text,
  className,
  ...props
}) => {
  return (
    <button {...props} className={styles.button + " " + className}>
      {text}
    </button>
  );
};
