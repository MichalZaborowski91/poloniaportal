import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { getCompanyBySlug } from "../../../api/company";
import { routes } from "../../../app/routes";
import { useCountry } from "../../../app/useCountry";
import styles from "../PublicCompany/PublicCompany.module.scss";
import Phone from "../../../assets/icons/phone.svg?react";
import Globe from "../../../assets/icons/globe.svg?react";
import Email from "../../../assets/icons/mail.svg?react";
import Check from "../../../assets/icons/check.svg?react";
import { COUNTRIES_PL } from "../../../app/countriesPL";
import { DAYS_ORDER, DAYS_PL } from "../../../app/weekDaysPL";
import {
  BsFacebook,
  BsInstagram,
  BsLinkedin,
  BsYoutube,
  BsTiktok,
  BsTwitterX,
  BsWhatsapp,
  BsGoogle,
  BsHeart,
  BsHeartFill,
  BsShare,
} from "react-icons/bs";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export const PublicCompany = () => {
  const { slug } = useParams();
  const [company, setCompany] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [listings, setListings] = useState([]);
  const country = useCountry();
  const mapRef = useRef(null);

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };
  useEffect(() => {
    if (!company?._id) return;

    const fetchListings = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/${country}/companies/${company._id}/listings`,
        );

        const data = await res.json();
        setListings(data.listings);
      } catch (err) {
        console.error(err);
      }
    };

    fetchListings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [company]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getCompanyBySlug(slug);
        setCompany(data);
      } catch (err) {
        console.error(err);
      }
    };

    load();
  }, [slug]);

  useEffect(() => {
    if (!isMapVisible) {
      return;
    }
    if (
      typeof company?.location?.lat !== "number" ||
      typeof company?.location?.lng !== "number"
    ) {
      return;
    }

    const loadMap = () => {
      const map = new window.google.maps.Map(mapRef.current, {
        center: {
          lat: company.location.lat,
          lng: company.location.lng,
        },
        zoom: 17,
      });

      new window.google.maps.Marker({
        position: {
          lat: company.location.lat,
          lng: company.location.lng,
        },
        map: map,
      });
    };

    if (window.google) {
      loadMap();
    } else if (!document.getElementById("google-maps-script")) {
      const script = document.createElement("script");
      script.id = "google-maps-script";
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`;
      script.async = true;
      script.defer = true;
      script.onload = loadMap;
      document.head.appendChild(script);
    }
  }, [company, isMapVisible]);

  useEffect(() => {
    if (!mapRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsMapVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.3,
      },
    );

    observer.observe(mapRef.current);

    return () => observer.disconnect();
  }, [company]);

  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: company.name,
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

  if (!company) return <p>Loading...</p>;

  const hasHours =
    company.openingHours && Object.values(company.openingHours).some((v) => v);

  const hasMap =
    typeof company?.location?.lat === "number" &&
    typeof company?.location?.lng === "number";

  return (
    <div className={styles.publicCompany}>
      <main className={styles.publicCompany__main}>
        <div className={styles.publicCompany__categoryBar}>
          {company.category && (
            <p className={styles.publicCompany__category}>{company.category}</p>
          )}

          <div className={styles.publicCompany__actions}>
            <button onClick={handleShare} title="Udostępnij">
              <BsShare />
            </button>

            <button onClick={toggleFavorite} title="Dodaj do ulubionych">
              {isFavorite ? <BsHeartFill /> : <BsHeart />}
            </button>
          </div>
        </div>
        <div className={styles.publicCompany__header}>
          <img
            src={
              company.logo ||
              "/companyLogoPlaceholder/companyLogoPlaceholder.webp"
            }
            alt={company.name}
            className={styles.publicCompany__companyLogo}
          />
          <div className={styles.publicCompany__content}>
            <div className={styles.publicCompany__titleBox}>
              <h1 className={styles.publicCompany__companyName}>
                {company.name}
              </h1>

              {company.country && COUNTRIES_PL[company.country] && (
                <div className={styles.publicCompany__location}>
                  {company.city && `${company.city}, `}
                  {COUNTRIES_PL[company.country].name}{" "}
                  <img
                    src={COUNTRIES_PL[company.country].flag}
                    alt={COUNTRIES_PL[company.country].name}
                    className={styles.flag}
                  />
                </div>
              )}
            </div>
            <div className={styles.publicCompany__contact}>
              {company.phone && (
                <a href={`tel:${company.phone}`} title="Zadzwoń">
                  <Phone />
                </a>
              )}

              {company.email && (
                <a href={`mailto:${company.email}`} title="Wyślij email">
                  <Email />
                </a>
              )}

              {company.website && (
                <a
                  href={
                    company.website.startsWith("http")
                      ? company.website
                      : `https://${company.website}`
                  }
                  target="_blank"
                  rel="noreferrer"
                  title="Strona internetowa"
                >
                  <Globe />
                </a>
              )}

              {company.socialLinks?.google && (
                <a
                  href={company.socialLinks.google}
                  target="_blank"
                  rel="noreferrer"
                  title="Wizytówka google"
                >
                  <BsGoogle />
                </a>
              )}

              {company.whatsapp && (
                <a
                  href={`https://wa.me/${company.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  title="WhatsApp"
                >
                  <BsWhatsapp />
                </a>
              )}
            </div>
          </div>
        </div>
        <div>
          {company.description && (
            <div className={styles.publicCompany__contentContainer}>
              <h3 className={styles.publicCompany__title}>Opis:</h3>
              <p className={styles.publicCompany__description}>
                {company.description}
              </p>
            </div>
          )}
        </div>

        {company.socialLinks && (
          <div className={styles.publicCompany__contentContainer}>
            <h3 className={styles.publicCompany__title}>Social media:</h3>

            <div className={styles.publicCompany__socials}>
              {company.socialLinks?.facebook && (
                <a
                  className={styles.facebook}
                  href={
                    company.socialLinks.facebook.startsWith("http")
                      ? company.socialLinks.facebook
                      : `https://${company.socialLinks.facebook}`
                  }
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                >
                  <BsFacebook />
                </a>
              )}

              {company.socialLinks?.instagram && (
                <a
                  className={styles.instagram}
                  href={
                    company.socialLinks.instagram.startsWith("http")
                      ? company.socialLinks.instagram
                      : `https://${company.socialLinks.instagram}`
                  }
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                >
                  <BsInstagram />
                </a>
              )}

              {company.socialLinks?.linkedin && (
                <a
                  className={styles.linkedin}
                  href={
                    company.socialLinks.linkedin.startsWith("http")
                      ? company.socialLinks.linkedin
                      : `https://${company.socialLinks.linkedin}`
                  }
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                >
                  <BsLinkedin />
                </a>
              )}
              {company.socialLinks.youtube && (
                <a
                  className={styles.youtube}
                  href={company.socialLinks.youtube}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                >
                  <BsYoutube />
                </a>
              )}

              {company.socialLinks.tiktok && (
                <a
                  className={styles.tiktok}
                  href={company.socialLinks.tiktok}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="TikTok"
                >
                  <BsTiktok />
                </a>
              )}

              {company.socialLinks.x && (
                <a
                  className={styles.x}
                  href={company.socialLinks.x}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="X"
                >
                  <BsTwitterX />
                </a>
              )}
            </div>
          </div>
        )}

        {company.features && company.features.length > 0 && (
          <div className={styles.publicCompany__contentContainer}>
            <h3 className={styles.publicCompany__title}>
              Dlaczego warto nas wybrać:
            </h3>
            <ul className={styles.featuresList}>
              {company.features.map((f, i) => (
                <li key={i} className={styles.featuresItem}>
                  <Check className={styles.featuresIcon} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className={styles.locationHoursWrapper}>
          {hasHours && (
            <div className={styles.hoursBox}>
              <h3 className={styles.publicCompany__title}>Godziny pracy</h3>
              <ul className={styles.hoursList}>
                {DAYS_ORDER.map((day) =>
                  company.openingHours[day] ? (
                    <li key={day} className={styles.hoursItem}>
                      <span
                        className={`${styles.dayName} ${
                          day === "sunday" ? styles.sunday : ""
                        } ${day === "saturday" ? styles.saturday : ""}`}
                      >
                        {DAYS_PL[day]}:
                      </span>
                      <span>{company.openingHours[day]}</span>
                    </li>
                  ) : null,
                )}
              </ul>
            </div>
          )}
          {hasMap && (
            <div>
              <h3 className={styles.publicCompany__title}>Lokalizacja</h3>
              <div ref={mapRef} className={styles.googleMap} />
            </div>
          )}
        </div>
        {listings.length > 0 && (
          <div className={styles.publicCompany__contentContainer}>
            <h3 className={styles.publicCompany__title}>Ogłoszenia firmy</h3>

            <ul>
              {listings.map((listing) => (
                <li key={listing._id}>
                  <strong>{listing.title}</strong>
                  <p>{listing.data?.city}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
      <aside className={styles.publicCompany__aside}>
        {company.ownerId?.profile?.displayName && (
          <div className={styles.userCard}>
            <Link
              to={routes.userPublic(
                country,
                company.ownerId.profile.displayNameNormalized,
              )}
              className={styles.userLink}
            >
              <img
                src={company.ownerId.profile.avatar || "/avatar/avt.jpg"}
                alt={company.ownerId.profile.displayName}
                className={styles.userAvatar}
              />
              {company.ownerId.profile.displayName}
            </Link>
          </div>
        )}

        <div className={styles.adCard}>Reklama</div>
      </aside>
    </div>
  );
};
