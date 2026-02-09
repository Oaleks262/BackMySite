export const projectTypes = [
  { id: "landing", label: "Landing Page", basePrice: 350, baseDays: 14 },
  { id: "multipage", label: "Багатосторінковий сайт (до 5 стор.)", basePrice: 500, baseDays: 20 },
  { id: "corporate", label: "Корпоративний сайт (до 10 стор.)", basePrice: 800, baseDays: 30 },
  { id: "ecommerce", label: "Інтернет-магазин", basePrice: 1500, baseDays: 45 },
  { id: "webapp", label: "Веб-додаток", basePrice: 2500, baseDays: 60 },
];

export const designOptions = [
  { id: "template", label: "Шаблонний дизайн", multiplier: 1.0, description: "Адаптуємо готовий шаблон під ваш бренд" },
  { id: "custom", label: "Унікальний дизайн", multiplier: 1.5, description: "Створюємо дизайн з нуля під ваші потреби" },
  { id: "premium", label: "Преміум з анімаціями", multiplier: 2.0, description: "Унікальний дизайн з інтерактивними елементами" },
  { id: "provided", label: "У мене вже є дизайн", multiplier: 0.7, description: "Реалізуємо ваш готовий дизайн-макет" },
];

export const features = [
  { id: "contact-form", label: "Контактна форма", price: 0, description: "Базова форма зворотного зв'язку" },
  { id: "blog", label: "Блог / Новини", price: 200, description: "Розділ з публікаціями та категоріями" },
  { id: "gallery", label: "Галерея / Портфоліо", price: 100, description: "Красива галерея з фільтрами" },
  { id: "multilang", label: "Мультимовність", price: 250, description: "Підтримка кількох мов на сайті" },
  { id: "crm", label: "Інтеграція з CRM", price: 300, description: "Підключення до вашої CRM-системи" },
  { id: "payment", label: "Онлайн оплата", price: 400, description: "Прийом платежів на сайті" },
  { id: "admin", label: "Адмін-панель", price: 350, description: "Панель для керування контентом" },
  { id: "chat", label: "Чат-бот", price: 200, description: "Автоматичний помічник для відвідувачів" },
  { id: "seo", label: "SEO-оптимізація", price: 150, description: "Базова оптимізація для пошукових систем" },
  { id: "analytics", label: "Підключення аналітики", price: 100, description: "Google Analytics та інші інструменти" },
];

export const timelineOptions = [
  { id: "standard", label: "Стандартні терміни", multiplier: 1.0, daysMultiplier: 1.0, description: "Оптимальний баланс якості та часу" },
  { id: "fast", label: "Прискорено (−30% часу)", multiplier: 1.2, daysMultiplier: 0.7, description: "Пріоритетна розробка" },
  { id: "urgent", label: "Терміново (−50% часу)", multiplier: 1.5, daysMultiplier: 0.5, description: "Максимально швидкий запуск" },
];

export interface CalculatorResult {
  priceMin: number;
  priceMax: number;
  daysMin: number;
  daysMax: number;
}

export function calculatePrice(
  projectTypeId: string,
  designId: string,
  featureIds: string[],
  timelineId: string
): CalculatorResult {
  const project = projectTypes.find((p) => p.id === projectTypeId);
  const design = designOptions.find((d) => d.id === designId);
  const timeline = timelineOptions.find((t) => t.id === timelineId);

  if (!project || !design || !timeline) {
    return { priceMin: 0, priceMax: 0, daysMin: 0, daysMax: 0 };
  }

  const featuresTotal = featureIds.reduce((sum, fid) => {
    const feature = features.find((f) => f.id === fid);
    return sum + (feature?.price || 0);
  }, 0);

  const baseTotal = project.basePrice * design.multiplier * timeline.multiplier + featuresTotal;
  const baseDays = Math.ceil(project.baseDays * timeline.daysMultiplier);

  return {
    priceMin: Math.round(baseTotal * 0.9),
    priceMax: Math.round(baseTotal * 1.1),
    daysMin: Math.max(7, baseDays - 5),
    daysMax: baseDays + 5,
  };
}

export function getProjectTypeLabel(id: string): string {
  return projectTypes.find((p) => p.id === id)?.label || id;
}

export function getDesignLabel(id: string): string {
  return designOptions.find((d) => d.id === id)?.label || id;
}

export function getTimelineLabel(id: string): string {
  return timelineOptions.find((t) => t.id === id)?.label || id;
}

export function getFeatureLabels(ids: string[]): string[] {
  return ids.map((id) => features.find((f) => f.id === id)?.label || id);
}
