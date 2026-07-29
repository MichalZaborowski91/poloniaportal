export const LISTING_MENU = [
  {
    label: "Praca",
    category: "job",
    sub: [
      { label: "Dam pracę", type: "job_offer" },
      { label: "Szukam pracy", type: "job_wanted" },
    ],
  },
  {
    label: "Mieszkanie",
    category: "housing",
    sub: [
      { label: "Wynajmę", type: "housing_offer" },
      { label: "Szukam lokalu", type: "housing_wanted" },
    ],
  },
  {
    label: "Marketplace",
    category: "market",
    sub: [
      { label: "Sprzedam", type: "market_offer" },
      { label: "Kupię", type: "market_wanted" },
    ],
  },
  {
    label: "Usługi",
    category: "service",
    sub: [],
  },
];
