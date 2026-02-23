import { useEffect, useState } from "react";
import { deleteCompany } from "../../api/company";
import toast from "react-hot-toast";
import styles from "../DeleteCompanyModal/DeleteCompanyModal.module.scss";
import Cancel from "../../assets/icons/x.svg?react";
import TrashFull from "../../assets/icons/trash-2.svg?react";
import TrashEmpty from "../../assets/icons/trash.svg?react";

export const DeleteCompanyModal = ({
  companyId,
  onClose,
  companyName,
  onDeleted,
}) => {
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteCompany(companyId);
      toast.success(`Firma ${companyName} została usunięta`);
      onDeleted?.();
      onClose();
    } catch (error) {
      toast.error("Nie udało się usunąć firmy");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.deleteCompany__overlay}>
      <div className={styles.deleteCompany__modal}>
        <h2 className={styles.deleteCompany__title}>
          Usunięcie firmy <TrashEmpty />
        </h2>

        <p>
          Usunięcie firmy <strong>{companyName}</strong> spowoduje:
        </p>

        <ul>
          <li>Usunięcie wszystkich powiązanych ogłoszeń, </li>
          <li>Usunięcie statystyk</li>
        </ul>

        <p>
          Czy na pewno chcesz usunąć firmę <strong>{companyName}</strong>?
        </p>

        <label className={styles.deleteCompany__checkbox}>
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
          />
          Tak i rozumiem konsekwencje usunięcia.
        </label>
        <div className={styles.deleteCompany__actions}>
          <button
            onClick={handleDelete}
            disabled={!confirmed || loading}
            className={styles.deleteCompany__button}
          >
            <TrashFull />
            {loading ? "Usuwanie..." : "Usuń firmę"}
          </button>
          <button onClick={onClose} className={styles.deleteCompany__button}>
            <Cancel />
            Anuluj
          </button>
        </div>
      </div>
    </div>
  );
};
