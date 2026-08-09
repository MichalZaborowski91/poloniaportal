import styles from "./PasswordStrength.module.scss";

export const PasswordStrength = ({
  touched,
  strength,
  mismatch,
  checks,
  variant,
}) => {
  if (!touched) {
    return null;
  }

  return (
    <div
      className={`${styles.passwordStrength} ${
        variant === "modal" ? styles.modal : ""
      }`}
    >
      <div className={styles.wrapper}>
        <div
          className={`${styles.bar} ${
            strength <= 2
              ? styles.weak
              : strength <= 4
                ? styles.medium
                : styles.strong
          }`}
          style={{ width: `${(strength / 5) * 100}%` }}
        />
      </div>

      <p
        className={`${styles.info} ${
          mismatch ? styles.error : styles.rulesInfo
        }`}
      >
        {mismatch
          ? "Hasła muszą być takie same."
          : "Hasło musi zawierać przynajmniej:"}
      </p>

      <ul className={styles.rules}>
        <li
          className={`${styles.rule} ${checks.length ? styles.ok : styles.bad}`}
        >
          8 znaków
        </li>

        <li
          className={`${styles.rule} ${
            checks.uppercase ? styles.ok : styles.bad
          }`}
        >
          Jedną dużą literę
        </li>

        <li
          className={`${styles.rule} ${
            checks.lowercase ? styles.ok : styles.bad
          }`}
        >
          Jedną małą literę
        </li>

        <li
          className={`${styles.rule} ${checks.number ? styles.ok : styles.bad}`}
        >
          Jedną cyfrę
        </li>
      </ul>
    </div>
  );
};
