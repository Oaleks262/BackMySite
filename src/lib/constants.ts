export const siteConfig = {
  name: "Growth-Tech",
  description: "Створюємо швидкі, сучасні та конверсійні веб-рішення для малого та середнього бізнесу в Україні",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://growth-tech.com.ua",
  ogImage: "/og-image.jpg",
  links: {
    telegram: "https://t.me/growthtech",
    instagram: "https://instagram.com/growthtech.ua",
    facebook: "https://facebook.com/growthtech.ua",
  },
  contact: {
    email: "growthtech.contact@gmail.com",
    phone: "+38 (067) 525-23-00",
    address: "Львів, Україна",
  },
};

export const navigation = [
  { name: "Послуги", href: "#services" },
  { name: "Процес", href: "#process" },
  { name: "Портфоліо", href: "#portfolio" },
  { name: "Калькулятор", href: "#calculator" },
  { name: "FAQ", href: "#faq" },
  { name: "Контакти", href: "#contact" },
];

export const stats = [
  { value: 6, suffix: "+", label: "років на ринку" },
  { value: 120, suffix: "+", label: "завершених проєктів" },
  { value: 50, suffix: "+", label: "задоволених клієнтів" },
  { value: 97, suffix: "%", label: "рекомендують нас" },
];

export const services = [
  {
    icon: "Palette",
    title: "UI/UX Дизайн",
    description: "Створюємо унікальний дизайн, що виділяє вас серед конкурентів",
  },
  {
    icon: "Code",
    title: "Веб-розробка",
    description: "Перетворюємо дизайн у швидкий та надійний код",
  },
  {
    icon: "Rocket",
    title: "Запуск та хостинг",
    description: "Розміщуємо сайт на швидкому хостингу з SSL",
  },
  {
    icon: "Headphones",
    title: "Підтримка",
    description: "Технічна підтримка та оновлення після запуску",
  },
];

export const processSteps = [
  {
    step: "01",
    title: "Бриф",
    description: "Обговорюємо ваші цілі та вимоги",
    duration: "1-2 дні",
  },
  {
    step: "02",
    title: "Дизайн",
    description: "Створюємо макети та погоджуємо",
    duration: "5-10 днів",
  },
  {
    step: "03",
    title: "Розробка",
    description: "Верстаємо та програмуємо",
    duration: "10-25 днів",
  },
  {
    step: "04",
    title: "Тестування",
    description: "Перевіряємо на всіх пристроях",
    duration: "2-3 дні",
  },
  {
    step: "05",
    title: "Запуск",
    description: "Публікуємо та навчаємо",
    duration: "1-2 дні",
  },
];

export const portfolio = [
  {
    id: 1,
    title: "TechStart",
    category: "Landing Page",
    image: "https://picsum.photos/seed/techstart/600/400",
    description: "Сучасний лендінг для IT-стартапу",
    demoUrl: "/portfolio/demo/techstart",
  },
  {
    id: 2,
    title: "EcoShop",
    category: "Інтернет-магазин",
    image: "https://picsum.photos/seed/ecoshop/600/400",
    description: "Екологічний магазин товарів",
    demoUrl: "/portfolio/demo/ecoshop",
  },
  {
    id: 3,
    title: "LawFirm",
    category: "Корпоративний сайт",
    image: "https://picsum.photos/seed/lawfirm/600/400",
    description: "Сайт юридичної компанії",
    demoUrl: "/portfolio/demo/lawfirm",
  },
  {
    id: 4,
    title: "FitClub",
    category: "Landing Page",
    image: "https://picsum.photos/seed/fitclub/600/400",
    description: "Лендінг фітнес-клубу",
    demoUrl: "/portfolio/demo/fitclub",
  },
  {
    id: 5,
    title: "AutoParts",
    category: "Інтернет-магазин",
    image: "https://picsum.photos/seed/autoparts/600/400",
    description: "Магазин автозапчастин",
    demoUrl: "/portfolio/demo/autoparts",
  },
  {
    id: 6,
    title: "Consultant",
    category: "Корпоративний сайт",
    image: "https://picsum.photos/seed/consultant/600/400",
    description: "Сайт консалтингової компанії",
    demoUrl: "/portfolio/demo/consultant",
  },
  {
    id: 7,
    title: "MedClinic",
    category: "Корпоративний сайт",
    image: "https://picsum.photos/seed/medclinic/600/400",
    description: "Сайт медичної клініки",
    demoUrl: "/portfolio/demo/medclinic",
  },
  {
    id: 8,
    title: "RealEstate",
    category: "Веб-додаток",
    image: "https://picsum.photos/seed/realestate/600/400",
    description: "Платформа нерухомості",
    demoUrl: "/portfolio/demo/realestate",
  },
  {
    id: 9,
    title: "EventPro",
    category: "Веб-додаток",
    image: "https://picsum.photos/seed/eventpro/600/400",
    description: "Івент-агентство",
    demoUrl: "/portfolio/demo/eventpro",
  },
];

export const testimonials = [
  {
    id: 1,
    content: "Growth Tech створили для нас чудовий лендінг, який збільшив конверсію на 40%.",
    author: "Олександр К.",
    role: "CEO TechStart",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    content: "Професійна команда, завжди на зв'язку. Сайт здали вчасно і в рамках бюджету.",
    author: "Марія С.",
    role: "власниця EcoShop",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 3,
    content: "Нарешті знайшли студію, яка розуміє потреби бізнесу. Дякуємо за відмінну роботу!",
    author: "Ігор В.",
    role: "директор LawFirm",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
];

export const faqItems = [
  {
    question: "Скільки часу займає розробка сайту?",
    answer: "Залежить від складності: лендінг — 2-3 тижні, корпоративний сайт — 3-5 тижнів, інтернет-магазин — 6-8 тижнів.",
  },
  {
    question: "Яка вартість розробки?",
    answer: "Від $350 за лендінг до $2500+ за складні веб-додатки. Точну ціну розрахуємо після обговорення вимог.",
  },
  {
    question: "Чи входить хостинг у вартість?",
    answer: "Ні, але ми допоможемо обрати оптимальний хостинг та налаштуємо все під ключ.",
  },
  {
    question: "Чи можна редагувати сайт самостійно?",
    answer: "Так, ми встановлюємо зручну адмін-панель та проводимо навчання.",
  },
  {
    question: "Як відбувається оплата?",
    answer: "Передоплата 30%, решта — після затвердження готового сайту.",
  },
  {
    question: "Що потрібно для початку роботи?",
    answer: "Заповніть форму або зателефонуйте. Обговоримо ваші цілі та підготуємо комерційну пропозицію.",
  },
];
