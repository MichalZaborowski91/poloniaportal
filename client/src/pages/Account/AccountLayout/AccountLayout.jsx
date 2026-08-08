import { Outlet } from "react-router-dom";
import { useCountry } from "../../../app/useCountry";
import { routes } from "../../../app/routes";
import { MdPerson, MdShield, MdSettings } from "react-icons/md";
import { SectionLayout } from "@/components/Layout/SectionLayout/SectionLayout";

export const AccountLayout = () => {
  const country = useCountry();

  const items = [
    {
      label: "Profil",
      icon: <MdPerson size={20} />,
      to: routes.account(country),
      end: true,
    },
    {
      label: "Bezpieczeństwo",
      icon: <MdShield size={20} />,
      to: routes.security(country),
    },
    {
      label: "Ustawienia",
      icon: <MdSettings size={20} />,
      to: routes.accountSettings(country),
    },
  ];

  return (
    <SectionLayout title="Moje konto" items={items}>
      <Outlet />
    </SectionLayout>
  );
};
