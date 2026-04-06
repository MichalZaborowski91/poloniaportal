import { useEffect, useState } from "react";
import { Hero } from "../../components/Hero/Hero";
import { HomeShortcuts } from "../../components/HomeShortcuts/HomeShortcuts";
import { TopAdBanner } from "../../components/TopAdBanner/TopAdBanner";
import { FeaturedCompanies } from "../../components/FeaturedCompanies/FeaturedCompanies";
import { getPublicCompanies } from "../../api/company";
import { useCountry } from "../../app/useCountry";
import { ValueSection } from "../../components/ValueSection/ValueSection";
import { AdBanner } from "../../components/AddBanner/AddBanner";

export const HomePage = () => {
  const [companies, setCompanies] = useState([]);
  const country = useCountry();

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getPublicCompanies({ country });
        setCompanies(data);
      } catch (err) {
        console.error(err);
      }
    };

    load();
  }, [country]);

  return (
    <>
      <Hero />
      <HomeShortcuts />

      <TopAdBanner
        image={`/ads/${country}.jpg`} // 🔥 per kraj
        link="https://firma-klienta.ie"
      />

      <FeaturedCompanies companies={companies} />
      <ValueSection />
      <AdBanner />
    </>
  );
};
