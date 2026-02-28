import { useEffect, useState } from "react";
import { getMyCompanies } from "../../../api/company";
import styles from "../CompaniesList/CompaniesList.module.scss";
import { DeleteCompanyModal } from "../../../components/DeleteCompanyModal/DeleteCompanyModal";
import { useNavigate } from "react-router-dom";
import { useCountry } from "../../../app/useCountry";
import { routes } from "../../../app/routes";

export const CompaniesList = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState(null);

  const navigate = useNavigate();
  const country = useCountry();

  const refresh = async () => {
    const data = await getMyCompanies();
    setCompanies(data);
  };

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getMyCompanies();
        setCompanies(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) return <p>Ładowanie...</p>;

  if (companies.length === 0) {
    return (
      <div className={styles.empty}>
        <h3>Nie masz jeszcze żadnej firmy</h3>
        <p>Dodaj firmę, aby móc publikować ją w katalogu.</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {companies.map((company) => (
        <div key={company._id} className={styles.card}>
          <img src={company.logo} alt={company.name} className={styles.logo} />

          <h3 className={styles.name}>{company.name}</h3>

          <div className={styles.actions}>
            <button
              onClick={() =>
                navigate(routes.companySlug(country, company.slug))
              }
            >
              Podgląd
            </button>
            <button
              onClick={() =>
                navigate(`${routes.editCompany(country, company._id)}`)
              }
            >
              Edytuj
            </button>

            <button
              onClick={() =>
                setDeleteModal({
                  id: company._id,
                  name: company.name,
                })
              }
              className={styles.delete}
            >
              Usuń
            </button>
          </div>
        </div>
      ))}
      {deleteModal && (
        <DeleteCompanyModal
          companyId={deleteModal.id}
          companyName={deleteModal.name}
          onClose={() => setDeleteModal(null)}
          onDeleted={refresh}
        />
      )}
    </div>
  );
};
