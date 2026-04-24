import { Fragment, useEffect, useState } from "react";
import { getPublicCompanies } from "../../../api/company.js";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCountry } from "../../../app/useCountry";
import styles from "../CompaniesDatabase/CompaniesDatabase.module.scss";
import { businessCategories } from "../../../app/businessCategories.js";
import { AdBanner } from "../../../components/AddBanner/AddBanner.jsx";

export const CompaniesDatabase = () => {
  const [companies, setCompanies] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [featured, setFeatured] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const country = useCountry();

  const page = parseInt(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || "";
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const categoryParam = searchParams.get("category") || "";

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => clearTimeout(timeout);
  }, [search]);

  useEffect(() => {
    setQuery(search);
    setCategory(categoryParam);
  }, [search, categoryParam]);

  useEffect(() => {
    const load = async () => {
      setIsFetching(true);
      try {
        const data = await getPublicCompanies({
          country,
          search: debouncedSearch,
          category: categoryParam,
          page,
          limit: 16,
        });

        setCompanies(data.companies);
        setFeatured(data.featured || []);
        setTotalPages(data.totalPages);
      } catch (err) {
        console.error(err);
      } finally {
        setIsFetching(false);
      }
    };

    load();
  }, [country, categoryParam, page, debouncedSearch]);

  const totalVisibleCompanies = featured.length + companies.length;

  const adInsertIndex =
    companies.length > 0
      ? Math.max(0, Math.floor(totalVisibleCompanies / 2) - featured.length)
      : null;

  return (
    <div className="container">
      {isFetching && <div className={styles.loadingOverlay}>Ładowanie...</div>}

      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Szukaj firmy lub miasta..."
          value={query}
          onChange={(e) => {
            const value = e.target.value;
            setQuery(value);

            setSearchParams({
              page: 1,
              search: value,
              category: categoryParam,
            });
          }}
        />

        <select
          value={category}
          onChange={(e) => {
            const value = e.target.value;
            setCategory(value);

            setSearchParams({
              page: 1,
              search,
              category: value,
            });
          }}
        >
          <option value="">Wszystkie kategorie</option>

          {businessCategories.map((group) => (
            <optgroup key={group.group} label={group.group}>
              {group.items.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>
      {featured.length > 0 && (
        <div className={styles.featuredSection}>
          <h2 className={styles.featuredTitle}>⭐ Wyróżnione firmy</h2>

          <div className={styles.featuredList}>
            {featured.map((company) => (
              <div
                key={company._id}
                onClick={() => navigate(`/${country}/company/${company.slug}`)}
                className={styles.featuredCard}
              >
                <div className={styles.image}>
                  {company.logo ? (
                    <img src={company.logo} alt={company.name} />
                  ) : (
                    <span>Brak zdjęcia</span>
                  )}
                </div>

                <div className={styles.content}>
                  <h3 className={styles.title}>{company.name}</h3>
                  <p className={styles.city}>📍 {company.city}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {companies.length === 0 && featured.length >= 0 && <AdBanner />}
      <div className={styles.list}>
        {companies.map((company, index) => (
          <Fragment key={company._id}>
            {adInsertIndex !== null && index === adInsertIndex && <AdBanner />}

            <div
              onClick={() => navigate(`/${country}/company/${company.slug}`)}
              className={styles.card}
            >
              <div className={styles.image}>
                {company.logo ? (
                  <img src={company.logo} alt={company.name} />
                ) : (
                  <span>Brak zdjęcia</span>
                )}
              </div>

              <div className={styles.content}>
                <h3 className={styles.title}>{company.name}</h3>
                <p className={styles.city}>📍 {company.city}</p>
              </div>
            </div>
          </Fragment>
        ))}
      </div>

      <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() =>
              setSearchParams({
                page: i + 1,
                search,
                category: categoryParam,
              })
            }
            className={page === i + 1 ? styles.activePage : ""}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};
