// Facts of the clinic for the demo homepage. Source of every value: veon/client.json (ids in comments);
// direction names: H1 of the client's own pages (seo/data/crawl.json). Nothing here is invented.

export const FUTURE_NOTE = "Розділ у розробці";

export const phones = {
  urgent: { label: "Невідкладна 24/7", short: "Невідкладна", display: "044 455 75 55", href: "tel:0444557555" }, // W-F005, contacts.phones[1]
  booking: { label: "Записатися", short: "Записатися", display: "0 800 607 555", href: "tel:0800607555" }, // W-F005, contacts.phones[0]
} as const;

export const email = { display: "top@denis.ua", href: "mailto:top@denis.ua" }; // W-F007

export const address = {
  street: "вул. Композитора Мейтуса, 5",
  city: "Київ, Голосіївський район",
  near: "біля м. «Іподром», ЖК «Ліко-Град»",
  // External map of the address (allowed channel): Google Maps search by the address text.
  map: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Київ, вул. Композитора Мейтуса, 5"),
}; // W-F004

export const branch = { street: "Новосілки, вул. Миру, 1, прим. 152", note: "Київська обл., Фастівський р-н, ЖМ «Софія»" }; // W-F017

export const hours = {
  emergency: "Приймальне відділення: цілодобово, з черговим лікарем", // W-F006
  planned: "Планові консультації: пн–сб 8:00–20:00, нд 9:00–18:00", // W-F006
};

export const legal = "ТОВ «КЛІНІКА «ДЕНИС», ЄДРПОУ 43767328"; // W-F003

export const socials = [
  { name: "Instagram", href: "https://www.instagram.com/topclinicdenis/" },
  { name: "Facebook", href: "https://www.facebook.com/TOPCLINICDENIS/" },
  { name: "YouTube", href: "https://www.youtube.com/@TOPCLINICDENIS" },
  { name: "TikTok", href: "https://www.tiktok.com/@top.clinic.denis" },
]; // socials[] with status confirmed only

/** The six signs of the board «Куди вам?» and the sections they lead to. */
export const routes = [
  { title: "Невідкладно", note: "Цілодобово, дорослим і дітям", href: "#nevidkladna", urgent: true }, // W-F006, W-F008
  { title: "До лікаря", note: "Дорослі й дитячі напрямки", href: "#napriamky" },
  { title: "Діагностика", note: "КТ, МРТ, УЗД, аналізи", href: "#diagnostyka" }, // W-F011
  { title: "Дитині", note: "Окремий вхід і ліфт", href: "#dityam" }, // W-F012
  { title: "Сімейний лікар", note: "Безкоштовно за декларацією", href: "#simeina" }, // W-F016
  { title: "Стаціонар і чекап", note: "52 ліжка, програми обстеження", href: "#budivlia" }, // W-F009, W-F015
] as const;

export const nav = [
  { label: "Напрямки", href: "#napriamky" },
  { label: "Діагностика", href: "#diagnostyka" },
  { label: "Дітям", href: "#dityam" },
  { label: "Сімейний лікар", href: "#simeina" },
  { label: "Лікарі і ціни", href: "#likari" },
  { label: "Контакти", href: "#kontakty" },
] as const;

/** Directions index (#napriamky). Names as on the clinic's own pages. Dentistry is left out until the client decides (UX-R009). */
export const directionGroups = [
  {
    id: "doroslym",
    title: "Дорослим",
    items: [
      "Терапія", "Кардіологія", "Гінекологія", "Неврологія", "Гастроентерологія", "Ендокринологія",
      "Урологія", "Дерматологія", "Офтальмологія", "Отоларингологія", "Ортопедія і травматологія",
      "Вертебрологія", "Ревматологія", "Пульмонологія", "Алергологія", "Мамологія", "Проктологія",
      "Флебологія", "Нефрологія", "Онкологія", "Гематологія", "Інфектологія", "Дієтологія",
      "Психологія", "Фізіотерапія", "Реабілітація", "Вакцинація",
    ],
  },
  {
    id: "ditiam",
    title: "Дітям",
    items: [
      "Педіатрія", "Неонатологія", "Дитяча кардіологія", "Дитяча неврологія", "Дитяча гастроентерологія",
      "Дитяча ендокринологія", "Дитяча отоларингологія", "Дитяча ЛОР-хірургія", "Дитяча офтальмологія",
      "Дитяча ортопедія і травматологія", "Дитяча хірургія", "Дитяча алергологія", "Дитяча імунологія",
      "Дитяча дерматологія", "Дитяча урологія", "Дитяча гінекологія", "Дитяча нефрологія",
      "Дитяча інфектологія", "Дитяча психологія", "Дитяча логопедія", "Дитяча фізіотерапія",
      "Дитяча дієтологія", "Вакцинація дітей",
    ],
  },
  {
    id: "diagnostyka-list",
    title: "Діагностика",
    items: [
      "КТ (комп'ютерна томографія)", "МРТ (магнітно-резонансна томографія)", "Рентгенографія", "УЗД",
      "УЗД при вагітності", "Ендоскопія", "Мамографія", "Функціональна діагностика", "Аналізи",
    ],
  },
  {
    id: "stacionar",
    title: "Стаціонар та операції",
    items: [
      "Приймальне відділення", "Стаціонар", "Дитячий стаціонар", "Хірургія", "Ендопротезування суглобів",
      "Пластична хірургія та косметологія", "Хіміотерапія",
    ],
  },
  {
    id: "prohramy",
    title: "Програми",
    items: [
      "Індивідуальний чекап", "Ведення вагітності", "Програма «МАЛЮК»", "Онлайн-консультації",
      "Виклик лікаря додому", "Виклик дитячого лікаря додому", "Медичний догляд «Батьки поруч»",
    ],
  },
] as const;
