import { useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";
import styles from "./CompanyForm.module.scss";
import Add from "../../assets/icons/plus.svg?react";
import Edit from "../../assets/icons/edit-3.svg?react";
import { businessCategories } from "../../app/businessCategories";
import { COUNTRIES_PL } from "../../app/countriesPL";
import {
  BsEnvelopeAt,
  BsGeoAlt,
  BsGlobe2,
  BsPen,
  BsTelephone,
  BsTextareaT,
  BsViewList,
  BsFacebook,
  BsInstagram,
  BsLinkedin,
  BsYoutube,
  BsTiktok,
  BsTwitterX,
  BsGoogle,
  BsWhatsapp,
  BsMessenger,
  BsClock,
  BsStar,
  BsX,
  BsLockFill,
  BsUnlockFill,
} from "react-icons/bs";
import { compressImage } from "../../utils/logoCompress";
import { DAYS_PL } from "../../app/weekDaysPL";
import { useNavigate } from "react-router-dom";
import { routes } from "../../app/routes";
import { useCountry } from "../../app/useCountry";

export const CompanyForm = ({ initialData = null, onSubmit, mode }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const country = useCountry();
  const hasRestoredDraft = useRef(false);

  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [isMapsLoaded, setIsMapsLoaded] = useState(false);
  const [geocodeTimer, setGeocodeTimer] = useState(null);
  const [removeLogo, setRemoveLogo] = useState(false);

  const maxDescription = user?.plan === "free" ? 300 : 1000;

  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    phone: "",
    email: "",
    website: "",
    country: user?.country || "",
    city: "",
    facebook: "",
    instagram: "",
    linkedin: "",
    google: "",
    x: "",
    tiktok: "",
    youtube: "",
    locationInput: "",
    locationPreview: null,
    locationError: "",
    isGeocoding: false,
    whatsapp: "",
    features: ["", "", ""],
    openingHours: {
      monday: "",
      tuesday: "",
      wednesday: "",
      thursday: "",
      friday: "",
      saturday: "",
      sunday: "",
    },
  });

  const clearField = (field) => {
    setForm((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const isFormEmpty = (data) => {
    return (
      !data.name &&
      !data.description &&
      !data.phone &&
      !data.email &&
      !data.website &&
      !data.city &&
      data.features?.every((f) => !f) &&
      Object.values(data.openingHours || {}).every((v) => !v)
    );
  };

  const draftKey = useMemo(() => {
    if (!user || initialData) return null;

    return `companyDraft_new_${user.id}`;
  }, [user, initialData]);

  useEffect(() => {
    if (!user || !draftKey) return;

    const timeout = setTimeout(() => {
      localStorage.setItem(draftKey, JSON.stringify(form));
    }, 500);

    return () => clearTimeout(timeout);
  }, [form, user, draftKey]);

  useEffect(() => {
    if (!user || initialData || !draftKey) return;

    const draft = localStorage.getItem(draftKey);

    if (!draft || hasRestoredDraft.current) return;

    try {
      const parsed = JSON.parse(draft);

      if (isFormEmpty(parsed)) return;

      setForm(parsed);

      hasRestoredDraft.current = true;

      toast.success("Przywrócono zapisany szkic");
    } catch {
      localStorage.removeItem(draftKey);
    }
  }, [user, initialData, draftKey]);

  useEffect(() => {
    if (!initialData) return;

    setForm((prev) => ({
      ...prev,
      ...initialData,
      facebook: initialData.socialLinks?.facebook || "",
      instagram: initialData.socialLinks?.instagram || "",
      linkedin: initialData.socialLinks?.linkedin || "",
      google: initialData.socialLinks?.google || "",
      youtube: initialData.socialLinks?.youtube || "",
      tiktok: initialData.socialLinks?.tiktok || "",
      x: initialData.socialLinks?.x || "",
      features: initialData.features
        ? [...initialData.features, "", "", ""].slice(0, 3)
        : ["", "", ""],
      openingHours: initialData.openingHours || prev.openingHours,
      country:
        initialData.country && COUNTRIES_PL[initialData.country]
          ? initialData.country
          : user?.country || "",

      locationPreview: initialData.location || null,
    }));

    if (initialData.logo) {
      setLogoPreview(initialData.logo);
    }
  }, [initialData, user?.country]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleHoursChange = (day, value) => {
    setForm({
      ...form,
      openingHours: {
        ...form.openingHours,
        [day]: value,
      },
    });
  };

  const handleFeatureChange = (index, value) => {
    setForm((prev) => {
      const updated = [...prev.features];
      updated[index] = value;
      return { ...prev, features: updated };
    });
  };

  const geocodeLocation = async (value) => {
    if (!value) return;

    setForm((prev) => ({
      ...prev,
      isGeocoding: true,
      locationError: "",
    }));

    try {
      const res = await fetch("http://localhost:5000/api/companies/geocode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address: value }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error();

      setForm((prev) => ({
        ...prev,
        locationPreview: data,
        isGeocoding: false,
      }));
    } catch {
      setForm((prev) => ({
        ...prev,
        locationPreview: null,
        locationError: "Nie znaleziono lokalizacji",
        isGeocoding: false,
      }));
    }
  };

  useEffect(() => {
    if (window.google) {
      setIsMapsLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`;
    script.async = true;
    script.defer = true;
    script.onload = () => setIsMapsLoaded(true);
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (!form.locationPreview || !isMapsLoaded) return;

    const map = new window.google.maps.Map(
      document.getElementById("preview-map"),
      {
        center: form.locationPreview,
        zoom: 17,
      },
    );

    new window.google.maps.Marker({
      position: form.locationPreview,
      map,
    });
  }, [form.locationPreview, isMapsLoaded]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.isGeocoding) {
      toast.error("Poczekaj aż lokalizacja zostanie sprawdzona");
      return;
    }

    try {
      let payload = { ...form };

      if (user.plan === "business" && form.locationPreview) {
        payload.location = form.locationPreview;
      }

      delete payload.locationPreview;
      delete payload.locationError;
      delete payload.isGeocoding;
      delete payload.locationInput;

      await onSubmit(payload, logoFile, removeLogo);
      localStorage.removeItem(draftKey);
      toast.success(
        mode === "add" ? "Firma została dodana" : "Firma zaktualizowana",
      );
    } catch (error) {
      toast.error(error.message || "Nie udało się zapisać firmy");
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div>
      <h2 className={styles.header}>
        {mode === "add" ? "Dodaj firmę" : `Edytujesz firmę`}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className={styles.formSection}>
          <div className={styles.formSection__section}>
            <div
              className={`${user.plan === "free" ? styles.formSection__locked : ""}`}
            >
              <h4 className={styles.formSection__sectionTitle}>Logo firmy</h4>
              <div className={styles.formSection__logoUploader}>
                <img
                  src={
                    logoPreview ||
                    "/companyLogoPlaceholder/companyLogoPlaceholder.webp"
                  }
                  alt="Logo"
                  className={styles.formSection__logoPreview}
                />

                <div className={styles.formSection__logoButtonsContainer}>
                  <label className={styles.formSection__logoButton}>
                    {logoPreview ? "Zmień logo" : "Wybierz logo"}

                    <input
                      type="file"
                      accept="image/*"
                      disabled={user.plan === "free"}
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;

                        if (!file.type.startsWith("image/")) {
                          toast.error("Możesz wgrać tylko plik graficzny");
                          return;
                        }

                        if (file.size > 3 * 1024 * 1024) {
                          toast.error("Logo może mieć maksymalnie 3MB");
                          return;
                        }

                        try {
                          const compressed = await compressImage(file);

                          setLogoFile(compressed);
                          setLogoPreview(URL.createObjectURL(compressed));
                          setRemoveLogo(false);
                        } catch {
                          toast.error("Nie udało się przetworzyć obrazu");
                        }
                      }}
                    />
                  </label>

                  {logoPreview && (
                    <button
                      type="button"
                      className={styles.formSection__removeLogo}
                      onClick={() => {
                        setLogoFile(null);
                        setLogoPreview(null);
                        setRemoveLogo(true);
                      }}
                    >
                      Usuń logo
                    </button>
                  )}
                </div>
                {user.plan === "free" && (
                  <div className={styles.formSection__overlay}>
                    <div
                      className={styles.formSection__planInfo}
                      onClick={() => navigate(routes.pricing(country))}
                    >
                      <div className={styles.formSection__lockWrapper}>
                        <BsLockFill className={styles.formSection__lockIcon} />
                        <BsUnlockFill
                          className={styles.formSection__unlockIcon}
                        />
                      </div>
                      <p>Dodaj własne logo w planie:</p>
                      <p className={styles.formSection__badge}>PLUS</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={styles.formSection__section}>
            <h4 className={styles.formSection__sectionTitle}>
              Podstawowe informacje
            </h4>

            <ul className={styles.formSection__infoList}>
              <li>
                <div className={styles.formSection__wrapper}>
                  <BsPen className={styles.formSection__icon} />
                  <input
                    name="name"
                    placeholder="Nazwa firmy *"
                    value={form.name}
                    onChange={handleChange}
                    required
                    maxLength={35}
                    className={styles.formSection__infoInput}
                    title="Nazwa Twojej działalności - pole wymagane"
                  />
                  {form.name && (
                    <button
                      type="button"
                      className={styles.formSection__clearInput}
                      onClick={() => clearField("name")}
                    >
                      <BsX />
                    </button>
                  )}
                </div>
              </li>
              <li>
                <div className={styles.formSection__wrapper}>
                  <BsViewList className={styles.formSection__icon} />
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    required
                    className={styles.formSection__infoInput}
                    title="Wybierz kategorię - pole wymagane"
                  >
                    <option value="">Wybierz kategorię *</option>
                    {businessCategories.map((group) => (
                      <optgroup key={group.group} label={group.group}>
                        {group.items.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>
              </li>
              <li>
                <div className={styles.formSection__wrapper}>
                  {form.country && COUNTRIES_PL[form.country] && (
                    <img
                      src={COUNTRIES_PL[form.country].flag}
                      alt={COUNTRIES_PL[form.country].name}
                      className={styles.formSection__flag}
                    />
                  )}

                  <select
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    className={styles.formSection__infoInput}
                    title="Kraj, w którym prowadzisz działalność"
                  >
                    {Object.entries(COUNTRIES_PL).map(([code, data]) => (
                      <option key={code} value={code}>
                        {data.name}
                      </option>
                    ))}
                  </select>
                </div>
              </li>
              <li>
                <div className={styles.formSection__wrapper}>
                  <BsGeoAlt className={styles.formSection__icon} />
                  <input
                    name="city"
                    placeholder="Miasto"
                    value={form.city}
                    onChange={handleChange}
                    className={styles.formSection__infoInput}
                    title="Miasto"
                  />
                  {form.city && (
                    <button
                      type="button"
                      className={styles.formSection__clearInput}
                      onClick={() => clearField("city")}
                    >
                      <BsX />
                    </button>
                  )}
                </div>
              </li>
              <li>
                <div className={styles.formSection__wrapper}>
                  <BsTextareaT className={styles.formSection__bioIcon} />
                  <textarea
                    name="description"
                    maxLength={maxDescription}
                    placeholder={`Opis firmy: max ${maxDescription} znaków`}
                    value={form.description}
                    onChange={handleChange}
                    className={`${styles.formSection__infoInput} ${styles["formSection__infoInput--textarea"]}`}
                    title="Opis, czym zajmuje się Twoja firma?"
                  />
                  {form.description && (
                    <button
                      type="button"
                      className={`${styles.formSection__clearInput} ${styles["formSection__clearInput--textarea"]}`}
                      onClick={() => clearField("description")}
                    >
                      <BsX />
                    </button>
                  )}
                </div>
              </li>
              <li>
                <div className={styles.formSection__wrapper}>
                  <BsTelephone className={styles.formSection__icon} />
                  <input
                    name="phone"
                    placeholder="Telefon"
                    value={form.phone}
                    onChange={handleChange}
                    className={styles.formSection__infoInput}
                    title="Numer kontaktowy"
                  />
                  {form.phone && (
                    <button
                      type="button"
                      className={styles.formSection__clearInput}
                      onClick={() => clearField("phone")}
                    >
                      <BsX />
                    </button>
                  )}
                </div>
              </li>
              <li>
                <div className={styles.formSection__wrapper}>
                  <BsEnvelopeAt className={styles.formSection__icon} />
                  <input
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className={styles.formSection__infoInput}
                    title="Adres email"
                  />
                  {form.email && (
                    <button
                      type="button"
                      className={styles.formSection__clearInput}
                      onClick={() => clearField("email")}
                    >
                      <BsX />
                    </button>
                  )}
                </div>
              </li>
            </ul>
          </div>
          <div className={styles.formSection__section}>
            <div
              className={`${user.plan === "free" ? styles.formSection__locked : ""}`}
            >
              <h4 className={styles.formSection__sectionTitle}>Social madia</h4>
              <ul className={styles.formSection__infoList}>
                <li>
                  <div className={styles.formSection__wrapper}>
                    <BsGlobe2 className={styles.formSection__icon} />
                    <input
                      name="website"
                      placeholder="Twoja strona internetowa"
                      value={form.website}
                      onChange={handleChange}
                      disabled={user.plan === "free"}
                      className={styles.formSection__infoInput}
                      title="Dodaj link do swojej strony internetowej"
                    />
                    {form.website && (
                      <button
                        type="button"
                        className={styles.formSection__clearInput}
                        onClick={() => clearField("website")}
                      >
                        <BsX />
                      </button>
                    )}
                  </div>
                </li>
                <li>
                  <div className={styles.formSection__wrapper}>
                    <BsGoogle className={styles.formSection__icon} />
                    <input
                      name="google"
                      placeholder="Wizytówka google (Udostępnij → Kopiuj link)"
                      value={form.google}
                      onChange={handleChange}
                      disabled={user.plan === "free"}
                      className={styles.formSection__infoInput}
                      title="Dodaj link do swojej wizytówki google: 
                  1. Wyszukaj swoją firmę w google,
                  2. Kliknij udostępnij/ share,
                  3. Skopiuj link i wklej go tutaj.
                  Przykładowy link: https://share.google/xXxxXxxXXXx"
                    />
                    {form.google && (
                      <button
                        type="button"
                        className={styles.formSection__clearInput}
                        onClick={() => clearField("google")}
                      >
                        <BsX />
                      </button>
                    )}
                  </div>
                </li>
                <li>
                  <div className={styles.formSection__wrapper}>
                    <BsFacebook className={styles.formSection__icon} />
                    <input
                      name="facebook"
                      placeholder="Facebook"
                      value={form.facebook}
                      onChange={handleChange}
                      disabled={user.plan === "free"}
                      className={styles.formSection__infoInput}
                      title="Dodaj link do swojej strony na Facebook"
                    />
                    {form.facebook && (
                      <button
                        type="button"
                        className={styles.formSection__clearInput}
                        onClick={() => clearField("facebook")}
                      >
                        <BsX />
                      </button>
                    )}
                  </div>
                </li>
                <li>
                  <div className={styles.formSection__wrapper}>
                    <BsInstagram className={styles.formSection__icon} />
                    <input
                      name="instagram"
                      placeholder="Instagram"
                      value={form.instagram}
                      onChange={handleChange}
                      disabled={user.plan === "free"}
                      className={styles.formSection__infoInput}
                      title="Dodaj link do swojej strony na Instagram"
                    />
                    {form.instagram && (
                      <button
                        type="button"
                        className={styles.formSection__clearInput}
                        onClick={() => clearField("instagram")}
                      >
                        <BsX />
                      </button>
                    )}
                  </div>
                </li>
                <li>
                  <div className={styles.formSection__wrapper}>
                    <BsLinkedin className={styles.formSection__icon} />
                    <input
                      name="linkedin"
                      placeholder="LinkedIn"
                      value={form.linkedin}
                      onChange={handleChange}
                      disabled={user.plan === "free"}
                      className={styles.formSection__infoInput}
                      title="Dodaj link do swojej strony na LinkedIn"
                    />
                    {form.linkedin && (
                      <button
                        type="button"
                        className={styles.formSection__clearInput}
                        onClick={() => clearField("linkedin")}
                      >
                        <BsX />
                      </button>
                    )}
                  </div>
                </li>
                <li>
                  <div className={styles.formSection__wrapper}>
                    <BsYoutube className={styles.formSection__icon} />
                    <input
                      name="youtube"
                      placeholder="YouTube"
                      value={form.youtube}
                      onChange={handleChange}
                      disabled={user.plan === "free"}
                      className={styles.formSection__infoInput}
                      title="Dodaj link do swojej strony na YouTube"
                    />
                    {form.youtube && (
                      <button
                        type="button"
                        className={styles.formSection__clearInput}
                        onClick={() => clearField("youtube")}
                      >
                        <BsX />
                      </button>
                    )}
                  </div>
                </li>
                <li>
                  <div className={styles.formSection__wrapper}>
                    <BsTwitterX className={styles.formSection__icon} />
                    <input
                      name="x"
                      placeholder="X (Twitter)"
                      value={form.x}
                      onChange={handleChange}
                      disabled={user.plan === "free"}
                      className={styles.formSection__infoInput}
                      title="Dodaj link do swojego profilu na X (Twitter)"
                    />
                    {form.x && (
                      <button
                        type="button"
                        className={styles.formSection__clearInput}
                        onClick={() => clearField("x")}
                      >
                        <BsX />
                      </button>
                    )}
                  </div>
                </li>
                <li>
                  <div className={styles.formSection__wrapper}>
                    <BsTiktok className={styles.formSection__icon} />
                    <input
                      name="tiktok"
                      placeholder="TikTok"
                      value={form.tiktok}
                      onChange={handleChange}
                      disabled={user.plan === "free"}
                      className={styles.formSection__infoInput}
                      title="Dodaj link do swojej strony na TikTok"
                    />
                    {form.tiktok && (
                      <button
                        type="button"
                        className={styles.formSection__clearInput}
                        onClick={() => clearField("tiktok")}
                      >
                        <BsX />
                      </button>
                    )}
                  </div>
                </li>
              </ul>
              {user.plan === "free" && (
                <div className={styles.formSection__overlay}>
                  <div
                    className={styles.formSection__planInfo}
                    onClick={() => navigate(routes.pricing(country))}
                  >
                    <div className={styles.formSection__lockWrapper}>
                      <BsLockFill className={styles.formSection__lockIcon} />
                      <BsUnlockFill
                        className={styles.formSection__unlockIcon}
                      />
                    </div>
                    <p>Dostępne w planie:</p>
                    <p className={styles.formSection__badge}>PLUS</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className={styles.formSection__section}>
            <div
              className={`${user.plan !== "business" ? styles.formSection__locked : ""}`}
            >
              <ul className={styles.formSection__infoList}>
                <li>
                  <h4 className={styles.formSection__sectionTitle}>
                    Mapa google
                  </h4>
                  <div className={styles.formSection__wrapper}>
                    <BsGeoAlt className={styles.formSection__icon} />
                    <input
                      name="locationInput"
                      placeholder="Wpisz adres lub link Google Maps"
                      value={form.locationInput}
                      className={styles.formSection__infoInput}
                      onChange={(e) => {
                        handleChange(e);
                        if (geocodeTimer) clearTimeout(geocodeTimer);
                        const timer = setTimeout(() => {
                          geocodeLocation(e.target.value);
                        }, 700);
                        setGeocodeTimer(timer);
                      }}
                      disabled={user.plan !== "business"}
                    />
                    {form.locationInput && (
                      <button
                        type="button"
                        className={styles.formSection__clearInput}
                        onClick={() => clearField("locationInput")}
                      >
                        <BsX />
                      </button>
                    )}
                  </div>
                  {form.isGeocoding && <p>Sprawdzanie lokalizacji...</p>}
                  {form.locationError && (
                    <p style={{ color: "red" }}>{form.locationError}</p>
                  )}
                  {form.locationPreview && (
                    <div
                      id="preview-map"
                      style={{
                        width: "100%",
                        height: "250px",
                        marginTop: "10px",
                      }}
                    />
                  )}
                </li>
                <li>
                  <h4 className={styles.formSection__sectionTitle}>Whatsapp</h4>
                  <div className={styles.formSection__wrapper}>
                    <BsWhatsapp className={styles.formSection__icon} />
                    <input
                      name="whatsapp"
                      placeholder="WhatsApp (np. +353...)"
                      value={form.whatsapp}
                      onChange={handleChange}
                      disabled={user.plan !== "business"}
                      className={styles.formSection__infoInput}
                    />
                    {form.whatsapp && (
                      <button
                        type="button"
                        className={styles.formSection__clearInput}
                        onClick={() => clearField("whatsapp")}
                      >
                        <BsX />
                      </button>
                    )}
                  </div>
                </li>
                <li>
                  <h4 className={styles.formSection__sectionTitle}>
                    Messenger
                  </h4>
                  <div className={styles.formSection__wrapper}>
                    <BsMessenger className={styles.formSection__icon} />
                    <input
                      name="messenger"
                      placeholder="Messenger"
                      value={form.whatsapp} //zmiana na messenger
                      onChange={handleChange}
                      disabled={user.plan !== "business"}
                      className={styles.formSection__infoInput}
                    />
                    {form.messenger && (
                      <button
                        type="button"
                        className={styles.formSection__clearInput}
                        onClick={() => clearField("messenger")}
                      >
                        <BsX />
                      </button>
                    )}
                  </div>
                </li>
                <li>
                  <h4 className={styles.formSection__sectionTitle}>
                    Dlaczego warto nas wybrać:
                  </h4>

                  {form.features.map((feature, index) => (
                    <div key={index} className={styles.formSection__wrapper}>
                      <BsStar className={styles.formSection__icon} />
                      <input
                        placeholder={`Powód ${index + 1}`}
                        value={feature}
                        onChange={(e) =>
                          handleFeatureChange(index, e.target.value)
                        }
                        disabled={user.plan !== "business"}
                        className={styles.formSection__infoInput}
                      />
                      {feature && (
                        <button
                          type="button"
                          className={styles.formSection__clearInput}
                          onClick={() => handleFeatureChange(index, "")}
                        >
                          <BsX />
                        </button>
                      )}
                    </div>
                  ))}
                </li>
                <li>
                  <h4 className={styles.formSection__sectionTitle}>
                    Godziny pracy:
                  </h4>

                  {Object.keys(form.openingHours).map((day) => {
                    const isClosed = form.openingHours[day] === "Zamknięte";
                    const value = form.openingHours[day];

                    return (
                      <div key={day} className={styles.formSection__hoursRow}>
                        <div className={styles.formSection__wrapper}>
                          <BsClock className={styles.formSection__icon} />

                          <span className={styles.formSection__day}>
                            {DAYS_PL[day]}
                          </span>

                          <input
                            placeholder="np. 9:00-17:00"
                            value={value}
                            onChange={(e) => {
                              const val = e.target.value;

                              if (/^[0-9:-]*$/.test(val)) {
                                handleHoursChange(day, val);
                              }
                            }}
                            disabled={user.plan !== "business" || isClosed}
                            className={`${styles.formSection__infoInput} ${styles["formSection__infoInput--hours"]}`}
                            inputMode="numeric"
                          />

                          {value && (
                            <button
                              type="button"
                              className={styles.formSection__clearInput}
                              onClick={() => handleHoursChange(day, "")}
                            >
                              <BsX />
                            </button>
                          )}
                        </div>

                        <label className={styles.formSection__closedCheckbox}>
                          <input
                            type="checkbox"
                            checked={isClosed}
                            onChange={(e) => {
                              if (e.target.checked) {
                                handleHoursChange(day, "Zamknięte");
                              } else {
                                handleHoursChange(day, "");
                              }
                            }}
                            disabled={user.plan !== "business"}
                          />
                          Zamknięte
                        </label>
                      </div>
                    );
                  })}
                </li>
              </ul>
              {user.plan !== "business" && (
                <div className={styles.formSection__overlay}>
                  <div
                    className={styles.formSection__planInfo}
                    onClick={() => navigate(routes.pricing(country))}
                  >
                    <div className={styles.formSection__lockWrapper}>
                      <BsLockFill className={styles.formSection__lockIcon} />
                      <BsUnlockFill
                        className={styles.formSection__unlockIcon}
                      />
                    </div>
                    <p>Dostępne w planie:</p>
                    <p className={styles.formSection__badge}>BIZNES</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <button type="submit" className={styles.formSection__saveButton}>
            {mode === "add" ? "Zapisz" : "Zapisz zmiany"}
          </button>
        </div>
      </form>
    </div>
  );
};
