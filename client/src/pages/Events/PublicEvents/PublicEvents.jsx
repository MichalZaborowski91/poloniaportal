import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEvents } from "../../../api/events";
import { EventCard } from "../EventCard/EventCard";

export const PublicEvents = () => {
  const { country } = useParams();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents(country);

        setEvents(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [country]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (events.length === 0) {
    return <h2>Brak wydarzeń.</h2>;
  }

  return (
    <div>
      <h1>Wydarzenia</h1>

      {events.map((event) => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  );
};
