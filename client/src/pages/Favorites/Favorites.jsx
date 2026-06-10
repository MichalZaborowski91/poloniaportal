import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { BsHeartFill } from "react-icons/bs";
import { getFavoriteListings, removeFavoriteListing } from "../../api/listings";
import { TYPE_LABELS } from "../../app/adLabels";

import styles from "./Favorites.module.scss";

export const Favorites = () => {
  const { country } = useParams();

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const data = await getFavoriteListings(country);

        setListings(data);
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
          Wszystkie
        </button>

        <button
          className={
            activeFilter === "listings"
              ? styles.activeFilter
              : styles.filterButton
          }
          onClick={() => setActiveFilter("listings")}
        >
          Ogłoszenia
        </button>

        <button disabled>Firmy</button>

        <button disabled>Wydarzenia</button>

        <button disabled>Użytkownicy</button>
      </aside>

      <main className={styles.content}>
        <h1>Ulubione ogłoszenia</h1>

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
      </main>
    </div>
  );
};
