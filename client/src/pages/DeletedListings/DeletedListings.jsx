import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../DeletedListings/DeletedListings.module.scss";
import { getMyListings, restoreListing } from "../../api/listings";

export const DeletedListings = () => {
  const { country } = useParams();

  const [listings, setListings] = useState([]);

  const handleRestore = async (listingId) => {
    try {
      await restoreListing(country, listingId);

      setListings((prev) =>
        prev.filter((listing) => listing._id !== listingId),
      );
    } catch (err) {
      console.error(err);
      alert("Nie udało się przywrócić ogłoszenia");
    }
  };

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const deleted = await getMyListings(country, "deleted");

        setListings(deleted);
      } catch (err) {
        console.error(err);
      }
    };

    fetchListings();
  }, [country]);

  return (
    <div className={styles.deletedListings}>
      <h1>Usunięte ogłoszenia</h1>

      <p className={styles.deletedInfo}>
        Ogłoszenia zostaną trwale usunięte po 31 dniach.
      </p>

      {listings.length === 0 ? (
        <p className={styles.empty}>Brak usuniętych ogłoszeń.</p>
      ) : (
        <div className={styles.grid}>
          {listings.map((listing) => (
            <div key={listing._id} className={styles.card}>
              <h3>{listing.title}</h3>

              <p>
                Usunięto:{" "}
                {new Date(listing.deletedAt).toLocaleDateString("pl-PL")}
              </p>

              <button
                className={styles.restoreButton}
                onClick={() => handleRestore(listing._id)}
              >
                Przywróć
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
