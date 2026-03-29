import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCountry } from "../../app/useCountry";
import styles from "./ListingsDropdown.module.scss";
import { BsChevronDown } from "react-icons/bs";

export const ListingsDropdown = () => {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const ref = useRef();
  const country = useCountry();
  const location = useLocation();
  const hoverTimeout = useRef(null);

  const isActive = location.pathname.startsWith(`/${country}/listings`);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    return () => clearTimeout(hoverTimeout.current);
  }, []);

  return (
    <div
      className={styles.wrapper}
      ref={ref}
      onMouseEnter={() => {
        clearTimeout(hoverTimeout.current);
        setHovered(true);
      }}
      onMouseLeave={() => {
        hoverTimeout.current = setTimeout(() => {
          setHovered(false);
        }, 150);
      }}
    >
      <button
        className={`${styles.button} ${isActive ? styles.active : ""}`}
        onClick={() => setOpen((prev) => !prev)}
      >
        Ogłoszenia
        <BsChevronDown
          size={16}
          className={`${styles.chevron} ${open || hovered ? styles.open : ""}`}
        />
      </button>

      {(open || hovered) && (
        <div className={styles.dropdown}>
          <Link
            to={`/${country}/listings`}
            onClick={() => {
              setOpen(false);
              setHovered(false);
            }}
          >
            Wszystkie
          </Link>
          <Link
            to={`/${country}/listings?category=praca`}
            onClick={() => {
              setOpen(false);
              setHovered(false);
            }}
          >
            Praca
          </Link>
          <Link
            to={`/${country}/listings?category=mieszkanie`}
            onClick={() => {
              setOpen(false);
              setHovered(false);
            }}
          >
            Mieszkanie
          </Link>
          <Link
            to={`/${country}/listings?category=motoryzacja`}
            onClick={() => {
              setOpen(false);
              setHovered(false);
            }}
          >
            Motoryzacja
          </Link>
        </div>
      )}
    </div>
  );
};
