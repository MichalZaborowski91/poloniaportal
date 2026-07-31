import styles from "./MobileMenuSection.module.scss";

export const MobileMenuSection = ({ title, children, className = "" }) => {
  return (
    <section className={`${styles.section} ${className}`}>
      {title && <h2 className={styles.title}>{title}</h2>}

      {children}
    </section>
  );
};
