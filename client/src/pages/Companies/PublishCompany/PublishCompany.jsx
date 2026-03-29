import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./PublishCompany.module.scss";
import { routes } from "../../../app/routes";
import { useCountry } from "../../../app/useCountry";

export const PublishCompany = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const country = useCountry();

  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  const [featured, setFeatured] = useState(false);
  const [homepage, setHomepage] = useState(false);

  useEffect(() => {
    const loadCompany = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/companies/my`, {
          credentials: "include",
        });

        const data = await res.json();

        const found = data.find((c) => c._id === id);

        setCompany(found);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadCompany();
  }, [id]);

  if (loading) return <p>Ładowanie...</p>;
  if (!company) return <p>Nie znaleziono firmy</p>;

  return (
    <div className={styles.container}>
      <h2>Publikacja firmy</h2>

      {/* PREVIEW */}
      <div className={styles.preview}>
        <img src={company.logo} alt={company.name} />
        <h3>{company.name}</h3>
        <p>{company.description}</p>
      </div>

      {/* OPTIONS */}
      <div className={styles.options}>
        <label>
          <input
            type="checkbox"
            checked={featured}
            onChange={() => setFeatured(!featured)}
          />
          ⭐ Wyróżnij firmę (7 dni)
        </label>

        <label>
          <input
            type="checkbox"
            checked={homepage}
            onChange={() => setHomepage(!homepage)}
          />
          🏠 Pokaż na stronie głównej
        </label>
      </div>

      {/* ACTIONS */}
      <div className={styles.actions}>
        <button onClick={() => navigate(-1)}>Wróć</button>

        <button
          onClick={async () => {
            await fetch(`http://localhost:5000/api/companies/${id}/publish`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
              body: JSON.stringify({
                featured,
                showOnHomepage: homepage,
              }),
            });

            navigate(routes.accountCompanies(country));
          }}
        >
          Opublikuj
        </button>
      </div>
    </div>
  );
};
