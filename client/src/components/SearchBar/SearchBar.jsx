import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LISTING_TYPE_OPTIONS } from "./listingTypes";
import styles from "./SearchBar.module.scss";
import SearchIcon from "../../assets/icons/search.svg?react";

export const SearchBar = () => {
  const [type, setType] = useState("");
  const [query, setQuery] = useState("");

  const navigate = useNavigate();
  const { country } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (type) {
      params.set("type", type);
    }
    if (query) {
      params.set("q", query);
    }

    navigate(`/${country}/listings?${params.toString()}`);
  };

  return (
    <section>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <select
          className={styles.searchForm__type}
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">Co Cię interesuje?</option>

          {LISTING_TYPE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <input
          className={styles.searchForm__input}
          type="text"
          placeholder="Miasto lub fraza (np. Dublin, dekarz)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button className={styles.searchForm__submitButton} type="submit">
          <SearchIcon className={styles.searchForm__icon} />
          Szukaj
        </button>
      </form>
    </section>
  );
};
