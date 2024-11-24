import styles from "./Button.module.css";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
};

export const Button: React.FC<ButtonProps> = ({ text, ...props }) => {
  return (
    <button {...props} className={styles.button}>
      {text}
    </button>
  );
};
