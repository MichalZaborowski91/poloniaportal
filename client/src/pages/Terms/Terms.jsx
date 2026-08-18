import { MdGavel } from "react-icons/md";
import styles from "./Terms.module.scss";

import { SectionLayout } from "@/components/Layout/SectionLayout/SectionLayout";

const items = [
  {
    label: "Postanowienia ogólne",
    to: "#general",
  },
  {
    label: "Definicje",
    to: "#definitions",
  },
  {
    label: "Konto użytkownika",
    to: "#account",
  },
  {
    label: "Profile firm i działalność przedsiębiorców",
    to: "#companyProfiles",
  },
  {
    label: "Ogłoszenia",
    to: "#listings",
  },
  {
    label: "Wydarzenia",
    to: "#events",
  },
  {
    label: "Treści publikowane przez użytkowników",
    to: "#userContent",
  },
  {
    label: " Moderacja treści i działania wobec naruszeń",
    to: "#moderation",
  },
  {
    label: "Usługi odpłatne i płatności",
    to: "#paidServices",
  },
  {
    label: "Prawa własności intelektualnej",
    to: "#intellectualProperty",
  },
  {
    label: "Odpowiedzialność Serwisu",
    to: "#liability",
  },
  {
    label: "Zgłaszanie naruszeń",
    to: "#reporting",
  },
  {
    label: "Reklamacje",
    to: "#complaints",
  },
  {
    label: "Dane osobowe i prywatność",
    to: "#privacy",
  },
  {
    label: "Zmiany Regulaminu",
    to: "#changes",
  },
  {
    label: "Rozwiązanie umowy / usunięcie konta",
    to: "#termination",
  },
  {
    label: "Postanowienia końcowe",
    to: "#final",
  },
];

export const Terms = () => {
  return (
    <SectionLayout title="Regulamin" items={items}>
      <header className={styles.header}>
        <div className={styles.headerTitle}>
          <MdGavel className={styles.icon} size={28} />
          <h1>Regulamin</h1>
        </div>

        <p>
          Zasady korzystania z serwisu PoloniaPortal oraz świadczonych za jego
          pośrednictwem usług.
        </p>
      </header>

      <div className={styles.card}>
        <section id="general">
          <h2>1. Postanowienia ogólne</h2>

          <p>
            <strong>1.1.</strong> Niniejszy Regulamin określa zasady korzystania
            z serwisu internetowego <strong>PoloniaPortal</strong>, dostępnego
            za pośrednictwem strony internetowej oraz jego funkcjonalności
            przeznaczonych dla użytkowników.
          </p>

          <p>
            <strong>1.2.</strong> PoloniaPortal jest platformą
            społecznościowo-informacyjną skierowaną przede wszystkim do Polaków
            oraz osób związanych z Polską, niezależnie od kraju ich
            zamieszkania. Serwis służy w szczególności do nawiązywania
            kontaktów, wymiany informacji, publikowania ogłoszeń, prezentowania
            firm i usług oraz informowania o wydarzeniach i inicjatywach
            społecznościowych.
          </p>

          <p>
            <strong>1.3.</strong> Za pośrednictwem Serwisu użytkownicy mogą w
            szczególności:
          </p>

          <ul>
            <li>tworzyć i prowadzić konta użytkowników,</li>
            <li>tworzyć profile publiczne,</li>
            <li>publikować i przeglądać ogłoszenia,</li>
            <li>dodawać i przeglądać wydarzenia,</li>
            <li>tworzyć i prezentować profile firm,</li>
            <li>wyszukiwać firmy, ogłoszenia i wydarzenia,</li>
            <li>zapisywać wybrane treści jako ulubione,</li>
            <li>
              korzystać z innych funkcjonalności udostępnianych przez Serwis.
            </li>
          </ul>

          <p>
            <strong>1.4.</strong> Korzystanie z Serwisu oznacza akceptację
            niniejszego Regulaminu w zakresie, w jakim jego postanowienia mają
            zastosowanie do danej funkcjonalności lub sposobu korzystania z
            Serwisu.
          </p>

          <p>
            <strong>1.5.</strong> Użytkownik zobowiązany jest do korzystania z
            Serwisu zgodnie z:
          </p>

          <ul>
            <li>niniejszym Regulaminem,</li>
            <li>obowiązującymi przepisami prawa,</li>
            <li>zasadami współżycia społecznego,</li>
            <li>
              zasadami bezpieczeństwa oraz zasadami korzystania z poszczególnych
              funkcjonalności Serwisu.
            </li>
          </ul>

          <p>
            <strong>1.6.</strong> Korzystanie z niektórych funkcjonalności
            Serwisu może wymagać utworzenia konta użytkownika, uzupełnienia
            określonych informacji lub spełnienia dodatkowych warunków
            określonych w Regulaminie.
          </p>

          <p>
            <strong>1.7.</strong> Niektóre funkcjonalności Serwisu mogą być
            dostępne odpłatnie. Informacje dotyczące dostępnych usług, zakresu
            świadczeń oraz ich cen są przedstawiane użytkownikowi przed
            skorzystaniem z danej usługi.
          </p>

          <p>
            <strong>1.8.</strong> Regulamin ma zastosowanie do wszystkich
            użytkowników korzystających z Serwisu, niezależnie od kraju ich
            zamieszkania lub miejsca, z którego uzyskują dostęp do Serwisu, z
            zastrzeżeniem bezwzględnie obowiązujących przepisów prawa mających
            zastosowanie do danego użytkownika.
          </p>

          <p>
            <strong>1.9.</strong> Korzystanie z Serwisu jest dobrowolne.
            Użytkownik przed rozpoczęciem korzystania z funkcjonalności
            wymagających akceptacji Regulaminu powinien zapoznać się z jego
            treścią.
          </p>
        </section>
        <section id="definitions">
          <h2>2. Definicje</h2>

          <p>
            <strong>2.1. Serwis</strong> – serwis internetowy PoloniaPortal wraz
            z jego stronami internetowymi, aplikacjami, funkcjonalnościami,
            treściami oraz usługami udostępnianymi za jego pośrednictwem.
          </p>

          <p>
            <strong>2.2. PoloniaPortal</strong> – platforma
            społecznościowo-informacyjna prowadzona przez właściciela Serwisu,
            umożliwiająca użytkownikom korzystanie z funkcjonalności określonych
            w Regulaminie.
          </p>

          <p>
            <strong>2.3. Użytkownik</strong> – osoba fizyczna, osoba prawna lub
            jednostka organizacyjna korzystająca z Serwisu, niezależnie od tego,
            czy korzysta z niego bez utworzenia Konta, czy posiada Konto.
          </p>

          <p>
            <strong>2.4. Konto</strong> – indywidualny profil użytkownika
            utworzony w Serwisie, umożliwiający korzystanie z funkcjonalności
            wymagających zalogowania.
          </p>

          <p>
            <strong>2.5. Profil użytkownika</strong> – część Konta zawierająca
            informacje o Użytkowniku, które mogą być prezentowane publicznie w
            zakresie określonym przez Użytkownika oraz funkcjonalności Serwisu.
          </p>

          <p>
            <strong>2.6. Ogłoszenie</strong> – treść opublikowana przez
            Użytkownika w Serwisie w ramach funkcjonalności ogłoszeń, w
            szczególności dotycząca oferowania lub poszukiwania pracy,
            nieruchomości, produktów, usług lub innych przedmiotów i świadczeń.
          </p>

          <p>
            <strong>2.7. Wydarzenie</strong> – informacja o wydarzeniu,
            spotkaniu, inicjatywie lub innej aktywności opublikowana w Serwisie.
          </p>

          <p>
            <strong>2.8. Firma</strong> – podmiot gospodarczy lub osoba
            prowadząca działalność gospodarczą, której informacje lub profil
            zostały przedstawione w Serwisie.
          </p>

          <p>
            <strong>2.9. Profil Firmy</strong> – publicznie dostępna prezentacja
            Firmy w Serwisie, zawierająca informacje dotyczące jej działalności,
            oferowanych produktów lub usług oraz inne dane udostępnione w ramach
            funkcjonalności Serwisu.
          </p>

          <p>
            <strong>2.10. Treści</strong> – wszelkie informacje, materiały i
            dane zamieszczane lub przekazywane za pośrednictwem Serwisu, w
            szczególności teksty, zdjęcia, grafiki, materiały wideo, dane
            kontaktowe, Ogłoszenia, informacje o Wydarzeniach oraz informacje
            dotyczące Firm.
          </p>

          <p>
            <strong>2.11. Usługi</strong> – funkcjonalności i świadczenia
            udostępniane przez PoloniaPortal Użytkownikom za pośrednictwem
            Serwisu, zarówno bezpłatne, jak i odpłatne.
          </p>

          <p>
            <strong>2.12. Usługi odpłatne</strong> – Usługi, których korzystanie
            wymaga uiszczenia opłaty zgodnie z informacjami przedstawionymi
            Użytkownikowi przed ich zamówieniem lub aktywacją.
          </p>

          <p>
            <strong>2.13. Regulamin</strong> – niniejszy regulamin określający
            zasady korzystania z Serwisu oraz prawa i obowiązki Użytkowników i
            PoloniaPortal.
          </p>

          <p>
            <strong>2.14. Dni robocze</strong> – dni od poniedziałku do piątku,
            z wyłączeniem dni ustawowo wolnych od pracy w kraju właściwym dla
            danej czynności, o ile Regulamin lub przepisy prawa nie stanowią
            inaczej.
          </p>
        </section>
        <section id="account">
          <h2>3. Konto użytkownika</h2>

          <p>
            <strong>3.1.</strong> Utworzenie Konta w Serwisie jest dobrowolne, z
            zastrzeżeniem, że korzystanie z niektórych funkcjonalności Serwisu
            może wymagać posiadania aktywnego Konta.
          </p>

          <p>
            <strong>3.2.</strong> W celu utworzenia Konta Użytkownik może być
            zobowiązany do podania danych wymaganych przez Serwis, w
            szczególności adresu poczty elektronicznej oraz ustanowienia hasła.
          </p>

          <p>
            <strong>3.3.</strong> Użytkownik zobowiązany jest do podawania
            danych prawdziwych, aktualnych i kompletnych oraz do ich
            aktualizowania w przypadku ich zmiany.
          </p>

          <p>
            <strong>3.4.</strong> Użytkownik ponosi odpowiedzialność za
            prawidłowość danych podanych podczas rejestracji oraz w trakcie
            korzystania z Konta.
          </p>

          <p>
            <strong>3.5.</strong> Konto jest przypisane do konkretnego
            Użytkownika i nie powinno być udostępniane innym osobom. Użytkownik
            jest odpowiedzialny za zachowanie poufności danych umożliwiających
            dostęp do Konta.
          </p>

          <p>
            <strong>3.6.</strong> Użytkownik powinien niezwłocznie poinformować
            PoloniaPortal o podejrzeniu nieuprawnionego dostępu do Konta,
            utracie danych dostępowych lub innym zdarzeniu mogącym zagrażać
            bezpieczeństwu Konta.
          </p>

          <p>
            <strong>3.7.</strong> Użytkownik nie może wykorzystywać Konta w
            sposób naruszający niniejszy Regulamin, obowiązujące przepisy prawa,
            prawa osób trzecich lub bezpieczeństwo Serwisu.
          </p>

          <p>
            <strong>3.8.</strong> Użytkownik nie może tworzyć Kont w celu
            podszywania się pod inne osoby, podmioty lub marki ani posługiwać
            się danymi, do których używania nie jest uprawniony.
          </p>

          <p>
            <strong>3.9.</strong> PoloniaPortal może stosować środki służące
            zapewnieniu bezpieczeństwa Kont oraz Serwisu, w szczególności może
            wymagać potwierdzenia adresu poczty elektronicznej lub zastosować
            dodatkową weryfikację w przypadkach uzasadnionych względami
            bezpieczeństwa.
          </p>

          <p>
            <strong>3.10.</strong> W przypadku stwierdzenia naruszenia
            Regulaminu, obowiązujących przepisów prawa, praw osób trzecich lub
            zasad bezpieczeństwa Serwisu, PoloniaPortal może zastosować środki
            określone w Regulaminie, w tym ograniczyć dostęp do określonych
            funkcjonalności, zawiesić Konto lub podjąć działania prowadzące do
            jego usunięcia, z uwzględnieniem obowiązujących przepisów prawa.
          </p>

          <p>
            <strong>3.11.</strong> Użytkownik może w każdym czasie zrezygnować z
            korzystania z Konta i wystąpić o jego usunięcie, z zastrzeżeniem
            obowiązków wynikających z obowiązujących przepisów prawa oraz
            zobowiązań dotyczących usług, które zostały już zamówione lub
            rozpoczęte.
          </p>

          <p>
            <strong>3.12.</strong> Usunięcie Konta może skutkować utratą dostępu
            do funkcjonalności oraz Treści powiązanych z Kontem, w zakresie
            wynikającym z charakteru danej funkcjonalności oraz obowiązujących
            przepisów prawa.
          </p>
        </section>

        <section id="companyProfiles">
          <h2>4. Profile firm i działalność przedsiębiorców</h2>

          <p>
            4.1. Serwis umożliwia użytkownikom prowadzącym działalność
            gospodarczą lub reprezentującym przedsiębiorstwa tworzenie i
            prezentowanie publicznych profili firm.
          </p>

          <p>
            4.2. Profil firmy może zawierać w szczególności nazwę firmy, dane
            kontaktowe, lokalizację, opis działalności, informacje o oferowanych
            usługach lub produktach, dane dotyczące działalności oraz inne
            informacje udostępniane w ramach funkcjonalności Serwisu.
          </p>

          <p>
            4.3. Użytkownik tworzący lub zarządzający profilem firmy oświadcza,
            że jest uprawniony do reprezentowania danej firmy lub posiada
            odpowiednią zgodę na utworzenie i prowadzenie jej profilu w
            Serwisie.
          </p>

          <p>
            4.4. Użytkownik odpowiedzialny za profil firmy zobowiązany jest do
            zapewnienia, że informacje przedstawione w profilu są prawdziwe,
            aktualne i niewprowadzające w błąd.
          </p>

          <p>
            4.5. Użytkownik zobowiązany jest do niezwłocznego aktualizowania
            informacji zawartych w profilu firmy, jeżeli ulegną one zmianie, w
            szczególności danych kontaktowych, adresowych, informacji o zakresie
            działalności lub oferowanych usługach.
          </p>

          <p>
            4.6. Zabronione jest tworzenie profilu firmy bez odpowiedniego
            uprawnienia, podszywanie się pod istniejące przedsiębiorstwo lub
            organizację oraz wykorzystywanie danych innego podmiotu w sposób
            mogący wprowadzać użytkowników w błąd.
          </p>

          <p>
            4.7. Profil firmy nie może zawierać treści bezprawnych,
            wprowadzających w błąd, naruszających prawa osób trzecich ani treści
            sprzecznych z postanowieniami niniejszego Regulaminu.
          </p>

          <p>
            4.8. Użytkownik ponosi odpowiedzialność za treści, informacje oraz
            materiały zamieszczone w profilu firmy, w zakresie wynikającym z
            obowiązujących przepisów prawa.
          </p>

          <p>
            4.9. PoloniaPortal może ograniczyć widoczność, zawiesić lub usunąć
            profil firmy w przypadku stwierdzenia naruszenia Regulaminu,
            przepisów prawa, praw osób trzecich lub zasad bezpieczeństwa
            Serwisu.
          </p>

          <p>
            4.10. Niektóre funkcjonalności związane z profilami firm mogą być
            dostępne odpłatnie. Warunki korzystania z takich funkcjonalności,
            zakres świadczenia oraz ceny są przedstawiane użytkownikowi przed
            dokonaniem zakupu.
          </p>

          <p>
            4.11. Utworzenie lub prezentowanie profilu firmy w Serwisie nie
            oznacza, że PoloniaPortal potwierdza prawdziwość, jakość, legalność
            lub wiarygodność działalności danego przedsiębiorstwa, chyba że
            Serwis wyraźnie wskazuje inaczej.
          </p>

          <p>
            4.12. PoloniaPortal może wprowadzać dodatkowe oznaczenia profili
            firm, w szczególności oznaczenia dotyczące statusu profilu, jego
            weryfikacji lub wyróżnienia, na zasadach określonych przez Serwis.
          </p>
        </section>
        <section id="listings">
          <h2>5. Ogłoszenia</h2>

          <p>
            5.1. Serwis umożliwia użytkownikom publikowanie, przeglądanie oraz
            wyszukiwanie ogłoszeń dotyczących w szczególności ofert i
            poszukiwania pracy, mieszkań, produktów, usług oraz innych kategorii
            udostępnianych w ramach Serwisu.
          </p>

          <p>
            5.2. Użytkownik publikujący ogłoszenie zobowiązany jest do podawania
            informacji zgodnych z rzeczywistym stanem faktycznym oraz do
            zapewnienia, że treść ogłoszenia nie wprowadza innych użytkowników w
            błąd.
          </p>

          <p>
            5.3. Ogłoszenie powinno zawierać informacje odpowiednie do jego
            charakteru i kategorii, w szczególności opis przedmiotu lub oferty,
            warunki, lokalizację oraz dane kontaktowe, jeżeli ich podanie jest
            wymagane lub zostało dobrowolnie udostępnione przez użytkownika.
          </p>

          <p>
            5.4. Użytkownik ponosi odpowiedzialność za treść, prawdziwość,
            aktualność oraz zgodność z prawem opublikowanego przez siebie
            ogłoszenia.
          </p>

          <p>
            5.5. Zabronione jest publikowanie ogłoszeń dotyczących działalności,
            towarów lub usług, których oferowanie, sprzedaż, świadczenie lub
            rozpowszechnianie jest niezgodne z obowiązującymi przepisami prawa.
          </p>

          <p>
            5.6. Zabronione jest publikowanie ogłoszeń zawierających treści
            bezprawne, oszukańcze, wprowadzające w błąd, naruszające prawa osób
            trzecich, dobra osobiste, prawa własności intelektualnej lub zasady
            współżycia społecznego.
          </p>

          <p>
            5.7. Użytkownik nie może publikować tego samego ogłoszenia
            wielokrotnie w sposób mający na celu sztuczne zwiększenie jego
            widoczności, chyba że dana funkcjonalność Serwisu wyraźnie na to
            zezwala.
          </p>

          <p>
            5.8. Zabronione jest wykorzystywanie ogłoszeń do publikowania spamu,
            treści niezwiązanych z daną kategorią, reklam niezgodnych z zasadami
            Serwisu oraz treści mających na celu wyłącznie przekierowanie
            użytkowników do innych serwisów lub usług, jeżeli jest to sprzeczne
            z zasadami korzystania z Serwisu.
          </p>

          <p>
            5.9. W przypadku ogłoszeń dotyczących pracy użytkownik publikujący
            ogłoszenie zobowiązany jest do przestrzegania obowiązujących
            przepisów prawa oraz do przedstawienia warunków zatrudnienia lub
            współpracy w sposób niewprowadzający potencjalnych kandydatów w
            błąd.
          </p>

          <p>
            5.10. W przypadku ogłoszeń dotyczących sprzedaży, najmu, usług lub
            innych świadczeń użytkownik publikujący ogłoszenie odpowiada za
            zgodność przedstawionej oferty z obowiązującymi przepisami prawa
            oraz za realizację zobowiązań wynikających z zawartej przez niego
            umowy z innym użytkownikiem.
          </p>

          <p>
            5.11. PoloniaPortal nie jest stroną umów zawieranych pomiędzy
            użytkownikami w związku z ogłoszeniami, chyba że wyraźnie wskazano
            inaczej.
          </p>

          <p>
            5.12. PoloniaPortal nie gwarantuje zawarcia transakcji, znalezienia
            pracy, mieszkania, klienta, wykonawcy ani innego rezultatu
            wynikającego z opublikowania lub przeglądania ogłoszenia.
          </p>

          <p>
            5.13. Użytkownicy korzystają z ogłoszeń oraz podejmują decyzje
            dotyczące kontaktu, transakcji lub współpracy z innymi użytkownikami
            na własną odpowiedzialność i powinni zachować odpowiednią
            ostrożność.
          </p>

          <p>
            5.14. PoloniaPortal może dokonywać moderacji ogłoszeń oraz
            ograniczać ich widoczność, odrzucać, edytować w zakresie
            technicznym, usuwać lub czasowo blokować ogłoszenia, jeżeli
            naruszają Regulamin, obowiązujące przepisy prawa, prawa osób
            trzecich lub zasady bezpieczeństwa Serwisu.
          </p>

          <p>
            5.15. PoloniaPortal może również usuwać ogłoszenia nieaktualne,
            powielone, błędnie przypisane do kategorii lub naruszające zasady
            prawidłowego korzystania z funkcjonalności Serwisu.
          </p>

          <p>
            5.16. Użytkownik może w każdej chwili zakończyć publikację własnego
            ogłoszenia, korzystając z funkcjonalności dostępnych w jego koncie,
            z zastrzeżeniem ogłoszeń objętych odrębnymi warunkami lub usługami
            odpłatnymi.
          </p>

          <p>
            5.17. Niektóre funkcjonalności związane z publikowaniem lub
            promowaniem ogłoszeń mogą być dostępne odpłatnie. Przed
            skorzystaniem z odpłatnej funkcjonalności użytkownik otrzyma
            informacje dotyczące jej zakresu, ceny oraz warunków korzystania.
          </p>

          <p>
            5.18. Zabronione jest wykorzystywanie Serwisu do publikowania
            ogłoszeń mających na celu wyłudzenie pieniędzy, danych osobowych,
            danych uwierzytelniających lub innych informacji od użytkowników.
          </p>

          <p>
            5.19. W przypadku podejrzenia oszustwa, naruszenia prawa lub innych
            nieprawidłowości związanych z ogłoszeniem użytkownik powinien
            zgłosić takie ogłoszenie za pośrednictwem funkcjonalności dostępnych
            w Serwisie lub skontaktować się z administratorem.
          </p>
        </section>
        <section id="events">
          <h2>6. Wydarzenia</h2>

          <p>
            6.1. Serwis umożliwia użytkownikom tworzenie, publikowanie,
            przeglądanie oraz wyszukiwanie informacji o wydarzeniach
            organizowanych w szczególności przez osoby prywatne,
            przedsiębiorców, organizacje oraz inne podmioty.
          </p>

          <p>
            6.2. Wydarzenie może obejmować w szczególności informacje dotyczące
            jego nazwy, opisu, daty i godziny rozpoczęcia, daty i godziny
            zakończenia, lokalizacji, organizatora oraz innych informacji
            udostępnianych w ramach funkcjonalności Serwisu.
          </p>

          <p>
            6.3. Użytkownik publikujący wydarzenie zobowiązany jest do podawania
            informacji prawdziwych, aktualnych i niewprowadzających innych
            użytkowników w błąd.
          </p>

          <p>
            6.4. Użytkownik publikujący wydarzenie ponosi odpowiedzialność za
            jego organizację oraz za informacje i materiały zamieszczone w
            ramach wydarzenia, w zakresie wynikającym z obowiązujących przepisów
            prawa.
          </p>

          <p>
            6.5. Publikacja wydarzenia w Serwisie nie oznacza, że PoloniaPortal
            jest jego organizatorem, współorganizatorem ani że potwierdza
            prawdziwość, legalność, bezpieczeństwo lub jakość danego wydarzenia,
            chyba że Serwis wyraźnie wskazuje inaczej.
          </p>

          <p>
            6.6. Użytkownik publikujący wydarzenie powinien posiadać odpowiednie
            uprawnienia do jego organizacji oraz do publikowania informacji,
            zdjęć, grafik, znaków towarowych i innych materiałów związanych z
            wydarzeniem.
          </p>

          <p>
            6.7. Zabronione jest publikowanie wydarzeń, których organizacja,
            charakter lub sposób przedstawienia narusza obowiązujące przepisy
            prawa, prawa osób trzecich, zasady współżycia społecznego lub
            postanowienia niniejszego Regulaminu.
          </p>

          <p>
            6.8. Zabronione jest publikowanie wydarzeń fikcyjnych,
            wprowadzających w błąd, służących wyłudzeniu pieniędzy lub danych, a
            także wydarzeń tworzonych wyłącznie w celu spamowania lub sztucznego
            zwiększania widoczności określonych treści.
          </p>

          <p>
            6.9. W przypadku zmiany terminu, lokalizacji, charakteru lub innych
            istotnych informacji dotyczących wydarzenia użytkownik powinien
            niezwłocznie zaktualizować informacje dostępne w Serwisie.
          </p>

          <p>
            6.10. Użytkownik jest odpowiedzialny za poinformowanie uczestników o
            odwołaniu lub zmianie wydarzenia w sposób odpowiedni do jego
            charakteru, niezależnie od możliwości aktualizacji informacji w
            Serwisie.
          </p>

          <p>
            6.11. PoloniaPortal nie gwarantuje, że wydarzenie się odbędzie, nie
            ponosi odpowiedzialności za jego odwołanie, zmianę terminu, zmianę
            lokalizacji, zmianę programu ani za sposób jego organizacji, chyba
            że odpowiedzialność taka wynika z bezwzględnie obowiązujących
            przepisów prawa.
          </p>

          <p>
            6.12. PoloniaPortal nie jest stroną umów zawieranych pomiędzy
            organizatorem wydarzenia a jego uczestnikami, chyba że wyraźnie
            wskazano inaczej.
          </p>

          <p>
            6.13. Jeżeli udział w wydarzeniu wymaga dokonania płatności,
            rezerwacji lub spełnienia innych warunków, użytkownik powinien przed
            dokonaniem płatności zapoznać się z warunkami przedstawionymi przez
            organizatora.
          </p>

          <p>
            6.14. PoloniaPortal może dokonywać moderacji wydarzeń oraz
            ograniczać ich widoczność, odrzucać, usuwać lub czasowo blokować
            wydarzenia, które naruszają Regulamin, obowiązujące przepisy prawa,
            prawa osób trzecich lub zasady bezpieczeństwa Serwisu.
          </p>

          <p>
            6.15. PoloniaPortal może również usuwać wydarzenia, które stały się
            nieaktualne, zostały odwołane, powielają inne wydarzenia lub których
            informacje są niezgodne z zasadami korzystania z Serwisu.
          </p>

          <p>
            6.16. Użytkownik może zakończyć publikację własnego wydarzenia za
            pomocą funkcjonalności dostępnych w jego koncie, z zastrzeżeniem
            skutków wynikających z ewentualnego skorzystania z odpłatnych
            funkcjonalności.
          </p>

          <p>
            6.17. Niektóre funkcjonalności związane z publikowaniem,
            wyróżnianiem lub promowaniem wydarzeń mogą być dostępne odpłatnie.
            Informacje dotyczące zakresu takich usług, ich ceny oraz warunków
            korzystania są przedstawiane użytkownikowi przed dokonaniem zakupu.
          </p>

          <p>
            6.18. Użytkownik powinien zachować szczególną ostrożność w przypadku
            wydarzeń wymagających przekazania pieniędzy, danych osobowych lub
            innych informacji organizatorowi. PoloniaPortal nie gwarantuje
            wiarygodności organizatora ani bezpieczeństwa płatności dokonywanych
            poza systemami udostępnianymi przez Serwis.
          </p>

          <p>
            6.19. W przypadku podejrzenia oszustwa, naruszenia prawa lub innych
            nieprawidłowości związanych z wydarzeniem użytkownik powinien
            zgłosić wydarzenie za pośrednictwem dostępnych funkcjonalności
            Serwisu lub skontaktować się z administratorem.
          </p>
        </section>
        <section id="userContent">
          <h2>7. Treści publikowane przez użytkowników</h2>

          <p>
            7.1. Użytkownicy mogą publikować w Serwisie różnego rodzaju treści,
            w szczególności teksty, opisy, zdjęcia, grafiki, materiały
            promocyjne, informacje dotyczące firm, ogłoszeń i wydarzeń oraz inne
            materiały udostępniane w ramach funkcjonalności Serwisu.
          </p>

          <p>
            7.2. Użytkownik zachowuje prawa do treści, których jest twórcą lub
            do których posiada odpowiednie prawa, z zastrzeżeniem praw i
            licencji udzielonych PoloniaPortal na zasadach określonych w
            Regulaminie.
          </p>

          <p>
            7.3. Publikując treść w Serwisie, użytkownik oświadcza, że posiada
            odpowiednie prawa do jej wykorzystania oraz publikacji, a jej
            zamieszczenie w Serwisie nie narusza praw osób trzecich, w
            szczególności praw autorskich, praw do wizerunku, dóbr osobistych,
            praw do znaków towarowych ani innych praw chronionych prawem.
          </p>

          <p>
            7.4. Użytkownik ponosi odpowiedzialność za treści opublikowane przez
            siebie w Serwisie, w zakresie wynikającym z obowiązujących przepisów
            prawa.
          </p>

          <p>7.5. Zabronione jest publikowanie treści:</p>

          <ul>
            <li>niezgodnych z obowiązującymi przepisami prawa,</li>
            <li>
              naruszających prawa autorskie, prawa własności intelektualnej lub
              inne prawa osób trzecich,
            </li>
            <li>
              naruszających dobra osobiste, prywatność lub prawa do wizerunku
              innych osób,
            </li>
            <li>
              zawierających treści oszczercze, zniesławiające, grożące lub
              uporczywie nękające inne osoby,
            </li>
            <li>
              zawierających treści nawołujące do przemocy, popełnienia
              przestępstwa lub innych działań niezgodnych z prawem,
            </li>
            <li>
              wprowadzających innych użytkowników w błąd lub zawierających
              świadomie nieprawdziwe informacje,
            </li>
            <li>
              zawierających złośliwe oprogramowanie, szkodliwe pliki lub inne
              elementy mogące zagrozić bezpieczeństwu Serwisu lub użytkowników,
            </li>
            <li>
              stanowiących spam lub mających na celu masowe, niepożądane
              promowanie określonych treści, produktów lub usług,
            </li>
            <li>
              naruszających zasady korzystania z poszczególnych funkcjonalności
              Serwisu.
            </li>
          </ul>

          <p>
            7.6. Użytkownik zobowiązany jest do zachowania szczególnej
            ostrożności podczas publikowania zdjęć oraz innych materiałów
            zawierających wizerunek osób trzecich i powinien posiadać
            odpowiednią podstawę prawną do ich publikacji.
          </p>

          <p>
            7.7. Publikując treści w Serwisie, użytkownik udziela PoloniaPortal
            niewyłącznej, nieodpłatnej, obowiązującej przez okres publikacji
            danej treści licencji na korzystanie z tej treści w zakresie
            niezbędnym do prowadzenia, utrzymania, prezentowania, promowania i
            technicznego funkcjonowania Serwisu.
          </p>

          <p>
            7.8. Licencja, o której mowa w punkcie 8.7, obejmuje w szczególności
            prawo do przechowywania, zwielokrotniania technicznego,
            wyświetlania, udostępniania oraz dostosowywania treści do wymogów
            technicznych Serwisu, w zakresie niezbędnym do prawidłowego
            świadczenia jego usług.
          </p>

          <p>
            7.9. Licencja nie oznacza przeniesienia na PoloniaPortal autorskich
            praw majątkowych do treści użytkownika. Użytkownik pozostaje
            uprawniony do korzystania z własnych treści w zakresie wynikającym z
            przysługujących mu praw.
          </p>

          <p>
            7.10. Użytkownik może w każdym czasie usunąć opublikowaną przez
            siebie treść, o ile dana funkcjonalność Serwisu na to pozwala.
            Usunięcie treści powoduje zaprzestanie jej publicznego
            udostępniania, z zastrzeżeniem przypadków, w których dalsze
            przechowywanie jest wymagane przez prawo lub jest uzasadnione
            prawnie i technicznie.
          </p>

          <p>
            7.11. Usunięcie konta użytkownika lub określonej treści nie wpływa
            na możliwość dalszego przechowywania informacji, jeżeli obowiązek
            ich zachowania wynika z przepisów prawa lub jest niezbędny do
            ochrony praw PoloniaPortal, użytkownika lub osób trzecich.
          </p>

          <p>
            7.12. PoloniaPortal nie przejmuje odpowiedzialności za treści
            publikowane przez użytkowników wyłącznie z tego powodu, że są one
            dostępne w Serwisie. Odpowiedzialność PoloniaPortal za treści
            użytkowników podlega obowiązującym przepisom prawa.
          </p>

          <p>
            7.13. PoloniaPortal może podejmować działania wobec treści, które
            zostały zgłoszone jako naruszające prawo, Regulamin lub prawa osób
            trzecich, w szczególności może ograniczyć ich widoczność, zablokować
            ich dostępność lub je usunąć, zgodnie z obowiązującymi przepisami
            prawa.
          </p>

          <p>
            7.14. PoloniaPortal może również zastosować ograniczenia wobec konta
            użytkownika, jeżeli charakter lub powtarzalność publikowanych przez
            niego treści wskazuje na istotne lub powtarzające się naruszenia
            Regulaminu, obowiązującego prawa lub bezpieczeństwa Serwisu.
          </p>

          <p>
            7.15. Użytkownik zobowiązuje się do niepublikowania w Serwisie
            danych osobowych innych osób bez odpowiedniej podstawy prawnej oraz
            do przestrzegania przepisów dotyczących ochrony danych osobowych.
          </p>
        </section>
        <section id="moderation">
          <h2>8. Moderacja treści i działania wobec naruszeń</h2>

          <p>
            8.1. PoloniaPortal może prowadzić działania mające na celu
            zapewnienie zgodnego z prawem, bezpiecznego i prawidłowego
            korzystania z Serwisu, w szczególności poprzez moderowanie treści
            publikowanych przez użytkowników oraz reagowanie na zgłoszenia
            dotyczące naruszeń.
          </p>

          <p>
            8.2. Moderacji mogą podlegać w szczególności profile użytkowników,
            profile firm, ogłoszenia, wydarzenia, zdjęcia, grafiki, opisy oraz
            inne treści publikowane lub udostępniane za pośrednictwem Serwisu.
          </p>

          <p>
            8.3. Treści mogą zostać poddane moderacji w szczególności w
            przypadku zgłoszenia ich przez użytkownika, automatycznego wykrycia
            potencjalnego naruszenia lub uzyskania przez PoloniaPortal
            informacji wskazujących na możliwość naruszenia Regulaminu,
            obowiązujących przepisów prawa lub praw osób trzecich.
          </p>

          <p>
            8.4. Użytkownik może zgłosić treść, profil lub inne zachowanie,
            które jego zdaniem narusza Regulamin, obowiązujące przepisy prawa,
            prawa osób trzecich lub zasady bezpieczeństwa Serwisu, korzystając z
            dostępnych w Serwisie funkcjonalności zgłaszania naruszeń lub
            kontaktując się z PoloniaPortal.
          </p>

          <p>
            8.5. Zgłoszenie powinno w miarę możliwości zawierać informacje
            pozwalające na identyfikację zgłaszanej treści lub zachowania oraz
            wskazanie przyczyny zgłoszenia.
          </p>

          <p>
            8.6. PoloniaPortal może podjąć odpowiednie działania po
            przeanalizowaniu zgłoszenia lub uzyskaniu informacji o potencjalnym
            naruszeniu. Zakres podejmowanych działań zależy od charakteru,
            zakresu i powagi danego naruszenia.
          </p>

          <p>
            8.7. W przypadku stwierdzenia naruszenia PoloniaPortal może w
            szczególności:
          </p>

          <ul>
            <li>usunąć całość lub część treści,</li>
            <li>ograniczyć widoczność treści,</li>
            <li>
              czasowo zablokować możliwość publikowania określonych treści,
            </li>
            <li>
              czasowo ograniczyć dostęp do wybranych funkcjonalności Serwisu,
            </li>
            <li>czasowo zablokować konto użytkownika,</li>
            <li>trwale zablokować konto użytkownika,</li>
            <li>
              usunąć konto użytkownika w przypadkach uzasadnionych charakterem
              naruszenia,
            </li>
            <li>
              podjąć inne działania przewidziane w Regulaminie lub wymagane
              przez obowiązujące przepisy prawa.
            </li>
          </ul>

          <p>
            8.8. W przypadku naruszeń dotyczących profilu firmy PoloniaPortal
            może w szczególności ograniczyć jego widoczność, zawiesić możliwość
            korzystania z funkcjonalności profilu, usunąć określone treści lub
            czasowo albo trwale usunąć profil firmy.
          </p>

          <p>
            8.9. W przypadku naruszeń dotyczących ogłoszenia lub wydarzenia
            PoloniaPortal może w szczególności odrzucić publikację, ograniczyć
            jej widoczność, czasowo ją ukryć, usunąć określone elementy lub
            całkowicie usunąć ogłoszenie albo wydarzenie.
          </p>

          <p>
            8.10. W przypadku powtarzających się lub poważnych naruszeń
            PoloniaPortal może zastosować bardziej rygorystyczne działania,
            włącznie z trwałym ograniczeniem dostępu do konta lub jego
            usunięciem, z uwzględnieniem obowiązujących przepisów prawa.
          </p>

          <p>
            8.11. PoloniaPortal może zastosować tymczasowe ograniczenie dostępu
            do treści lub funkcjonalności przed zakończeniem pełnej analizy
            sprawy, jeżeli jest to uzasadnione względami bezpieczeństwa,
            ryzykiem dalszego naruszenia, koniecznością ochrony użytkowników lub
            wymogami prawa.
          </p>

          <p>
            8.12. W przypadku treści, których bezprawność wynika z przepisów
            prawa, PoloniaPortal może podjąć działania wymagane przez właściwe
            przepisy, w tym ograniczyć dostęp do takich treści lub przekazać
            odpowiednie informacje właściwym organom, jeżeli obowiązek taki
            wynika z prawa.
          </p>

          <p>
            8.13. PoloniaPortal może podejmować działania moderacyjne zarówno
            wobec pojedynczych treści, jak i wobec całego konta użytkownika,
            jeżeli okoliczności wskazują, że naruszenie jest związane z
            korzystaniem z konta lub działalnością użytkownika w Serwisie.
          </p>

          <p>
            8.14. W zakresie dozwolonym przez obowiązujące przepisy prawa
            PoloniaPortal może poinformować użytkownika o podjętym działaniu
            moderacyjnym oraz, w odpowiednim zakresie, o przyczynie jego
            zastosowania.
          </p>

          <p>
            8.15. Użytkownik może skontaktować się z PoloniaPortal w sprawie
            zastosowanego działania moderacyjnego i przedstawić swoje stanowisko
            lub dodatkowe informacje dotyczące sprawy.
          </p>

          <p>
            8.16. PoloniaPortal może ponownie przeanalizować sprawę na podstawie
            przedstawionych przez użytkownika informacji, jeżeli charakter
            sprawy oraz obowiązujące przepisy prawa uzasadniają przeprowadzenie
            ponownej weryfikacji.
          </p>

          <p>
            8.17. Działania moderacyjne podejmowane są z uwzględnieniem
            charakteru naruszenia, jego skutków, powtarzalności oraz
            potencjalnego zagrożenia dla użytkowników, osób trzecich lub
            prawidłowego funkcjonowania Serwisu.
          </p>

          <p>
            8.18. Samo zgłoszenie treści nie oznacza automatycznego jej
            usunięcia. PoloniaPortal może przeprowadzić odpowiednią analizę
            zgłoszenia i podjąć decyzję zgodnie z Regulaminem oraz
            obowiązującymi przepisami prawa.
          </p>
        </section>
        <section id="paidServices">
          <h2>9. Usługi odpłatne i płatności</h2>

          <p>
            9.1. Niektóre funkcjonalności lub usługi dostępne w Serwisie mogą
            być świadczone odpłatnie. Zakres, charakter oraz cena danej usługi
            są prezentowane Użytkownikowi przed dokonaniem zakupu.
          </p>

          <p>
            9.2. Przed dokonaniem płatności Użytkownik otrzymuje informacje
            dotyczące wybranej usługi, jej ceny, zakresu oraz – w przypadku
            usług świadczonych przez określony czas – okresu jej obowiązywania.
          </p>

          <p>
            9.3. Dokonanie zakupu odpłatnej usługi wymaga potwierdzenia przez
            Użytkownika warunków zamówienia oraz dokonania płatności za
            pośrednictwem udostępnionej w Serwisie metody płatności.
          </p>

          <p>
            9.4. Płatności mogą być realizowane za pośrednictwem zewnętrznych
            operatorów płatności. W zakresie realizacji płatności zastosowanie
            mogą mieć również regulaminy i zasady tych operatorów.
          </p>

          <p>
            9.5. PoloniaPortal nie przechowuje danych kart płatniczych
            Użytkowników, jeżeli obsługa płatności realizowana jest przez
            zewnętrznego operatora płatności, zgodnie z jego zasadami i
            rozwiązaniami technicznymi.
          </p>

          <p>
            9.6. W przypadku usług, których charakter polega na zwiększeniu
            widoczności lub wyróżnieniu określonych treści, zakres oraz czas
            trwania wyróżnienia są określone przed dokonaniem zakupu.
          </p>

          <p>
            9.7. W przypadku usług przeznaczonych dla firm lub innych podmiotów
            gospodarczych dodatkowe warunki dotyczące zakresu usług, płatności
            lub rozliczeń mogą zostać określone w ofercie przedstawionej danemu
            Użytkownikowi.
          </p>

          <p>
            9.8. Zasady dotyczące odstąpienia od umowy, zwrotów, reklamacji oraz
            innych uprawnień Użytkownika związanych z zakupem usług odpłatnych
            stosuje się zgodnie z przepisami prawa właściwymi dla danej
            transakcji i statusu Użytkownika.
          </p>

          <p>
            9.9. W przypadku wystąpienia problemu z płatnością lub realizacją
            zakupionej usługi Użytkownik może skontaktować się z PoloniaPortal
            za pośrednictwem dostępnych w Serwisie kanałów kontaktu.
          </p>
        </section>
        <section id="intellectualProperty">
          <h2>10. Prawa własności intelektualnej</h2>

          <p>
            10.1. Wszelkie prawa własności intelektualnej do Serwisu, w tym do
            jego nazwy, oznaczeń, logo, wyglądu, układu, elementów graficznych,
            kodu źródłowego, oprogramowania, funkcjonalności, tekstów oraz
            innych elementów stanowiących własność PoloniaPortal lub
            wykorzystywanych przez PoloniaPortal na podstawie odpowiednich praw
            lub licencji, podlegają ochronie na podstawie obowiązujących
            przepisów prawa.
          </p>

          <p>
            10.2. Korzystanie z Serwisu nie oznacza przeniesienia na Użytkownika
            jakichkolwiek praw własności intelektualnej do Serwisu ani jego
            poszczególnych elementów.
          </p>

          <p>
            10.3. Użytkownik może korzystać z elementów Serwisu wyłącznie w
            zakresie wynikającym z jego przeznaczenia oraz zgodnie z niniejszym
            Regulaminem i obowiązującymi przepisami prawa.
          </p>

          <p>
            10.4. Bez uprzedniej zgody uprawnionego podmiotu zabronione jest w
            szczególności kopiowanie, powielanie, rozpowszechnianie,
            modyfikowanie, publiczne udostępnianie, odtwarzanie lub
            wykorzystywanie elementów Serwisu poza zakresem dozwolonym przez
            obowiązujące przepisy prawa.
          </p>

          <p>
            10.5. Nazwa PoloniaPortal, logo oraz inne oznaczenia wykorzystywane
            w związku z Serwisem mogą stanowić chronione oznaczenia lub znaki
            towarowe. Ich wykorzystywanie w sposób mogący naruszać prawa
            uprawnionych podmiotów jest niedozwolone.
          </p>

          <p>
            10.6. Użytkownik, publikując w Serwisie własne treści, oświadcza, że
            posiada prawa lub odpowiednie uprawnienia pozwalające na ich
            opublikowanie oraz korzystanie z nich w zakresie przewidzianym
            Regulaminem.
          </p>

          <p>
            10.7. Użytkownik ponosi odpowiedzialność za treści, które publikuje
            w Serwisie, w zakresie wynikającym z obowiązujących przepisów prawa.
          </p>

          <p>
            10.8. Jeżeli Użytkownik uważa, że treść lub element dostępny w
            Serwisie narusza jego prawa własności intelektualnej, może zgłosić
            takie naruszenie za pośrednictwem dostępnych w Serwisie kanałów
            kontaktu, podając informacje umożliwiające identyfikację zgłaszanego
            materiału oraz charakteru naruszenia.
          </p>
        </section>
        <section id="liability">
          <h2>11. Odpowiedzialność Serwisu</h2>

          <p>
            11.1. PoloniaPortal dokłada należytej staranności, aby Serwis
            działał prawidłowo, stabilnie i w sposób zgodny z jego
            przeznaczeniem. Ze względu na charakter usług świadczonych drogą
            elektroniczną PoloniaPortal nie gwarantuje jednak nieprzerwanej i
            wolnej od błędów dostępności wszystkich funkcjonalności Serwisu.
          </p>

          <p>
            11.2. PoloniaPortal nie ponosi odpowiedzialności za czasową
            niedostępność Serwisu lub poszczególnych jego funkcjonalności
            wynikającą w szczególności z przyczyn technicznych, konserwacji,
            aktualizacji, awarii, działania dostawców usług zewnętrznych lub
            innych okoliczności pozostających poza uzasadnioną kontrolą
            PoloniaPortal.
          </p>

          <p>
            11.3. PoloniaPortal nie ponosi odpowiedzialności za treści
            publikowane przez Użytkowników, w szczególności za ich prawdziwość,
            kompletność, aktualność, legalność, jakość ani przydatność dla
            innych Użytkowników, z zastrzeżeniem obowiązków wynikających z
            bezwzględnie obowiązujących przepisów prawa.
          </p>

          <p>
            11.4. PoloniaPortal nie jest stroną umów ani innych uzgodnień
            zawieranych pomiędzy Użytkownikami za pośrednictwem Serwisu, chyba
            że wyraźnie wynika to z charakteru konkretnej usługi świadczonej
            przez PoloniaPortal.
          </p>

          <p>
            11.5. PoloniaPortal nie gwarantuje, że informacje, oferty,
            ogłoszenia, wydarzenia, profile firm lub inne treści publikowane
            przez Użytkowników będą odpowiadały oczekiwaniom innych
            Użytkowników.
          </p>

          <p>
            11.6. Użytkownik korzysta z informacji, ogłoszeń, ofert, wydarzeń
            oraz innych treści dostępnych w Serwisie na własną odpowiedzialność.
            Przed podjęciem decyzji na podstawie informacji zamieszczonych przez
            innego Użytkownika powinien samodzielnie zweryfikować ich
            wiarygodność oraz aktualność.
          </p>

          <p>
            11.7. PoloniaPortal nie ponosi odpowiedzialności za szkody
            wynikające z nieprawidłowego korzystania z Serwisu przez
            Użytkownika, korzystania z Serwisu w sposób sprzeczny z Regulaminem
            lub obowiązującymi przepisami prawa, ani za skutki działań
            podejmowanych przez Użytkownika na podstawie treści publikowanych
            przez innych Użytkowników, w zakresie dopuszczalnym przez
            obowiązujące przepisy prawa.
          </p>

          <p>
            11.8. Postanowienia niniejszego punktu nie wyłączają ani nie
            ograniczają odpowiedzialności PoloniaPortal w zakresie, w jakim
            takie wyłączenie lub ograniczenie odpowiedzialności byłoby
            niedopuszczalne na podstawie bezwzględnie obowiązujących przepisów
            prawa.
          </p>
        </section>
        <section id="reporting">
          <h2>12. Zgłaszanie naruszeń</h2>

          <p>
            12.1. Użytkownik, który uzna, że treść, ogłoszenie, wydarzenie,
            profil firmy, profil użytkownika lub inne materiały dostępne w
            Serwisie naruszają niniejszy Regulamin, obowiązujące przepisy prawa
            lub prawa osób trzecich, może zgłosić takie naruszenie za
            pośrednictwem funkcjonalności dostępnych w Serwisie lub za
            pośrednictwem wskazanego kanału kontaktu.
          </p>

          <p>
            12.2. Zgłoszenie powinno zawierać informacje umożliwiające możliwie
            dokładną identyfikację zgłaszanej treści lub działania oraz, w miarę
            możliwości, opis charakteru naruszenia i podstawy zgłoszenia.
          </p>

          <p>
            12.3. W przypadku zgłoszeń dotyczących naruszenia praw własności
            intelektualnej, dóbr osobistych, prywatności lub innych praw osób
            trzecich PoloniaPortal może poprosić zgłaszającego o przedstawienie
            dodatkowych informacji lub dokumentów pozwalających na ocenę
            zgłoszenia.
          </p>

          <p>
            12.4. PoloniaPortal może dokonać weryfikacji zgłoszonej treści lub
            działania w zakresie odpowiednim do charakteru zgłoszenia i
            dostępnych informacji.
          </p>

          <p>
            12.5. W zależności od wyników weryfikacji oraz charakteru naruszenia
            PoloniaPortal może podjąć działania przewidziane w Regulaminie, w
            tym ograniczyć widoczność, usunąć lub zablokować dostęp do
            określonej treści, ograniczyć funkcjonalność konta albo podjąć inne
            działania dopuszczalne na podstawie obowiązujących przepisów prawa.
          </p>

          <p>
            12.6. Zgłoszenie naruszenia nie oznacza automatycznego usunięcia
            zgłoszonej treści. Decyzja dotycząca dalszego udostępniania treści
            jest podejmowana z uwzględnieniem charakteru zgłoszenia, dostępnych
            informacji, Regulaminu oraz obowiązujących przepisów prawa.
          </p>

          <p>
            12.7. Użytkownik zobowiązany jest do dokonywania zgłoszeń w sposób
            rzetelny i zgodny z prawem. Celowe składanie fałszywych,
            wprowadzających w błąd lub dokonywanych w złej wierze zgłoszeń może
            skutkować podjęciem odpowiednich działań wobec konta Użytkownika.
          </p>

          <p>
            12.8. W przypadku gdy charakter zgłoszenia lub obowiązujące przepisy
            prawa wymagają podjęcia określonych działań lub przekazania
            informacji właściwym organom, PoloniaPortal może podjąć takie
            działania w zakresie wymaganym przez prawo.
          </p>
        </section>
        <section id="complaints">
          <h2>13. Reklamacje</h2>

          <p>
            13.1. Użytkownik ma prawo zgłosić reklamację dotyczącą
            funkcjonowania Serwisu, dostępnych funkcjonalności lub odpłatnych
            usług świadczonych przez PoloniaPortal.
          </p>

          <p>
            13.2. Reklamację można złożyć za pośrednictwem formularza
            kontaktowego dostępnego w Serwisie lub przy wykorzystaniu innego
            kanału kontaktu wskazanego przez PoloniaPortal.
          </p>

          <p>
            13.3. Reklamacja powinna zawierać informacje pozwalające na
            zidentyfikowanie problemu, w szczególności opis sytuacji, której
            dotyczy reklamacja, oraz – jeżeli ma to zastosowanie – informacje
            dotyczące konkretnej usługi, transakcji lub funkcjonalności.
          </p>

          <p>
            13.4. W przypadku reklamacji dotyczącej konta Użytkownika lub
            odpłatnej usługi PoloniaPortal może poprosić o podanie dodatkowych
            informacji niezbędnych do prawidłowego rozpatrzenia reklamacji.
          </p>

          <p>
            13.5. PoloniaPortal rozpatruje reklamacje w rozsądnym terminie, z
            uwzględnieniem charakteru sprawy, jej złożoności oraz obowiązujących
            przepisów prawa.
          </p>

          <p>
            13.6. Jeżeli do rozpatrzenia reklamacji konieczne będzie
            uzupełnienie informacji przez Użytkownika, PoloniaPortal może
            zwrócić się do niego o przedstawienie dodatkowych wyjaśnień lub
            informacji.
          </p>

          <p>
            13.7. O sposobie rozpatrzenia reklamacji Użytkownik może zostać
            poinformowany za pośrednictwem danych kontaktowych przypisanych do
            jego konta lub danych podanych w zgłoszeniu reklamacyjnym.
          </p>

          <p>
            13.8. Jeżeli reklamacja dotyczy odpłatnej usługi, jej rozpatrzenie
            może obejmować w szczególności weryfikację dokonanej płatności,
            zakresu zakupionej usługi oraz sposobu jej realizacji.
          </p>

          <p>
            13.9. Złożenie reklamacji nie ogranicza praw Użytkownika
            wynikających z bezwzględnie obowiązujących przepisów prawa, w
            szczególności przepisów dotyczących ochrony konsumentów, jeżeli mają
            one zastosowanie do danej sytuacji.
          </p>

          <p>
            13.10. W przypadku gdy charakter sprawy wymaga kontaktu z
            zewnętrznym dostawcą usług, w tym operatorem płatności,
            PoloniaPortal może podjąć odpowiednie działania wyjaśniające lub
            przekazać sprawę do właściwego podmiotu w zakresie niezbędnym do jej
            rozpatrzenia.
          </p>
        </section>
        <section id="privacy">
          <h2>14. Dane osobowe i prywatność</h2>

          <p>
            14.1. Zasady przetwarzania danych osobowych Użytkowników oraz
            informacje dotyczące ochrony prywatności zostały szczegółowo
            określone w odrębnym dokumencie – Polityce Prywatności dostępnej w
            Serwisie.
          </p>

          <p>
            14.2. Polityka Prywatności określa w szczególności informacje
            dotyczące administratora danych osobowych, celów i podstaw
            przetwarzania danych, zakresu przetwarzanych danych, okresu ich
            przechowywania, odbiorców danych oraz praw przysługujących osobom,
            których dane dotyczą.
          </p>

          <p>
            14.3. Korzystając z Serwisu, Użytkownik powinien zapoznać się z
            treścią Polityki Prywatności oraz informacjami dotyczącymi
            przetwarzania jego danych osobowych.
          </p>

          <p>
            14.4. W zakresie dotyczącym przetwarzania danych osobowych
            zastosowanie mają postanowienia Polityki Prywatności oraz
            obowiązujące przepisy prawa.
          </p>

          <p>
            14.5. Postanowienia niniejszego Regulaminu nie wyłączają ani nie
            ograniczają praw Użytkownika wynikających z obowiązujących przepisów
            dotyczących ochrony danych osobowych i prywatności.
          </p>
        </section>

        <section id="changes">
          <h2>15. Zmiany Regulaminu</h2>

          <p>
            15.1. PoloniaPortal zastrzega sobie prawo do zmiany niniejszego
            Regulaminu w przypadku wprowadzenia nowych funkcjonalności, zmian
            organizacyjnych lub technicznych w Serwisie, zmian przepisów prawa,
            konieczności dostosowania Regulaminu do decyzji lub zaleceń
            właściwych organów, a także w innych uzasadnionych przypadkach.
          </p>

          <p>
            15.2. O zmianie Regulaminu Użytkownicy zostaną poinformowani poprzez
            udostępnienie jego nowej wersji w Serwisie lub za pośrednictwem
            innych odpowiednich kanałów komunikacji, jeżeli będzie to wymagane
            przez obowiązujące przepisy prawa.
          </p>

          <p>
            15.3. Nowa wersja Regulaminu wskazuje datę jej wejścia w życie.
            Zmiany nie naruszają praw nabytych przez Użytkownika przed dniem
            wejścia ich w życie, w zakresie wynikającym z obowiązujących
            przepisów prawa.
          </p>

          <p>
            15.4. W przypadku zmian Regulaminu mających istotny wpływ na prawa
            lub obowiązki Użytkownika, PoloniaPortal może poinformować
            Użytkownika o zmianach w sposób umożliwiający zapoznanie się z ich
            treścią przed ich wejściem w życie, w zakresie wymaganym przez
            obowiązujące przepisy prawa.
          </p>

          <p>
            15.5. Jeżeli obowiązujące przepisy prawa wymagają uzyskania
            akceptacji Użytkownika dla zmienionych postanowień Regulaminu,
            dalsze korzystanie z odpowiednich funkcjonalności Serwisu może
            wymagać zaakceptowania nowej wersji Regulaminu.
          </p>

          <p>
            15.6. Aktualna wersja Regulaminu jest dostępna w Serwisie.
            Użytkownik powinien zapoznać się z jego aktualną treścią przed
            dalszym korzystaniem z Serwisu.
          </p>
        </section>
        <section id="termination">
          <h2>16. Rozwiązanie umowy / usunięcie konta</h2>

          <p>
            16.1. Użytkownik może w każdym czasie zrezygnować z korzystania z
            Serwisu oraz, jeżeli funkcjonalność taka jest dostępna, usunąć swoje
            konto za pośrednictwem ustawień konta lub w sposób wskazany przez
            PoloniaPortal.
          </p>

          <p>
            16.2. Usunięcie konta może skutkować utratą dostępu do
            funkcjonalności dostępnych wyłącznie dla zarejestrowanych
            Użytkowników oraz do danych i treści powiązanych z kontem, w
            zakresie, w jakim ich usunięcie jest zgodne z obowiązującymi
            przepisami prawa.
          </p>

          <p>
            16.3. Usunięcie konta nie powoduje automatycznego wygaśnięcia
            zobowiązań, które powstały przed jego usunięciem, jeżeli ich
            charakter lub obowiązujące przepisy prawa wymagają ich dalszego
            wykonania.
          </p>

          <p>
            16.4. W przypadku korzystania przez Użytkownika z odpłatnych usług,
            usunięcie konta nie powoduje automatycznie powstania prawa do zwrotu
            płatności dokonanych przed usunięciem konta, z zastrzeżeniem praw
            Użytkownika wynikających z obowiązujących przepisów prawa oraz
            warunków dotyczących danej usługi.
          </p>

          <p>
            16.5. PoloniaPortal może ograniczyć, zawiesić lub zakończyć
            możliwość korzystania z konta lub określonych funkcjonalności w
            przypadku naruszenia przez Użytkownika Regulaminu, obowiązujących
            przepisów prawa lub zasad bezpieczeństwa Serwisu.
          </p>

          <p>
            16.6. W zależności od charakteru i wagi naruszenia PoloniaPortal
            może zastosować odpowiednie środki, w tym czasowe ograniczenie
            funkcjonalności konta, zawieszenie konta lub jego usunięcie.
          </p>

          <p>
            16.7. W przypadkach, w których jest to uzasadnione charakterem
            naruszenia lub wymagane przez obowiązujące przepisy prawa,
            PoloniaPortal może podjąć działania bez wcześniejszego ostrzeżenia
            Użytkownika.
          </p>

          <p>
            16.8. Usunięcie lub zawieszenie konta nie wpływa na możliwość
            przechowywania określonych informacji lub danych, jeżeli ich dalsze
            przechowywanie jest wymagane lub dozwolone przez obowiązujące
            przepisy prawa. Szczegółowe zasady dotyczące przechowywania i
            usuwania danych określa Polityka Prywatności.
          </p>

          <p>
            16.9. Jeżeli konto zostanie usunięte w wyniku naruszenia Regulaminu,
            Użytkownik może utracić możliwość ponownej rejestracji lub
            korzystania z określonych funkcjonalności, jeżeli jest to
            uzasadnione charakterem naruszenia i dopuszczalne na podstawie
            obowiązujących przepisów prawa.
          </p>
        </section>
        <section id="final">
          <h2>17. Postanowienia końcowe</h2>

          <p>
            17.1. Regulamin jest dostępny w Serwisie w sposób umożliwiający
            Użytkownikowi zapoznanie się z jego treścią, utrwalenie jej oraz
            odtworzenie w niezmienionej postaci.
          </p>

          <p>
            17.2. W sprawach nieuregulowanych w Regulaminie zastosowanie mają
            właściwe przepisy prawa obowiązujące w odniesieniu do danej sytuacji
            i Użytkownika.
          </p>

          <p>
            17.3. Postanowienia Regulaminu nie mają na celu wyłączenia ani
            ograniczenia praw Użytkownika, których nie można wyłączyć lub
            ograniczyć na podstawie bezwzględnie obowiązujących przepisów prawa.
          </p>

          <p>
            17.4. Jeżeli którekolwiek postanowienie Regulaminu okaże się
            nieważne, bezskuteczne lub niewykonalne, nie wpływa to na ważność i
            skuteczność pozostałych postanowień Regulaminu, chyba że
            obowiązujące przepisy prawa stanowią inaczej.
          </p>

          <p>
            17.5. W przypadku rozbieżności pomiędzy postanowieniami Regulaminu a
            bezwzględnie obowiązującymi przepisami prawa pierwszeństwo mają
            przepisy prawa.
          </p>

          <p>
            17.6. Wszelkie pytania, uwagi, reklamacje oraz zgłoszenia dotyczące
            funkcjonowania Serwisu mogą być kierowane za pośrednictwem kanałów
            kontaktowych udostępnionych w Serwisie.
          </p>

          <p>
            17.7. Regulamin wchodzi w życie z dniem wskazanym w jego aktualnej
            wersji dostępnej w Serwisie.
          </p>

          <p>
            17.8. Regulamin został sporządzony w języku polskim. W przypadku
            udostępnienia Regulaminu w innych wersjach językowych, zasady
            dotyczące pierwszeństwa poszczególnych wersji określają obowiązujące
            przepisy prawa oraz informacje przedstawione Użytkownikowi przy
            korzystaniu z Serwisu.
          </p>

          <p>
            17.9. Regulamin stanowi integralną część zasad korzystania z Serwisu
            PoloniaPortal i znajduje zastosowanie do Użytkowników w zakresie
            odpowiadającym charakterowi korzystania z poszczególnych
            funkcjonalności Serwisu.
          </p>
        </section>
      </div>
    </SectionLayout>
  );
};
