import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import styles from "../Listings/Listings.module.scss";
import { AdBanner } from "../../components/AddBanner/AddBanner.jsx";

export const ListingsPage = () => {
  const [listings, setListings] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const { country } = useParams();
  const navigate = useNavigate();

  const page = parseInt(searchParams.get("page")) || 1;
  const category = searchParams.get("category") || "";
  const type = searchParams.get("type") || "";
  const q = searchParams.get("q") || "";

  const [query, setQuery] = useState(q);

  useEffect(() => {
    setQuery(q);
  }, [q]);

  useEffect(() => {
    setLoading(true);

    const params = new URLSearchParams();

    if (category) params.append("category", category);
    if (type) params.append("type", type);
    if (q) params.append("q", q);
    params.append("page", page);
    params.append("limit", 16);

    fetch(`/api/${country}/listings?${params.toString()}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch listings");
        return res.json();
      })
      .then((data) => {
        setListings(data.listings || []);
        setFeatured(data.featured || []);
        setTotalPages(data.totalPages || 1);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [country, category, type, q, page]);

  const totalVisibleListings = featured.length + listings.length;

  const adInsertIndex =
    listings.length > 0
      ? Math.max(0, Math.floor(totalVisibleListings / 2) - featured.length)
      : null;

  if (error) {
    return <p>Błąd: {error}</p>;
  }

  return (
    <div className="container">
      {loading && <div className={styles.loadingOverlay}>Ładowanie...</div>}

      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Szukaj ogłoszeń lub miasta..."
          value={query}
          onChange={(e) => {
            const value = e.target.value;
            setQuery(value);

            setSearchParams({
              page: 1,
              q: value,
              category,
              type,
            });
          }}
        />

        <select
          value={category}
          onChange={(e) => {
            const value = e.target.value;

            setSearchParams({
              page: 1,
              q,
              category: value,
              type,
            });
          }}
        >
          <option value="">Wszystkie kategorie</option>
          <option value="motoryzacja">Motoryzacja</option>
          <option value="nieruchomosci">Nieruchomości</option>
          <option value="praca">Praca</option>
          <option value="uslugi">Usługi</option>
          <option value="elektronika">Elektronika</option>
        </select>

        <select
          value={type}
          onChange={(e) => {
            const value = e.target.value;

            setSearchParams({
              page: 1,
              q,
              category,
              type: value,
            });
          }}
        >
          <option value="">Wszystkie typy</option>
          <option value="offer">Oferuję</option>
          <option value="wanted">Szukam</option>
        </select>
      </div>

      {featured.length > 0 && (
        <div className={styles.featuredSection}>
          <h2 className={styles.featuredTitle}>⭐ Wyróżnione ogłoszenia</h2>

          <div className={styles.featuredList}>
            {featured.map((listing) => (
              <div
                key={listing._id}
                onClick={() => navigate(`/${country}/listing/${listing._id}`)}
                className={styles.featuredCard}
              >
                <div className={styles.image}>
                  {listing.data?.images?.[0] || listing.data?.image ? (
                    <img
                      src={listing.data?.images?.[0] || listing.data?.image}
                      alt={listing.title}
                    />
                  ) : (
                    <span>Brak zdjęcia</span>
                  )}
                </div>

                <div className={styles.content}>
                  <h3 className={styles.title}>{listing.title}</h3>
                  <p className={styles.city}>📍 {listing.data?.city}</p>
                  <p className={styles.type}>{listing.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {listings.length === 0 && featured.length === 0 && (
        <>
          <AdBanner />
          <p>Brak ogłoszeń</p>
        </>
      )}

      <div className={styles.list}>
        {listings.map((listing, index) => (
          <Fragment key={listing._id}>
            {adInsertIndex !== null && index === adInsertIndex && <AdBanner />}

            <div
              onClick={() => navigate(`/${country}/listing/${listing._id}`)}
              className={styles.card}
            >
              <div className={styles.image}>
                {listing.data?.images?.[0] || listing.data?.image ? (
                  <img
                    src={listing.data?.images?.[0] || listing.data?.image}
                    alt={listing.title}
                  />
                ) : (
                  <span>Brak zdjęcia</span>
                )}
              </div>

              <div className={styles.content}>
                <h3 className={styles.title}>{listing.title}</h3>
                <p className={styles.description}>{listing.description}</p>

                <div className={styles.meta}>
                  <span>📍 {listing.data?.city}</span>
                  <span>{listing.type}</span>
                </div>
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
                q,
                category,
                type,
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
