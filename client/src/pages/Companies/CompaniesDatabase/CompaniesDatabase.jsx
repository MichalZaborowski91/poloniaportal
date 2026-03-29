import { useEffect, useState } from "react";
import { getPublicCompanies } from "../../../api/company.js";
import { useNavigate } from "react-router-dom";
import { useCountry } from "../../../app/useCountry";

export const CompaniesDatabase = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const country = useCountry();

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getPublicCompanies({
          country,
        });
        setCompanies(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [country]);

  if (loading) return <p>Ładowanie...</p>;

  return (
    <div>
      <h2>Firmy</h2>

      {companies.map((company) => (
        <div
          key={company._id}
          onClick={() => navigate(`/${country}/company/${company.slug}`)}
          style={{ cursor: "pointer", marginBottom: "20px" }}
        >
          <h3>{company.name}</h3>
          <p>{company.city}</p>
        </div>
      ))}
    </div>
  );
};
