import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCountry } from "../../app/useCountry";
import styles from "./ListingsDropdown.module.scss";
import { BsChevronRight, BsChevronDown } from "react-icons/bs";
import { LISTING_MENU } from "../../app/listingNavigation";
import { MdArticle } from "react-icons/md";

export const ListingsDropdown = () => {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [totalCount, setTotalCount] = useState(null);
  const ref = useRef();
  const country = useCountry();
  const location = useLocation();
  const hoverTimeout = useRef(null);

  const isActive = location.pathname.startsWith(`/${country}/listings`);

  useEffect(() => {
    const fetchTotal = async () => {
      try {
        const res = await fetch(`/api/${country}/listings`, {
          cache: "no-store",
        });
        console.log("FETCH COUNTRY:", country);
        const data = await res.json();

        setTotalCount(data.totalAll);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTotal();
  }, [country, location.pathname]);

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

  const handleClose = () => {
    setOpen(false);
    setHovered(false);
    setActiveItem(null);
  };

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
        <>
          <MdArticle />
          <span>Ogłoszenia</span>
        </>
        <BsChevronDown
          size={16}
          className={`${styles.chevron} ${open || hovered ? styles.open : ""}`}
        />
      </button>

      {(open || hovered) && (
        <div className={styles.dropdown}>
          <Link to={`/${country}/listings`} onClick={handleClose}>
            Wszystkie {totalCount !== null && <span>({totalCount})</span>}
          </Link>

          {LISTING_MENU.map((item) => (
            <div
              key={item.category}
              className={styles.dropdownItem}
              onMouseEnter={() => setActiveItem(item.category)}
              onMouseLeave={() => setActiveItem(null)}
            >
              <Link
                to={`/${country}/listings?category=${item.category}`}
                onClick={handleClose}
              >
                {item.label}
                {item.sub.length > 0 &&
                  (activeItem === item.category ? (
                    <BsChevronRight style={{ transform: "translateX(5px)" }} />
                  ) : (
                    <BsChevronRight />
                  ))}
              </Link>

              {/* SUBMENU */}
              {item.sub.length > 0 && activeItem === item.category && (
                <div className={styles.submenu}>
                  {item.sub.map((sub) => (
                    <Link
                      key={sub.type}
                      to={`/${country}/listings?type=${sub.type}`}
                      onClick={handleClose}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
