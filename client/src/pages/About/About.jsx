import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "../About/About.module.scss";
import { AboutSidebar } from "../../components/AboutSidebar/AboutSidebar";
import airportPicture from "../../assets/about/airport.webp";
import { RegisterButton } from "../../components/RegisterButton/RegisterButton";
import { useAuth } from "../../hooks/useAuth";

export const About = () => {
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.replace("#", ""));

      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <div className="container">
      <div className={styles.about}>
        <AboutSidebar />

        <div className={styles.about__content}>
          <img
            src={airportPicture}
            alt="Polonia Portal Logo"
            className={styles.about__picture}
          />
          <div className={styles.about__sections}>
            <section id="whoAreWe">
              <h4>Kim jesteśmy</h4>
              <p>
                PoloniaPortal.com to nowoczesna platforma
                społecznościowo-informacyjna stworzona dla Polaków mieszkających
                za granicą. Naszym celem jest łączenie Polonii na całym świecie
                oraz ułatwienie dostępu do najważniejszych informacji, ogłoszeń,
                wydarzeń i kontaktów. Portal powstał z potrzeby stworzenia
                jednego miejsca, w którym Polacy za granicą mogą: znaleźć
                aktualne informacje z kraju i ze swojej lokalnej społeczności,
                nawiązywać kontakty, dzielić się doświadczeniami, wspierać się
                nawzajem w codziennym życiu na emigracji.
              </p>
            </section>
            <section id="ourMission">
              <h4>Nasza misja</h4>
              <p>
                Naszą misją jest budowanie silnej, zintegrowanej społeczności
                Polonii na całym świecie. Chcemy, aby każdy Polak mieszkający za
                granicą miał łatwy dostęp do informacji, wsparcia oraz
                możliwości aktywnego uczestnictwa w życiu polskiej społeczności
                w swoim kraju. Łączymy ludzi, informacje i możliwości – w jednym
                miejscu.
              </p>
            </section>
            <section id="whatWeOffer">
              <h4>Co oferujemy</h4>
              <ul>
                <li>Aktualności dla Polonii</li>
                <li>Lokalne wydarzenia</li>
                <li>Ogłoszenia (praca, mieszkania, usługi)</li>
                <li>Katalog polskich firm za granicą</li>
                <li>Społeczność i profile użytkowników</li>
                <li>Grupy tematyczne i lokalne</li>
                <li>Informacje praktyczne dla emigrantów</li>
              </ul>
            </section>
            <section id="forWhoItIs">
              <h4>Dla kogo jest portal</h4>
              <ul>
                <li>Polaków mieszkających za granicą</li>
                <li>Osób planujących wyjazd z Polski</li>
                <li>Rodzin Polonii</li>
                <li>Polskich firm działających za granicą</li>
                <li>Organizacji polonijnych</li>
                <li>
                  Wszystkich, którzy chcą pozostać w kontakcie z polską
                  społecznością
                </li>
              </ul>
            </section>
            <section id="whyCreated">
              <h4>Dlaczego powstał portal</h4>
              <p>
                Polonia Portal powstał z doświadczeń życia na emigracji i
                potrzeby stworzenia jednego, nowoczesnego miejsca dla Polaków za
                granicą. W wielu krajach informacje są rozproszone między
                grupami w mediach społecznościowych, forami i stronami
                lokalnymi. Naszym celem jest uporządkowanie tego świata i
                stworzenie profesjonalnej platformy dla globalnej Polonii.
              </p>
            </section>
            <section id="ourValues">
              <h4>Nasze wartości</h4>
              <ul>
                <li>Społeczność i wzajemne wsparcie</li>
                <li>Rzetelne informacje</li>
                <li>Bezpieczeństwo użytkowników</li>
                <li>Nowoczesność i rozwój</li>
                <li>Otwartość dla Polonii na całym świecie</li>
              </ul>
            </section>
            <section id="vision">
              <h4>Wizja</h4>
              <p>
                Naszą wizją jest stworzenie największej globalnej platformy dla
                Polonii, która połączy Polaków mieszkających w różnych krajach i
                stanie się centrum informacji, komunikacji oraz współpracy
                polskiej społeczności na świecie.
              </p>
            </section>

            {!user ? (
              <>
                <h2 className={styles.about__title}>
                  Dołącz do społeczności PoloniaPortal i bądź częścią globalnej
                  Polonii.
                </h2>
                <div className={styles.about__registerButton}>
                  <RegisterButton />
                </div>
              </>
            ) : (
              <h2 className={styles["about__becomeMember--guest"]}>
                Dziękujemy, że razem z nami tworzysz społeczność Polonii na
                całym świecie!
              </h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
