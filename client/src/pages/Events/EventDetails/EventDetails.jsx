import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getEvent } from "../../../api/events";
import styles from "./EventDetails.module.scss";
import { eventCategories } from "../../../app/eventCategories";
import { getOptionLabel } from "../../../utils/getOptionLabel";
import { routes } from "../../../app/routes";
import { formatDate } from "../../../utils/formatDate";
import { formatEventLocation } from "../../../utils/formatEventLocation";
import { formatPrice } from "../../../utils/formatPrice";
import { formatCapacity } from "../../../utils/formatCapacity";

export const EventDetails = () => {
  const { country, id } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await getEvent(country, id);
        setEvent(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [country, id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!event) {
    return <p>Event not found.</p>;
  }
  console.log(event.company);
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        {event.coverImage?.url ? (
          <img
            width={150}
            src={event.coverImage?.url}
            alt={event.title}
            className={styles.image}
          />
        ) : (
          <div className={styles.placeholder}>No image</div>
        )}
      </section>

      <section className={styles.summary}>
        <div className={styles.left}>
          <span>{getOptionLabel(eventCategories, event.category)}</span>

          <h1>{event.title}</h1>

          <p>Organizator</p>

          {event.company ? (
            <Link to={routes.companySlug(event.country, event.company.slug)}>
              <img src={event.company.logo} alt={event.company.name} />

              <span>{event.company.name}</span>
            </Link>
          ) : (
            <Link
              to={routes.userPublic(
                event.country,
                event.user.profile.displayNameNormalized,
              )}
            >
              <img
                src={event.user.profile.avatar}
                alt={event.user.profile.displayName}
              />

              <span>{event.user.profile.displayName}</span>
            </Link>
          )}
        </div>

        <div className={styles.right}>
          <p>Start</p>
          <p>{formatDate(event.startDate)}</p>

          <p>Koniec</p>
          <p>{formatDate(event.endDate)}</p>
          <p>Lokalizacja</p>
          <p>{formatEventLocation(event)}</p>

          <p>
            <strong>Cena:</strong> {formatPrice(event)}
          </p>

          <p>
            <strong>Liczba miejsc:</strong> {formatCapacity(event)}
          </p>
        </div>
      </section>

      <section className={styles.description}>
        <h2>Opis</h2>

        <p>{event.description}</p>
      </section>
    </div>
  );
};
