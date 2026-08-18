import { MdPrivacyTip } from "react-icons/md";
import { SectionLayout } from "@/components/Layout/SectionLayout/SectionLayout";
import styles from "./Privacy.module.scss";

const items = [
  {
    label: "Postanowienia ogólne",
    to: "#general",
  },
  {
    label: "Administrator danych osobowych",
    to: "#administrator",
  },
  {
    label: "Jakie dane przetwarzamy",
    to: "#data",
  },
  {
    label: "Cele i podstawy prawne przetwarzania danych",
    to: "#purposes",
  },
  {
    label: "Konto użytkownika",
    to: "#account",
  },
  {
    label: "Profile publiczne",
    to: "#publicProfiles",
  },
  {
    label: "Ogłoszenia i treści publikowane przez użytkowników",
    to: "#userContent",
  },
  {
    label: "Profile firm i dane przedsiębiorców",
    to: "#businessProfiles",
  },
  {
    label: "Wydarzenia",
    to: "#events",
  },
  {
    label: "Kontakt i komunikacja z użytkownikiem",
    to: "#communication",
  },
  {
    label: "Przechowywanie i okres przetwarzania danych",
    to: "#storage",
  },
  {
    label: "Odbiorcy danych i udostępnianie danych",
    to: "#recipients",
  },
  {
    label: "Przekazywanie danych poza EOG",
    to: "#internationalTransfers",
  },
  {
    label: "Prawa użytkownika",
    to: "#rights",
  },
  {
    label: "Bezpieczeństwo danych",
    to: "#security",
  },
  {
    label: "Zmiany Polityki prywatności i kontakt",
    to: "#changesAndContact",
  },
];

export const Privacy = () => {
  return (
    <SectionLayout title="Polityka prywatności" items={items}>
      <div className={styles.page}>
        <header className={styles.header}>
          <div className={styles.headerTitle}>
            <MdPrivacyTip className={styles.icon} size={28} />

            <h1>Polityka prywatności</h1>
          </div>

          <p>
            Informacje dotyczące przetwarzania danych osobowych użytkowników
            serwisu PoloniaPortal.
          </p>
        </header>

        <div className={styles.card}>
          <section id="general">
            <h2>1. Postanowienia ogólne</h2>

            <p>
              <strong>1.1.</strong> Niniejsza Polityka Prywatności określa
              zasady przetwarzania i ochrony danych osobowych użytkowników
              serwisu internetowego PoloniaPortal oraz zasady dotyczące
              prywatności osób korzystających z Serwisu.
            </p>

            <p>
              <strong>1.2.</strong> PoloniaPortal jest serwisem
              społecznościowo-informacyjnym umożliwiającym użytkownikom między
              innymi tworzenie kont, prowadzenie profili, publikowanie ogłoszeń,
              wydarzeń oraz prezentowanie profili firm.
            </p>

            <p>
              <strong>1.3.</strong> Polityka Prywatności ma zastosowanie do
              wszystkich użytkowników Serwisu, niezależnie od kraju ich
              zamieszkania lub miejsca, z którego uzyskują dostęp do Serwisu.
            </p>

            <p>
              <strong>1.4.</strong> Administrator dokłada należytej staranności,
              aby przetwarzanie danych osobowych odbywało się zgodnie z
              obowiązującymi przepisami prawa dotyczącymi ochrony danych
              osobowych i prywatności.
            </p>

            <p>
              <strong>1.5.</strong> Polityka Prywatności stanowi uzupełnienie
              Regulaminu Serwisu. Korzystając z funkcjonalności wymagających
              przetwarzania danych osobowych, użytkownik powinien zapoznać się z
              treścią niniejszej Polityki Prywatności.
            </p>
          </section>
          <section id="administrator">
            <h2>2. Administrator danych osobowych</h2>

            <p>
              <strong>2.1.</strong> Administratorem danych osobowych
              przetwarzanych w związku z korzystaniem z Serwisu jest podmiot
              prowadzący i odpowiedzialny za funkcjonowanie PoloniaPortal.
            </p>

            <p>
              <strong>2.2.</strong> Dane kontaktowe Administratora oraz
              informacje umożliwiające bezpośredni kontakt w sprawach
              dotyczących przetwarzania danych osobowych są dostępne w Serwisie,
              w szczególności za pośrednictwem formularza kontaktowego.
            </p>

            <p>
              <strong>2.3.</strong> Administrator odpowiada za przetwarzanie
              danych osobowych zgodnie z obowiązującymi przepisami prawa oraz za
              wdrożenie odpowiednich środków organizacyjnych i technicznych
              służących ochronie danych.
            </p>

            <p>
              <strong>2.4.</strong> W przypadku korzystania z określonych
              funkcjonalności Serwisu dane użytkownika mogą być przetwarzane
              również przez podmioty świadczące na rzecz Administratora usługi
              niezbędne do prawidłowego funkcjonowania Serwisu, na zasadach
              określonych w niniejszej Polityce Prywatności.
            </p>

            <p>
              <strong>2.5.</strong> Administrator może wyznaczyć inspektora
              ochrony danych lub inną osobę odpowiedzialną za kwestie związane z
              ochroną danych osobowych, jeżeli obowiązek taki wynika z
              obowiązujących przepisów prawa lub jeżeli Administrator uzna to za
              zasadne.
            </p>
          </section>
          <section id="data">
            <h2>3. Jakie dane przetwarzamy</h2>

            <p>
              <strong>3.1.</strong> Zakres przetwarzanych danych zależy od
              sposobu korzystania z Serwisu oraz od funkcjonalności, z których
              korzysta użytkownik.
            </p>

            <p>
              <strong>3.2.</strong> W związku z utworzeniem i korzystaniem z
              konta użytkownika możemy przetwarzać w szczególności dane podane
              podczas rejestracji oraz uzupełniania profilu, takie jak adres
              e-mail, nazwa publiczna, imię, nazwisko, kraj, miasto oraz inne
              informacje dobrowolnie podane przez użytkownika.
            </p>

            <p>
              <strong>3.3.</strong> Jeżeli użytkownik korzysta z możliwości
              dodawania zdjęcia profilowego, możemy przetwarzać również
              przesłany przez niego obraz.
            </p>

            <p>
              <strong>3.4.</strong> W przypadku publikowania ogłoszeń, wydarzeń,
              profili firm lub innych treści możemy przetwarzać informacje
              zawarte w tych treściach, w tym dane kontaktowe oraz inne
              informacje podane przez użytkownika w ramach danej publikacji.
            </p>

            <p>
              <strong>3.5.</strong> W ramach korzystania z Serwisu możemy
              również przetwarzać dane dotyczące aktywności użytkownika, takie
              jak informacje o korzystaniu z poszczególnych funkcjonalności,
              zapisanych ulubionych treściach oraz innych działaniach
              wykonywanych w Serwisie.
            </p>

            <p>
              <strong>3.6.</strong> Możemy przetwarzać również dane techniczne
              związane z korzystaniem z Serwisu, w zakresie niezbędnym do jego
              prawidłowego działania, zapewnienia bezpieczeństwa oraz obsługi
              użytkownika.
            </p>

            <p>
              <strong>3.7.</strong> Użytkownik powinien podawać wyłącznie dane
              prawdziwe, aktualne i dotyczące jego osoby lub posiadać
              odpowiednią podstawę do publikowania danych innych osób.
            </p>

            <p>
              <strong>3.8.</strong> Podanie części danych osobowych może być
              dobrowolne, jednak brak podania danych wymaganych do korzystania z
              określonej funkcjonalności może uniemożliwić jej wykorzystanie.
            </p>
          </section>
          <section id="purposes">
            <h2>4. Cele i podstawy prawne przetwarzania danych</h2>

            <p>
              <strong>4.1.</strong> Dane osobowe użytkowników są przetwarzane
              wyłącznie w celach związanych z funkcjonowaniem Serwisu,
              świadczeniem dostępnych usług, zapewnieniem bezpieczeństwa oraz
              realizacją prawnie uzasadnionych interesów Administratora, z
              uwzględnieniem obowiązujących przepisów dotyczących ochrony danych
              osobowych.
            </p>

            <p>
              <strong>4.2.</strong> Dane mogą być przetwarzane w szczególności w
              celu utworzenia i prowadzenia konta użytkownika, umożliwienia
              logowania, zarządzania profilem oraz zapewnienia dostępu do
              funkcjonalności dostępnych dla zalogowanych użytkowników.
            </p>

            <p>
              <strong>4.3.</strong> Dane mogą być przetwarzane w celu
              umożliwienia publikowania, edytowania i zarządzania ogłoszeniami,
              wydarzeniami, profilami firm oraz innymi treściami udostępnianymi
              przez użytkownika.
            </p>

            <p>
              <strong>4.4.</strong> Dane mogą być przetwarzane w celu realizacji
              usług odpłatnych, obsługi płatności, rozliczeń oraz wykonania
              obowiązków wynikających z przepisów prawa, w szczególności
              obowiązków podatkowych i rachunkowych.
            </p>

            <p>
              <strong>4.5.</strong> Dane mogą być przetwarzane w celu
              zapewnienia bezpieczeństwa Serwisu, zapobiegania nadużyciom,
              wykrywania prób nieuprawnionego dostępu oraz ochrony użytkowników
              i infrastruktury Serwisu.
            </p>

            <p>
              <strong>4.6.</strong> Dane mogą być przetwarzane w celu obsługi
              zapytań, zgłoszeń, reklamacji oraz innej komunikacji prowadzonej z
              użytkownikiem.
            </p>

            <p>
              <strong>4.7.</strong> W określonych przypadkach podstawą
              przetwarzania danych może być zgoda użytkownika. Użytkownik może w
              każdej chwili wycofać udzieloną zgodę, bez wpływu na zgodność z
              prawem przetwarzania dokonanego przed jej wycofaniem.
            </p>

            <p>
              <strong>4.8.</strong> Jeżeli przetwarzanie danych jest niezbędne
              do wykonania umowy z użytkownikiem lub podjęcia działań na jego
              żądanie przed jej zawarciem, dane mogą być przetwarzane w zakresie
              niezbędnym do realizacji tych celów.
            </p>

            <p>
              <strong>4.9.</strong> Dane mogą być również przetwarzane w celu
              realizacji obowiązków prawnych ciążących na Administratorze oraz
              dochodzenia lub obrony przed roszczeniami.
            </p>
          </section>
          <section id="account">
            <h2>5. Konto użytkownika</h2>

            <p>
              <strong>5.1.</strong> Utworzenie konta użytkownika wiąże się z
              przetwarzaniem danych niezbędnych do rejestracji, uwierzytelnienia
              oraz prawidłowego korzystania z funkcjonalności dostępnych dla
              zalogowanych użytkowników.
            </p>

            <p>
              <strong>5.2.</strong> Konto użytkownika może zawierać w
              szczególności adres e-mail, nazwę publiczną, imię, nazwisko, kraj,
              miasto, zdjęcie profilowe, opis użytkownika oraz inne informacje
              dobrowolnie dodane do profilu.
            </p>

            <p>
              <strong>5.3.</strong> Adres e-mail użytkownika może być
              wykorzystywany między innymi do obsługi konta, uwierzytelniania,
              odzyskiwania dostępu, potwierdzania adresu e-mail, przesyłania
              informacji związanych z bezpieczeństwem konta oraz obsługi
              zgłoszeń użytkownika.
            </p>

            <p>
              <strong>5.4.</strong> Użytkownik jest odpowiedzialny za zachowanie
              poufności danych umożliwiających dostęp do jego konta oraz
              powinien niezwłocznie poinformować Administratora o podejrzeniu
              nieuprawnionego dostępu do konta.
            </p>

            <p>
              <strong>5.5.</strong> Użytkownik może aktualizować dane znajdujące
              się na jego koncie za pośrednictwem funkcjonalności dostępnych w
              Serwisie, z zastrzeżeniem danych, których zmiana może wymagać
              dodatkowej weryfikacji.
            </p>

            <p>
              <strong>5.6.</strong> W ramach ustawień konta użytkownik może mieć
              możliwość określenia, które wybrane informacje z jego profilu mogą
              być prezentowane publicznie, zgodnie z funkcjonalnościami
              udostępnionymi przez Serwis.
            </p>

            <p>
              <strong>5.7.</strong> Dane związane z kontem są przechowywane
              przez okres niezbędny do jego prowadzenia oraz realizacji celów
              określonych w niniejszej Polityce Prywatności, a po jego
              zakończeniu przez okres wymagany przepisami prawa lub niezbędny do
              ochrony przed ewentualnymi roszczeniami.
            </p>

            <p>
              <strong>5.8.</strong> Usunięcie konta przez użytkownika nie musi
              oznaczać natychmiastowego usunięcia wszystkich danych związanych z
              kontem, jeżeli ich dalsze przechowywanie jest wymagane przez
              przepisy prawa lub jest niezbędne do ustalenia, dochodzenia albo
              obrony przed roszczeniami.
            </p>
          </section>
          <section id="publicProfiles">
            <h2>6. Profile publiczne</h2>

            <p>
              <strong>6.1.</strong> Użytkownik może zdecydować o udostępnieniu
              wybranych informacji ze swojego profilu w sposób publiczny,
              zgodnie z funkcjonalnościami i ustawieniami prywatności dostępnymi
              w Serwisie.
            </p>

            <p>
              <strong>6.2.</strong> Informacje oznaczone przez użytkownika jako
              publiczne mogą być dostępne dla innych użytkowników Serwisu oraz,
              w zależności od sposobu działania danej funkcjonalności, dla osób
              odwiedzających Serwis bez konieczności posiadania konta.
            </p>

            <p>
              <strong>6.3.</strong> W ramach ustawień profilu użytkownik może
              mieć możliwość określenia widoczności poszczególnych informacji,
              takich jak imię i nazwisko, miasto, opis „O mnie” lub adres
              e-mail, jeżeli funkcjonalność taka jest dostępna w Serwisie.
            </p>

            <p>
              <strong>6.4.</strong> Użytkownik powinien przed udostępnieniem
              informacji publicznie upewnić się, że ich publikacja nie narusza
              praw, prywatności lub dóbr osobistych jego lub innych osób.
            </p>

            <p>
              <strong>6.5.</strong> Informacje opublikowane przez użytkownika
              jako publiczne mogą zostać skopiowane lub zapamiętane przez osoby
              trzecie niezależnie od Serwisu. Administrator nie może
              zagwarantować, że informacje, które zostały publicznie
              udostępnione, zostaną całkowicie usunięte z Internetu po zmianie
              ustawień widoczności lub usunięciu profilu.
            </p>

            <p>
              <strong>6.6.</strong> Administrator może ograniczyć widoczność lub
              usunąć określone informacje z profilu, jeżeli jest to niezbędne w
              związku z naruszeniem Regulaminu, przepisów prawa, praw osób
              trzecich lub bezpieczeństwa Serwisu.
            </p>
          </section>
          <section id="userContent">
            <h2>7. Ogłoszenia i treści publikowane przez użytkowników</h2>

            <p>
              <strong>7.1.</strong> Użytkownik może publikować w Serwisie
              ogłoszenia, zdjęcia, opisy, dane kontaktowe oraz inne treści w
              ramach funkcjonalności udostępnionych przez PoloniaPortal.
            </p>

            <p>
              <strong>7.2.</strong> Treści publikowane przez użytkownika mogą
              zawierać dane osobowe użytkownika lub innych osób. Użytkownik
              powinien przed ich opublikowaniem upewnić się, że posiada
              odpowiednią podstawę do udostępnienia takich danych.
            </p>

            <p>
              <strong>7.3.</strong> Informacje zawarte w ogłoszeniach mogą być
              prezentowane publicznie, w zakresie wynikającym z ustawień oraz
              funkcjonalności Serwisu. Oznacza to, że mogą być dostępne również
              dla osób, które nie posiadają konta użytkownika.
            </p>

            <p>
              <strong>7.4.</strong> Użytkownik ponosi odpowiedzialność za dane
              osobowe oraz inne informacje dotyczące osób trzecich, które
              dobrowolnie zamieszcza w publikowanych przez siebie treściach.
            </p>

            <p>
              <strong>7.5.</strong> Użytkownik nie powinien publikować danych
              szczególnie wrażliwych, danych dokumentów tożsamości, danych
              umożliwiających dostęp do rachunków lub kont, haseł ani innych
              informacji, których publiczne udostępnienie mogłoby naruszać
              prywatność lub bezpieczeństwo jego lub innych osób.
            </p>

            <p>
              <strong>7.6.</strong> Administrator może przetwarzać treści oraz
              dane związane z ich publikacją w celu zapewnienia prawidłowego
              działania Serwisu, obsługi ogłoszeń, zapewnienia bezpieczeństwa,
              przeciwdziałania nadużyciom oraz realizacji obowiązków
              wynikających z przepisów prawa.
            </p>

            <p>
              <strong>7.7.</strong> W przypadku zgłoszenia naruszenia praw osoby
              trzeciej, przepisów prawa lub zasad obowiązujących w Serwisie
              Administrator może podjąć odpowiednie działania wobec danej
              treści, zgodnie z Regulaminem oraz obowiązującymi przepisami
              prawa.
            </p>

            <p>
              <strong>7.8.</strong> Publiczne udostępnienie treści przez
              użytkownika oznacza, że informacje zawarte w takiej treści mogą
              być dostępne dla innych osób przez okres jej publikacji oraz przez
              okres niezbędny do realizacji celów związanych z funkcjonowaniem
              Serwisu, bezpieczeństwem oraz ochroną przed roszczeniami.
            </p>
          </section>
          <section id="businessProfiles">
            <h2>8. Profile firm i dane przedsiębiorców</h2>

            <p>
              <strong>8.1.</strong> Użytkownicy mogą tworzyć i publikować w
              Serwisie profile firm oraz przedstawiać informacje dotyczące
              prowadzonej działalności gospodarczej, zgodnie z
              funkcjonalnościami udostępnionymi przez PoloniaPortal.
            </p>

            <p>
              <strong>8.2.</strong> W ramach profilu firmy mogą być przetwarzane
              informacje dotyczące przedsiębiorstwa, w szczególności nazwa
              firmy, dane kontaktowe, adres, lokalizacja, opis działalności,
              adres strony internetowej, informacje o oferowanych usługach lub
              produktach oraz inne dane podane przez użytkownika.
            </p>

            <p>
              <strong>8.3.</strong> Jeżeli użytkownik publikuje w profilu firmy
              dane osobowe dotyczące właściciela, pracowników, przedstawicieli
              lub innych osób, powinien posiadać odpowiednią podstawę do ich
              udostępnienia i publikacji.
            </p>

            <p>
              <strong>8.4.</strong> Dane zawarte w publicznym profilu firmy mogą
              być dostępne dla innych użytkowników Serwisu oraz osób
              odwiedzających Serwis, również bez konieczności posiadania konta,
              w zakresie wynikającym z funkcjonalności Serwisu.
            </p>

            <p>
              <strong>8.5.</strong> Dane przedsiębiorców i osób reprezentujących
              firmy mogą być przetwarzane w celu umożliwienia prezentowania
              działalności, kontaktu z firmą, wyszukiwania firm oraz korzystania
              z innych funkcjonalności związanych z profilem firmy.
            </p>

            <p>
              <strong>8.6.</strong> Administrator może przetwarzać informacje
              dotyczące profili firm również w celu zapewnienia bezpieczeństwa
              Serwisu, weryfikacji zgłoszeń, przeciwdziałania nadużyciom oraz
              realizacji obowiązków wynikających z przepisów prawa.
            </p>

            <p>
              <strong>8.7.</strong> Użytkownik odpowiedzialny za profil firmy
              może aktualizować lub usuwać informacje dotyczące profilu w
              zakresie funkcjonalności udostępnionych przez Serwis.
            </p>

            <p>
              <strong>8.8.</strong> Administrator może ograniczyć widoczność,
              zawiesić lub usunąć profil firmy w przypadkach określonych w
              Regulaminie, w szczególności w przypadku naruszenia prawa, praw
              osób trzecich, zasad obowiązujących w Serwisie lub bezpieczeństwa
              użytkowników.
            </p>
          </section>
          <section id="events">
            <h2>9. Wydarzenia</h2>

            <p>
              <strong>9.1.</strong> Użytkownicy mogą dodawać i publikować w
              Serwisie informacje dotyczące wydarzeń, w szczególności wydarzeń
              kulturalnych, społecznych, sportowych, biznesowych oraz innych
              wydarzeń związanych ze społecznością Polonii.
            </p>

            <p>
              <strong>9.2.</strong> W ramach wydarzenia mogą być przetwarzane
              informacje podane przez użytkownika, w szczególności nazwa
              wydarzenia, opis, data i godzina rozpoczęcia oraz zakończenia,
              miejsce, informacje dotyczące organizatora, dane kontaktowe, adres
              strony internetowej oraz inne informacje związane z wydarzeniem.
            </p>

            <p>
              <strong>9.3.</strong> Informacje dotyczące wydarzeń mogą być
              prezentowane publicznie i dostępne dla użytkowników Serwisu oraz
              osób odwiedzających Serwis bez konieczności posiadania konta, w
              zakresie wynikającym z funkcjonalności Serwisu.
            </p>

            <p>
              <strong>9.4.</strong> Użytkownik publikujący wydarzenie powinien
              upewnić się, że posiada odpowiednie prawa oraz podstawę do
              publikowania wszystkich informacji i materiałów zawartych w
              wydarzeniu, w tym danych dotyczących innych osób.
            </p>

            <p>
              <strong>9.5.</strong> Dane związane z wydarzeniami mogą być
              przetwarzane w celu umożliwienia ich publikacji, wyszukiwania,
              prezentowania, aktualizowania oraz zarządzania nimi przez
              uprawnionych użytkowników.
            </p>

            <p>
              <strong>9.6.</strong> Administrator może przetwarzać informacje
              dotyczące wydarzeń również w celu zapewnienia bezpieczeństwa
              Serwisu, przeciwdziałania nadużyciom, obsługi zgłoszeń oraz
              realizacji obowiązków wynikających z przepisów prawa.
            </p>

            <p>
              <strong>9.7.</strong> Administrator może ograniczyć widoczność,
              ukryć lub usunąć wydarzenie w przypadku naruszenia Regulaminu,
              przepisów prawa, praw osób trzecich lub zasad bezpieczeństwa
              obowiązujących w Serwisie.
            </p>

            <p>
              <strong>9.8.</strong> Informacje dotyczące wydarzenia mogą
              pozostawać dostępne przez okres jego publikacji oraz przez okres
              niezbędny do realizacji celów związanych z funkcjonowaniem
              Serwisu, bezpieczeństwem oraz ochroną przed ewentualnymi
              roszczeniami.
            </p>
          </section>
          <section id="communication">
            <h2>10. Kontakt i komunikacja z użytkownikiem</h2>

            <p>
              <strong>10.1.</strong> Użytkownik może kontaktować się z
              Administratorem za pośrednictwem formularzy kontaktowych, zgłoszeń
              dostępnych w Serwisie oraz innych kanałów komunikacji
              udostępnionych przez PoloniaPortal.
            </p>

            <p>
              <strong>10.2.</strong> W związku z prowadzoną komunikacją
              Administrator może przetwarzać dane podane przez użytkownika, w
              szczególności imię, adres e-mail, dane konta oraz informacje
              zawarte w treści wiadomości lub zgłoszenia.
            </p>

            <p>
              <strong>10.3.</strong> Dane przekazane w ramach kontaktu są
              przetwarzane w celu udzielenia odpowiedzi, obsługi zgłoszenia,
              rozwiązania problemu, rozpatrzenia reklamacji lub realizacji innej
              sprawy, której dotyczy kontakt.
            </p>

            <p>
              <strong>10.4.</strong> Jeżeli wiadomość użytkownika dotyczy
              konkretnego konta, ogłoszenia, wydarzenia, profilu firmy lub innej
              funkcjonalności Serwisu, Administrator może wykorzystać informacje
              związane z daną funkcjonalnością w zakresie niezbędnym do
              prawidłowej obsługi sprawy.
            </p>

            <p>
              <strong>10.5.</strong> Administrator może przechowywać
              korespondencję oraz informacje dotyczące zgłoszeń przez okres
              niezbędny do obsługi sprawy, a następnie przez okres wymagany
              przepisami prawa lub niezbędny do ochrony przed ewentualnymi
              roszczeniami.
            </p>

            <p>
              <strong>10.6.</strong> Administrator może kontaktować się z
              użytkownikiem w sprawach związanych z funkcjonowaniem konta,
              bezpieczeństwem, korzystaniem z Serwisu, zmianami istotnymi dla
              świadczonych usług oraz innymi informacjami niezbędnymi do
              prawidłowej realizacji usług.
            </p>

            <p>
              <strong>10.7.</strong> Komunikacja marketingowa będzie prowadzona
              na zasadach określonych w obowiązujących przepisach prawa oraz,
              jeżeli jest to wymagane, na podstawie uprzedniej zgody
              użytkownika.
            </p>
          </section>
          <section id="storage">
            <h2>11. Przechowywanie i okres przetwarzania danych</h2>

            <p>
              <strong>11.1.</strong> Dane osobowe użytkowników są przechowywane
              przez okres niezbędny do realizacji celów, dla których zostały
              zebrane, chyba że obowiązujące przepisy prawa wymagają ich
              przechowywania przez dłuższy okres.
            </p>

            <p>
              <strong>11.2.</strong> Okres przechowywania danych może zależeć od
              rodzaju danych, celu ich przetwarzania oraz sposobu korzystania
              przez użytkownika z funkcjonalności Serwisu.
            </p>

            <p>
              <strong>11.3.</strong> Dane związane z kontem użytkownika mogą być
              przechowywane przez okres jego aktywności oraz przez okres
              niezbędny do obsługi ewentualnych roszczeń, zapewnienia
              bezpieczeństwa Serwisu lub wykonania obowiązków wynikających z
              przepisów prawa.
            </p>

            <p>
              <strong>11.4.</strong> Dane związane z ogłoszeniami, wydarzeniami,
              profilami firm oraz innymi treściami publikowanymi przez
              użytkowników mogą być przechowywane przez okres ich publikacji, a
              następnie przez okres niezbędny do realizacji prawnie
              uzasadnionych celów Administratora, w szczególności zapewnienia
              bezpieczeństwa oraz ochrony przed roszczeniami.
            </p>

            <p>
              <strong>11.5.</strong> Niektóre dane mogą być przechowywane przez
              okres wymagany przepisami prawa, w szczególności w związku z
              obowiązkami podatkowymi, rachunkowymi lub koniecznością wykazania
              prawidłowości realizacji obowiązków prawnych.
            </p>

            <p>
              <strong>11.6.</strong> Po upływie okresu przechowywania dane są
              usuwane, anonimizowane lub poddawane innemu sposobowi
              przetwarzania zgodnemu z obowiązującymi przepisami prawa, chyba że
              ich dalsze przechowywanie jest prawnie uzasadnione.
            </p>

            <p>
              <strong>11.7.</strong> Usunięcie konta lub określonych treści
              przez użytkownika nie zawsze powoduje natychmiastowe usunięcie
              wszystkich powiązanych danych z systemów Administratora, jeżeli
              ich zachowanie jest konieczne ze względów prawnych, bezpieczeństwa
              lub w celu ustalenia, dochodzenia albo obrony przed roszczeniami.
            </p>
          </section>
          <section id="recipients">
            <h2>12. Odbiorcy danych i udostępnianie danych</h2>

            <p>
              <strong>12.1.</strong> Dane osobowe użytkowników mogą być
              udostępniane wyłącznie w zakresie niezbędnym do realizacji celów
              określonych w niniejszej Polityce Prywatności, prawidłowego
              funkcjonowania Serwisu oraz wykonywania obowiązków wynikających z
              przepisów prawa.
            </p>

            <p>
              <strong>12.2.</strong> Odbiorcami danych mogą być podmioty
              świadczące na rzecz Administratora usługi niezbędne do prowadzenia
              i utrzymania Serwisu, w szczególności dostawcy usług hostingowych,
              infrastruktury informatycznej, baz danych, poczty elektronicznej,
              systemów uwierzytelniania, obsługi płatności oraz innych rozwiązań
              technicznych wykorzystywanych przez PoloniaPortal.
            </p>

            <p>
              <strong>12.3.</strong> Dane mogą być również udostępniane
              podmiotom świadczącym usługi związane z obsługą klienta,
              bezpieczeństwem, wykrywaniem nadużyć, utrzymaniem i rozwojem
              oprogramowania oraz wsparciem technicznym, w zakresie niezbędnym
              do wykonania powierzonych im zadań.
            </p>

            <p>
              <strong>12.4.</strong> Jeżeli korzystanie z określonej
              funkcjonalności wiąże się z realizacją płatności, dane niezbędne
              do przeprowadzenia transakcji mogą być przekazywane dostawcom
              usług płatniczych zgodnie z zasadami ich działania oraz
              obowiązującymi przepisami prawa.
            </p>

            <p>
              <strong>12.5.</strong> Dane mogą zostać udostępnione uprawnionym
              organom publicznym, sądom, organom ścigania lub innym podmiotom
              uprawnionym na podstawie przepisów prawa, jeżeli obowiązek takiego
              udostępnienia wynika z przepisów prawa lub jest niezbędny do
              ochrony praw Administratora, użytkowników lub osób trzecich.
            </p>

            <p>
              <strong>12.6.</strong> Informacje, które użytkownik samodzielnie
              oznaczył jako publiczne, w tym dane prezentowane w publicznym
              profilu, ogłoszeniach, wydarzeniach lub profilach firm, mogą być
              dostępne dla innych użytkowników oraz osób odwiedzających Serwis
              zgodnie z zasadami działania poszczególnych funkcjonalności.
            </p>

            <p>
              <strong>12.7.</strong> Administrator nie sprzedaje danych
              osobowych użytkowników podmiotom trzecim w celu umożliwienia im
              niezależnego wykorzystywania tych danych, z zastrzeżeniem
              sytuacji, w których udostępnienie danych jest niezbędne do
              realizacji konkretnej usługi, obowiązku prawnego lub prawnie
              uzasadnionego celu Administratora.
            </p>

            <p>
              <strong>12.8.</strong> Administrator podejmuje odpowiednie
              działania, aby podmioty przetwarzające dane na jego rzecz
              zapewniały odpowiedni poziom ochrony danych osobowych oraz
              przetwarzały je zgodnie z obowiązującymi przepisami prawa i
              zawartymi umowami.
            </p>
          </section>
          <section id="internationalTransfers">
            <h2>13. Przekazywanie danych poza EOG</h2>

            <p>
              <strong>13.1.</strong> W związku z korzystaniem przez
              Administratora z usług dostawców technologicznych oraz innych
              podmiotów wspierających funkcjonowanie Serwisu, dane osobowe
              użytkowników mogą być w określonych przypadkach przekazywane lub
              dostępne poza Europejskim Obszarem Gospodarczym (EOG).
            </p>

            <p>
              <strong>13.2.</strong> Jeżeli przekazanie danych osobowych poza
              EOG jest związane z korzystaniem z usług konkretnego dostawcy,
              Administrator podejmuje działania mające na celu zapewnienie, aby
              takie przekazanie odbywało się zgodnie z obowiązującymi przepisami
              dotyczącymi ochrony danych osobowych.
            </p>

            <p>
              <strong>13.3.</strong> W zależności od okoliczności przekazanie
              danych poza EOG może odbywać się na podstawie decyzji Komisji
              Europejskiej stwierdzającej odpowiedni stopień ochrony,
              odpowiednich zabezpieczeń przewidzianych przez obowiązujące
              przepisy lub innej podstawy prawnej dopuszczalnej na podstawie
              przepisów dotyczących ochrony danych osobowych.
            </p>

            <p>
              <strong>13.4.</strong> Administrator dokłada starań, aby
              przekazywanie danych poza EOG odbywało się wyłącznie w zakresie
              niezbędnym do realizacji określonych celów oraz przy zastosowaniu
              odpowiednich środków ochrony danych.
            </p>

            <p>
              <strong>13.5.</strong> Użytkownik może uzyskać dodatkowe
              informacje dotyczące stosowanych zabezpieczeń oraz podstawy
              konkretnego przekazywania danych, kontaktując się z
              Administratorem za pośrednictwem danych kontaktowych wskazanych w
              niniejszej Polityce Prywatności.
            </p>
          </section>
          <section id="rights">
            <h2>14. Prawa użytkownika</h2>

            <p>
              <strong>14.1.</strong> Użytkownikowi przysługują prawa wynikające
              z obowiązujących przepisów dotyczących ochrony danych osobowych, w
              zakresie i na zasadach określonych przez te przepisy.
            </p>

            <p>
              <strong>14.2.</strong> Użytkownik może w szczególności żądać
              dostępu do swoich danych osobowych oraz uzyskać informacje
              dotyczące sposobu ich przetwarzania.
            </p>

            <p>
              <strong>14.3.</strong> Użytkownik ma prawo żądać sprostowania
              danych osobowych, jeżeli są one nieprawidłowe, niekompletne lub
              nieaktualne.
            </p>

            <p>
              <strong>14.4.</strong> W przypadkach określonych przepisami prawa
              użytkownik może żądać usunięcia swoich danych osobowych, w
              szczególności jeżeli dane nie są już niezbędne do celów, dla
              których zostały zebrane, lub gdy istnieje inna prawnie uzasadniona
              podstawa do ich usunięcia.
            </p>

            <p>
              <strong>14.5.</strong> Użytkownik może, w przypadkach
              przewidzianych przepisami prawa, żądać ograniczenia przetwarzania
              swoich danych osobowych.
            </p>

            <p>
              <strong>14.6.</strong> Jeżeli przetwarzanie danych odbywa się na
              podstawie zgody użytkownika, użytkownik może wycofać udzieloną
              zgodę w dowolnym momencie. Wycofanie zgody nie wpływa na zgodność
              z prawem przetwarzania dokonanego przed jej wycofaniem.
            </p>

            <p>
              <strong>14.7.</strong> W przypadkach określonych przepisami prawa
              użytkownik może wnieść sprzeciw wobec przetwarzania jego danych
              osobowych, w szczególności gdy dane są przetwarzane na podstawie
              prawnie uzasadnionego interesu Administratora.
            </p>

            <p>
              <strong>14.8.</strong> Jeżeli ma to zastosowanie, użytkownik może
              skorzystać z prawa do przenoszenia danych osobowych, w zakresie
              określonym obowiązującymi przepisami.
            </p>

            <p>
              <strong>14.9.</strong> W celu skorzystania z przysługujących praw
              użytkownik może skontaktować się z Administratorem za
              pośrednictwem danych kontaktowych wskazanych w niniejszej Polityce
              Prywatności.
            </p>

            <p>
              <strong>14.10.</strong> Administrator może podjąć działania mające
              na celu potwierdzenie tożsamości osoby składającej żądanie, jeżeli
              jest to niezbędne do ochrony danych osobowych użytkownika lub
              innych osób.
            </p>

            <p>
              <strong>14.11.</strong> Użytkownik ma również prawo wniesienia
              skargi do właściwego organu nadzorczego zajmującego się ochroną
              danych osobowych, jeżeli uzna, że przetwarzanie jego danych
              osobowych narusza obowiązujące przepisy prawa.
            </p>
          </section>
          <section id="security">
            <h2>15. Bezpieczeństwo danych</h2>

            <p>
              <strong>15.1.</strong> Administrator podejmuje odpowiednie środki
              techniczne i organizacyjne mające na celu ochronę danych osobowych
              przed ich przypadkowym lub bezprawnym zniszczeniem, utratą,
              zmianą, nieuprawnionym ujawnieniem lub nieuprawnionym dostępem.
            </p>

            <p>
              <strong>15.2.</strong> Środki bezpieczeństwa są dobierane z
              uwzględnieniem charakteru przetwarzanych danych, zakresu i celów
              przetwarzania, aktualnego stanu wiedzy technicznej oraz ryzyka
              związanego z przetwarzaniem danych osobowych.
            </p>

            <p>
              <strong>15.3.</strong> Administrator stosuje rozwiązania mające na
              celu zabezpieczenie infrastruktury informatycznej, systemów oraz
              danych użytkowników przed nieuprawnionym dostępem i
              wykorzystaniem.
            </p>

            <p>
              <strong>15.4.</strong> Dostęp do danych osobowych jest ograniczany
              do osób oraz podmiotów, które potrzebują takiego dostępu w związku
              z wykonywaniem powierzonych im zadań, zgodnie z obowiązującymi
              zasadami ochrony danych.
            </p>

            <p>
              <strong>15.5.</strong> Użytkownik jest zobowiązany do podejmowania
              odpowiednich działań w celu zabezpieczenia swojego konta, w
              szczególności do ochrony danych umożliwiających logowanie oraz
              nieudostępniania ich osobom trzecim.
            </p>

            <p>
              <strong>15.6.</strong> W przypadku podejrzenia nieuprawnionego
              dostępu do konta, utraty danych logowania lub innego zdarzenia
              mogącego mieć wpływ na bezpieczeństwo danych użytkownik powinien
              niezwłocznie skontaktować się z Administratorem.
            </p>

            <p>
              <strong>15.7.</strong> Pomimo stosowania odpowiednich środków
              bezpieczeństwa Administrator nie może zagwarantować całkowitego
              wyeliminowania ryzyka związanego z korzystaniem z Internetu i
              systemów informatycznych.
            </p>

            <p>
              <strong>15.8.</strong> W przypadku wystąpienia naruszenia ochrony
              danych osobowych Administrator podejmuje działania wymagane przez
              obowiązujące przepisy prawa, w tym, jeżeli jest to wymagane,
              działania mające na celu ograniczenie skutków naruszenia oraz
              poinformowanie właściwych podmiotów lub osób.
            </p>
          </section>
          <section id="changesAndContact">
            <h2>16. Zmiany Polityki Prywatności i kontakt</h2>

            <p>
              <strong>16.1.</strong> Administrator może okresowo aktualizować
              niniejszą Politykę Prywatności, w szczególności w przypadku zmian
              w sposobie funkcjonowania Serwisu, wprowadzenia nowych
              funkcjonalności, zmiany wykorzystywanych rozwiązań
              technologicznych lub zmian obowiązujących przepisów prawa.
            </p>

            <p>
              <strong>16.2.</strong> Zmiany Polityki Prywatności mogą być
              również wprowadzane w celu doprecyzowania informacji dotyczących
              sposobu przetwarzania danych osobowych lub dostosowania dokumentu
              do aktualnych praktyk Administratora.
            </p>

            <p>
              <strong>16.3.</strong> Aktualna wersja Polityki Prywatności jest
              publikowana w Serwisie. W przypadku istotnych zmian Administrator
              może poinformować użytkowników o ich wprowadzeniu za pośrednictwem
              dostępnych kanałów komunikacji, jeżeli jest to wymagane lub
              uzasadnione charakterem zmian.
            </p>

            <p>
              <strong>16.4.</strong> Dalsze korzystanie z Serwisu po
              opublikowaniu zmian nie narusza praw użytkownika wynikających z
              obowiązujących przepisów prawa. Jeżeli przepisy prawa wymagają
              uzyskania zgody użytkownika na określone przetwarzanie danych,
              Administrator podejmie odpowiednie działania w tym zakresie.
            </p>

            <p>
              <strong>16.5.</strong> Wszelkie pytania dotyczące niniejszej
              Polityki Prywatności, sposobu przetwarzania danych osobowych lub
              realizacji praw użytkownika można kierować do Administratora za
              pośrednictwem formularza kontaktowego dostępnego w Serwisie lub
              innych wskazanych przez Administratora danych kontaktowych.
            </p>

            <p>
              <strong>16.6.</strong> W przypadku kontaktu dotyczącego danych
              osobowych Administrator może poprosić o informacje niezbędne do
              potwierdzenia tożsamości użytkownika oraz prawidłowego
              rozpatrzenia zgłoszenia.
            </p>
          </section>
        </div>
      </div>
    </SectionLayout>
  );
};
