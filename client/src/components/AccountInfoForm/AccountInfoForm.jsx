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
import Edit from "../../assets/icons/edit-3.svg?react";
import MapPin from "../../assets/icons/map-pin.svg?react";
import AtSign from "../../assets/icons/at-sign.svg?react";
import User from "../../assets/icons/user.svg?react";
import Text from "../../assets/icons/file-text.svg?react";
import Save from "../../assets/icons/save.svg?react";

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

      setDisplayNameError(false);
      setTimeout(() => setDisplayNameError(true), 10);

      return;
    }

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
      //ONBOARDING FLOW
      if (mode === "onboarding") {
        navigate(from, { replace: true });
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.accountInfoForm} noValidate>
      <ul className={styles.accountInfoForm__list}>
        <li className={styles.accountInfoForm__tile}>
          <AvatarUpload />
        </li>
        <li className={styles.accountInfoForm__tile}>
          <div
            className={`${styles.accountInfoForm__wrapper} ${
              displayNameError ? styles.accountInfoForm__shake : ""
            }`}
          >
            <Edit className={styles.accountInfoForm__icon} />
            <input
              type="text"
              placeholder="Nazwa Publiczna"
              value={displayName}
              onChange={(e) => {
                setDisplayName(e.target.value);
                setDisplayNameError(false);
              }}
              required
              className={`${styles.accountInfoForm__input} ${
                displayNameError ? styles["accountInfoForm__input--error"] : ""
              }`}
            />
          </div>
          <div className={styles.accountInfoForm__wrapper}>
            <Edit className={styles.accountInfoForm__icon} />
            <input
              type="text"
              placeholder="Imię"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={styles.accountInfoForm__input}
            />
          </div>
          <div className={styles.accountInfoForm__wrapper}>
            <Edit className={styles.accountInfoForm__icon} />
            <input
              type="text"
              placeholder="Nazwisko"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={styles.accountInfoForm__input}
            />
          </div>
          <div>
            {(firstName || lastName) && (
              <label className={styles.accountInfoForm__public}>
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
        </li>
        <li className={styles.accountInfoForm__tile}>
          <div className={styles.accountInfoForm__wrapper}>
            <img
              src={COUNTRY_FLAGS[countryValue]}
              alt={countryValue}
              className={styles.accountInfoForm__flag}
            />
            <select
              value={countryValue}
              onChange={(e) => setCountryValue(e.target.value)}
              className={`${styles.accountInfoForm__input} ${styles[`accountInfoForm__input--select`]}`}
            >
              <option value="ie">Irlandia</option>
              <option value="uk">Wielka Brytania</option>
              <option value="pl">Polska</option>
            </select>
          </div>
          <div>
            <div className={styles.accountInfoForm__wrapper}>
              <MapPin className={styles.accountInfoForm__icon} />
              <input
                type="text"
                placeholder="Miasto"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className={styles.accountInfoForm__input}
              />
            </div>
            {city && (
              <label className={styles.accountInfoForm__public}>
                <input
                  type="checkbox"
                  name="showCity"
                  checked={publicVisibility.showCity}
                  onChange={handleVisibilityChange}
                />
                Pokaż miasto publicznie
              </label>
            )}
          </div>
        </li>
        <li className={styles.accountInfoForm__tile}>
          <div>
            <div className={styles.accountInfoForm__wrapper}>
              <User className={styles.accountInfoForm__accType} />
              <select
                value={accountType}
                onChange={(e) => setAccountType(e.target.value)}
                className={`${styles.accountInfoForm__input} ${styles[`accountInfoForm__input--select`]}`}
              >
                <option value="private">Użytkownik prywatny</option>
                <option value="business">Przedsiębiorca</option>
              </select>
            </div>
            <div className={styles.accountInfoForm__wrapper}>
              <AtSign className={styles.accountInfoForm__icon} />
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className={styles.accountInfoForm__input}
              />
            </div>
            <label className={styles.accountInfoForm__public}>
              <input
                type="checkbox"
                name="showEmail"
                checked={publicVisibility.showEmail}
                onChange={handleVisibilityChange}
              />
              Pokaż email publicznie
            </label>
            <div className={styles.accountInfoForm__verifyMessage}>
              <VerifyEmailMessage />
            </div>
          </div>
        </li>
        <li className={styles.accountInfoForm__tile}>
          <div className={styles.accountInfoForm__wrapper}>
            <Text className={styles.accountInfoForm__bioIcon} />

            <textarea
              placeholder="Bio: max 300 znaków"
              maxLength={300}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className={`${styles.accountInfoForm__input} ${styles[`accountInfoForm__input--textarea`]}`}
            />

            {bio && (
              <label className={styles.accountInfoForm__public}>
                <input
                  type="checkbox"
                  name="showBio"
                  checked={publicVisibility.showBio}
                  onChange={handleVisibilityChange}
                />
                Pokaż bio publicznie
              </label>
            )}
          </div>
        </li>
      </ul>

      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className={styles.accountInfoForm__actions}>
        <button type="submit" className={styles.accountInfoForm__submitButton}>
          <Save />
          Zapisz
        </button>
      </div>
    </form>
  );
};
