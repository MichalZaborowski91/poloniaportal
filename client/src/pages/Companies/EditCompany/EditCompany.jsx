import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCountry } from "../../../app/useCountry";
import {
  getMyCompanies,
  updateCompany,
  uploadCompanyLogo,
} from "../../../api/company";
import { routes } from "../../../app/routes";
import { CompanyForm } from "../../../components/CompanyForm/CompanyForm";

export const EditCompany = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const country = useCountry();

  const [company, setCompany] = useState(null);

  useEffect(() => {
    const load = async () => {
      const companies = await getMyCompanies();
      const found = companies.find((c) => c._id === id);
      setCompany(found);
    };
    load();
  }, [id]);

  const handleUpdate = async (formData, logoFile, removeLogo) => {
    await updateCompany(id, {
      ...formData,
      removeLogo: logoFile ? false : removeLogo,
    });

    if (logoFile) {
      await uploadCompanyLogo(id, logoFile);
    }

    navigate(routes.accountCompanies(country));
  };

  if (!company) return <p>Ładowanie...</p>;

  return (
    <CompanyForm mode="edit" initialData={company} onSubmit={handleUpdate} />
  );
};
