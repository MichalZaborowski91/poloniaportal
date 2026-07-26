import { EventForm } from "../../../components/Events/EventForm/EventForm";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCountry } from "../../../app/useCountry";
import toast from "react-hot-toast";
import { mapEventToFormData } from "../../../utils/mapEventToFormData";
import { buildEventFormData } from "../../../utils/buildEventFormData";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../app/routes";

export const EditEvent = () => {
  const { id } = useParams();
  const country = useCountry();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/${country}/my-events/${id}`,
          {
            credentials: "include",
          },
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch event");
        }

        setEvent(data.event);
      } catch (err) {
        console.error(err);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [country, id]);

  if (loading) {
    return <p>Ładowanie...</p>;
  }

  const initialFormData = event ? mapEventToFormData(event) : null;

  const handleSubmit = async (formData) => {
    const data = buildEventFormData(formData);

    try {
      const res = await fetch(
        `http://localhost:5000/api/${country}/my-events/${id}`,
        {
          method: "PATCH",
          credentials: "include",
          body: data,
        },
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to update event");
      }

      toast.success("Wydarzenie zostało zaktualizowane.");

      navigate(routes.myEvents(country));
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };
  return (
    <div className="container">
      <EventForm
        mode="edit"
        onSubmit={handleSubmit}
        initialData={initialFormData}
      />
    </div>
  );
};
