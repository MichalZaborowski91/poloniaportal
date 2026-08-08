import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { MdExpandMore } from "react-icons/md";
import styles from "./SectionMenu.module.scss";

export const SectionMenu = ({ title, items }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const activeItem =
    items.find((item) => location.pathname === item.to) || items[0];
  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.title}>{title}</h2>
      <button
        type="button"
        className={`${styles.mobileMenu} ${
          isOpen ? styles.mobileMenuOpen : ""
        }`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className={styles.mobileMenuContent}>
          {activeItem.icon}
          {activeItem.label}
        </span>

        <MdExpandMore
          className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}
        />
      </button>
      <ul
        className={`${styles.mobileList} ${
          isOpen ? styles.mobileListOpen : ""
        }`}
      >
        {items.map((item) => (
          <li key={item.to}>
            <NavLink
              end={item.end}
              to={item.to}
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ""}`
              }
              onClick={() => setIsOpen(false)}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
      <nav>
        <ul className={styles.list}>
          {items.map((item) => (
            <li key={item.to}>
              <NavLink
                end={item.end}
                to={item.to}
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.active : ""}`
                }
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
