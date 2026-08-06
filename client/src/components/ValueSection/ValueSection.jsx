import Container from "../Layout/Container";
import styles from "./ValueSection.module.scss";
import { useAuth } from "../../hooks/useAuth";
import { routes } from "../../app/routes";

import {
  MdBusiness,
  MdCampaign,
  MdEvent,
  MdGroups,
  MdPublic,
  MdTrendingUp,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useCountry } from "@/app/useCountry";

const benefits = [
  {
    icon: MdBusiness,
    title: "Polskie firmy",
    description:
      "Znajdź sprawdzone firmy prowadzone przez Polaków w Polsce i za granicą.",
  },
  {
    icon: MdCampaign,
    title: "Ogłoszenia",
    description:
      "Przeglądaj oferty pracy, mieszkań, usług oraz ogłoszenia lokalnej społeczności.",
  },
  {
    icon: MdEvent,
    title: "Wydarzenia",
    description:
      "Odkrywaj koncerty, spotkania, pikniki i wydarzenia organizowane przez Polonię.",
  },
  {
    icon: MdGroups,
    title: "Społeczność",
    description:
      "Poznawaj ludzi, wymieniaj doświadczenia i buduj kontakty z Polakami na całym świecie.",
  },
  {
    icon: MdPublic,
    title: "Polska i świat",
    description:
      "Przełączaj się między krajami i odkrywaj polskie społeczności na całym świecie.",
  },
  {
    icon: MdTrendingUp,
    title: "Rozwój i promocja biznesu",
    description:
      "Promuj swoją firmę i docieraj do Polaków mieszkających w Polsce i za granicą.",
  },
];

export const ValueSection = () => {
  const navigate = useNavigate();
  const country = useCountry();
  const { user } = useAuth();

  return (
    <section className={styles.wrapper}>
      <Container>
        <h2 className={styles.title}>
          Wszystko, czego potrzebują Polacy — w Polsce i za granicą
        </h2>

        <p className={styles.description}>
          Polonia Portal to miejsce stworzone dla Polaków mieszkających w Polsce
          oraz za granicą. Znajdziesz tutaj polskie firmy, ogłoszenia,
          wydarzenia i społeczność, która pomaga utrzymywać kontakt z rodakami
          niezależnie od miejsca zamieszkania.
        </p>

        <div className={styles.grid}>
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <article key={benefit.title} className={styles.card}>
                <Icon className={styles.icon} />

                <h3>{benefit.title}</h3>

                <p>{benefit.description}</p>
              </article>
            );
          })}
        </div>

        {/* Future statistics from API */}
        {/* 
<div className={styles.stats}>
  <div className={styles.stat}>
    <span>0</span>
    <p>Krajów</p>
  </div>

  <div className={styles.stat}>
    <span>0</span>
    <p>Firm</p>
  </div>

  <div className={styles.stat}>
    <span>0</span>
    <p>Ogłoszeń</p>
  </div>

  <div className={styles.stat}>
    <span>0</span>
    <p>Użytkowników</p>
  </div>
</div>
*/}

        <div className={styles.cta}>
          <h3>Dołącz do społeczności Polonia Portal</h3>

          <p>
            Odkrywaj polskie firmy, ogłoszenia i wydarzenia oraz nawiązuj
            kontakty z Polakami w Polsce i na całym świecie.
          </p>

          <button
            className={styles.button}
            onClick={() =>
              navigate(
                user ? routes.addCompany(country) : routes.register(country),
              )
            }
          >
            {user ? "Dodaj swoją firmę" : "Dołącz do Polonia Portal"}
          </button>
        </div>
      </Container>
    </section>
  );
};
