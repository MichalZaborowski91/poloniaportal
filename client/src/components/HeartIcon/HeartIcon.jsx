import { useEffect, useRef } from "react";
import Heart from "../../assets/icons/heart.svg?react";
import styles from "../HeartIcon/HeartIcon.module.scss";

export const HeartIcon = () => {
  const heartRef = useRef(null);

  const heartTransform = {
    initialScale: 1,
    firstBeat: 1.1,
    secondBeat: 1.3,
    transition: "transform 0.2s ease",
  };

  const handleHeartBeat = () => {
    const { initialScale, firstBeat, secondBeat, transition } = heartTransform;
    const heartIcon = heartRef.current;

    if (!heartIcon) return;

    heartIcon.style.transform = `scale(${firstBeat})`;
    heartIcon.style.transition = transition;

    setTimeout(() => {
      heartIcon.style.transform = `scale(${initialScale})`;
    }, 200);

    setTimeout(() => {
      heartIcon.style.transform = `scale(${secondBeat})`;
    }, 400);

    setTimeout(() => {
      heartIcon.style.transform = `scale(${initialScale})`;
    }, 700);
  };

  useEffect(() => {
    const interval = setInterval(handleHeartBeat, 1400);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={heartRef} className={styles.heart}>
      <Heart className={styles.heart__icon} />
    </div>
  );
};
