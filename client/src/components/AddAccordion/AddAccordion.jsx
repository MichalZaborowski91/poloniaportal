import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { BsChevronDown, BsChevronRight } from "react-icons/bs";
import { MdPostAdd } from "react-icons/md";
import { useCountry } from "@/app/useCountry";
import { routes } from "@/app/routes";
import styles from "./AddAccordion.module.scss";
import { ADD_MENU_ITEMS } from "@/app/addMenuItems";
import { useLocation } from "react-router-dom";

export const AddAccordion = ({ onNavigate }) => {
  const [open, setOpen] = useState(false);
  const country = useCountry();
  const location = useLocation();
  const isAddPage =
    location.pathname === routes.addOffer(country) ||
    location.pathname === routes.addCompany(country) ||
    location.pathname === routes.addEvent(country);

  const isAccordionOpen = open || isAddPage;

  useEffect(() => {
    if (!isAddPage) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOpen(false);
    }
  }, [isAddPage]);

  return (
    <div className={styles.accordion}>
      <button
        type="button"
        className={`${styles.link} ${isAccordionOpen ? styles.current : ""}`}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={isAccordionOpen}
      >
        <span className={styles.left}>
          <MdPostAdd className={styles.icon} />
          <span>Dodaj</span>
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
        {ADD_MENU_ITEMS.map((item) => (
          <li key={item.key} className={styles.item}>
            <NavLink
              to={item.path(country)}
              onClick={() => {
                setOpen(false);
                onNavigate?.();
              }}
              className={({ isActive }) =>
                isActive ? `${styles.subLink} ${styles.active}` : styles.subLink
              }
            >
              <span className={styles.subLeft}>
                <item.icon className={styles.subIcon} />
                <span>{item.label}</span>
              </span>

              <BsChevronRight className={styles.subChevron} />
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};
