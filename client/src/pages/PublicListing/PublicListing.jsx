import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "../PublicListing/PublicListing.module.scss";
import { routes } from "../../app/routes";
import { TYPE_LABELS } from "../../app/adLabels";
import { BsHeart, BsHeartFill, BsShare } from "react-icons/bs";
import { COUNTRIES_PL } from "../../app/countriesPL";
import { MARKET_CATEGORY_LABELS } from "../../app/marketplaceCategories";

export const PublicListing = () => {
  const { id, country } = useParams();
  const [listing, setListing] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  const getPlaceholderImage = () => {
    switch (listing.type) {
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

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/${country}/listings/${id}`,
        );

        const data = await res.json();
        setListing(data.listing);
      } catch (err) {
        console.error(err);
      }
    };

    fetchListing();
  }, [id, country]);

  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: listing.title,
          url,
        });
      } catch (err) {
        console.error(err);
      }
    } else {
      await navigator.clipboard.writeText(url);
      alert("Link skopiowany do schowka");
    }
  };

  if (!listing) return <p>Loading...</p>;

  const images =
    listing.data?.images?.length > 0
      ? listing.data.images
      : listing.data?.image
        ? [listing.data.image]
        : [getPlaceholderImage()];

  return (
    <div className={styles.publicListing}>
      <main className={styles.main}>
        <div className={styles.categoryBar}>
          <div className={styles.badges}>
            <p className={styles.category}>
              {TYPE_LABELS[listing.type] || listing.type}
            </p>
            {listing.data?.category && (
              <p className={styles.categoryTag}>
                {listing.type.startsWith("market")
                  ? MARKET_CATEGORY_LABELS[listing.data.category]
                  : listing.data.category}
              </p>
            )}
            {listing.data?.condition && (
              <p className={styles.conditionTag}>
                {listing.data.condition === "new" ? "Nowe" : "Używane"}
              </p>
            )}
          </div>

          <div className={styles.actions}>
            <button onClick={handleShare} title="Udostępnij">
              <BsShare />
            </button>

            <button onClick={toggleFavorite} title="Dodaj do ulubionych">
              {isFavorite ? <BsHeartFill /> : <BsHeart />}
            </button>
          </div>
        </div>
        <div className={styles.header}>
          <div className={styles.gallery}>
            <img
              src={images[activeImage]}
              alt={listing.title}
              className={styles.mainImage}
              onClick={() => setIsGalleryOpen(true)}
            />

            {images.length > 1 && (
              <div className={styles.thumbnails}>
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Miniatura ${index + 1}`}
                    className={`${styles.thumbnail} ${
                      activeImage === index ? styles.activeThumbnail : ""
                    }`}
                    onClick={() => setActiveImage(index)}
                  />
                ))}
              </div>
            )}
          </div>

          <div>
            <h1 className={styles.adTitle}>{listing.title}</h1>
            {listing.country && COUNTRIES_PL[listing.country] && (
              <div className={styles.location}>
                {listing.data?.city && `${listing.data.city}, `}
                {COUNTRIES_PL[listing.country].name}{" "}
                <img
                  src={COUNTRIES_PL[listing.country].flag}
                  alt={COUNTRIES_PL[listing.country].name}
                  className={styles.flag}
                />
              </div>
            )}
            {listing.data?.price && (
              <div className={styles.section}>
                <h3>Cena</h3>
                <p>{listing.data.price} €</p>
              </div>
            )}
          </div>
        </div>

        <div className={styles.section}>
          <h3>Opis</h3>
          <p>{listing.description}</p>
        </div>

        {listing.type === "job_wanted" && (
          <>
            {listing.data?.portfolioLink && (
              <p>
                Portfolio:{" "}
                <a
                  href={
                    listing.data.portfolioLink.startsWith("http")
                      ? listing.data.portfolioLink
                      : `https://${listing.data.portfolioLink}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {listing.data.portfolioLink}
                </a>
              </p>
            )}

            {listing.data?.linkedinLink && (
              <p>
                LinkedIn:{" "}
                <a
                  href={
                    listing.data.linkedinLink.startsWith("http")
                      ? listing.data.linkedinLink
                      : `https://${listing.data.linkedinLink}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {listing.data.linkedinLink}
                </a>
              </p>
            )}
          </>
        )}
        <div className={styles.section}>
          <h3>Kontakt</h3>
          <p>{listing.data?.contactName}</p>
          <p>{listing.data?.contactPhone}</p>
          <p>{listing.data?.contactEmail}</p>
        </div>
        {isGalleryOpen && (
          <div
            className={styles.lightbox}
            onClick={() => setIsGalleryOpen(false)}
          >
            <button
              className={styles.prevButton}
              onClick={(e) => {
                e.stopPropagation();

                setActiveImage((prev) =>
                  prev === 0 ? images.length - 1 : prev - 1,
                );
              }}
            >
              ‹
            </button>

            <img
              src={images[activeImage]}
              alt={listing.title}
              className={styles.lightboxImage}
              onClick={(e) => e.stopPropagation()}
            />

            <button
              className={styles.nextButton}
              onClick={(e) => {
                e.stopPropagation();

                setActiveImage((prev) =>
                  prev === images.length - 1 ? 0 : prev + 1,
                );
              }}
            >
              ›
            </button>
          </div>
        )}
      </main>

      <aside className={styles.aside}>
        {listing.company ? (
          <div className={styles.card}>
            <Link
              to={`/${country}/company/${listing.company.slug}`}
              className={styles.userLink}
            >
              <img
                src={
                  listing.company.logo ||
                  "/companyLogoPlaceholder/companyLogoPlaceholder.webp"
                }
                className={styles.avatar}
              />
              {listing.company.name}
            </Link>
          </div>
        ) : (
          <div className={styles.card}>
            <Link
              to={routes.userPublic(
                country,
                listing.user?.profile?.displayNameNormalized,
              )}
              className={styles.userLink}
            >
              <img
                src={listing.user?.profile?.avatar || "/avatar/avt.jpg"}
                className={styles.avatar}
              />
              {listing.user?.profile?.displayName}
            </Link>
          </div>
        )}

        <div className={styles.ad}>Reklama</div>
      </aside>
    </div>
  );
};
