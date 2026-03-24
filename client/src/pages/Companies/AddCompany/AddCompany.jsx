import { useEffect, useState } from "react";
import {
  createCompany,
  getMyCompanies,
  uploadCompanyLogo,
} from "../../../api/company";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../app/routes";
import { useCountry } from "../../../app/useCountry";
import { useAuth } from "../../../hooks/useAuth";
import { CompanyForm } from "../../../components/CompanyForm/CompanyForm";
import toast from "react-hot-toast";

const PLAN_LIMITS = {
  free: 1,
  plus: 3,
  business: Infinity,
};

export const AddCompany = () => {
  const navigate = useNavigate();
  const country = useCountry();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [hasReachedLimit, setHasReachedLimit] = useState(false);

  useEffect(() => {
    if (!user) return;

    const checkLimit = async () => {
      try {
        const companies = await getMyCompanies();
        const limit = PLAN_LIMITS[user.plan] ?? 1;

        setHasReachedLimit(companies.length >= limit);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    checkLimit();
  }, [user]);

  const handleCreate = async (formData, logoFile) => {
    try {
      const company = await createCompany(formData);

      if (logoFile && user.plan !== "free") {
        await uploadCompanyLogo(company._id, logoFile);
      }

      navigate(routes.companies(country));
    } catch (error) {
      const status = error?.status;
      const code = error?.code;

      if (status === 403 && code === "PLAN_LIMIT") {
        toast.error(`Plan ${user.plan} pozwala na ograniczoną liczbę firm.`);
        return;
      }

      toast.error(error.message || "Nie udało się dodać firmy");
    }
  };

  if (!user) return null;

  if (loading) {
    return <p>Ładowanie...</p>;
  }

  if (hasReachedLimit) {
    const limit = PLAN_LIMITS[user.plan];

    return (
      <div>
        <h2>Limit planu osiągnięty</h2>
        <p>
          Plan {user.plan} pozwala na maksymalnie{" "}
          {limit === Infinity ? "nielimitowaną liczbę" : limit} firm.
        </p>
      </div>
    );
  }

  return <CompanyForm mode="add" onSubmit={handleCreate} />;
};
