import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LISTING_TYPE_OPTIONS } from "./listingTypes";

export const SearchBar = () => {
  const navigate = useNavigate();
  const { country } = useParams();

  const [type, setType] = useState("");
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (type) params.set("type", type);
    if (city) params.set("city", city);

    navigate(`/${country}/listings?${params.toString()}`);
  };

  return (
    <section>
      <h1>Znajdź ogłoszenia</h1>

      <form onSubmit={handleSubmit}>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">Co Cię interesuje?</option>

          {LISTING_TYPE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Miasto (np. Dublin)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button type="submit">Szukaj</button>
      </form>
    </section>
  );
};
