import { useEffect, useState } from "react";
import { Hero } from "../../components/Hero/Hero";
import { HomeShortcuts } from "../../components/HomeShortcuts/HomeShortcuts";
import { TopAdBanner } from "../../components/TopAdBanner/TopAdBanner";
import { FeaturedCompanies } from "../../components/FeaturedCompanies/FeaturedCompanies";
import { getHomePageCompanies } from "../../api/company";
import { useCountry } from "../../app/useCountry";
import { ValueSection } from "../../components/ValueSection/ValueSection";
import { AdBanner } from "../../components/AddBanner/AddBanner";
import { LatestListings } from "../../components/LatestListings/LatestListings";

export const HomePage = () => {
  const [homepageCompanies, setHomepageCompanies] = useState([]);

  const country = useCountry();

  useEffect(() => {
    const load = async () => {
      const data = await getHomePageCompanies(country);
      setHomepageCompanies(data);
    };

    load();
  }, [country]);

  return (
    <>
      <Hero />
      <HomeShortcuts />

      <TopAdBanner
        image={`/ads/${country}.jpg`} //per country
        link="https://firma-klienta.ie"
      />

      <FeaturedCompanies companies={homepageCompanies} />
      <ValueSection />
      <AdBanner />
      <LatestListings />
    </>
  );
};
