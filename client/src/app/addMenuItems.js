import { MdArticle, MdBusiness, MdEvent } from "react-icons/md";
import { routes } from "./routes";

export const ADD_MENU_ITEMS = [
  {
    key: "offer",
    label: "Ogłoszenie",
    icon: MdArticle,
    path: routes.addOffer,
  },
  {
    key: "company",
    label: "Firma",
    icon: MdBusiness,
    path: routes.addCompany,
    end: true,
  },
  {
    key: "event",
    label: "Wydarzenie",
    icon: MdEvent,
    path: routes.addEvent,
  },
];
