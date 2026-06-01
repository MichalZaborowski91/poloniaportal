import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMyListingById, updateListing } from "../../api/listings";
import { getMyCompanies } from "../../api/company";
import { MARKET_CATEGORY_LABELS } from "../../app/marketplaceCategories";
import { businessCategories } from "../../app/businessCategories";

export const EditListing = () => {
  const { country, id } = useParams();

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState([]);
  const [formData, setFormData] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleSave = async () => {
    try {
      await updateListing(country, id, formData);

      alert("Ogłoszenie zostało zaktualizowane");
    } catch (err) {
      console.error(err);

      alert("Nie udało się zapisać zmian");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [listingData, companiesData] = await Promise.all([
          getMyListingById(country, id),
          getMyCompanies(),
        ]);

        setListing(listingData);

        setFormData({
          company: listingData.company?._id || "",

          title: listingData.title || "",
          description: listingData.description || "",

          city: listingData.data?.city || "",

          contactName: listingData.data?.contactName || "",
          contactPhone: listingData.data?.contactPhone || "",
          contactEmail: listingData.data?.contactEmail || "",

          position: listingData.data?.position || "",

          portfolioLink: listingData.data?.portfolioLink || "",
          linkedinLink: listingData.data?.linkedinLink || "",

          category: listingData.data?.category || "",
          condition: listingData.data?.condition || "",
          price: listingData.data?.price || "",

          images: listingData.data?.images || [],
          image: listingData.data?.image || "",
        });
        setPreviewImage(listingData.data?.image || null);
        setCompanies(companiesData.companies || companiesData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [country, id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!listing) {
    return <p>Ogłoszenie nie istnieje.</p>;
  }

  if (!formData) {
    return <p>Loading...</p>;
  }

  const type = listing.type;

  const handleRemoveImages = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setFormData((prev) => {
      const current = prev.images || [];

      return {
        ...prev,
        images: [...current, ...files].slice(0, 5),
      };
    });

    e.target.value = null;
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);

    setFormData((prev) => ({
      ...prev,
      image: "",
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      image: file,
    }));

    setPreviewImage(URL.createObjectURL(file));
  };

  const getPlaceholderImage = (type) => {
    switch (type) {
      case "housing_offer":
      case "housing_wanted":
        return "/offersCategories/Housing.webp";

      case "job_offer":
      case "job_wanted":
        return "/offersCategories/Job.webp";

      case "market_offer":
      case "market_wanted":
        return "/offersCategories/Marketplace.webp";

      case "service_offer":
        return "/offersCategories/Services.webp";

      default:
        return "/placeholder.webp";
    }
  };

  return (
    <div>
      <h1>Edycja ogłoszenia</h1>

      <div>
        <h2>Publikuj jako</h2>

        <select
          value={formData.company}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              company: e.target.value,
            }))
          }
        >
          <option value="">Prywatnie</option>

          {companies.map((company) => (
            <option key={company._id} value={company._id}>
              {company.name}
            </option>
          ))}
        </select>

        {type === "job_offer" && (
          <div>
            <div>
              <img
                src={previewImage || getPlaceholderImage(type)}
                alt=""
                style={{
                  width: "220px",
                  height: "220px",
                  objectFit: "cover",
                }}
              />

              <div>
                <label>
                  {previewImage ? "Zmień zdjęcie" : "Dodaj zdjęcie"}

                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleImageChange}
                  />
                </label>

                {previewImage && (
                  <button type="button" onClick={handleRemoveImage}>
                    ✕
                  </button>
                )}
              </div>
            </div>
            <input
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
            />

            <input
              value={formData.city}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  city: e.target.value,
                }))
              }
            />

            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          </div>
        )}

        {type === "job_wanted" && (
          <div>
            <div>
              <img
                src={previewImage || getPlaceholderImage(type)}
                alt=""
                style={{
                  width: "220px",
                  height: "220px",
                  objectFit: "cover",
                }}
              />

              <div>
                <label>
                  {previewImage ? "Zmień zdjęcie" : "Dodaj zdjęcie"}

                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleImageChange}
                  />
                </label>

                {previewImage && (
                  <button type="button" onClick={handleRemoveImage}>
                    ✕
                  </button>
                )}
              </div>
            </div>
            <input
              value={formData.position}
              placeholder="Stanowisko"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  position: e.target.value,
                }))
              }
            />

            <input
              value={formData.city}
              placeholder="Miasto"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  city: e.target.value,
                }))
              }
            />

            <textarea
              value={formData.description}
              placeholder="Opis"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />

            <input
              value={formData.portfolioLink}
              placeholder="Portfolio"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  portfolioLink: e.target.value,
                }))
              }
            />

            <input
              value={formData.linkedinLink}
              placeholder="LinkedIn"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  linkedinLink: e.target.value,
                }))
              }
            />
          </div>
        )}

        {type === "market_offer" && (
          <div>
            <div>
              {formData.images.length > 0 ? (
                formData.images.map((image, index) => (
                  <div key={index}>
                    <img
                      src={
                        typeof image === "string"
                          ? image
                          : URL.createObjectURL(image)
                      }
                      alt=""
                    />

                    <button
                      type="button"
                      onClick={() => handleRemoveImages(index)}
                    >
                      ✕
                    </button>
                  </div>
                ))
              ) : (
                <img src={getPlaceholderImage(type)} alt="" />
              )}

              {formData.images.length < 5 && (
                <label>
                  Dodaj zdjęcie ({formData.images.length}/5)
                  <input
                    type="file"
                    multiple
                    hidden
                    accept="image/*"
                    onChange={handleImagesChange}
                  />
                </label>
              )}
            </div>
            <input
              value={formData.title}
              placeholder="Tytuł"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
            />

            <input
              value={formData.city}
              placeholder="Miasto"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  city: e.target.value,
                }))
              }
            />

            <textarea
              value={formData.description}
              placeholder="Opis"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />

            <select
              value={formData.category}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  category: e.target.value,
                }))
              }
            >
              <option value="">Kategoria</option>

              {Object.entries(MARKET_CATEGORY_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>

            <input
              type="number"
              value={formData.price}
              placeholder="Cena"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  price: e.target.value,
                }))
              }
            />

            <select
              value={formData.condition}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  condition: e.target.value,
                }))
              }
            >
              <option value="">Stan</option>
              <option value="new">Nowe</option>
              <option value="used">Używane</option>
            </select>
          </div>
        )}

        {type === "market_wanted" && (
          <div>
            <div>
              <img
                src={previewImage || getPlaceholderImage(type)}
                alt=""
                style={{
                  width: "220px",
                  height: "220px",
                  objectFit: "cover",
                }}
              />

              <div>
                <label>
                  {previewImage ? "Zmień zdjęcie" : "Dodaj zdjęcie"}

                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleImageChange}
                  />
                </label>

                {previewImage && (
                  <button type="button" onClick={handleRemoveImage}>
                    ✕
                  </button>
                )}
              </div>
            </div>
            <input
              value={formData.title}
              placeholder="Tytuł"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
            />

            <textarea
              value={formData.description}
              placeholder="Opis"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />

            <select
              value={formData.category}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  category: e.target.value,
                }))
              }
            >
              <option value="">Kategoria</option>

              {Object.entries(MARKET_CATEGORY_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        )}

        {type === "housing_offer" && (
          <div>
            <div>
              {formData.images.length > 0 ? (
                formData.images.map((image, index) => (
                  <div key={index}>
                    <img
                      src={
                        typeof image === "string"
                          ? image
                          : URL.createObjectURL(image)
                      }
                      alt=""
                    />

                    <button
                      type="button"
                      onClick={() => handleRemoveImages(index)}
                    >
                      ✕
                    </button>
                  </div>
                ))
              ) : (
                <img src={getPlaceholderImage(type)} alt="" />
              )}

              {formData.images.length < 5 && (
                <label>
                  Dodaj zdjęcie ({formData.images.length}/5)
                  <input
                    type="file"
                    multiple
                    hidden
                    accept="image/*"
                    onChange={handleImagesChange}
                  />
                </label>
              )}
            </div>
            <input
              value={formData.title}
              placeholder="Tytuł ogłoszenia"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
            />

            <input
              value={formData.city}
              placeholder="Miasto"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  city: e.target.value,
                }))
              }
            />

            <textarea
              value={formData.description}
              placeholder="Opis"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          </div>
        )}

        {type === "housing_wanted" && (
          <div>
            <div>
              <img
                src={previewImage || getPlaceholderImage(type)}
                alt=""
                style={{
                  width: "220px",
                  height: "220px",
                  objectFit: "cover",
                }}
              />

              <div>
                <label>
                  {previewImage ? "Zmień zdjęcie" : "Dodaj zdjęcie"}

                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleImageChange}
                  />
                </label>

                {previewImage && (
                  <button type="button" onClick={handleRemoveImage}>
                    ✕
                  </button>
                )}
              </div>
            </div>
            <input
              value={formData.title}
              placeholder="Tytuł ogłoszenia"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
            />

            <input
              value={formData.city}
              placeholder="Miasto"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  city: e.target.value,
                }))
              }
            />

            <textarea
              value={formData.description}
              placeholder="Opis"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          </div>
        )}

        {type === "service_offer" && (
          <div>
            <div>
              <img
                src={previewImage || getPlaceholderImage(type)}
                alt=""
                style={{
                  width: "220px",
                  height: "220px",
                  objectFit: "cover",
                }}
              />

              <div>
                <label>
                  {previewImage ? "Zmień zdjęcie" : "Dodaj zdjęcie"}

                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleImageChange}
                  />
                </label>

                {previewImage && (
                  <button type="button" onClick={handleRemoveImage}>
                    ✕
                  </button>
                )}
              </div>
            </div>
            <input
              value={formData.title}
              placeholder="Tytuł ogłoszenia"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
            />

            <select
              value={formData.category}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  category: e.target.value,
                }))
              }
            >
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
              value={formData.city}
              placeholder="Miasto"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  city: e.target.value,
                }))
              }
            />

            <textarea
              value={formData.description}
              placeholder="Opis usługi"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          </div>
        )}
      </div>
      <div>
        <input
          value={formData.contactName}
          placeholder="Imię i nazwisko"
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              contactName: e.target.value,
            }))
          }
        />

        <input
          value={formData.contactPhone}
          placeholder="Telefon"
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              contactPhone: e.target.value,
            }))
          }
        />

        <input
          value={formData.contactEmail}
          placeholder="Email"
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              contactEmail: e.target.value,
            }))
          }
        />
      </div>

      <button onClick={handleSave}>Zapisz zmiany</button>
    </div>
  );
};
