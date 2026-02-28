import { useEffect, useState } from "react";
import { createCompany, getMyCompanies } from "../../../api/company";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { routes } from "../../../app/routes";
import { useCountry } from "../../../app/useCountry";
import { useAuth } from "../../../hooks/useAuth";
import styles from "../AddCompany/AddCompany.module.scss";
import Add from "../../../assets/icons/plus.svg?react";

export const AddCompany = () => {
  const [hasCompany, setHasCompany] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    description: "",
    phone: "",
    email: "",
    website: "",
    country: "",
    city: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const country = useCountry();
  const { user } = useAuth();

  const maxDescription = user.plan === "free" ? 300 : 1000;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createCompany(form);
      toast.success("Firma została dodana");
      navigate(routes.companies(country));
    } catch (error) {
      const status = error?.status;
      const code = error?.code;
      // EMAIL NOT VERIFIED FLOW
      if (status === 403 && code === "EMAIL_NOT_VERIFIED") {
        navigate(routes.security(country), {
          state: { from: location },
          replace: true,
        });
        return;
      }
      if (status === 403 && code === "PROFILE_NOT_COMPLETED") {
        navigate(routes.account(country), {
          state: { from: location },
          replace: true,
        });
        return;
      }
      if (status === 403) {
        toast.error("Plan Free pozwala tylko na jedną firmę.");
      } else {
        toast.error(error.message || "Nie udało się dodać firmy");
      }
    }
  };

  useEffect(() => {
    if (!user) {
      return;
    }

    if (!user.emailVerified) {
      navigate(routes.security(country), {
        state: { from: location },
        replace: true,
      });
      return;
    }

    if (!user.profileCompleted) {
      navigate(routes.account(country), {
        state: { from: location },
        replace: true,
      });
      return;
    }
  }, [user, navigate, country, location]);

  useEffect(() => {
    const check = async () => {
      try {
        const companies = await getMyCompanies();
        setHasCompany(companies.length >= 1);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    check();
  }, []);

  if (!user) return null;

  if (!user.emailVerified || !user.profileCompleted) {
    return null;
  }

  if (loading) {
    return <p>Ładowanie...</p>;
  }

  if (user.plan === "free" && hasCompany) {
    return (
      <div>
        <h2>Limit planu Free</h2>
        <p>Plan Free pozwala na dodanie tylko jednej firmy.</p>

        <button
          onClick={() => {
            alert("Upgrade coming soon");
          }}
        >
          Upgrade plan
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className={styles.title}>
        <Add />
        Dodaj firmę
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Nazwa firmy *"
          value={form.name}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          maxLength={maxDescription}
          placeholder={`Opis firmy: max ${maxDescription} znaków`}
          value={form.description}
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Telefon"
          value={form.phone}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email kontaktowy"
          value={form.email}
          onChange={handleChange}
        />

        <input
          name="website"
          placeholder="Strona internetowa"
          value={form.website}
          onChange={handleChange}
        />

        <input
          name="country"
          placeholder="Kraj"
          value={form.country}
          onChange={handleChange}
        />

        <input
          name="city"
          placeholder="Miasto"
          value={form.city}
          onChange={handleChange}
        />
        {user.plan !== "free" && (
          <>
            <input
              name="website"
              placeholder="Strona internetowa"
              value={form.website}
              onChange={handleChange}
            />

            <input name="facebook" placeholder="Facebook" />
            <input name="instagram" placeholder="Instagram" />
            <input name="linkedin" placeholder="LinkedIn" />
          </>
        )}
        <button type="submit">Zapisz</button>
      </form>
    </div>
  );
};
