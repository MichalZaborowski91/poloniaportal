import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useCountry } from "../../app/useCountry";
import styles from "./FeaturedCompanies.module.scss";

export const FeaturedCompanies = ({ companies = [] }) => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const navigate = useNavigate();
  const country = useCountry();

  const chunkSize = 5;

  // 🔥 dzielimy firmy na grupy po 5
  const chunks = useMemo(() => {
    const result = [];
    for (let i = 0; i < companies.length; i += chunkSize) {
      result.push(companies.slice(i, i + chunkSize));
    }
    return result;
  }, [companies]);

  // 🔥 rotacja
  useEffect(() => {
    if (paused || chunks.length <= 1) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % chunks.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [paused, chunks.length]);

  if (!chunks.length) return null;

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Polecane firmy</h2>
      <div
        className={styles.grid}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {chunks[index].map((company) => (
          <div
            key={company._id}
            className={styles.card}
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
              <span>{company.city}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
