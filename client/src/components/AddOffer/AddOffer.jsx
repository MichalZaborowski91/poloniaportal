import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { BsArrowLeftShort } from "react-icons/bs";
import styles from "../AddOffer/AddOffer.module.scss";
import { COUNTRIES_PL } from "../../app/countriesPL";
import { businessCategories } from "../../app/businessCategories";
import { TYPE_LABELS } from "../../app/adLabels";

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

  const handleRemoveImages = (index) => {
    setFormData((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        images: prev.data.images.filter((_, i) => i !== index),
      },
    }));

    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setFormData((prev) => {
      const current = prev.data.images || [];
      const updated = [...current, ...files].slice(0, 5);

      return {
        ...prev,
        data: {
          ...prev.data,
          images: updated,
        },
      };
    });

    setPreviewImages((prev) => {
      const updated = [
        ...prev,
        ...files.map((file) => URL.createObjectURL(file)),
      ].slice(0, 5);

      return updated;
    });

    // 🔥 TO JEST KLUCZ
    e.target.value = null;
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

      if (!res.ok) {
        console.error("ERROR:", result);
        alert(result.message);
        return;
      }

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

  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        image: null,
      },
    }));

    setPreviewImage(null);
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
            <div className={styles.addOffer__form}>
              {type === "job_offer" && (
                <div>
                  <div className={styles.addOffer__imageUploader}>
                    <img
                      src={previewImage || "/offersCategories/Job.webp"}
                      alt="Preview"
                      className={styles.addOffer__imagePreview}
                    />

                    <div className={styles.addOffer__imageActions}>
                      <label
                        className={styles.buttonLike}
                        title="Dodaj zdjęcie odpowiednie dla swojego ogłoszenia"
                      >
                        {previewImage ? "Zmień zdjęcie" : "Dodaj zdjęcie"}

                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          hidden
                        />
                      </label>

                      {previewImage && (
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className={styles.addOffer__removeButton}
                        >
                          Usuń zdjęcie
                        </button>
                      )}
                    </div>
                  </div>
                  <div className={styles.adInfo}>
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
                  </div>
                </div>
              )}

              {type === "job_wanted" && (
                <div>
                  <div className={styles.addOffer__imageUploader}>
                    <img
                      src={previewImage || "/offersCategories/Job.webp"}
                      alt="Preview"
                      className={styles.addOffer__imagePreview}
                    />

                    <div className={styles.addOffer__imageActions}>
                      <label
                        className={styles.buttonLike}
                        title="Dodaj zdjęcie odpowiednie dla swojego ogłoszenia"
                      >
                        {previewImage ? "Zmień zdjęcie" : "Dodaj zdjęcie"}

                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          hidden
                        />
                      </label>

                      {previewImage && (
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className={styles.addOffer__removeButton}
                        >
                          Usuń zdjęcie
                        </button>
                      )}
                    </div>
                  </div>
                  <div className={styles.adInfo}>
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
                  </div>
                </div>
              )}

              {type === "market_offer" && (
                <div>
                  <div className={styles.addOffer__imageUploader}>
                    <div className={styles.addOffer__imagesGrid}>
                      {previewImages.length > 0 ? (
                        previewImages.map((img, index) => (
                          <div key={index} className={styles.imageItem}>
                            <img
                              src={img}
                              alt={`Preview ${index + 1}`}
                              className={styles.addOffer__multiImagePreview}
                            />

                            <button
                              type="button"
                              onClick={() => handleRemoveImages(index)}
                              className={styles.removeImageButton}
                            >
                              ✕
                            </button>
                          </div>
                        ))
                      ) : (
                        <img
                          src="/offersCategories/Marketplace.webp"
                          alt="Placeholder"
                          className={styles.addOffer__imagePreview}
                        />
                      )}
                    </div>

                    {previewImages.length < 5 && (
                      <label className={styles.addOffer__imageButton}>
                        Dodaj zdjęcie ({previewImages.length}/5)
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImagesChange}
                          hidden
                        />
                      </label>
                    )}
                  </div>
                  <div className={styles.adInfo}>
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
                  </div>
                </div>
              )}

              {type === "market_wanted" && (
                <div>
                  <div className={styles.addOffer__imageUploader}>
                    <img
                      src={previewImage || "/offersCategories/Marketplace.webp"}
                      alt="Preview"
                      className={styles.addOffer__imagePreview}
                    />

                    <div className={styles.addOffer__imageActions}>
                      <label
                        className={styles.buttonLike}
                        title="Dodaj zdjęcie odpowiednie dla swojego ogłoszenia"
                      >
                        {previewImage ? "Zmień zdjęcie" : "Dodaj zdjęcie"}

                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          hidden
                        />
                      </label>

                      {previewImage && (
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className={styles.addOffer__removeButton}
                        >
                          Usuń zdjęcie
                        </button>
                      )}
                    </div>
                  </div>
                  <div className={styles.adInfo}>
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
                  </div>
                </div>
              )}

              {type === "housing_offer" && (
                <div>
                  <div className={styles.addOffer__imageUploader}>
                    <div className={styles.addOffer__imagesGrid}>
                      {previewImages.length > 0 ? (
                        previewImages.map((img, index) => (
                          <div key={index} className={styles.imageItem}>
                            <img
                              src={img}
                              alt={`Preview ${index + 1}`}
                              className={styles.addOffer__multiImagePreview}
                            />

                            <button
                              type="button"
                              onClick={() => handleRemoveImages(index)}
                              className={styles.removeImageButton}
                            >
                              ✕
                            </button>
                          </div>
                        ))
                      ) : (
                        <img
                          src="/offersCategories/Housing.webp"
                          alt="Placeholder"
                          className={styles.addOffer__imagePreview}
                        />
                      )}
                    </div>

                    {previewImages.length < 5 && (
                      <label className={styles.addOffer__imageButton}>
                        Dodaj zdjęcie ({previewImages.length}/5)
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImagesChange}
                          hidden
                        />
                      </label>
                    )}
                  </div>
                  <div className={styles.adInfo}>
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
                  </div>
                </div>
              )}
              {type === "housing_wanted" && (
                <div>
                  <div className={styles.addOffer__imageUploader}>
                    <img
                      src={previewImage || "/offersCategories/Housing.webp"}
                      alt="Preview"
                      className={styles.addOffer__imagePreview}
                    />

                    <div className={styles.addOffer__imageActions}>
                      <label
                        className={styles.buttonLike}
                        title="Dodaj zdjęcie odpowiednie dla swojego ogłoszenia"
                      >
                        {previewImage ? "Zmień zdjęcie" : "Dodaj zdjęcie"}

                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          hidden
                        />
                      </label>

                      {previewImage && (
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className={styles.addOffer__removeButton}
                        >
                          Usuń zdjęcie
                        </button>
                      )}
                    </div>
                  </div>
                  <div className={styles.adInfo}>
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
                  </div>
                </div>
              )}
              {type === "service_offer" && (
                <div>
                  <div className={styles.addOffer__imageUploader}>
                    <img
                      src={previewImage || "/offersCategories/Services.webp"}
                      alt="Preview"
                      className={styles.addOffer__imagePreview}
                    />

                    <div className={styles.addOffer__imageActions}>
                      <label
                        className={styles.buttonLike}
                        title="Dodaj zdjęcie odpowiednie dla swojego ogłoszenia"
                      >
                        {previewImage ? "Zmień zdjęcie" : "Dodaj zdjęcie"}

                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          hidden
                        />
                      </label>

                      {previewImage && (
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className={styles.addOffer__removeButton}
                        >
                          Usuń zdjęcie
                        </button>
                      )}
                    </div>
                  </div>
                  <div className={styles.adInfo}>
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
                  </div>
                </div>
              )}
              <div className={styles.contactSection}>
                <h4 className={styles.contactSection__title}>
                  Sekcja kontaktowa
                </h4>
                <div className={styles.contactSection__container}>
                  <ul className={styles.contactSection__list}>
                    <li className={styles.contactSection__item}>
                      <input
                        name="contactName"
                        placeholder="Imię osoby kontaktowej"
                        onChange={handleDataChange}
                        className={styles.contactSection__input}
                      />
                    </li>
                    <li className={styles.contactSection__item}>
                      <input
                        name="contactPhone"
                        placeholder="Telefon"
                        onChange={handleDataChange}
                        className={styles.contactSection__input}
                      />
                    </li>
                    <li className={styles.contactSection__item}>
                      <input
                        name="contactEmail"
                        placeholder="Email"
                        onChange={handleDataChange}
                        className={styles.contactSection__input}
                      />
                    </li>
                  </ul>
                </div>
              </div>
              {type !== "service_offer" && (
                <div className={styles.duration}>
                  <h4 className={styles.duration__title}>
                    Czas trwania ogłoszenia
                  </h4>

                  <div className={styles.duration__container}>
                    {[7, 14, 31].map((d) => (
                      <button
                        key={d}
                        type="button"
                        className={`${styles.duration__buttons} ${
                          formData.durationDays === d
                            ? styles["duration__buttons--active"]
                            : ""
                        }`}
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            durationDays: d,
                            featuredDays:
                              prev.featuredDays > d ? 0 : prev.featuredDays,
                          }))
                        }
                      >
                        {d} dni
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div className={styles.featured}>
                <h4 className={styles.featured__title}>
                  Wyróżnienie ogłoszenia
                </h4>
                <div className={styles.featured__container}>
                  {[7, 14, 31].map((d) => {
                    const isActive = formData.featuredDays === d;
                    const isDisabled = d > formData.durationDays;

                    return (
                      <button
                        key={d}
                        type="button"
                        disabled={isDisabled}
                        title={
                          isDisabled ? "Wybierz dłuższy czas ogłoszenia" : ""
                        }
                        className={`
                         ${styles.featured__buttons}
                          ${isActive ? styles["featured__buttons--active"] : ""}
                          ${isDisabled ? styles["featured__buttons--disabled"] : ""}
                            `}
                        onClick={() => {
                          if (isDisabled) return;

                          setFormData((prev) => ({
                            ...prev,
                            featuredDays: prev.featuredDays === d ? 0 : d,
                          }));
                        }}
                      >
                        {d} dni ({d === 7 ? "€1" : d === 14 ? "€2" : "€3"})
                      </button>
                    );
                  })}
                </div>
                {type !== "service_offer" && (
                  <div className={styles.urgent}>
                    <h4 className={styles.urgent__title}>Etykieta</h4>
                    <div className={styles.urgent__container}>
                      <button
                        type="button"
                        title='Dodaj etykietę "Pilne", aby zwiększyć widoczność i ważność ogłoszenia'
                        className={`
        ${styles.urgent__button}
        ${formData.isUrgent ? styles["urgent__button--active"] : ""}
      `}
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            isUrgent: !prev.isUrgent,
                          }))
                        }
                      >
                        🔥 Pilne (€1)
                      </button>
                    </div>
                  </div>
                )}
              </div>

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
