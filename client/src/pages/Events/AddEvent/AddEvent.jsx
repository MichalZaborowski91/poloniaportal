import { EventForm } from "../../../components/Events/EventForm/EventForm";
import { buildEventFormData } from "../../../utils/buildEventFormData";
import { useCountry } from "../../../app/useCountry";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { routes } from "../../../app/routes";

export const AddEvent = () => {
  const country = useCountry();
  const navigate = useNavigate();
  const handleSubmit = async (formData) => {
    const data = buildEventFormData(formData);

    try {
      const res = await fetch(`http://localhost:5000/api/${country}/events`, {
        method: "POST",
        credentials: "include",
        body: data,
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to create event");
      }

      toast.success("Wydarzenie zostało dodane.");

      navigate(routes.myEvents(country));
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  return (
    <div className="container">
      <EventForm mode="create" onSubmit={handleSubmit} />
    </div>
  );
};
