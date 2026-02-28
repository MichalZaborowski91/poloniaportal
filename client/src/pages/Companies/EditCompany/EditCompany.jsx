import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMyCompanies, updateCompany } from "../../../api/company";
import toast from "react-hot-toast";
import { routes } from "../../../app/routes";
import { useCountry } from "../../../app/useCountry";

export const EditCompany = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const country = useCountry();

  const [form, setForm] = useState(null);

  useEffect(() => {
    const load = async () => {
      const companies = await getMyCompanies();
      const company = companies.find((c) => c._id === id);
      setForm(company);
    };

    load();
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateCompany(id, form);
      toast.success("Firma zaktualizowana");
      navigate(routes.companies(country));
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (!form) return <p>Ładowanie...</p>;

  return (
    <div>
      <h2>Edytuj firmę</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={form.name || ""}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          value={form.description || ""}
          onChange={handleChange}
        />

        <input name="phone" value={form.phone || ""} onChange={handleChange} />

        <input name="email" value={form.email || ""} onChange={handleChange} />

        <input
          name="website"
          value={form.website || ""}
          onChange={handleChange}
        />

        <input
          name="country"
          value={form.country || ""}
          onChange={handleChange}
        />

        <input name="city" value={form.city || ""} onChange={handleChange} />

        <button type="submit">Zapisz</button>
      </form>
    </div>
  );
};
