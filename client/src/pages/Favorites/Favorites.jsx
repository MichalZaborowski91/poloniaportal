import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { BsHeartFill } from "react-icons/bs";
import { getFavoriteListings, removeFavoriteListing } from "../../api/listings";
import { TYPE_LABELS } from "../../app/adLabels";
import { getFavoriteCompanies, toggleFavoriteCompany } from "../../api/company";

import styles from "./Favorites.module.scss";

export const Favorites = () => {
  const { country } = useParams();

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [companies, setCompanies] = useState([]);

  const totalFavorites = listings.length + companies.length;

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const data = await getFavoriteListings(country);

        const companyData = await getFavoriteCompanies();

        setListings(data);
        setCompanies(companyData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [country]);

  const handleRemoveFavorite = async (listingId) => {
    try {
      await removeFavoriteListing(country, listingId);

      setListings((prev) =>
        prev.filter((listing) => listing._id !== listingId),
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveFavoriteCompany = async (companyId) => {
    try {
      await toggleFavoriteCompany(companyId);

      setCompanies((prev) =>
        prev.filter((company) => company._id !== companyId),
      );
    } catch (err) {
      console.error(err);
    }
  };

  const getPlaceholderImage = (type) => {
    switch (type) {
      case "housing_offer":
      case "housing_wanted":
        return "/offersCategories/Housing.webp";

      case "job_offer":
      case "job_wanted":
        return "/offersCategories/Job.webp";

      case "market_offer":
      case "market_wanted":
        return "/offersCategories/Marketplace.webp";

      case "service_offer":
        return "/offersCategories/Services.webp";

      default:
        return "/placeholder.webp";
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  const showListings = activeFilter === "all" || activeFilter === "listings";

  const showCompanies = activeFilter === "all" || activeFilter === "companies";

  return (
    <div className={styles.favorites}>
      <aside className={styles.sidebar}>
        <h2>Ulubione</h2>

        <button
          className={
            activeFilter === "all" ? styles.activeFilter : styles.filterButton
          }
          onClick={() => setActiveFilter("all")}
        >
          Wszystkie ({totalFavorites})
        </button>

        <button
          className={
            activeFilter === "listings"
              ? styles.activeFilter
              : styles.filterButton
          }
          onClick={() => setActiveFilter("listings")}
        >
          Ogłoszenia ({listings.length})
        </button>

        <button
          className={
            activeFilter === "companies"
              ? styles.activeFilter
              : styles.filterButton
          }
          onClick={() => setActiveFilter("companies")}
        >
          Firmy ({companies.length})
        </button>

        <button disabled>Wydarzenia (0)</button>

        <button disabled>Użytkownicy (0)</button>
      </aside>

      <main className={styles.content}>
        <h1>Ulubione ogłoszenia</h1>

        {showListings && (
          <>
            {listings.length === 0 ? (
              <p>Nie masz jeszcze ulubionych ogłoszeń.</p>
            ) : (
              <div className={styles.grid}>
                {listings.map((listing) => {
                  const image =
                    listing.data?.images?.[0] ||
                    listing.data?.image ||
                    getPlaceholderImage(listing.type);

                  return (
                    <Link
                      key={listing._id}
                      to={`/${country}/listing/${listing._id}`}
                      className={styles.card}
                    >
                      <img
                        src={image}
                        alt={listing.title}
                        className={styles.image}
                      />

                      <div className={styles.info}>
                        <h3>{listing.title}</h3>

                        <span className={styles.type}>
                          {TYPE_LABELS[listing.type]}
                        </span>
                      </div>

                      <button
                        className={styles.favoriteButton}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();

                          handleRemoveFavorite(listing._id);
                        }}
                      >
                        Usuń z ulubionych
                      </button>
                    </Link>
                  );
                })}
              </div>
            )}
          </>
        )}
        {showCompanies && companies.length > 0 && (
          <div className={styles.grid}>
            {companies.map((company) => (
              <Link
                key={company._id}
                to={`/${country}/company/${company.slug}`}
                className={styles.card}
              >
                <img
                  src={
                    company.logo ||
                    "/companyLogoPlaceholder/companyLogoPlaceholder.webp"
                  }
                  alt={company.name}
                  className={styles.image}
                />

                <div className={styles.info}>
                  <h3>{company.name}</h3>

                  <span className={styles.type}>{company.category}</span>
                </div>

                <button
                  className={styles.favoriteButton}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    handleRemoveFavoriteCompany(company._id);
                  }}
                >
                  Usuń z ulubionych
                </button>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
