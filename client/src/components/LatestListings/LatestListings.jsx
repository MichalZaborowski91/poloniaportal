import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCountry } from "../../app/useCountry";
import styles from "./LatestListings.module.scss";

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

export const LatestListings = () => {
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();
  const country = useCountry();

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const res = await fetch(`/api/${country}/listings?limit=5`);
        const data = await res.json();

        setListings(data.listings);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLatest();
  }, [country]);

  if (!listings.length) return null;

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Najnowsze ogłoszenia</h2>

      <div className={styles.grid}>
        {listings.map((item) => (
          <div
            key={item._id}
            className={styles.card}
            onClick={() => navigate(`/${country}/listings/${item._id}`)}
          >
            <div className={`${styles.badge} ${styles[TYPE_COLOR[item.type]]}`}>
              {TYPE_LABEL[item.type]}
            </div>
            <img
              src={
                item.images?.[0] ||
                "/listingPlaceholder/listingPlaceholder.webp"
              }
              alt={item.title}
            />

            <div className={styles.info}>
              <strong>{item.title}</strong>
              <span>{item.data?.city}</span>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.footer}>
        <span
          className={styles.seeAll}
          onClick={() => navigate(`/${country}/listings`)}
        >
          Zobacz wszystkie...
        </span>
      </div>
    </div>
  );
};
