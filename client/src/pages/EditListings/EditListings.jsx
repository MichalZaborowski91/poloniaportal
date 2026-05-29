import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMyListingById } from "../../api/listings";

export const EditListing = () => {
  const { country, id } = useParams();

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const data = await getMyListingById(country, id);

        setListing(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [country, id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!listing) {
    return <p>Ogłoszenie nie istnieje.</p>;
  }

  return (
    <div>
      <h1>Edycja ogłoszenia</h1>

      <pre>{JSON.stringify(listing, null, 2)}</pre>
    </div>
  );
};
