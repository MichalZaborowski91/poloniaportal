import { useState } from "react";
import { updateMyProfile } from "../../api/user";
import { useLocation, useNavigate } from "react-router-dom";
import { routes } from "../../app/routes";
import { useAuth } from "../../hooks/useAuth";
import { useCountry } from "../../app/useCountry";
import { AvatarUpload } from "../AvatarUpload/AvatarUpload";
import { VerifyEmailMessage } from "../../components/VerifyEmailMessage/VerifyEmailMessage";
import toast from "react-hot-toast";
import styles from "../AccountInfoForm/AccountInfoForm.module.scss";
import {
  MdEdit,
  MdLocationOn,
  MdAlternateEmail,
  MdPerson,
  MdDescription,
  MdSave,
} from "react-icons/md";
import { Spinner } from "../Spinner/Spinner";

const COUNTRY_FLAGS = {
  ie: "/flags/ie.png",
  uk: "/flags/gb.png",
  pl: "/flags/pl.png",
};

export const AccountInfoForm = ({ mode = "edit" }) => {
  const country = useCountry();
  const { user, refreshUser } = useAuth();

  const [displayNameError, setDisplayNameError] = useState(false);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [displayName, setDisplayName] = useState(
    user?.profile?.displayName || "",
  );
  const [firstName, setFirstName] = useState(user?.profile?.firstName || "");
  const [lastName, setLastName] = useState(user?.profile?.lastName || "");
  const [city, setCity] = useState(user?.profile?.city || "");
  const [bio, setBio] = useState(user?.profile?.bio || "");
  const [accountType, setAccountType] = useState(
    user?.accountType || "private",
  );
  const [countryValue, setCountryValue] = useState(user?.country || country);
  const [publicVisibility, setPublicVisibility] = useState({
    showFullName: user?.profile?.publicVisibility?.showFullName || false,
    showCity: user?.profile?.publicVisibility?.showCity || false,
    showBio: user?.profile?.publicVisibility?.showBio || false,
    showEmail: user?.profile?.publicVisibility?.showEmail || false,
  });

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || routes.home(country);

  const handleVisibilityChange = (e) => {
    const { name, checked } = e.target;

    setPublicVisibility((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!displayName.trim()) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      setDisplayNameError(true);

      return;
    }
    setIsSaving(true);

    try {
      const profileData = {
        displayName,
        firstName,
        lastName,
        city,
        bio,
        accountType,
        country: countryValue,
        publicVisibility,
      };

      await updateMyProfile(profileData);
      toast.success("Twoje dane zostały zapisane");

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      await refreshUser();

      if (mode === "onboarding") {
        navigate(from, { replace: true });
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      <div className={styles.card}>
        <section className={styles.group}>
          <h3 className={styles.groupTitle}>Zdjęcie profilowe</h3>

          <AvatarUpload />
        </section>
        <section className={styles.group}>
          <h3 className={styles.groupTitle}>Dane podstawowe</h3>
          <div className={styles.field}>
            <label
              className={`${styles.label} ${
                displayNameError ? styles.labelError : ""
              }`}
              htmlFor="displayName"
            >
              Nazwa publiczna
              {displayNameError && (
                <span className={styles.requiredMessage}> — Wymagane pole</span>
              )}
            </label>
            <div className={styles.inputWrapper}>
              <MdEdit className={styles.icon} />
              <input
                type="text"
                placeholder="Nazwa Publiczna"
                value={displayName}
                onChange={(e) => {
                  setDisplayName(e.target.value);
                  setDisplayNameError(false);
                }}
                required
                className={`${styles.input} ${
                  displayNameError ? styles["inputError"] : ""
                }`}
              />
            </div>
          </div>
          <div className={styles.groupContent}>
            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="firstName">
                  Imię
                </label>
                <div className={styles.inputWrapper}>
                  <MdEdit className={styles.icon} />
                  <input
                    type="text"
                    placeholder="Imię"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className={styles.input}
                  />
                </div>
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="lastName">
                  Nazwisko
                </label>
                <div className={styles.inputWrapper}>
                  <MdEdit className={styles.icon} />
                  <input
                    type="text"
                    placeholder="Nazwisko"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className={styles.input}
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            {(firstName || lastName) && (
              <label className={styles.visibility}>
                <input
                  type="checkbox"
                  name="showFullName"
                  checked={publicVisibility.showFullName}
                  onChange={handleVisibilityChange}
                />
                Pokaż imię i nazwisko publicznie
              </label>
            )}
          </div>
        </section>
        <section className={styles.group}>
          <h3 className={styles.groupTitle}>Lokalizacja</h3>
          <div className={styles.groupContent}>
            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="countryValue">
                  Kraj
                </label>
                <div className={styles.inputWrapper}>
                  <img
                    src={COUNTRY_FLAGS[countryValue]}
                    alt={countryValue}
                    className={styles.flag}
                  />
                  <select
                    value={countryValue}
                    onChange={(e) => setCountryValue(e.target.value)}
                    className={`${styles.input} ${styles.select}`}
                  >
                    <option value="ie">Irlandia</option>
                    <option value="uk">Wielka Brytania</option>
                    <option value="pl">Polska</option>
                  </select>
                </div>
              </div>
              <div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="city">
                    Miasto
                  </label>
                  <div className={styles.inputWrapper}>
                    <MdLocationOn className={styles.icon} />
                    <input
                      type="text"
                      placeholder="Miasto"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className={styles.input}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {city && (
            <label className={styles.visibility}>
              <input
                type="checkbox"
                name="showCity"
                checked={publicVisibility.showCity}
                onChange={handleVisibilityChange}
              />
              Pokaż miasto publicznie
            </label>
          )}
        </section>
        <section className={styles.group}>
          <h3 className={styles.groupTitle}>Konto</h3>
          <div className={styles.groupContent}>
            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor="accountType" className={styles.label}>
                  Typ konta
                </label>
                <div className={styles.inputWrapper}>
                  <MdPerson className={styles.accountTypeIcon} />
                  <select
                    value={accountType}
                    onChange={(e) => setAccountType(e.target.value)}
                    className={`${styles.input} ${styles.select}`}
                  >
                    <option value="private">Użytkownik prywatny</option>
                    <option value="business">Przedsiębiorca</option>
                  </select>
                </div>
              </div>
              <div className={styles.field}>
                <label htmlFor="email" className={styles.label}>
                  Adres email
                </label>
                <div className={styles.inputWrapper}>
                  <MdAlternateEmail className={styles.icon} />

                  <input
                    id="email"
                    type="email"
                    value={user?.email || ""}
                    readOnly
                    className={styles.input}
                  />
                </div>
                <p className={styles.helperText}>
                  Adres email można zmienić w sekcji „Bezpieczeństwo”.
                </p>
              </div>
            </div>
          </div>
          <label className={styles.visibility}>
            <input
              type="checkbox"
              name="showEmail"
              checked={publicVisibility.showEmail}
              onChange={handleVisibilityChange}
            />
            Pokaż email publicznie
          </label>
          <div className={styles.verifyMessage}>
            <VerifyEmailMessage />
          </div>
        </section>
        <section className={styles.group}>
          <h3 className={styles.groupTitle}>O mnie</h3>
          <div className={styles.groupContent}>
            <div className={styles.field}>
              <div className={styles.inputWrapper}>
                <MdDescription className={styles.bioIcon} />

                <textarea
                  placeholder="Napisz kilka słów o sobie..."
                  maxLength={300}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className={`${styles.input} ${styles.textarea}`}
                />
                <span className={styles.characterCount}>
                  {bio.length} / 300
                </span>
              </div>
            </div>
          </div>
          {bio && (
            <label className={styles.visibility}>
              <input
                type="checkbox"
                name="showBio"
                checked={publicVisibility.showBio}
                onChange={handleVisibilityChange}
              />
              Pokaż "O mnie" publicznie
            </label>
          )}
        </section>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className={styles.actions}>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSaving}
        >
          {isSaving ? <Spinner /> : <MdSave />}
          {isSaving ? "Zapisywanie..." : "Zapisz"}
        </button>
      </div>
    </form>
  );
};
