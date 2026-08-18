import { MdCookie } from "react-icons/md";
import { SectionLayout } from "@/components/Layout/SectionLayout/SectionLayout";
import { useCookieSettings } from "@/context/CookieSettingsContext";

import styles from "./Cookies.module.scss";

const items = [
  {
    label: "Postanowienia ogólne",
    to: "#general",
  },
  {
    label: "Czym są pliki cookies",
    to: "#whatAreCookies",
  },
  {
    label: "Rodzaje plików cookies",
    to: "#types",
  },
  {
    label: "Niezbędne pliki cookies",
    to: "#necessary",
  },
  {
    label: "Analityczne pliki cookies",
    to: "#analytics",
  },
  {
    label: "Funkcjonalne pliki cookies",
    to: "#functional",
  },
  {
    label: "Marketingowe pliki cookies",
    to: "#marketing",
  },
  {
    label: "Cookies podmiotów trzecich",
    to: "#thirdParty",
  },
  {
    label: "Zarządzanie zgodą na cookies",
    to: "#consent",
  },
  {
    label: "Zmiana lub wycofanie zgody",
    to: "#withdraw",
  },
  {
    label: "Cookies w przeglądarce internetowej",
    to: "#browser",
  },
  {
    label: "Zmiany Polityki cookies i kontakt",
    to: "#changesAndContact",
  },
  {
    label: "Moje ustawienia cookies",
    to: "#myCookieSettings",
  },
];

export const Cookies = () => {
  const { openCookieSettings } = useCookieSettings();
  return (
    <>
      <SectionLayout title="Polityka cookies" items={items}>
        <div className={styles.page}>
          <header className={styles.header}>
            <div className={styles.headerTitle}>
              <MdCookie className={styles.icon} size={28} />

              <h1>Polityka cookies</h1>
            </div>

            <p>
              Informacje dotyczące wykorzystywania plików cookies i podobnych
              technologii w serwisie PoloniaPortal.
            </p>
          </header>

          <div className={styles.card}>
            <section id="general">
              <h2>1. Postanowienia ogólne</h2>

              <p>
                <strong>1.1.</strong> Niniejsza Polityka cookies określa zasady
                wykorzystywania plików cookies oraz podobnych technologii w
                serwisie internetowym PoloniaPortal.
              </p>

              <p>
                <strong>1.2.</strong> Polityka cookies stanowi uzupełnienie
                Regulaminu Serwisu oraz Polityki Prywatności i określa
                informacje dotyczące sposobu wykorzystywania plików cookies
                podczas korzystania z Serwisu.
              </p>

              <p>
                <strong>1.3.</strong> Pliki cookies mogą być wykorzystywane w
                szczególności w celu zapewnienia prawidłowego działania Serwisu,
                zapamiętywania ustawień użytkownika, zapewnienia bezpieczeństwa
                oraz, w zależności od dokonanych przez użytkownika wyborów,
                analizy korzystania z Serwisu lub realizacji innych
                funkcjonalności.
              </p>

              <p>
                <strong>1.4.</strong> Korzystanie z niektórych rodzajów plików
                cookies może wymagać uprzedniej zgody użytkownika, jeżeli
                obowiązek jej uzyskania wynika z obowiązujących przepisów prawa.
              </p>

              <p>
                <strong>1.5.</strong> Użytkownik może zarządzać swoimi
                preferencjami dotyczącymi plików cookies za pośrednictwem
                dostępnych w Serwisie ustawień cookies, zgodnie z zasadami
                określonymi w niniejszej Polityce cookies.
              </p>

              <p>
                <strong>1.6.</strong> PoloniaPortal może korzystać zarówno z
                własnych plików cookies, jak również z technologii dostarczanych
                przez podmioty trzecie, jeżeli jest to związane z
                funkcjonowaniem lub rozwojem poszczególnych funkcjonalności
                Serwisu.
              </p>
            </section>
            <section id="whatAreCookies">
              <h2>2. Czym są pliki cookies</h2>

              <p>
                <strong>2.1.</strong> Pliki cookies to niewielkie pliki tekstowe
                zapisywane na urządzeniu użytkownika podczas korzystania z
                Serwisu. Mogą one zawierać informacje związane z korzystaniem z
                określonych funkcjonalności Serwisu.
              </p>

              <p>
                <strong>2.2.</strong> Pliki cookies mogą być zapisywane na
                urządzeniu użytkownika przez Serwis lub przez podmioty trzecie,
                których usługi są wykorzystywane w ramach określonych
                funkcjonalności Serwisu.
              </p>

              <p>
                <strong>2.3.</strong> Pliki cookies mogą umożliwiać rozpoznanie
                urządzenia użytkownika podczas kolejnych wizyt w Serwisie oraz
                zapamiętanie określonych informacji, takich jak wybrane
                ustawienia lub preferencje użytkownika.
              </p>

              <p>
                <strong>2.4.</strong> W zależności od ich przeznaczenia pliki
                cookies mogą być wykorzystywane między innymi do zapewnienia
                prawidłowego działania Serwisu, utrzymania sesji użytkownika,
                zapewnienia bezpieczeństwa, zapamiętywania ustawień oraz analizy
                sposobu korzystania z Serwisu.
              </p>

              <p>
                <strong>2.5.</strong> Nie wszystkie pliki cookies są niezbędne
                do korzystania z Serwisu. W przypadku cookies, których
                stosowanie wymaga zgody użytkownika, odpowiednie technologie są
                uruchamiane zgodnie z dokonanymi przez użytkownika wyborami oraz
                obowiązującymi przepisami prawa.
              </p>

              <p>
                <strong>2.6.</strong> Użytkownik może w każdym czasie zarządzać
                swoimi preferencjami dotyczącymi plików cookies za pośrednictwem
                ustawień cookies dostępnych w Serwisie.
              </p>
            </section>
            <section id="types">
              <h2>3. Rodzaje plików cookies</h2>

              <p>
                <strong>3.1.</strong> W ramach Serwisu mogą być wykorzystywane
                różne rodzaje plików cookies, w zależności od ich przeznaczenia,
                sposobu działania oraz podmiotu, który je umieszcza na
                urządzeniu użytkownika.
              </p>

              <p>
                <strong>3.2.</strong> Ze względu na czas przechowywania wyróżnia
                się w szczególności cookies sesyjne oraz cookies trwałe.
              </p>

              <p>
                <strong>3.3.</strong> Cookies sesyjne są przechowywane przez
                okres trwania sesji użytkownika i mogą zostać usunięte po
                zamknięciu przeglądarki lub zakończeniu sesji, zależnie od
                sposobu ich działania.
              </p>

              <p>
                <strong>3.4.</strong> Cookies trwałe pozostają zapisane na
                urządzeniu użytkownika przez określony czas lub do momentu ich
                usunięcia przez użytkownika albo wygaśnięcia zgodnie z
                ustawieniami danego pliku.
              </p>

              <p>
                <strong>3.5.</strong> Ze względu na podmiot, który umieszcza
                pliki cookies, mogą być wykorzystywane cookies własne,
                umieszczane bezpośrednio przez PoloniaPortal, oraz cookies
                podmiotów trzecich, związane z usługami zewnętrznych dostawców
                wykorzystywanymi w Serwisie.
              </p>

              <p>
                <strong>3.6.</strong> Ze względu na przeznaczenie pliki cookies
                mogą być wykorzystywane w szczególności jako cookies niezbędne,
                analityczne, funkcjonalne lub marketingowe, zgodnie z zakresem
                funkcjonalności dostępnych w Serwisie oraz preferencjami
                użytkownika.
              </p>

              <p>
                <strong>3.7.</strong> Zakres i rodzaj wykorzystywanych plików
                cookies może zmieniać się w zależności od rozwoju Serwisu,
                wprowadzania nowych funkcjonalności oraz zmian w zakresie
                wykorzystywanych przez PoloniaPortal usług zewnętrznych.
              </p>
            </section>
            <section id="necessary">
              <h2>4. Niezbędne pliki cookies</h2>

              <p>
                <strong>4.1.</strong> Niezbędne pliki cookies są wykorzystywane
                w zakresie koniecznym do prawidłowego działania Serwisu oraz
                zapewnienia użytkownikom dostępu do jego podstawowych
                funkcjonalności.
              </p>

              <p>
                <strong>4.2.</strong> Pliki te mogą być wykorzystywane między
                innymi do utrzymania sesji użytkownika, obsługi logowania,
                zapewnienia bezpieczeństwa, zapamiętywania podstawowych ustawień
                technicznych oraz prawidłowego działania formularzy i innych
                elementów Serwisu.
              </p>

              <p>
                <strong>4.3.</strong> Niezbędne pliki cookies mogą być stosowane
                bez zgody użytkownika, jeżeli ich wykorzystanie jest konieczne
                do świadczenia usługi żądanej przez użytkownika lub zapewnienia
                prawidłowego funkcjonowania Serwisu.
              </p>

              <p>
                <strong>4.4.</strong> Wyłączenie niezbędnych plików cookies może
                spowodować, że niektóre funkcjonalności Serwisu nie będą działać
                prawidłowo, a w określonych przypadkach korzystanie z części
                Serwisu może być niemożliwe.
              </p>

              <p>
                <strong>4.5.</strong> Niezbędne pliki cookies nie są
                wykorzystywane w celu tworzenia profilu użytkownika do celów
                marketingowych.
              </p>

              <p>
                <strong>4.6.</strong> Zakres stosowanych niezbędnych plików
                cookies może ulegać zmianie w związku z rozwojem technicznym
                Serwisu lub zmianami w sposobie świadczenia jego
                funkcjonalności.
              </p>
            </section>
            <section id="analytics">
              <h2>5. Analityczne pliki cookies</h2>

              <p>
                <strong>5.1.</strong> Analityczne pliki cookies mogą być
                wykorzystywane w celu zbierania informacji o sposobie
                korzystania z Serwisu, takich jak liczba odwiedzin, odwiedzane
                podstrony, czas korzystania z poszczególnych funkcjonalności
                oraz sposób poruszania się po Serwisie.
              </p>

              <p>
                <strong>5.2.</strong> Informacje zbierane za pomocą
                analitycznych plików cookies mogą być wykorzystywane do
                analizowania działania Serwisu, wykrywania problemów
                technicznych oraz poprawy jego funkcjonalności, wydajności i
                użyteczności.
              </p>

              <p>
                <strong>5.3.</strong> Analityczne pliki cookies mogą być
                zapisywane na urządzeniu użytkownika wyłącznie po wyrażeniu
                przez niego odpowiedniej zgody, jeżeli zgoda taka jest wymagana
                przez obowiązujące przepisy prawa.
              </p>

              <p>
                <strong>5.4.</strong> Dane zbierane w ramach analityki mogą być
                przetwarzane w sposób zagregowany lub z wykorzystaniem
                informacji, które nie pozwalają Administratorowi na bezpośrednią
                identyfikację użytkownika, zależnie od zastosowanego rozwiązania
                technologicznego.
              </p>

              <p>
                <strong>5.5.</strong> Administrator może korzystać z usług
                zewnętrznych dostawców narzędzi analitycznych. W takim przypadku
                informacje związane z korzystaniem z Serwisu mogą być
                przekazywane tym podmiotom na zasadach określonych w Polityce
                Prywatności oraz zgodnie z obowiązującymi przepisami prawa.
              </p>

              <p>
                <strong>5.6.</strong> Użytkownik może w dowolnym momencie
                zmienić swoje ustawienia dotyczące analitycznych plików cookies
                za pośrednictwem ustawień cookies dostępnych w Serwisie.
              </p>
            </section>
            <section id="functional">
              <h2>6. Funkcjonalne pliki cookies</h2>

              <p>
                <strong>6.1.</strong> Funkcjonalne pliki cookies mogą być
                wykorzystywane w celu zapamiętywania wybranych ustawień i
                preferencji użytkownika oraz zapewnienia prawidłowego działania
                dodatkowych funkcjonalności Serwisu.
              </p>

              <p>
                <strong>6.2.</strong> W zależności od dostępnych funkcjonalności
                mogą one służyć między innymi do zapamiętywania wybranych
                preferencji dotyczących korzystania z Serwisu, ustawień
                interfejsu lub innych wyborów dokonanych przez użytkownika.
              </p>

              <p>
                <strong>6.3.</strong> Funkcjonalne pliki cookies mogą być
                zapisywane na urządzeniu użytkownika po wyrażeniu przez niego
                odpowiedniej zgody, jeżeli zgoda taka jest wymagana przez
                obowiązujące przepisy prawa.
              </p>

              <p>
                <strong>6.4.</strong> Wyłączenie funkcjonalnych plików cookies
                może spowodować, że niektóre dodatkowe funkcjonalności lub
                ustawienia personalizujące korzystanie z Serwisu nie będą
                dostępne lub nie będą działały w pełnym zakresie.
              </p>

              <p>
                <strong>6.5.</strong> Funkcjonalne pliki cookies nie są
                wykorzystywane do celów marketingowych, chyba że dany plik
                został wyraźnie zaklasyfikowany do kategorii marketingowej i
                użytkownik wyraził na niego odpowiednią zgodę.
              </p>

              <p>
                <strong>6.6.</strong> Użytkownik może w dowolnym momencie
                zmienić swoje ustawienia dotyczące funkcjonalnych plików cookies
                za pośrednictwem ustawień cookies dostępnych w Serwisie.
              </p>
            </section>
            <section id="marketing">
              <h2>7. Marketingowe pliki cookies</h2>

              <p>
                <strong>7.1.</strong> Marketingowe pliki cookies mogą być
                wykorzystywane w celu prezentowania użytkownikowi treści
                reklamowych lub marketingowych bardziej dopasowanych do jego
                zainteresowań oraz sposobu korzystania z Serwisu.
              </p>

              <p>
                <strong>7.2.</strong> Pliki te mogą umożliwiać analizowanie
                aktywności użytkownika w Serwisie, tworzenie określonych grup
                odbiorców oraz dostosowywanie komunikacji marketingowej lub
                reklamowej.
              </p>

              <p>
                <strong>7.3.</strong> Marketingowe pliki cookies mogą być
                zapisywane na urządzeniu użytkownika wyłącznie po wyrażeniu
                przez niego odpowiedniej zgody, jeżeli zgoda taka jest wymagana
                przez obowiązujące przepisy prawa.
              </p>

              <p>
                <strong>7.4.</strong> W ramach działań marketingowych
                Administrator może korzystać z usług zewnętrznych dostawców
                technologii reklamowych, analitycznych lub marketingowych.
                Podmioty te mogą przetwarzać informacje związane z korzystaniem
                z Serwisu zgodnie z własnymi zasadami prywatności oraz
                obowiązującymi przepisami prawa.
              </p>

              <p>
                <strong>7.5.</strong> Marketingowe pliki cookies mogą być
                wykorzystywane między innymi do ograniczania liczby wyświetleń
                określonej reklamy, mierzenia skuteczności kampanii oraz
                sprawdzania, czy użytkownik zainteresował się określoną treścią
                lub reklamą.
              </p>

              <p>
                <strong>7.6.</strong> Użytkownik może odmówić zgody na
                stosowanie marketingowych plików cookies oraz w dowolnym
                momencie zmienić swoje ustawienia za pośrednictwem ustawień
                cookies dostępnych w Serwisie.
              </p>
            </section>
            <section id="thirdParty">
              <h2>8. Cookies podmiotów trzecich</h2>

              <p>
                <strong>8.1.</strong> W ramach korzystania z Serwisu mogą być
                wykorzystywane pliki cookies pochodzące od podmiotów trzecich,
                jeżeli Administrator korzysta z usług lub narzędzi dostarczanych
                przez takie podmioty.
              </p>

              <p>
                <strong>8.2.</strong> Pliki cookies podmiotów trzecich mogą być
                wykorzystywane między innymi w związku z usługami analitycznymi,
                marketingowymi, płatniczymi, technicznymi, bezpieczeństwa lub
                innymi rozwiązaniami wspierającymi funkcjonowanie Serwisu.
              </p>

              <p>
                <strong>8.3.</strong> Zakres oraz sposób wykorzystywania plików
                cookies przez podmioty trzecie może zależeć od ich własnych
                usług, konfiguracji technicznej oraz zasad ochrony prywatności
                stosowanych przez te podmioty.
              </p>

              <p>
                <strong>8.4.</strong> Jeżeli zastosowanie plików cookies
                podmiotów trzecich wymaga zgody użytkownika, zostaną one
                uruchomione dopiero po wyrażeniu odpowiedniej zgody za
                pośrednictwem mechanizmu zarządzania zgodami dostępnego w
                Serwisie.
              </p>

              <p>
                <strong>8.5.</strong> W zależności od zastosowanego rozwiązania
                technologicznego podmioty trzecie mogą przetwarzać informacje
                dotyczące urządzenia użytkownika, przeglądarki, sposobu
                korzystania z Serwisu lub innych danych związanych z
                korzystaniem z ich usług.
              </p>

              <p>
                <strong>8.6.</strong> Informacje dotyczące podmiotów trzecich, z
                których usług korzysta PoloniaPortal, mogą być zawarte w
                ustawieniach cookies lub w innych informacjach dotyczących
                prywatności dostępnych w Serwisie.
              </p>

              <p>
                <strong>8.7.</strong> Użytkownik może zarządzać zgodami
                dotyczącymi poszczególnych kategorii plików cookies za
                pośrednictwem ustawień cookies dostępnych w Serwisie, z
                zastrzeżeniem plików niezbędnych do jego prawidłowego działania.
              </p>
            </section>
            <section id="consent">
              <h2>9. Zarządzanie zgodą na cookies</h2>

              <p>
                <strong>9.1.</strong> Użytkownik może zarządzać zgodami na
                stosowanie plików cookies za pośrednictwem ustawień cookies
                dostępnych w Serwisie.
              </p>

              <p>
                <strong>9.2.</strong> Mechanizm zarządzania zgodami umożliwia
                użytkownikowi dokonanie wyboru dotyczącego poszczególnych
                kategorii plików cookies, z wyjątkiem cookies niezbędnych do
                prawidłowego działania Serwisu.
              </p>

              <p>
                <strong>9.3.</strong> Pliki cookies analityczne, funkcjonalne
                oraz marketingowe mogą być uruchamiane zgodnie z wyborem
                dokonanym przez użytkownika, jeżeli ich stosowanie wymaga
                uprzedniej zgody.
              </p>

              <p>
                <strong>9.4.</strong> Brak zgody na opcjonalne pliki cookies nie
                uniemożliwia korzystania z podstawowych funkcjonalności Serwisu,
                jednak niektóre dodatkowe funkcje mogą być niedostępne lub
                działać w ograniczonym zakresie.
              </p>

              <p>
                <strong>9.5.</strong> Informacja o dokonanym wyborze może być
                zapisywana w pamięci przeglądarki lub za pomocą niezbędnego
                mechanizmu technicznego, aby Serwis mógł respektować ustawienia
                użytkownika przy kolejnych wizytach.
              </p>

              <p>
                <strong>9.6.</strong> Użytkownik może w dowolnym momencie
                otworzyć ustawienia cookies i zmienić wcześniej dokonane wybory.
                Zmiana ustawień nie wpływa na zgodność z prawem przetwarzania
                dokonanego na podstawie wcześniejszej zgody przed jej zmianą.
              </p>

              <p>
                <strong>9.7.</strong> Szczegółowe informacje dotyczące
                poszczególnych kategorii cookies oraz ich przeznaczenia mogą być
                przedstawione użytkownikowi bezpośrednio w panelu ustawień
                cookies.
              </p>
            </section>
            <section id="withdraw">
              <h2>10. Zmiana lub wycofanie zgody</h2>

              <p>
                <strong>10.1.</strong> Użytkownik może w dowolnym momencie
                zmienić swoje preferencje dotyczące opcjonalnych plików cookies
                za pośrednictwem panelu ustawień cookies dostępnego w Serwisie.
              </p>

              <p>
                <strong>10.2.</strong> Użytkownik może wycofać wcześniej
                udzieloną zgodę na stosowanie analitycznych, funkcjonalnych lub
                marketingowych plików cookies, w zakresie, w jakim ich
                stosowanie jest uzależnione od zgody użytkownika.
              </p>

              <p>
                <strong>10.3.</strong> Wycofanie zgody nie wpływa na zgodność z
                prawem przetwarzania dokonanego na podstawie zgody przed jej
                wycofaniem.
              </p>

              <p>
                <strong>10.4.</strong> Po zmianie ustawień Serwis może
                potrzebować chwili na zastosowanie nowych preferencji. W
                niektórych przypadkach może być również konieczne odświeżenie
                strony lub ponowne uruchomienie przeglądarki.
              </p>

              <p>
                <strong>10.5.</strong> Wycofanie zgody na opcjonalne pliki
                cookies nie powoduje wyłączenia cookies niezbędnych do
                prawidłowego działania Serwisu, których stosowanie nie jest
                uzależnione od zgody użytkownika.
              </p>

              <p>
                <strong>10.6.</strong> Zmiana lub wycofanie zgody może
                spowodować ograniczenie dostępności niektórych funkcjonalności
                Serwisu, jeżeli ich działanie zależy od wykorzystania
                określonych plików cookies.
              </p>

              <p>
                <strong>10.7.</strong> Użytkownik może ponownie wyrazić zgodę na
                stosowanie opcjonalnych plików cookies w dowolnym momencie,
                korzystając z panelu ustawień cookies dostępnego w Serwisie.
              </p>
            </section>
            <section id="browser">
              <h2>11. Cookies w przeglądarce internetowej</h2>

              <p>
                <strong>11.1.</strong> Użytkownik może również zarządzać plikami
                cookies bezpośrednio za pomocą ustawień swojej przeglądarki
                internetowej.
              </p>

              <p>
                <strong>11.2.</strong> Większość przeglądarek internetowych
                umożliwia użytkownikowi sprawdzanie, usuwanie, blokowanie lub
                ograniczanie zapisywania plików cookies na urządzeniu.
              </p>

              <p>
                <strong>11.3.</strong> Sposób zarządzania plikami cookies może
                różnić się w zależności od używanej przeglądarki oraz jej
                wersji. Szczegółowe informacje dotyczące dostępnych ustawień
                należy sprawdzić w dokumentacji lub ustawieniach używanej
                przeglądarki.
              </p>

              <p>
                <strong>11.4.</strong> Całkowite zablokowanie lub usunięcie
                plików cookies może spowodować nieprawidłowe działanie
                niektórych funkcjonalności Serwisu, w szczególności funkcji
                wymagających utrzymania sesji lub zapamiętywania określonych
                ustawień użytkownika.
              </p>

              <p>
                <strong>11.5.</strong> Zmiana ustawień przeglądarki nie
                zastępuje ustawień zgód dostępnych w Serwisie w zakresie, w
                jakim przepisy prawa wymagają uzyskania zgody użytkownika na
                stosowanie określonych plików cookies.
              </p>

              <p>
                <strong>11.6.</strong> Jeżeli użytkownik korzysta z Serwisu na
                kilku urządzeniach lub za pośrednictwem różnych przeglądarek,
                ustawienia cookies mogą wymagać skonfigurowania oddzielnie na
                każdym urządzeniu i w każdej przeglądarce.
              </p>
            </section>
            <section id="changesAndContact">
              <h2>12. Zmiany Polityki cookies i kontakt</h2>

              <p>
                <strong>12.1.</strong> Administrator może okresowo aktualizować
                niniejszą Politykę cookies, w szczególności w przypadku zmian w
                sposobie wykorzystywania plików cookies, wprowadzenia nowych
                funkcjonalności, zastosowania nowych rozwiązań technologicznych
                lub zmian obowiązujących przepisów prawa.
              </p>

              <p>
                <strong>12.2.</strong> Zmiany mogą również wynikać ze zmiany
                dostawców usług wykorzystywanych przez PoloniaPortal lub zmiany
                kategorii, przeznaczenia albo sposobu działania stosowanych
                plików cookies.
              </p>

              <p>
                <strong>12.3.</strong> Aktualna wersja Polityki cookies jest
                publikowana w Serwisie. W przypadku istotnych zmian
                Administrator może poinformować użytkowników o ich wprowadzeniu
                za pośrednictwem dostępnych kanałów komunikacji, jeżeli jest to
                wymagane lub uzasadnione charakterem zmian.
              </p>

              <p>
                <strong>12.4.</strong> Zmiany ustawień cookies dokonane przez
                użytkownika pozostają bez wpływu na zgodność z prawem
                przetwarzania dokonanego na podstawie zgody przed jej wycofaniem
                lub zmianą.
              </p>

              <p>
                <strong>12.5.</strong> Wszelkie pytania dotyczące niniejszej
                Polityki cookies, stosowanych plików cookies lub sposobu
                zarządzania zgodami można kierować do Administratora za
                pośrednictwem formularza kontaktowego dostępnego w Serwisie lub
                innych wskazanych przez Administratora danych kontaktowych.
              </p>

              <p>
                <strong>12.6.</strong> W sprawach dotyczących przetwarzania
                danych osobowych w związku z wykorzystywaniem plików cookies
                zastosowanie mają również postanowienia Polityki Prywatności
                dostępnej w Serwisie.
              </p>
            </section>
            <section id="myCookieSettings">
              <h2>13. Moje ustawienia cookies</h2>
              <div className={styles.cookieButtonWrapper}>
                <button
                  type="button"
                  className={styles.cookieButton}
                  onClick={openCookieSettings}
                >
                  <MdCookie size={20} />
                  Otwórz ustawienia cookies
                </button>
              </div>
            </section>
          </div>
        </div>
      </SectionLayout>
    </>
  );
};
