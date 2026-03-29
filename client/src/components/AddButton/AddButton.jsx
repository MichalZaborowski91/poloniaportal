import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCountry } from "../../app/useCountry";
import { routes } from "../../app/routes";
import styles from "../AddButton/AddButton.module.scss";
import { BsPlus } from "react-icons/bs";

export const AddButton = ({ scrolled }) => {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const ref = useRef();
  const country = useCountry();
  const hoverTimeout = useRef(null);

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
        className={`${styles.button} ${scrolled ? styles.small : ""}`}
        onClick={() => setOpen((prev) => !prev)}
      >
        <BsPlus size={20} />
        Dodaj
      </button>

      {(open || hovered) && (
        <div className={styles.dropdown}>
          <Link
            to={routes.addOffer(country)}
            onClick={() => {
              setOpen(false);
              setHovered(false);
            }}
          >
            Ogłoszenie
          </Link>

          <Link
            to={routes.addCompany(country)}
            onClick={() => {
              setOpen(false);
              setHovered(false);
            }}
          >
            Firma
          </Link>

          <span className={styles.disabled}>Wydarzenie (wkrótce)</span>
        </div>
      )}
    </div>
  );
};
