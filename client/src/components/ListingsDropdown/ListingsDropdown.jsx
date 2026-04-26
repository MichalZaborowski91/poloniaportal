import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCountry } from "../../app/useCountry";
import styles from "./ListingsDropdown.module.scss";
import { BsChevronRight, BsChevronDown } from "react-icons/bs";

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

  const MENU = [
    {
      label: "Praca",
      category: "job",
      sub: [
        { label: "Dam pracę", type: "job_offer" },
        { label: "Szukam pracy", type: "job_wanted" },
      ],
    },
    {
      label: "Mieszkanie",
      category: "housing",
      sub: [
        { label: "Wynajmę", type: "housing_offer" },
        { label: "Szukam lokalu", type: "housing_wanted" },
      ],
    },
    {
      label: "Marketplace",
      category: "market",
      sub: [
        { label: "Sprzedam", type: "market_offer" },
        { label: "Kupię", type: "market_wanted" },
      ],
    },
    {
      label: "Usługi",
      category: "service",
      sub: [],
    },
  ];

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
          <Link to={`/${country}/listings`}>
            Wszystkie {totalCount !== null && <span>({totalCount})</span>}
          </Link>

          {MENU.map((item) => (
            <div
              key={item.category}
              className={styles.dropdownItem}
              onMouseEnter={() => setActiveItem(item.category)}
              onMouseLeave={() => setActiveItem(null)}
            >
              <Link to={`/${country}/listings?category=${item.category}`}>
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
