import styles from "../PasswordStrength/PasswordStrength.module.scss";

export const PasswordStrength = ({ touched, strength, mismatch, checks }) => {
  if (!touched) {
    return null;
  }

  return (
    <div className={styles.passwordStrength}>
      <div className={styles.passwordStrength__wrapper}>
        <div
          className={`${styles.passwordStrength__bar} ${
            strength <= 2
              ? styles[`passwordStrength__bar--weak`]
              : strength <= 4
                ? styles[`passwordStrength__bar--medium`]
                : styles[`passwordStrength__bar--strong`]
          }`}
          style={{ width: `${(strength / 5) * 100}%` }}
        />
      </div>

      <p
        className={`${styles.passwordStrength__info} ${
          mismatch
            ? styles["passwordStrength__info--error"]
            : styles["passwordStrength__info--rules"]
        }`}
      >
        {mismatch
          ? "Hasła muszą być takie same."
          : "Hasło musi zawierać przynajmniej:"}
      </p>

      <ul className={styles.passwordStrength__rulesList}>
        <li
          className={`${styles.passwordStrength__rulesItem} ${
            checks.length
              ? styles["passwordStrength__rulesItem--ok"]
              : styles["passwordStrength__rulesItem--bad"]
          }`}
        >
          8 znaków
        </li>
        <li
          className={`${styles.passwordStrength__rulesItem} ${
            checks.uppercase
              ? styles["passwordStrength__rulesItem--ok"]
              : styles["passwordStrength__rulesItem--bad"]
          }`}
        >
          Jedną dużą literę
        </li>
        <li
          className={`${styles.passwordStrength__rulesItem} ${
            checks.lowercase
              ? styles["passwordStrength__rulesItem--ok"]
              : styles["passwordStrength__rulesItem--bad"]
          }`}
        >
          Jedną małą literę
        </li>
        <li
          className={`${styles.passwordStrength__rulesItem} ${
            checks.number
              ? styles["passwordStrength__rulesItem--ok"]
              : styles["passwordStrength__rulesItem--bad"]
          }`}
        >
          Jedną cyfrę
        </li>
      </ul>
    </div>
  );
};
