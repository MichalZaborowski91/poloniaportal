export const FormRenderer = ({
  type,
  formData,
  handleChange,
  handleDataChange,
  handleImageChange,
  previewImage,
}) => {
  if (type === "job_offer") {
    return (
      <>
        <input
          name="position"
          placeholder="Stanowisko (np. Zatrudnię elektryka)"
          onChange={handleDataChange}
        />

        <input name="city" placeholder="Miasto" onChange={handleDataChange} />

        <textarea
          name="description"
          placeholder="Opis ogłoszenia"
          onChange={handleChange}
        />

        <div>
          <img
            src={
              previewImage ||
              "/companyLogoPlaceholder/companyLogoPlaceholder.webp"
            }
            alt="Preview"
          />

          <input type="file" onChange={handleImageChange} />
        </div>
      </>
    );
  }

  return null;
};
