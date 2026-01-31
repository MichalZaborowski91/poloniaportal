import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

export const ListingsPage = () => {
  const { country } = useParams();
  const [searchParams] = useSearchParams();

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const type = searchParams.get("type");
    const city = searchParams.get("city");

    const query = new URLSearchParams();
    if (type) query.append("type", type);
    if (city) query.append("city", city);

    fetch(`/api/${country}/listings?${query.toString()}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch listings");
        return res.json();
      })
      .then((data) => {
        setListings(data.listings);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [country, searchParams]);

  if (loading) return <p>Ładowanie ogłoszeń...</p>;
  if (error) return <p>Błąd: {error}</p>;

  return (
    <div>
      <h1>Ogłoszenia</h1>

      {listings.length === 0 && <p>Brak ogłoszeń</p>}

      <ul>
        {listings.map((listing) => (
          <li key={listing._id}>
            <h3>{listing.title}</h3>
            <p>{listing.description}</p>
            <small>
              {listing.type} • {listing.data?.city}
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
};
