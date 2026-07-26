import { Link } from "react-router-dom";
import { COUNTRIES_PL } from "../../../app/countriesPL";
import { eventCategories } from "../../../app/eventCategories";
import { routes } from "../../../app/routes";
import { statuses } from "../../../app/statuses";
import { getOptionLabel } from "../../../utils/getOptionLabel";
import { formatDate } from "../../../utils/formatDate";
import { useState } from "react";

export const MyEventCard = ({ event }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const country = COUNTRIES_PL[event.country];
  const eventLink = routes.event(event.country, event._id);
  const editLink = routes.editEvent(event.country, event._id);
  const formattedDate = formatDate(event.startDate);
  const categoryLabel = getOptionLabel(eventCategories, event.category);
  const statusLabel = getOptionLabel(statuses, event.status);
  const location = event.isOnline
    ? "Online"
    : [event.venue, event.city].filter(Boolean).join(", ");
  const organizer = event.company || event.user;
  const organizerName = organizer.name ?? organizer.profile?.displayName;
  const organizerAvatar = organizer.logo ?? organizer.profile?.avatar;
  //const isCompany = !!event.company;
  const organizerLink = event.company
    ? routes.companySlug(event.country, event.company.slug)
    : routes.userPublic(
        event.country,
        event.user.profile.displayNameNormalized,
      );
  return (
    <article>
      <header>
        <div>
          <img
            src={
              event.coverImage?.url || "/eventPlaceholder/eventPlaceholder.webp"
            }
            alt={event.title}
          />

          <span>
            <img src={country.flag} alt={country.name} />
            {country.name}
          </span>

          <span>{categoryLabel}</span>

          <span>{statusLabel}</span>
        </div>
      </header>

      <section>
        <h2>
          <Link to={eventLink}>{event.title}</Link>
        </h2>

        <div>
          <div>
            <img
              src={
                organizerAvatar || "/avatarPlaceholder/avatarPlaceholder.webp"
              }
              alt={organizerName}
            />
          </div>

          <div>
            <span>Organized by</span>

            <Link to={organizerLink}>{organizerName}</Link>
          </div>
        </div>
        <div>
          <ul>
            <li>
              <div>
                <span>📅</span>

                <span>{formattedDate}</span>
              </div>
            </li>
            <li>
              <div>
                <span>📍</span>

                <span>{location}</span>
              </div>
            </li>
            <li>
              <div>
                <span>❤️</span>

                <span>{event.favoritesCount}</span>
              </div>
            </li>
            <li>
              <div>
                <span>👁️</span>

                <span>{event.views}</span>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <footer>
        <nav aria-label="Event actions">
          <ul>
            <li>
              <Link to={eventLink}>Preview</Link>
            </li>
            <li>
              <Link to={editLink}>Edit</Link>
            </li>
            <li>
              <Link to="#">Statistics</Link>
            </li>
          </ul>
        </nav>

        <div>
          <button type="button" onClick={() => setIsMenuOpen((prev) => !prev)}>
            More
          </button>

          {isMenuOpen && (
            <ul>
              <li>
                <button>Renew</button>
              </li>

              <li>
                <button>Duplicate</button>
              </li>

              <li>
                <button>Archive</button>
              </li>

              <li>
                <button>Delete</button>
              </li>
            </ul>
          )}
        </div>
      </footer>
    </article>
  );
};
