import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { BsArrowLeftShort } from "react-icons/bs";
import styles from "../AddOffer/AddOffer.module.scss";
import { COUNTRIES_PL } from "../../app/countriesPL";
import { businessCategories } from "../../app/businessCategories";
import { FormRenderer } from "../forms/FormRenderer/FormRenderer";

export const AddOffer = () => {
  const [step, setStep] = useState(1);
  const [companies, setCompanies] = useState([]);
  const [category, setCategory] = useState(null);
  const [type, setType] = useState(null);
  const [company, setCompany] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [previewImages, setPreviewImages] = useState([]);
  const [hoveredType, setHoveredType] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    durationDays: 7,
    featuredDays: 0,
    isUrgent: false,
    data: {
      city: "",
      contactName: "",
      contactPhone: "",
      contactEmail: "",
      portfolioLink: "",
      linkedinLink: "",
      image: null,
      images: [],
      price: "",
      condition: "",
      category: "",
    },
  });

  const { country } = useParams();
  const { user } = useAuth();

  const TYPE_LABELS = {
    job_offer: "Dam pracę",
    job_wanted: "Szukam pracy",
    housing_offer: "Wynajmę",
    housing_wanted: "Szukam mieszkania",
    market_offer: "Sprzedam",
    market_wanted: "Kupię",
    service_offer: "Oferuję usługę",
  };

  const selectedCompany = companies.find((c) => c._id === company);

  const handleBack = () => {
    if (step === 4) {
      setCompany(null);
    }

    if (step === 3) {
      setType(null);
    }

    if (step === 2) {
      setCategory(null);
    }

    setStep(step - 1);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDataChange = (e) => {
    setFormData({
      ...formData,
      data: {
        ...formData.data,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFormData({
      ...formData,
      data: {
        ...formData.data,
        image: file,
      },
    });

    setPreviewImage(URL.createObjectURL(file));
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 5);

    setFormData({
      ...formData,
      data: {
        ...formData.data,
        images: files,
      },
    });

    setPreviewImages(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async () => {
    try {
      const body = new FormData();

      body.append("type", type);
      body.append(
        "title",
        type.startsWith("job") ? formData.data.position : formData.title,
      );
      body.append("description", formData.description);
      body.append("durationDays", formData.durationDays);
      body.append("featuredDays", formData.featuredDays);
      body.append("isUrgent", formData.isUrgent);

      if (company) {
        body.append("company", company);
      }

      body.append("data", JSON.stringify(formData.data));

      if (formData.data.image) {
        body.append("image", formData.data.image);
      }

      if (formData.data.images?.length) {
        formData.data.images.forEach((file) => {
          body.append("images", file);
        });
      }

      const res = await fetch(`http://localhost:5000/api/${country}/listings`, {
        method: "POST",
        credentials: "include",
        body,
      });

      const result = await res.json();
      console.log("SUCCESS:", result);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/companies/my", {
          credentials: "include",
        });

        const data = await res.json();
        setCompanies(Array.isArray(data) ? data : data.companies || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCompanies();
  }, []);

  const getTotal = () => {
    let total = 0;

    if (formData.featuredDays === 7) total += 1;
    if (formData.featuredDays === 14) total += 2;
    if (formData.featuredDays === 31) total += 3;

    if (formData.isUrgent) total += 1;

    return total;
  };

  return (
    <div className={styles.addOffer}>
      <main className={styles.addOffer__main}>
        {step > 1 && (
          <div className={styles.addOffer__topBar}>
            <button
              type="button"
              onClick={handleBack}
              className={styles.addOffer__breadcrumbBtn}
            >
              <BsArrowLeftShort size={20} /> Wstecz
            </button>

            <div className={styles.addOffer__breadcrumb}>
              {category && <span>{category}</span>}

              {type && <span> → {TYPE_LABELS[type]}</span>}

              {step >= 4 && (
                <span>
                  {" "}
                  → Dodajesz jako:{" "}
                  {company
                    ? selectedCompany?.name
                    : user?.profile?.displayName || user?.email}
                </span>
              )}
            </div>
          </div>
        )}
        {step === 1 && (
          <div className={styles.addOffer__categories}>
            <h2 className={styles.addOffer__heading}>Kategoria ogłoszenia</h2>

            <button
              className={styles.addOffer__categoryCard}
              onClick={() => {
                setCategory("Praca");
                setStep(2);
              }}
            >
              <img
                src="/offersCategories/Job.webp"
                alt="Praca"
                className={styles.addOffer__categoryImage}
              />
              <span>Praca</span>
            </button>

            <button
              className={styles.addOffer__categoryCard}
              onClick={() => {
                setCategory("Mieszkanie");
                setStep(2);
              }}
            >
              <img
                src="/offersCategories/Housing.webp"
                alt="Mieszkanie"
                className={styles.addOffer__categoryImage}
              />
              <span>Mieszkanie</span>
            </button>

            <button
              className={styles.addOffer__categoryCard}
              onClick={() => {
                setCategory("Marketplace");
                setStep(2);
              }}
            >
              <img
                src="/offersCategories/Marketplace.webp"
                alt="Marketplace"
                className={styles.addOffer__categoryImage}
              />
              <span>Marketplace</span>
            </button>

            <button
              className={styles.addOffer__categoryCard}
              onClick={() => {
                setCategory("Usługi");
                setType(null);
                setCompany(null);
                setFormData({
                  title: "",
                  description: "",
                  data: {},
                });
                setStep(2);
              }}
            >
              <img
                src="/offersCategories/Services.webp"
                alt="Usługi"
                className={styles.addOffer__categoryImage}
              />
              <span>Usługi</span>
            </button>
          </div>
        )}

        {step === 2 && category === "Praca" && (
          <div className={styles.addOffer__typeSection}>
            <h2 className={styles.addOffer__heading}>Typ ogłoszenia</h2>

            <div className={styles.addOffer__typeButtons}>
              <button
                className={styles.addOffer__typeButton}
                onMouseEnter={() => setHoveredType("job_offer")}
                onMouseLeave={() => setHoveredType(null)}
                onClick={() => {
                  setType("job_offer");
                  setStep(3);
                }}
              >
                Dam pracę
              </button>

              <button
                className={styles.addOffer__typeButton}
                onMouseEnter={() => setHoveredType("job_wanted")}
                onMouseLeave={() => setHoveredType(null)}
                onClick={() => {
                  setType("job_wanted");
                  setStep(3);
                }}
              >
                Szukam pracy
              </button>
            </div>

            <div className={styles.addOffer__typeDescription}>
              {hoveredType === "job_offer" && (
                <p>
                  Dodaj ofertę pracy, zlecenie lub ogłoszenie dla osób
                  szukających zatrudnienia. Możesz zaoferować pracę stałą,
                  dorywczą, na pół etatu albo zlecić wykonanie konkretnej usługi
                  lub zadania.
                </p>
              )}

              {hoveredType === "job_wanted" && (
                <p>
                  Dodaj ogłoszenie jako osoba szukająca pracy. Możesz opisać
                  swoje doświadczenie, umiejętności, portfolio i określić
                  jakiego rodzaju pracy lub zleceń szukasz.
                </p>
              )}

              {!hoveredType && (
                <p>
                  Wybierz typ ogłoszenia, który najlepiej pasuje do tego co
                  chcesz dodać.
                </p>
              )}
            </div>
          </div>
        )}
        {step === 2 && category === "Mieszkanie" && (
          <div className={styles.addOffer__typeSection}>
            <h2 className={styles.addOffer__heading}>Typ ogłoszenia</h2>

            <div className={styles.addOffer__typeButtons}>
              <button
                className={styles.addOffer__typeButton}
                onMouseEnter={() => setHoveredType("housing_offer")}
                onMouseLeave={() => setHoveredType(null)}
                onClick={() => {
                  setType("housing_offer");
                  setStep(3);
                }}
              >
                Wynajmę
              </button>

              <button
                className={styles.addOffer__typeButton}
                onMouseEnter={() => setHoveredType("housing_wanted")}
                onMouseLeave={() => setHoveredType(null)}
                onClick={() => {
                  setType("housing_wanted");
                  setStep(3);
                }}
              >
                Szukam lokalu
              </button>
            </div>

            <div className={styles.addOffer__typeDescription}>
              {hoveredType === "housing_offer" && (
                <p>
                  Dodaj ogłoszenie jeśli wynajmujesz mieszkanie, pokój, dom lub
                  lokal. Możesz dodać zdjęcia, opis i dane kontaktowe.
                </p>
              )}

              {hoveredType === "housing_wanted" && (
                <p>
                  Dodaj ogłoszenie jeśli szukasz mieszkania, pokoju, domu lub
                  lokalu do wynajęcia. Opisz czego szukasz i dodaj dane
                  kontaktowe.
                </p>
              )}

              {!hoveredType && (
                <p>
                  Wybierz typ ogłoszenia, który najlepiej pasuje do tego co
                  chcesz dodać.
                </p>
              )}
            </div>
          </div>
        )}
        {step === 2 && category === "Marketplace" && (
          <div className={styles.addOffer__typeSection}>
            <h2 className={styles.addOffer__heading}>Typ ogłoszenia</h2>

            <div className={styles.addOffer__typeButtons}>
              <button
                className={styles.addOffer__typeButton}
                onMouseEnter={() => setHoveredType("market_offer")}
                onMouseLeave={() => setHoveredType(null)}
                onClick={() => {
                  setType("market_offer");
                  setStep(3);
                }}
              >
                Sprzedam
              </button>

              <button
                className={styles.addOffer__typeButton}
                onMouseEnter={() => setHoveredType("market_wanted")}
                onMouseLeave={() => setHoveredType(null)}
                onClick={() => {
                  setType("market_wanted");
                  setStep(3);
                }}
              >
                Kupię
              </button>
            </div>

            <div className={styles.addOffer__typeDescription}>
              {hoveredType === "market_offer" && (
                <p>
                  Dodaj ogłoszenie jeśli chcesz sprzedać produkt, przedmiot lub
                  rzecz. Możesz dodać opis, stan produktu, zdjęcie i dane
                  kontaktowe.
                </p>
              )}

              {hoveredType === "market_wanted" && (
                <p>
                  Dodaj ogłoszenie jeśli chcesz kupić konkretny produkt lub
                  przedmiot. Opisz czego szukasz i dodaj dane kontaktowe.
                </p>
              )}

              {!hoveredType && (
                <p>
                  Wybierz typ ogłoszenia, który najlepiej pasuje do tego co
                  chcesz dodać.
                </p>
              )}
            </div>
          </div>
        )}
        {step === 2 && category === "Usługi" && (
          <div className={styles.addOffer__typeSection}>
            <h2 className={styles.addOffer__heading}>Typ ogłoszenia</h2>

            <div className={styles.addOffer__typeButtons}>
              <button
                className={styles.addOffer__typeButton}
                onMouseEnter={() => setHoveredType("service_offer")}
                onMouseLeave={() => setHoveredType(null)}
                onClick={() => {
                  setType("service_offer");
                  setStep(3);
                }}
              >
                Oferuję usługę
              </button>
            </div>

            <div className={styles.addOffer__typeDescription}>
              {hoveredType === "service_offer" ? (
                <p>
                  Dodaj ogłoszenie jeśli oferujesz usługę jako osoba prywatna
                  lub firma. Takie ogłoszenia są aktywne bezterminowo i będą
                  widoczne również na profilu firmy.
                </p>
              ) : (
                <p>
                  Dodaj usługę, którą oferujesz. Może to być np. remont,
                  fryzjer, transport, księgowość, strona internetowa albo
                  dowolna inna usługa.
                </p>
              )}
            </div>
          </div>
        )}
        {step === 3 && (
          <div className={styles.addOffer__typeSection}>
            <h2 className={styles.addOffer__heading}>Kto dodaje ogłoszenie?</h2>

            <div className={styles.addOffer__typeDescription}>
              <p>
                Możesz dodać ogłoszenie jako osoba prywatna albo — jeśli
                posiadasz firmę — wybrać ją z listy i opublikować ogłoszenie
                jako firma.
              </p>
            </div>

            <div className={styles.addOffer__typeButtons}>
              <button
                className={styles.addOffer__typeButton}
                onClick={() => {
                  setCompany(null);
                  setStep(4);
                }}
              >
                Prywatnie
              </button>

              {companies.length > 0 && (
                <select
                  className={styles.addOffer__companySelect}
                  value={company || ""}
                  onChange={(e) => setCompany(e.target.value)}
                >
                  <option value="">Wybierz firmę</option>

                  {companies.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              )}

              {companies.length > 0 && (
                <button
                  className={styles.addOffer__typeButton}
                  disabled={!company}
                  onClick={() => setStep(4)}
                >
                  Dodaj jako firma
                </button>
              )}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className={styles.addOffer__section}>
            <h3 className={styles.addOffer__title}>Formularz</h3>

            <div className={styles.addOffer__form}>
              {type === "job_offer" && (
                <>
                  <input
                    name="position"
                    placeholder="Stanowisko (np. Zatrudnię elektryka)"
                    onChange={handleDataChange}
                  />

                  <input
                    name="city"
                    placeholder="Miasto"
                    onChange={handleDataChange}
                  />

                  <textarea
                    name="description"
                    placeholder="Opis ogłoszenia"
                    onChange={handleChange}
                  />
                  <div className={styles.addOffer__imageUploader}>
                    <img
                      src={
                        previewImage ||
                        "/companyLogoPlaceholder/companyLogoPlaceholder.webp"
                      }
                      alt="Preview"
                      className={styles.addOffer__imagePreview}
                    />

                    <label className={styles.addOffer__imageButton}>
                      {previewImage ? "Zmień zdjęcie" : "Wybierz zdjęcie"}

                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        hidden
                      />
                    </label>
                  </div>

                  <h4>Sekcja kontaktowa</h4>

                  <input
                    name="contactName"
                    placeholder="Imię osoby kontaktowej"
                    onChange={handleDataChange}
                  />

                  <input
                    name="contactPhone"
                    placeholder="Telefon"
                    onChange={handleDataChange}
                  />

                  <input
                    name="contactEmail"
                    placeholder="Email"
                    onChange={handleDataChange}
                  />
                </>
              )}

              {type === "market_offer" && (
                <>
                  <input
                    name="title"
                    placeholder="Tytuł ogłoszenia"
                    onChange={handleChange}
                  />

                  <select name="category" onChange={handleDataChange}>
                    <option value="">Kategoria</option>
                    <option value="automotive">Motoryzacja</option>
                    <option value="real_estate">Nieruchomości</option>
                    <option value="electronics">Elektronika</option>
                    <option value="home_garden">Dom i ogród</option>
                    <option value="fashion">Moda</option>
                    <option value="kids">Dla dziecka</option>
                    <option value="sports_hobbies">Sport i hobby</option>
                    <option value="agriculture">Rolnictwo</option>
                    <option value="animals">Zwierzęta</option>
                    <option value="music_education">Muzyka i edukacja</option>
                    <option value="business_services">Firma i usługi</option>
                    <option value="health_beauty">Zdrowie i uroda</option>
                    <option value="free_stuff">Oddam za darmo</option>
                    <option value="other">Inne</option>
                  </select>

                  <textarea
                    name="description"
                    placeholder="Opis"
                    onChange={handleChange}
                  />

                  <select name="condition" onChange={handleDataChange}>
                    <option value="">Stan</option>
                    <option value="new">Nowe</option>
                    <option value="used">Używane</option>
                  </select>

                  <input
                    name="city"
                    placeholder="Miasto"
                    onChange={handleDataChange}
                  />

                  <div className={styles.addOffer__priceWrapper}>
                    <input
                      type="number"
                      name="price"
                      placeholder="Cena"
                      onChange={handleDataChange}
                    />

                    <span>{COUNTRIES_PL[country]?.currency}</span>
                  </div>

                  <div className={styles.addOffer__imageUploader}>
                    <div className={styles.addOffer__imagesGrid}>
                      {previewImages.length > 0 ? (
                        previewImages.map((img, index) => (
                          <img
                            key={index}
                            src={img}
                            alt={`Preview ${index + 1}`}
                            className={styles.addOffer__multiImagePreview}
                          />
                        ))
                      ) : (
                        <img
                          src="/marketplacePlaceholder/marketplace-offer-placeholder.webp"
                          alt="Placeholder"
                          className={styles.addOffer__imagePreview}
                        />
                      )}
                    </div>

                    <label className={styles.addOffer__imageButton}>
                      {previewImages.length > 0
                        ? "Zmień zdjęcia"
                        : "Dodaj maksymalnie 5 zdjęć"}

                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImagesChange}
                        hidden
                      />
                    </label>
                  </div>

                  <h4>Sekcja kontaktowa</h4>

                  <input
                    name="contactName"
                    placeholder="Imię osoby kontaktowej"
                    onChange={handleDataChange}
                  />

                  <input
                    name="contactPhone"
                    placeholder="Telefon"
                    onChange={handleDataChange}
                  />

                  <input
                    name="contactEmail"
                    placeholder="Email"
                    onChange={handleDataChange}
                  />
                </>
              )}

              {type === "market_wanted" && (
                <>
                  <input
                    name="title"
                    placeholder="Tytuł ogłoszenia"
                    onChange={handleChange}
                  />

                  <select name="category" onChange={handleDataChange}>
                    <option value="">Kategoria</option>
                    <option value="automotive">Motoryzacja</option>
                    <option value="real_estate">Nieruchomości</option>
                    <option value="electronics">Elektronika</option>
                    <option value="home_garden">Dom i ogród</option>
                    <option value="fashion">Moda</option>
                    <option value="kids">Dla dziecka</option>
                    <option value="sports_hobbies">Sport i hobby</option>
                    <option value="agriculture">Rolnictwo</option>
                    <option value="animals">Zwierzęta</option>
                    <option value="music_education">Muzyka i edukacja</option>
                    <option value="business_services">Firma i usługi</option>
                    <option value="health_beauty">Zdrowie i uroda</option>
                    <option value="free_stuff">Oddam za darmo</option>
                    <option value="other">Inne</option>
                  </select>

                  <textarea
                    name="description"
                    placeholder="Opis"
                    onChange={handleChange}
                  />

                  <div className={styles.addOffer__imageUploader}>
                    <img
                      src={
                        previewImage ||
                        "/marketplacePlaceholder/marketplace-wanted-placeholder.webp"
                      }
                      alt="Preview"
                      className={styles.addOffer__imagePreview}
                    />

                    <label className={styles.addOffer__imageButton}>
                      {previewImage ? "Zmień zdjęcie" : "Dodaj zdjęcie"}

                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        hidden
                      />
                    </label>
                  </div>

                  <h4>Sekcja kontaktowa</h4>

                  <input
                    name="contactName"
                    placeholder="Imię osoby kontaktowej"
                    onChange={handleDataChange}
                  />

                  <input
                    name="contactPhone"
                    placeholder="Telefon"
                    onChange={handleDataChange}
                  />

                  <input
                    name="contactEmail"
                    placeholder="Email"
                    onChange={handleDataChange}
                  />
                </>
              )}
              {type === "job_wanted" && (
                <>
                  <input
                    name="position"
                    placeholder="Tytuł ogłoszenia (np. Szukam pracy mechanik)"
                    onChange={handleDataChange}
                  />

                  <input
                    name="city"
                    placeholder="Miasto"
                    onChange={handleDataChange}
                  />

                  <textarea
                    name="description"
                    placeholder="Opis"
                    onChange={handleChange}
                  />

                  <input
                    name="portfolioLink"
                    placeholder="Link do portfolio"
                    onChange={handleDataChange}
                  />

                  <input
                    name="linkedinLink"
                    placeholder="Link do LinkedIn"
                    onChange={handleDataChange}
                  />

                  <div className={styles.addOffer__imageUploader}>
                    <img
                      src={
                        previewImage ||
                        "/companyLogoPlaceholder/companyLogoPlaceholder.webp"
                      }
                      alt="Preview"
                      className={styles.addOffer__imagePreview}
                    />

                    <label className={styles.addOffer__imageButton}>
                      {previewImage ? "Zmień zdjęcie" : "Wybierz zdjęcie"}

                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        hidden
                      />
                    </label>
                  </div>

                  <h4>Sekcja kontaktowa</h4>

                  <input
                    name="contactName"
                    placeholder="Imię osoby kontaktowej"
                    onChange={handleDataChange}
                  />

                  <input
                    name="contactPhone"
                    placeholder="Telefon"
                    onChange={handleDataChange}
                  />

                  <input
                    name="contactEmail"
                    placeholder="Email"
                    onChange={handleDataChange}
                  />
                </>
              )}

              {type === "housing_offer" && (
                <>
                  <input
                    name="title"
                    placeholder="Tytuł ogłoszenia"
                    onChange={handleChange}
                  />

                  <input
                    name="city"
                    placeholder="Miasto"
                    onChange={handleDataChange}
                  />

                  <textarea
                    name="description"
                    placeholder="Opis"
                    onChange={handleChange}
                  />

                  <div className={styles.addOffer__imageUploader}>
                    <div className={styles.addOffer__imagesGrid}>
                      {previewImages.length > 0 ? (
                        previewImages.map((img, index) => (
                          <img
                            key={index}
                            src={img}
                            alt={`Preview ${index + 1}`}
                            className={styles.addOffer__multiImagePreview}
                          />
                        ))
                      ) : (
                        <img
                          src="/housingPlaceholder/housing-offer-placeholder.webp"
                          alt="Placeholder"
                          className={styles.addOffer__imagePreview}
                        />
                      )}
                    </div>

                    <label className={styles.addOffer__imageButton}>
                      {previewImages.length > 0
                        ? "Zmień zdjęcia"
                        : "Dodaj maksymalnie 5 zdjęć"}

                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImagesChange}
                        hidden
                      />
                    </label>
                  </div>

                  <h4>Sekcja kontaktowa</h4>

                  <input
                    name="contactName"
                    placeholder="Imię osoby kontaktowej"
                    onChange={handleDataChange}
                  />

                  <input
                    name="contactPhone"
                    placeholder="Telefon"
                    onChange={handleDataChange}
                  />

                  <input
                    name="contactEmail"
                    placeholder="Email"
                    onChange={handleDataChange}
                  />
                </>
              )}
              {type === "housing_wanted" && (
                <>
                  <input
                    name="title"
                    placeholder="Tytuł ogłoszenia (np. Szukam mieszkania 2 pokoje)"
                    onChange={handleChange}
                  />

                  <input
                    name="city"
                    placeholder="Miasto"
                    onChange={handleDataChange}
                  />

                  <textarea
                    name="description"
                    placeholder="Opisz czego szukasz (lokalizacja, budżet, ilość pokoi...)"
                    onChange={handleChange}
                  />

                  <div className={styles.addOffer__imageUploader}>
                    <img
                      src={
                        previewImage ||
                        "/housingPlaceholder/housing-wanted-placeholder.webp"
                      }
                      alt="Preview"
                      className={styles.addOffer__imagePreview}
                    />

                    <label className={styles.addOffer__imageButton}>
                      {previewImage ? "Zmień zdjęcie" : "Dodaj zdjęcie"}

                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        hidden
                      />
                    </label>
                  </div>

                  <h4>Sekcja kontaktowa</h4>

                  <input
                    name="contactName"
                    placeholder="Imię osoby kontaktowej"
                    onChange={handleDataChange}
                  />

                  <input
                    name="contactPhone"
                    placeholder="Telefon"
                    onChange={handleDataChange}
                  />

                  <input
                    name="contactEmail"
                    placeholder="Email"
                    onChange={handleDataChange}
                  />
                </>
              )}
              {type === "service_offer" && (
                <>
                  <input
                    name="title"
                    placeholder="Tytuł ogłoszenia (np. Mobilny fryzjer damski)"
                    onChange={handleChange}
                  />

                  <select name="category" onChange={handleDataChange}>
                    <option value="">Kategoria usługi</option>

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

                  <input
                    name="city"
                    placeholder="Miasto"
                    onChange={handleDataChange}
                  />

                  <textarea
                    name="description"
                    placeholder="Opis usługi"
                    onChange={handleChange}
                  />

                  <div className={styles.addOffer__imageUploader}>
                    <img
                      src={
                        previewImage ||
                        "/servicesPlaceholder/service-placeholder.webp"
                      }
                      alt="Preview"
                      className={styles.addOffer__imagePreview}
                    />

                    <label className={styles.addOffer__imageButton}>
                      {previewImage ? "Zmień zdjęcie" : "Dodaj zdjęcie"}

                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        hidden
                      />
                    </label>
                  </div>

                  <h4>Sekcja kontaktowa</h4>

                  <input
                    name="contactName"
                    placeholder="Osoba kontaktowa"
                    onChange={handleDataChange}
                  />

                  <input
                    name="contactPhone"
                    placeholder="Telefon"
                    onChange={handleDataChange}
                  />

                  <input
                    name="contactEmail"
                    placeholder="Email"
                    onChange={handleDataChange}
                  />
                </>
              )}
              {type !== "service_offer" && (
                <>
                  <h4 className={styles.addOffer__subtitle}>
                    Czas trwania ogłoszenia
                  </h4>

                  <div className={styles.addOffer__durationOptions}>
                    {[7, 14, 31].map((d) => (
                      <label key={d} className={styles.addOffer__promotionCard}>
                        <input
                          type="checkbox"
                          checked={formData.durationDays === d}
                          onChange={() =>
                            setFormData((prev) => ({
                              ...prev,
                              durationDays: d,
                              // reset featured jeśli za duży
                              featuredDays:
                                prev.featuredDays > d ? 0 : prev.featuredDays,
                            }))
                          }
                        />
                        <div>{d} dni</div>
                      </label>
                    ))}
                  </div>
                </>
              )}
              <h4 className={styles.addOffer__subtitle}>
                Wyróżnienie ogłoszenia
              </h4>
              <div className={styles.addOffer__durationOptions}>
                {[7, 14, 31].map((d) => (
                  <label key={d} className={styles.addOffer__promotionCard}>
                    <input
                      type="checkbox"
                      disabled={d > formData.durationDays}
                      checked={formData.featuredDays === d}
                      onChange={() =>
                        setFormData((prev) => ({
                          ...prev,
                          featuredDays: prev.featuredDays === d ? 0 : d,
                        }))
                      }
                    />
                    <div>
                      {d} dni ({d === 7 ? "1€" : d === 14 ? "2€" : "3€"})
                    </div>
                  </label>
                ))}
              </div>
              {type !== "service_offer" && (
                <label className={styles.addOffer__promotionCard}>
                  <input
                    type="checkbox"
                    checked={formData.isUrgent}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        isUrgent: e.target.checked,
                      }))
                    }
                  />
                  <div>
                    <strong>Pilne</strong>
                    <p>+1€</p>
                  </div>
                </label>
              )}
              <button onClick={handleSubmit}>Dodaj ogłoszenie</button>
            </div>
          </div>
        )}
      </main>
      <aside className={styles.addOffer__aside}>
        {!company && step >= 4 && user && (
          <div className={styles.addOffer__userCard}>
            <div className={styles.addOffer__userLink}>
              <img
                src={user.profile?.avatar || "/avatar/avt.jpg"}
                alt={user.profile?.displayName}
                className={styles.addOffer__userAvatar}
              />

              {user.profile?.displayName || "Użytkownik"}
            </div>
          </div>
        )}

        {company &&
          companies
            .filter((c) => c._id === company)
            .map((c) => (
              <div key={c._id} className={styles.addOffer__userCard}>
                <div className={styles.addOffer__userLink}>
                  <img src={c.logo} className={styles.addOffer__userAvatar} />
                  {c.name}
                </div>
              </div>
            ))}
        {step >= 4 && (
          <div className={styles.addOffer__userCard}>
            <strong>Podsumowanie</strong>

            <div style={{ marginTop: "10px", fontSize: "14px" }}>
              {type !== "service_offer" && (
                <p>Długość: {formData.durationDays} dni</p>
              )}

              {formData.featuredDays > 0 && (
                <p>Wyróżnione: {formData.featuredDays} dni</p>
              )}

              {formData.isUrgent && <p>Badge: Pilne</p>}

              <hr style={{ margin: "10px 0" }} />

              <strong>Total: €{getTotal()}</strong>
            </div>
          </div>
        )}
        <div className={styles.addOffer__adCard}>Reklama</div>
      </aside>
    </div>
  );
};
