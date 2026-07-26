import { eventCategories } from "../../../app/eventCategories";
import styles from "../EventForm/EventForm.module.scss";
import { useState, useEffect } from "react";
import { EventImageUpload } from "../EventImageUpload/EventImageUpload";
import { EventDatePicker } from "../EventDatePicker/EventDatePicker";
import { EventLocation } from "../EventLocation/EventLocation";
import { validateEventForm } from "../../../utils/validateEventForm";
import { EventAdditionalInfo } from "../EventAdditionalInfo/EventAdditionalInfo";

export const EventForm = ({ mode, onSubmit, initialData = null }) => {
  const [companies, setCompanies] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);

  const defaultFormData = {
    company: "",
    title: "",
    description: "",
    category: "",
    coverImage: null,
    startDate: null,
    startTime: null,
    endDate: null,
    endTime: null,
    isOnline: false,
    isFree: true,
    city: "",
    venue: "",
    address: "",
    onlineLink: "",
    price: "",
    priceLabel: "",
    capacity: "",
    unlimitedCapacity: true,
    website: "",
  };
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(initialData || defaultFormData);

  const handleSubmit = (e) => {
    e.preventDefault();

    const { isValid, errors } = validateEventForm(formData);

    if (!isValid) {
      setErrors(errors);
      return;
    }

    setErrors({});

    onSubmit(formData);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => {
      const newData = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };

      //FREE EVENT
      if (name === "isFree" && checked) {
        newData.price = "";
      }

      //NO USERS LIMITS
      if (name === "unlimitedCapacity" && checked) {
        newData.capacity = "";
      }

      return newData;
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (previewImage) {
      URL.revokeObjectURL(previewImage);
    }

    const preview = URL.createObjectURL(file);

    setFormData((prev) => ({
      ...prev,
      coverImage: file,
    }));

    setPreviewImage(preview);
  };

  const handleRemoveImage = () => {
    if (previewImage) {
      URL.revokeObjectURL(previewImage);
    }

    setFormData((prev) => ({
      ...prev,
      coverImage: null,
    }));

    setPreviewImage(null);
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

  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>{mode === "create" ? "Dodaj wydarzenie" : "Edytuj wydarzenie"}</h2>
      <h3>Dodaj jako</h3>

      <div>
        <button
          type="button"
          onClick={() => {
            setFormData((prev) => ({
              ...prev,
              company: "",
            }));
          }}
        >
          Prywatnie
        </button>

        {companies.length > 0 && (
          <>
            <select
              value={formData.company}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  company: e.target.value,
                }))
              }
            >
              <option value="">Wybierz firmę</option>

              {companies.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>

            <button type="button" disabled={!formData.company}>
              Dodaj jako firma
            </button>
          </>
        )}
      </div>
      <h3>Podstawowe informacje</h3>

      <EventImageUpload
        image={formData.coverImage}
        preview={previewImage}
        currentImage={initialData?.coverImage}
        onImageChange={handleImageChange}
        onRemoveImage={handleRemoveImage}
      />

      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Tytuł wydarzenia"
      />
      {errors.title && <p className={styles.error}>{errors.title}</p>}

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Opis wydarzenia"
      />
      {errors.description && (
        <p className={styles.error}>{errors.description}</p>
      )}
      <select name="category" value={formData.category} onChange={handleChange}>
        <option value="">Wybierz kategorię</option>

        {eventCategories.map((category) => (
          <option key={category.value} value={category.value}>
            {category.label}
          </option>
        ))}
      </select>
      {errors.category && <p className={styles.error}>{errors.category}</p>}
      <EventDatePicker
        formData={formData}
        setFormData={setFormData}
        errors={errors}
      />
      <EventLocation
        isOnline={formData.isOnline}
        city={formData.city}
        venue={formData.venue}
        address={formData.address}
        onlineLink={formData.onlineLink}
        onChange={handleChange}
        errors={errors}
      />

      <EventAdditionalInfo
        formData={formData}
        onChange={handleChange}
        errors={errors}
      />

      <button type="submit">
        {mode === "create" ? "Dodaj wydarzenie" : "Zapisz zmiany"}
      </button>
    </form>
  );
};
