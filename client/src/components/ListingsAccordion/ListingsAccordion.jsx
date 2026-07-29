import { BsChevronDown } from "react-icons/bs";
import { MdArticle } from "react-icons/md";
import { BsChevronRight } from "react-icons/bs";
import styles from "./ListingsAccordion.module.scss";
import { useCountry } from "../../app/useCountry";
import { LISTING_MENU } from "../../app/listingNavigation";
import { routes } from "@/app/routes";
import { useEffect, useState } from "react";
import { NavLink, useLocation, useSearchParams } from "react-router-dom";

export const ListingsAccordion = ({ onNavigate, isMenuOpen }) => {
  const [open, setOpen] = useState(false);

  const country = useCountry();
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const isListingsPage = location.pathname === routes.listings(country);
  const activeCategory = searchParams.get("category");
  const isAccordionOpen = open || (isMenuOpen && isListingsPage);
  useEffect(() => {
    if (!isListingsPage) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOpen(false);
    }
  }, [isListingsPage]);
  return (
    <div className={styles.accordion}>
      <button
        type="button"
        className={`${styles.link} ${isListingsPage ? styles.current : ""}`}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={isAccordionOpen}
      >
        <span className={styles.left}>
          <MdArticle className={styles.icon} />
          <span>Ogłoszenia</span>
        </span>

        <BsChevronDown
          className={`${styles.chevron} ${
            isAccordionOpen ? styles.chevronOpen : ""
          }`}
        />
      </button>

      <ul
        className={`${styles.list} ${isAccordionOpen ? styles.listOpen : ""}`}
      >
        <li className={styles.item}>
          <NavLink
            to={routes.listings(country)}
            onClick={() => {
              setOpen(false);
              onNavigate?.();
            }}
            className={`${styles.subLink} ${
              isListingsPage && !activeCategory ? styles.active : ""
            }`}
          >
            <span>Wszystkie</span>

            <BsChevronRight className={styles.subChevron} />
          </NavLink>
        </li>

        {LISTING_MENU.map((item) => (
          <li key={item.category} className={styles.item}>
            <NavLink
              to={routes.listingsByCategory(country, item.category)}
              onClick={() => {
                setOpen(false);
                onNavigate?.();
              }}
              className={`${styles.subLink} ${
                isListingsPage && activeCategory === item.category
                  ? styles.active
                  : ""
              }`}
            >
              <span>{item.label}</span>

              <BsChevronRight className={styles.subChevron} />
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};
