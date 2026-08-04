import { useEffect, useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCountry } from "../../app/useCountry";
import styles from "./FeaturedCompanies.module.scss";
import Container from "../Layout/Container";
import { MdLocationOn, MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { AnimatePresence, motion } from "motion/react";
const AUTOPLAY_DELAY = 7000;
const DESKTOP_ITEMS = 5;
const TABLET_ITEMS = 3;
const MOBILE_ITEMS = 2;

const gridVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.96,
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.35,
      ease: "easeOut",
    },
  },

  exit: {
    opacity: 0,
    y: -20,
    scale: 0.96,
    transition: {
      duration: 0.2,
    },
  },
};

export const FeaturedCompanies = ({ companies = [] }) => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const autoplayTimeout = useRef(null);
  const navigate = useNavigate();
  const country = useCountry();
  const isTablet = useMediaQuery("(min-width: 768px)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const chunkSize = isDesktop
    ? DESKTOP_ITEMS
    : isTablet
      ? TABLET_ITEMS
      : MOBILE_ITEMS;

  const chunks = useMemo(() => {
    const groupedCompanies = [];

    for (let i = 0; i < companies.length; i += chunkSize) {
      groupedCompanies.push(companies.slice(i, i + chunkSize));
    }

    return groupedCompanies;
  }, [companies, chunkSize]);

  useEffect(() => {
    if (paused || chunks.length <= 1) return;

    autoplayTimeout.current = setTimeout(() => {
      goToSlide((index + 1) % chunks.length);
    }, AUTOPLAY_DELAY);

    return () => clearTimeout(autoplayTimeout.current);
  }, [index, paused, chunks.length]);

  const goToSlide = (newIndex) => {
    setIndex(newIndex);
  };

  const handlePrev = () => {
    goToSlide(index === 0 ? chunks.length - 1 : index - 1);
  };

  const handleNext = () => {
    goToSlide((index + 1) % chunks.length);
  };

  if (!chunks.length) return null;

  const currentChunk = chunks[index] ?? chunks[0];

  return (
    <div className={styles.wrapper}>
      <Container>
        <div className={styles.header}>
          <h2 className={styles.title}>Polecane firmy</h2>

          {chunks.length > 1 && (
            <div className={styles.controls}>
              <button
                type="button"
                onClick={handlePrev}
                className={styles.arrow}
                aria-label="Poprzednie firmy"
              >
                <MdChevronLeft size={24} />
              </button>

              <button
                type="button"
                onClick={handleNext}
                className={styles.arrow}
                aria-label="Następne firmy"
              >
                <MdChevronRight size={24} />
              </button>
            </div>
          )}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className={styles.grid}
            variants={gridVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {currentChunk.map((company) => (
              <motion.article
                key={company._id}
                className={styles.card}
                variants={cardVariants}
                onClick={() => navigate(`/${country}/company/${company.slug}`)}
              >
                <img
                  src={
                    company.logo ||
                    "/companyLogoPlaceholder/companyLogoPlaceholder.webp"
                  }
                  alt={company.name}
                />

                <div className={styles.info}>
                  <strong>{company.name}</strong>

                  <div className={styles.category}>{company.category}</div>

                  {company.city?.trim() && (
                    <div className={styles.city}>
                      <MdLocationOn />
                      <span>{company.city}</span>
                    </div>
                  )}
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>
      </Container>
    </div>
  );
};
