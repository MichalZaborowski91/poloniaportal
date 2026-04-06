import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../AddOffer/AddOffer.module.scss";
import { useAuth } from "../../hooks/useAuth";
import { BsArrowLeftShort } from "react-icons/bs";

export const AddOffer = () => {
  const [step, setStep] = useState(1);
  const [companies, setCompanies] = useState([]);
  const [category, setCategory] = useState(null);
  const [type, setType] = useState(null);
  const [company, setCompany] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    data: {},
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

  const handleSubmit = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/${country}/listings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          type,
          title: type.startsWith("job")
            ? formData.data.position
            : formData.title,
          description: formData.description,
          durationDays: 7,
          company,
          data: formData.data,
        }),
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

  return (
    <div className={styles.addOffer}>
      {/* MAIN */}
      <main className={styles.addOffer__main}>
        {step > 1 && (
          <div className={styles.addOffer__topBar}>
            <button
              type="button"
              onClick={handleBack}
              className={styles.breadcrumbBtn}
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
        {/* STEPY */}
        {step === 1 && (
          <div>
            <h2>Kategoria</h2>

            <button
              onClick={() => {
                setCategory("Praca");
                setStep(2);
              }}
            >
              Praca
            </button>

            <button
              onClick={() => {
                setCategory("Mieszkanie");
                setStep(2);
              }}
            >
              Mieszkanie
            </button>

            <button
              onClick={() => {
                setCategory("Marketplace");
                setStep(2);
              }}
            >
              Marketplace
            </button>
            <button
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
              Usługi
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2>Typ</h2>

            {category === "Praca" && (
              <>
                <button
                  onClick={() => {
                    setType("job_offer");
                    setStep(3);
                  }}
                >
                  Dam pracę
                </button>
                <button
                  onClick={() => {
                    setType("job_wanted");
                    setStep(3);
                  }}
                >
                  Szukam pracy
                </button>
              </>
            )}

            {category === "Mieszkanie" && (
              <>
                <button
                  onClick={() => {
                    setType("housing_offer");
                    setStep(3);
                  }}
                >
                  Wynajmę
                </button>
                <button
                  onClick={() => {
                    setType("housing_wanted");
                    setStep(3);
                  }}
                >
                  Szukam
                </button>
              </>
            )}

            {category === "Marketplace" && (
              <>
                <button
                  onClick={() => {
                    setType("market_offer");
                    setStep(3);
                  }}
                >
                  Sprzedam
                </button>
                <button
                  onClick={() => {
                    setType("market_wanted");
                    setStep(3);
                  }}
                >
                  Kupię
                </button>
              </>
            )}
            {category === "Usługi" && (
              <>
                <button
                  onClick={() => {
                    setType("service_offer");
                    setStep(3);
                  }}
                >
                  Oferuję usługę
                </button>
              </>
            )}
          </div>
        )}

        {step === 3 && (
          <div>
            <h2>Kto dodaje?</h2>

            <button
              onClick={() => {
                setCompany(null);
                setStep(4);
              }}
            >
              Prywatnie
            </button>

            {companies.length > 0 && (
              <select onChange={(e) => setCompany(e.target.value)}>
                <option value="">Wybierz firmę</option>
                {companies.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            )}

            <button onClick={() => setStep(4)}>Dalej</button>
          </div>
        )}

        {step === 4 && (
          <div className={styles.addOffer__section}>
            <h3 className={styles.addOffer__title}>Formularz</h3>

            <div className={styles.addOffer__form}>
              {type?.startsWith("job") && (
                <>
                  <input
                    name="position"
                    placeholder="Stanowisko"
                    onChange={handleDataChange}
                  />
                  <input
                    name="city"
                    placeholder="Miasto"
                    onChange={handleDataChange}
                  />
                </>
              )}

              {type?.startsWith("housing") && (
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
                </>
              )}

              {type?.startsWith("market") && (
                <>
                  <input
                    name="title"
                    placeholder="Nazwa produktu"
                    onChange={handleChange}
                  />

                  <select name="category" onChange={handleDataChange}>
                    <option value="">Kategoria</option>
                    <option value="electronics">Elektronika</option>
                    <option value="cars">Samochody</option>
                    <option value="home">Dom</option>
                  </select>
                </>
              )}

              {type === "service_offer" && (
                <>
                  <input
                    name="title"
                    placeholder="Nazwa usługi (np. Kosmetyczka mobilna)"
                    onChange={handleChange}
                  />

                  <input
                    name="city"
                    placeholder="Miasto"
                    onChange={handleDataChange}
                  />

                  <select name="category" onChange={handleDataChange}>
                    <option value="">Kategoria</option>
                    <option value="beauty">Uroda</option>
                    <option value="automotive">Motoryzacja</option>
                    <option value="construction">Budownictwo</option>
                    <option value="cleaning">Sprzątanie</option>
                    <option value="transport">Transport</option>
                    <option value="other">Inne</option>
                  </select>
                </>
              )}

              <textarea
                name="description"
                placeholder="Opis"
                onChange={handleChange}
              />

              <button onClick={handleSubmit}>Dodaj ogłoszenie</button>
            </div>
          </div>
        )}
      </main>

      {/* ASIDE */}

      <aside className={styles.addOffer__aside}>
        {!company && step >= 4 && user && (
          <div className={styles.userCard}>
            <div className={styles.userLink}>
              <img
                src={user.profile?.avatar || "/avatar/avt.jpg"}
                alt={user.profile?.displayName}
                className={styles.userAvatar}
              />

              {user.profile?.displayName || "Użytkownik"}
            </div>
          </div>
        )}

        {company &&
          companies
            .filter((c) => c._id === company)
            .map((c) => (
              <div key={c._id} className={styles.userCard}>
                <div className={styles.userLink}>
                  <img src={c.logo} className={styles.userAvatar} />
                  {c.name}
                </div>
              </div>
            ))}

        <div className={styles.adCard}>Reklama</div>
      </aside>
    </div>
  );
};
