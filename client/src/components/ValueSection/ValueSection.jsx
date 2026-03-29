import { useCountry } from "../../app/useCountry";
import { useNavigate } from "react-router-dom";
import { routes } from "../../app/routes";
import styles from "../ValueSection/ValueSection.module.scss";

export const ValueSection = () => {
  const country = useCountry();
  const navigate = useNavigate();

  const isPoland = country === "pl";

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>
        {isPoland
          ? "Polonia Portal – Łączymy Polaków na całym świecie"
          : "Polonia Portal – Wszystko dla Polaków za granicą"}
      </h2>

      <div className={styles.columns}>
        {/* 👤 USER */}
        <div className={styles.column}>
          <h3>Dla użytkowników</h3>

          <ul>
            {isPoland ? (
              <>
                <li>🌍 Znajdź Polonię i usługi za granicą</li>
                <li>✈️ Planuj wyjazd i życie poza Polską</li>
                <li>📍 Odkrywaj miejsca tworzone przez Polaków</li>
                <li>💬 Bądź częścią globalnej społeczności</li>
              </>
            ) : (
              <>
                <li>🔍 Znajdź polskie firmy w Twoim kraju</li>
                <li>⭐ Wybieraj sprawdzonych specjalistów</li>
                <li>📍 Odkrywaj usługi blisko Ciebie</li>
                <li>💬 Kontaktuj się bezpośrednio</li>
              </>
            )}
          </ul>
        </div>

        {/* 🏢 BUSINESS */}
        <div className={styles.column}>
          <h3>Dla firm</h3>

          <ul>
            {isPoland ? (
              <>
                <li>🌍 Docieraj do Polonii za granicą</li>
                <li>📢 Promuj swoje usługi globalnie</li>
                <li>🚀 Rozwijaj biznes poza Polską</li>
                <li>💰 Zdobywaj klientów z całego świata</li>
              </>
            ) : (
              <>
                <li>📢 Pokaż swój biznes Polonii</li>
                <li>🚀 Zdobądź nowych klientów</li>
                <li>⭐ Wyróżnij swoją firmę</li>
                <li>📈 Buduj swoją markę za granicą</li>
              </>
            )}
          </ul>

          <button
            className={styles.cta}
            onClick={() => navigate(routes.addCompany(country))}
          >
            {isPoland ? "Promuj swoją firmę" : "Dodaj swoją firmę"}
          </button>
        </div>
      </div>

      {/* 🔥 CTA */}
      <div className={styles.bottomCta}>
        <p>
          {isPoland
            ? "Chcesz dotrzeć do Polonii na świecie?"
            : "Chcesz więcej klientów?"}
        </p>

        <button onClick={() => navigate(`/${country}/advertise`)}>
          {isPoland ? "Zacznij promocję" : "Reklamuj się u nas"}
        </button>
      </div>
    </section>
  );
};
