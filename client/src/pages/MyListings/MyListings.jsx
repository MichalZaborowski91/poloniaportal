import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "../MyListings/MyListings.module.scss";
import { TYPE_LABELS } from "../../app/adLabels";
import {
  getMyListings,
  deleteListing,
  renewListing,
  featureListing,
} from "../../api/listings";

export const MyListings = () => {
  const { country } = useParams();

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [renewModal, setRenewModal] = useState(null);

  const [renewData, setRenewData] = useState({
    durationDays: 7,
    featuredDays: 0,
    isUrgent: false,
  });

  const [featureModal, setFeatureModal] = useState(null);

  const [featureData, setFeatureData] = useState({
    featuredDays: 7,
    isUrgent: false,
  });

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("pl-PL", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };
  const handleDelete = async (listingId) => {
    const confirmDelete = window.confirm(
      "Czy na pewno chcesz usunąć ogłoszenie?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteListing(country, listingId);

      setListings((prev) =>
        prev.filter((listing) => listing._id !== listingId),
      );
    } catch (err) {
      console.error(err);
      alert("Nie udało się usunąć ogłoszenia");
    }
  };

  const handleRenew = async () => {
    try {
      const result = await renewListing(country, renewModal._id, renewData);

      setListings((prev) =>
        prev.map((listing) => {
          if (listing._id !== renewModal._id) {
            return listing;
          }

          return {
            ...listing,
            status: "active",
            isExpired: false,
            expiresAt: result.expiresAt,
            featuredUntil: result.featuredUntil,
            isFeaturedActive: result.isFeaturedActive,
            isUrgent: result.isUrgent,
          };
        }),
      );

      setRenewModal(null);
    } catch (err) {
      console.error(err);

      alert("Nie udało się przedłużyć ogłoszenia");
    }
  };

  const handleFeature = async () => {
    try {
      const result = await featureListing(
        country,
        featureModal._id,
        featureData,
      );

      setListings((prev) =>
        prev.map((listing) => {
          if (listing._id !== featureModal._id) {
            return listing;
          }

          return {
            ...listing,
            featuredUntil: result.featuredUntil,
            expiresAt: result.expiresAt,
            isUrgent: result.isUrgent,
            isFeaturedActive: true,
          };
        }),
      );

      setFeatureModal(null);
    } catch (err) {
      console.error(err);

      alert("Nie udało się wyróżnić ogłoszenia");
    }
  };
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listings = await getMyListings(country);

        setListings(listings);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [country]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const availableTypes = [...new Set(listings.map((l) => l.type))];

  const FILTER_LABELS = {
    all: "Wszystkie",
    active: "Aktywne",
    expired: "Wygasłe",

    service_offer: "Usługi",
    market_offer: "Sprzedam",
    market_wanted: "Kupię",

    housing_offer: "Wynajmę",
    housing_wanted: "Szukam lokalu",

    job_offer: "Dam pracę",
    job_wanted: "Szukam pracy",
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

  const filteredListings = listings.filter((listing) => {
    if (activeFilter === "all") {
      return true;
    }

    if (activeFilter === "active") {
      return !listing.isExpired;
    }

    if (activeFilter === "expired") {
      return listing.isExpired;
    }

    return listing.type === activeFilter;
  });

  const getTotalPrice = (data, modal) => {
    let total = 0;

    // FEATURED
    if (data.featuredDays === 7) {
      total += 1;
    }

    if (data.featuredDays === 14) {
      total += 2;
    }

    if (data.featuredDays === 31) {
      total += 3;
    }

    // URGENT
    if (data.isUrgent && !modal?.isUrgent) {
      total += 1;
    }

    return total;
  };

  return (
    <div className={styles.myListings}>
      <h1>Moje ogłoszenia</h1>
      <div className={styles.filters}>
        <button
          className={`${styles.filterButton} ${
            activeFilter === "all" ? styles.activeFilter : ""
          }`}
          onClick={() => setActiveFilter("all")}
        >
          Wszystkie
        </button>

        <button
          className={`${styles.filterButton} ${
            activeFilter === "active" ? styles.activeFilter : ""
          }`}
          onClick={() => setActiveFilter("active")}
        >
          Aktywne
        </button>

        <button
          className={`${styles.filterButton} ${
            activeFilter === "expired" ? styles.activeFilter : ""
          }`}
          onClick={() => setActiveFilter("expired")}
        >
          Wygasłe
        </button>

        {availableTypes.map((type) => (
          <button
            key={type}
            className={`${styles.filterButton} ${
              activeFilter === type ? styles.activeFilter : ""
            }`}
            onClick={() => setActiveFilter(type)}
          >
            {FILTER_LABELS[type]}
          </button>
        ))}
      </div>
      {listings.length === 0 ? (
        <p>Nie masz jeszcze żadnych ogłoszeń.</p>
      ) : (
        <div className={styles.grid}>
          {filteredListings.map((listing) => {
            const image =
              listing.data?.images?.[0] ||
              listing.data?.image ||
              getPlaceholderImage(listing.type);

            return (
              <div key={listing._id} className={styles.card}>
                <img src={image} alt={listing.title} className={styles.image} />

                <div className={styles.content}>
                  <h3>{listing.title}</h3>
                  <div className={styles.top}>
                    <span className={styles.type}>
                      {TYPE_LABELS[listing.type]}
                    </span>

                    {listing.isExpired ? (
                      <span className={styles.expired}>Wygasło</span>
                    ) : (
                      <span className={styles.active}>Aktywne</span>
                    )}
                  </div>

                  <p>👁 {listing.views || 0} wyświetleń</p>

                  <p>❤️ {listing.favoritesCount || 0}</p>

                  <p className={styles.date}>
                    Dodano: {formatDate(listing.createdAt)} •{" "}
                    {listing.company
                      ? `Jako ${listing.company.name}`
                      : "Prywatnie"}
                  </p>

                  {!listing.isPermanent &&
                    listing.expiresAt &&
                    !listing.isExpired && (
                      <p className={styles.date}>
                        Wygasa: {formatDate(listing.expiresAt)}
                      </p>
                    )}

                  {listing.isFeaturedActive ? (
                    <p className={styles.featured}>
                      🔥 Wyróżnione do {formatDate(listing.featuredUntil)}
                    </p>
                  ) : (
                    <p className={styles.notFeatured}>⚪ Brak wyróżnienia</p>
                  )}

                  <div className={styles.actions}>
                    <Link to={`/${country}/listing/${listing._id}`}>
                      Podgląd
                    </Link>

                    {!listing.isExpired ? (
                      <Link to={`/${country}/edit-listing/${listing._id}`}>
                        Edytuj
                      </Link>
                    ) : (
                      <button
                        disabled
                        title="Edycja będzie dostępna po wznowieniu ogłoszenia"
                      >
                        Edytuj
                      </button>
                    )}

                    <button onClick={() => handleDelete(listing._id)}>
                      Usuń
                    </button>

                    {!listing.isExpired && !listing.isFeaturedActive && (
                      <button
                        onClick={() => {
                          setFeatureModal(listing);

                          setFeatureData({
                            featuredDays: 7,
                            isUrgent: listing.isUrgent || false,
                          });
                        }}
                      >
                        Wyróżnij
                      </button>
                    )}

                    {listing.isExpired && (
                      <button
                        onClick={() => {
                          setRenewModal(listing);

                          setRenewData({
                            durationDays: 7,
                            featuredDays: 0,
                            isUrgent: listing.isUrgent || false,
                          });
                        }}
                      >
                        Przedłuż
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {renewModal && (
        <div
          className={styles.modalOverlay}
          onClick={() => setRenewModal(null)}
        >
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2>Przedłuż ogłoszenie</h2>

            <div className={styles.modalSection}>
              <h4>Czas trwania</h4>

              <div className={styles.modalButtons}>
                {[7, 14, 31].map((days) => (
                  <button
                    key={days}
                    className={
                      renewData.durationDays === days
                        ? styles.modalButtonActive
                        : styles.modalButton
                    }
                    onClick={() =>
                      setRenewData((prev) => ({
                        ...prev,
                        durationDays: days,
                      }))
                    }
                  >
                    {days} dni
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.modalSection}>
              <h4>Wyróżnienie</h4>

              <div className={styles.modalButtons}>
                {[0, 7, 14, 31].map((days) => {
                  const isDisabled = days > renewData.durationDays;

                  return (
                    <button
                      key={days}
                      disabled={isDisabled}
                      className={
                        renewData.featuredDays === days
                          ? styles.modalButtonActive
                          : styles.modalButton
                      }
                      onClick={() => {
                        if (isDisabled) return;

                        setRenewData((prev) => ({
                          ...prev,
                          featuredDays: days,
                        }));
                      }}
                    >
                      {days === 0
                        ? "Brak"
                        : `${days} dni (€${days === 7 ? 1 : days === 14 ? 2 : 3})`}
                    </button>
                  );
                })}
              </div>
            </div>

            {!renewModal.isUrgent && (
              <div className={styles.modalSection}>
                <h4>Etykieta</h4>

                <button
                  className={
                    renewData.isUrgent
                      ? styles.modalButtonActive
                      : styles.modalButton
                  }
                  onClick={() =>
                    setRenewData((prev) => ({
                      ...prev,
                      isUrgent: !prev.isUrgent,
                    }))
                  }
                >
                  🔥 Pilne (€1)
                </button>
              </div>
            )}

            <div className={styles.summary}>
              <strong>Podsumowanie</strong>

              <div style={{ marginTop: "10px", fontSize: "14px" }}>
                <p>Długość: {renewData.durationDays} dni</p>

                {renewData.featuredDays > 0 && (
                  <p>🔥 Wyróżnione: {renewData.featuredDays} dni</p>
                )}

                {renewData.isUrgent && !renewModal.isUrgent && (
                  <p>🔥 Badge: Pilne</p>
                )}

                <hr style={{ margin: "10px 0" }} />

                <strong>Suma: €{getTotalPrice(renewData, renewModal)}</strong>
              </div>
            </div>

            <div className={styles.modalActions}>
              <button onClick={() => setRenewModal(null)}>Anuluj</button>

              <button onClick={handleRenew}>Przedłuż</button>
            </div>
          </div>
        </div>
      )}
      {featureModal && (
        <div
          className={styles.modalOverlay}
          onClick={() => setFeatureModal(null)}
        >
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2>Wyróżnij ogłoszenie</h2>

            <div className={styles.modalSection}>
              <h4>Wyróżnienie</h4>

              <div className={styles.modalButtons}>
                {[7, 14, 31].map((days) => (
                  <button
                    key={days}
                    className={
                      featureData.featuredDays === days
                        ? styles.modalButtonActive
                        : styles.modalButton
                    }
                    onClick={() =>
                      setFeatureData((prev) => ({
                        ...prev,
                        featuredDays: days,
                      }))
                    }
                  >
                    {days} dni (€{days === 7 ? 1 : days === 14 ? 2 : 3})
                  </button>
                ))}
              </div>
            </div>

            {!featureModal.isUrgent && (
              <div className={styles.modalSection}>
                <h4>Etykieta</h4>

                <button
                  className={
                    featureData.isUrgent
                      ? styles.modalButtonActive
                      : styles.modalButton
                  }
                  onClick={() =>
                    setFeatureData((prev) => ({
                      ...prev,
                      isUrgent: !prev.isUrgent,
                    }))
                  }
                >
                  🔥 Pilne (€1)
                </button>
              </div>
            )}

            <div className={styles.summary}>
              <strong>Podsumowanie</strong>

              <div style={{ marginTop: "10px", fontSize: "14px" }}>
                <p>🔥 Wyróżnienie: {featureData.featuredDays} dni</p>

                {featureData.isUrgent && !featureModal.isUrgent && (
                  <p>🔥 Badge: Pilne</p>
                )}

                <hr style={{ margin: "10px 0" }} />

                <strong>
                  Suma: €{getTotalPrice(featureData, featureModal)}
                </strong>
              </div>
            </div>

            {!featureModal.isPermanent && (
              <div className={styles.modalInfo}>
                Jeśli czas wyróżnienia przekroczy czas trwania ogłoszenia,
                ogłoszenie zostanie automatycznie przedłużone.
              </div>
            )}

            <div className={styles.modalActions}>
              <button onClick={() => setFeatureModal(null)}>Anuluj</button>

              <button onClick={handleFeature}>Kup wyróżnienie</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
