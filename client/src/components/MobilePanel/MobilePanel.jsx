import styles from "./MobilePanel.module.scss";

export const MobilePanel = ({ id, isOpen, children }) => {
  return (
    <aside
      id={id}
      onClick={(e) => e.stopPropagation()}
      className={`${styles.panel} ${isOpen ? styles.open : ""}`}
    >
      <div className={styles.content}>{children}</div>
    </aside>
  );
};
