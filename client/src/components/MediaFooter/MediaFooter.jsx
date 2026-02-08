import { BsFacebook, BsInstagram, BsLinkedin } from "react-icons/bs";
import styles from "../MediaFooter/MediaFooter.module.scss";
export const MediaFooter = () => {
  return (
    <div div className={styles.media}>
      <h3 div className={styles.media__title}>
        Media:
      </h3>
      <div className={styles.media__icons}>
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.media__link} ${styles["media__link--facebook"]}`}
        >
          <BsFacebook />
        </a>

        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.media__link} ${styles["media__link--instagram"]}`}
        >
          <BsInstagram />
        </a>

        <a
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.media__link} ${styles["media__link--linkedin"]}`}
        >
          <BsLinkedin />
        </a>
      </div>
    </div>
  );
};
