import styles from "./Spinner.module.scss";

export const Spinner = ({ size = "small" }) => {
  return <span className={`${styles.spinner} ${styles[size]}`} />;
};
