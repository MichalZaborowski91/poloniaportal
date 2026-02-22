import styles from "../HcaptchaBadge/HcaptchaBadge.module.scss";
import Hcaptcha from "../../assets/hcaptcha/hcaptchaLogo.svg?react";

export const HcaptchaBadge = () => {
  return (
    <div className={styles.hcaptchaBadge}>
      <div className={styles.hcaptchaBadge__container}>
        <div className={styles.hcaptchaBadge__icon}>
          <Hcaptcha />
        </div>

        <div className={styles.hcaptchaBadge__info}>
          <h3 className={styles.hcaptchaBadge__title}>
            Chronione przez hCaptcha
          </h3>
          <div>
            <ul className={styles.hcaptchaBadge__list}>
              <li className={styles.hcaptchaBadge__item}>
                <a
                  href="https://www.hcaptcha.com/privacy"
                  target="_blank"
                  rel="noreferrer"
                >
                  Prywatność
                </a>
              </li>
              <li className={styles.hcaptchaBadge__item}>
                <a
                  href="https://www.hcaptcha.com/terms"
                  target="_blank"
                  rel="noreferrer"
                >
                  Warunki
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
