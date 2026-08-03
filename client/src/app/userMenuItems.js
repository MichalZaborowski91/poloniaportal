import {
  MdPerson,
  MdBusiness,
  MdEvent,
  MdFavorite,
  MdArticle,
} from "react-icons/md";

export const USER_MENU_ITEMS = [
  {
    key: "profile",
    label: "Moje konto",
    icon: MdPerson,
    path: (country) => `/${country}/account`,
    end: true,
  },
  {
    key: "listings",
    label: "Moje ogłoszenia",
    icon: MdArticle,
    path: (country) => `/${country}/my-listings`,
  },
  {
    key: "companies",
    label: "Moje firmy",
    icon: MdBusiness,
    path: (country) => `/${country}/account/companies`,
    end: true,
  },
  {
    key: "events",
    label: "Moje wydarzenia",
    icon: MdEvent,
    path: (country) => `/${country}/my-events`,
  },
  {
    key: "favorites",
    label: "Ulubione",
    icon: MdFavorite,
    path: (country) => `/${country}/favorites`,
  },
];
