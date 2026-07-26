import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMyEvents } from "../../../api/events";
import { routes } from "../../../app/routes";
import { MyEventCard } from "../../../components/Events/MyEventCard/MyEventCard";

export const MyEvents = () => {
  const { country } = useParams();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getMyEvents(country);
        setEvents(data);
      } catch (err) {
        if (err.message === "Invalid token") {
          navigate(routes.login(country));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [country, navigate]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (events.length === 0) {
    return <h2>Nie masz jeszcze żadnych wydarzeń.</h2>;
  }

  return (
    <div>
      <h1>Moje wydarzenia</h1>
      {events.map((event) => (
        <MyEventCard key={event._id} event={event} />
      ))}
    </div>
  );
};
