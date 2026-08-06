import { useEffect, useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCountry } from "../../app/useCountry";
import styles from "./FeaturedCompanies.module.scss";
import Container from "../Layout/Container";
import { MdLocationOn, MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { motion } from "motion/react";
const AUTOPLAY_DELAY = 7000;
const DESKTOP_ITEMS = 5;
const TABLET_ITEMS = 3;
const MOBILE_ITEMS = 2;

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
};
export const FeaturedCompanies = ({ companies = [] }) => {
  const [index, setIndex] = useState(1);
  const [paused, setPaused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);
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

  const slides = useMemo(() => {
    if (chunks.length <= 1) return chunks;

    return [chunks[chunks.length - 1], ...chunks, chunks[0]];
  }, [chunks]);

  useEffect(() => {
    if (!slides.length) return;

    if (index >= slides.length) {
      setIndex(1);
    }

    if (index < 0) {
      setIndex(slides.length - 2);
    }
  }, [index, slides.length]);

  useEffect(() => {
    if (paused || slides.length <= 1) return;

    autoplayTimeout.current = setTimeout(() => {
      goToNext();
    }, AUTOPLAY_DELAY);

    return () => clearTimeout(autoplayTimeout.current);
  }, [index, paused, slides.length]);

  useEffect(() => {
    if (isAnimating) return;

    const id = requestAnimationFrame(() => {
      setIsAnimating(true);
    });

    return () => cancelAnimationFrame(id);
  }, [isAnimating]);

  const goToNext = () => {
    setIndex((prev) => prev + 1);
  };

  const goToPrev = () => {
    setIndex((prev) => prev - 1);
  };

  const handlePrev = () => {
    goToPrev();
  };

  const handleNext = () => {
    goToNext();
  };

  const translateX = `-${index * 100}%`;

  const handleAnimationComplete = () => {
    if (index === slides.length - 1) {
      setIsAnimating(false);
      setIndex(1);
      return;
    }

    if (index === 0) {
      setIsAnimating(false);
      setIndex(slides.length - 2);
    }
  };

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

        <div
          className={styles.viewport}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <motion.div
            className={styles.track}
            animate={{
              x: translateX,
            }}
            transition={
              isAnimating
                ? {
                    duration: 0.45,
                    ease: "easeInOut",
                  }
                : {
                    duration: 0,
                  }
            }
            onAnimationComplete={handleAnimationComplete}
          >
            {slides.map((chunk, chunkIndex) => (
              <div key={chunkIndex} className={styles.slide}>
                <div className={styles.grid}>
                  {chunk.map((company) => (
                    <motion.article
                      key={company._id}
                      className={styles.card}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      onClick={() =>
                        navigate(`/${country}/company/${company.slug}`)
                      }
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

                        <div className={styles.category}>
                          {company.category}
                        </div>

                        {company.city?.trim() && (
                          <div className={styles.city}>
                            <MdLocationOn />
                            <span>{company.city}</span>
                          </div>
                        )}
                      </div>
                    </motion.article>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </Container>
    </div>
  );
};
