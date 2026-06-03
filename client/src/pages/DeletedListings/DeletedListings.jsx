import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../DeletedListings/DeletedListings.module.scss";
import {
  getMyListings,
  restoreListing,
  permanentlyDeleteSelectedListings,
  permanentlyDeleteAllDeletedListings,
} from "../../api/listings";

export const DeletedListings = () => {
  const { country } = useParams();

  const [listings, setListings] = useState([]);
  const [selectedListings, setSelectedListings] = useState([]);

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

  const handlePermanentDelete = async () => {
    try {
      const confirmed = window.confirm(
        selectedListings.length > 0
          ? `Czy na pewno chcesz trwale usunąć ${selectedListings.length} ogłoszeń?`
          : "Czy na pewno chcesz trwale usunąć wszystkie ogłoszenia?",
      );

      if (!confirmed) {
        return;
      }

      if (selectedListings.length > 0) {
        await permanentlyDeleteSelectedListings(country, selectedListings);

        setListings((prev) =>
          prev.filter((listing) => !selectedListings.includes(listing._id)),
        );

        setSelectedListings([]);
      } else {
        await permanentlyDeleteAllDeletedListings(country);

        setListings([]);
      }
    } catch (err) {
      console.error(err);

      alert("Nie udało się usunąć ogłoszeń");
    }
  };

  const handleToggleSelect = (listingId) => {
    setSelectedListings((prev) =>
      prev.includes(listingId)
        ? prev.filter((id) => id !== listingId)
        : [...prev, listingId],
    );
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
      <button onClick={handlePermanentDelete}>
        {selectedListings.length > 0
          ? `Usuń zaznaczone trwale (${selectedListings.length})`
          : "Usuń wszystkie trwale"}
      </button>
      {listings.length === 0 ? (
        <p className={styles.empty}>Brak usuniętych ogłoszeń.</p>
      ) : (
        <div className={styles.grid}>
          {listings.map((listing) => (
            <div key={listing._id} className={styles.card}>
              <input
                type="checkbox"
                checked={selectedListings.includes(listing._id)}
                onChange={() => handleToggleSelect(listing._id)}
              />
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
