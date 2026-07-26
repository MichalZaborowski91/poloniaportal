export const EventAdditionalInfo = ({ formData, onChange, errors }) => {
  return (
    <div>
      <h3>Informacje dodatkowe</h3>

      <label>
        <input
          type="checkbox"
          name="isFree"
          checked={formData.isFree}
          onChange={onChange}
        />
        Darmowe wydarzenie
      </label>

      {!formData.isFree && (
        <>
          <input
            type="number"
            name="price"
            min="0"
            placeholder="Cena"
            value={formData.price}
            onChange={onChange}
          />
          <input
            type="text"
            name="priceLabel"
            placeholder="Opis ceny (opcjonalnie)"
            value={formData.priceLabel}
            onChange={onChange}
          />
        </>
      )}
      {errors.price && <p>{errors.price}</p>}
      <label>
        <input
          type="checkbox"
          name="unlimitedCapacity"
          checked={formData.unlimitedCapacity}
          onChange={onChange}
        />
        Bez limitu uczestników
      </label>

      {!formData.unlimitedCapacity && (
        <input
          type="number"
          name="capacity"
          min="1"
          placeholder="Liczba miejsc"
          value={formData.capacity}
          onChange={onChange}
        />
      )}
      {errors.capacity && <p>{errors.capacity}</p>}
      <input
        type="url"
        name="website"
        placeholder="Strona internetowa / link do wydarzenia (opcjonalnie)"
        value={formData.website}
        onChange={onChange}
      />
    </div>
  );
};
