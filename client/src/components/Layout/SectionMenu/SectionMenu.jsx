import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { MdExpandMore, MdChevronRight } from "react-icons/md";
import styles from "./SectionMenu.module.scss";

export const SectionMenu = ({ title, items }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const isHashMenu = items.some((item) => item.to.startsWith("#"));

  const activeItem = isHashMenu
    ? items.find((item) => item.to === location.hash) || items[0]
    : items.find((item) => location.pathname === item.to) || items[0];

  const handleHashClick = (e, item) => {
    e.preventDefault();

    const id = item.to.substring(1);

    setIsOpen(false);
    navigate(item.to);

    const isMobile = window.innerWidth <= 767;

    const scrollToSection = () => {
      const element = document.getElementById(id);

      if (!element) return;

      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    };

    if (isMobile) {
      //WAIT UNTIL MOBILE MENU WILL CLOSE COMPLETLY
      setTimeout(scrollToSection, 220);
    } else {
      scrollToSection();
    }
  };

  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.title}>{title}</h2>

      {/* MOBILE */}
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
            {item.to.startsWith("#") ? (
              <a
                href={item.to}
                className={`${styles.link} ${
                  location.hash === item.to ? styles.active : ""
                }`}
                onClick={(e) => handleHashClick(e, item)}
              >
                <span className={styles.linkContent}>
                  {item.icon}
                  <span>{item.label}</span>
                </span>

                <MdChevronRight className={styles.chevron} />
              </a>
            ) : (
              <NavLink
                end={item.end}
                to={item.to}
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.active : ""}`
                }
                onClick={() => setIsOpen(false)}
              >
                <span className={styles.linkContent}>
                  {item.icon}
                  <span>{item.label}</span>
                </span>

                <MdChevronRight className={styles.chevron} />
              </NavLink>
            )}
          </li>
        ))}
      </ul>

      {/* DESKTOP / TABLET */}
      <nav>
        <ul className={styles.list}>
          {items.map((item) => (
            <li key={item.to}>
              {item.to.startsWith("#") ? (
                <a
                  href={item.to}
                  className={`${styles.link} ${
                    location.hash === item.to ? styles.active : ""
                  }`}
                  onClick={(e) => handleHashClick(e, item)}
                >
                  <span className={styles.linkContent}>
                    {item.icon}
                    <span>{item.label}</span>
                  </span>

                  <MdChevronRight className={styles.chevron} />
                </a>
              ) : (
                <NavLink
                  end={item.end}
                  to={item.to}
                  className={({ isActive }) =>
                    `${styles.link} ${isActive ? styles.active : ""}`
                  }
                >
                  <span className={styles.linkContent}>
                    {item.icon}
                    <span>{item.label}</span>
                  </span>

                  <MdChevronRight className={styles.chevron} />
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
