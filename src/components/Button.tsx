import type { ButtonType } from "../types/type";
import styles from "./Button.module.css";
function Button({ children, onClick, type }: ButtonType) {
  return <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
    {children}
  </button>;
}

export default Button;
