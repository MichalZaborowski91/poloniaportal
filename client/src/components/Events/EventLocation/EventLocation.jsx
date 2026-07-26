export const EventLocation = ({
  isOnline,
  city,
  venue,
  address,
  onlineLink,
  onChange,
  errors,
}) => {
  return (
    <div>
      <h3>Lokalizacja</h3>

      <label>
        <input
          type="checkbox"
          name="isOnline"
          checked={isOnline}
          onChange={onChange}
        />
        Wydarzenie online
      </label>

      {!isOnline ? (
        <>
          <input
            type="text"
            name="city"
            placeholder="Miasto"
            value={city}
            onChange={onChange}
          />
          {errors.city && <p>{errors.city}</p>}
          <input
            type="text"
            name="venue"
            placeholder="Miejsce (np. Polski Dom Kultury)"
            value={venue}
            onChange={onChange}
          />

          <input
            type="text"
            name="address"
            placeholder="Adres"
            value={address}
            onChange={onChange}
          />
          {errors.address && <p>{errors.address}</p>}
        </>
      ) : (
        <input
          type="url"
          name="onlineLink"
          placeholder="https://..."
          value={onlineLink}
          onChange={onChange}
        />
      )}
      {errors.onlineLink && <p>{errors.onlineLink}</p>}
    </div>
  );
};
