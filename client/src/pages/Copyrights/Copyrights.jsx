import { MdCopyright } from "react-icons/md";
import styles from "./Copyrights.module.scss";
import Container from "@/components/Layout/Container";

export const Copyrights = () => {
  return (
    <main className={styles.page}>
      <Container>
        <header className={styles.header}>
          <div className={styles.headerTitle}>
            <MdCopyright className={styles.icon} size={28} />
            <h1>Copyrights</h1>
          </div>

          <p>
            Informacje dotyczące praw autorskich i własności intelektualnej
            PoloniaPortal.
          </p>
        </header>

        <div className={styles.card}>
          <section>
            <h2>Prawa autorskie</h2>

            <p>
              Wszystkie treści, materiały, elementy graficzne, oznaczenia,
              projekty, teksty, zdjęcia, ikony oraz rozwiązania dostępne w
              serwisie PoloniaPortal są chronione prawem autorskim oraz innymi
              obowiązującymi przepisami dotyczącymi własności intelektualnej.
            </p>

            <p>
              O ile wyraźnie nie wskazano inaczej, prawa do tych materiałów
              przysługują właścicielowi serwisu PoloniaPortal.
            </p>
          </section>

          <section>
            <h2>Korzystanie z treści</h2>

            <p>
              Kopiowanie, rozpowszechnianie, modyfikowanie, publikowanie lub
              wykorzystywanie materiałów dostępnych w serwisie bez odpowiedniej
              zgody jest zabronione, z wyjątkiem przypadków dozwolonych przez
              obowiązujące przepisy prawa.
            </p>
          </section>

          <section>
            <h2>Materiały użytkowników</h2>

            <p>
              Użytkownicy mogą publikować w serwisie własne treści, w tym
              ogłoszenia, zdjęcia, opisy oraz inne materiały. Użytkownik
              pozostaje właścicielem praw do treści, które samodzielnie
              utworzył, z zastrzeżeniem praw i licencji wynikających z zasad
              korzystania z serwisu.
            </p>

            <p>
              Publikując treści w PoloniaPortal, użytkownik powinien posiadać
              odpowiednie prawa oraz zgodę na ich wykorzystanie i publikację.
            </p>
          </section>

          <section>
            <h2>Znaki towarowe</h2>

            <p>
              Nazwa PoloniaPortal, logo oraz inne oznaczenia związane z serwisem
              mogą stanowić znaki towarowe lub elementy identyfikacji marki. Nie
              mogą być wykorzystywane bez odpowiedniej zgody.
            </p>
          </section>

          <section>
            <h2>Naruszenie praw autorskich</h2>

            <p>
              Jeżeli uważasz, że materiał opublikowany w serwisie narusza Twoje
              prawa autorskie lub inne prawa własności intelektualnej,
              skontaktuj się z nami, przedstawiając informacje pozwalające
              zidentyfikować materiał oraz charakter zgłaszanego naruszenia.
            </p>
          </section>

          <section>
            <h2>Kontakt</h2>

            <p>
              W sprawach dotyczących praw autorskich i własności intelektualnej
              skontaktuj się z nami za pośrednictwem formularza kontaktowego
              dostępnego w serwisie.
            </p>
          </section>

          <footer className={styles.footer}>
            <p>© 2026 PoloniaPortal. All Rights Reserved.</p>
          </footer>
        </div>
      </Container>
    </main>
  );
};
