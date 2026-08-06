import { useNavigate } from "react-router-dom";
import { useCountry } from "../../app/useCountry";
import styles from "./LatestListings.module.scss";
import Container from "../Layout/Container";
import { MdChevronRight, MdLocationOn, MdSchedule } from "react-icons/md";

const TYPE_LABEL = {
  job_offer: "Praca",
  job_wanted: "Praca",
  housing_offer: "Mieszkanie",
  housing_wanted: "Mieszkanie",
  market_offer: "Marketplace",
  market_wanted: "Marketplace",
  service_offer: "Usługi",
};

const TYPE_COLOR = {
  job_offer: "job",
  job_wanted: "job",
  housing_offer: "housing",
  housing_wanted: "housing",
  market_offer: "market",
  market_wanted: "market",
  service_offer: "service",
};

const FALLBACK_IMAGES = {
  service_offer: "/offersCategories/Services.webp",
  job_offer: "/offersCategories/Jobs.webp",
  job_wanted: "/offersCategories/Jobs.webp",
  housing_offer: "/offersCategories/Housing.webp",
  housing_wanted: "/offersCategories/Housing.webp",
  market_offer: "/offersCategories/Marketplace.webp",
  market_wanted: "/offersCategories/Marketplace.webp",
};

const formatRelativeDate = (date) => {
  const now = new Date();
  const created = new Date(date);

  const diffMinutes = Math.floor((now - created) / 60000);

  if (diffMinutes < 60) {
    return `${diffMinutes} min temu`;
  }

  const diffHours = Math.floor(diffMinutes / 60);

  if (diffHours < 24) {
    return `${diffHours} godz. temu`;
  }

  const diffDays = Math.floor(diffHours / 24);

  if (diffDays < 30) {
    return `${diffDays} dni temu`;
  }

  const diffMonths = Math.floor(diffDays / 30);

  if (diffMonths < 12) {
    return `${diffMonths} mies. temu`;
  }

  const diffYears = Math.floor(diffMonths / 12);

  return `${diffYears} lat temu`;
};

export const LatestListings = ({ listings = [] }) => {
  const navigate = useNavigate();
  const country = useCountry();

  if (!listings.length) return null;

  return (
    <section className={styles.wrapper}>
      <Container>
        <div className={styles.header}>
          <h2 className={styles.title}>Najnowsze ogłoszenia</h2>

          <button
            type="button"
            className={styles.seeAll}
            onClick={() => navigate(`/${country}/listings`)}
          >
            <span>Zobacz wszystkie</span>
            <MdChevronRight size={20} />
          </button>
        </div>

        <div className={styles.grid}>
          {listings.map((item) => (
            <div
              key={item._id}
              className={styles.card}
              onClick={() => navigate(`/${country}/listing/${item._id}`)}
            >
              <div className={styles.imageWrapper}>
                <img
                  src={item.coverImage || FALLBACK_IMAGES[item.type]}
                  alt={item.title}
                />
                <div
                  className={`${styles.badge} ${styles[TYPE_COLOR[item.type]]}`}
                >
                  {TYPE_LABEL[item.type]}
                </div>
              </div>

              <div className={styles.info}>
                <strong>{item.title}</strong>

                {item.city && (
                  <div className={styles.meta}>
                    <MdLocationOn />
                    <span>{item.city}</span>
                  </div>
                )}

                <div className={styles.meta}>
                  <MdSchedule />
                  <span>{formatRelativeDate(item.createdAt)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
