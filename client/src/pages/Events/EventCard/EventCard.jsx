import { Link } from "react-router-dom";
import styles from "./EventCard.module.scss";
import { routes } from "../../../app/routes";
import { eventCategories } from "../../../app/eventCategories";
import { getOptionLabel } from "../../../utils/getOptionLabel";
import { formatDate } from "../../../utils/formatDate";
import { formatEventLocation } from "../../../utils/formatEventLocation";
import { formatPrice } from "../../../utils/formatPrice";

export const EventCard = ({ event, showActions = false }) => {
  return (
    <article className={styles.card}>
      <Link
        className={styles.imageWrapper}
        to={routes.event(event.country, event._id)}
      >
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
      </Link>

      <div className={styles.content}>
        <span>{getOptionLabel(eventCategories, event.category)}</span>

        <h3 className={styles.title}>{event.title}</h3>

        <div className={styles.info}>
          <p>📅 {formatDate(event.startDate)}</p>

          <p>📍 {formatEventLocation(event)}</p>

          <p>
            🏢{" "}
            {event.company
              ? event.company.name
              : event.user.profile.displayName}
          </p>

          <p>💰 {formatPrice(event)}</p>
        </div>

        <div className={styles.stats}>
          <span>👁 {event.views}</span>
          <span>❤️ {event.favoritesCount}</span>
        </div>

        {showActions ? (
          <div className={styles.actions}>
            <button>Edytuj</button>
            <button>Usuń</button>
          </div>
        ) : (
          <Link
            className={styles.button}
            to={routes.event(event.country, event._id)}
          >
            Zobacz wydarzenie
          </Link>
        )}
      </div>
    </article>
  );
};
