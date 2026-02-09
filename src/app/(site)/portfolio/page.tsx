"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ArrowLeft, Eye, Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Extended portfolio data with more details
const portfolioItems = [
  {
    id: 1,
    title: "TechStart",
    category: "Landing Page",
    description: "Сучасний лендінг для IT-стартапу з анімаціями та інтеграцією з CRM",
    fullDescription: "Розробили повноцінний лендінг для технологічного стартапу TechStart. Проєкт включає анімовану hero-секцію, інтерактивний калькулятор вартості послуг, інтеграцію з HubSpot CRM та оптимізацію для пошукових систем.",
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "HubSpot"],
    year: "2024",
    duration: "3 тижні",
    features: ["Адаптивний дизайн", "SEO оптимізація", "CRM інтеграція", "Аналітика"],
    demoUrl: "/portfolio/demo/techstart",
  },
  {
    id: 2,
    title: "EcoShop",
    category: "Інтернет-магазин",
    description: "Екологічний магазин товарів з онлайн оплатою та доставкою",
    fullDescription: "Повнофункціональний інтернет-магазин екологічних товарів. Реалізовано каталог з фільтрацією, кошик, онлайн оплату через LiqPay та Stripe, інтеграцію з Новою Поштою для розрахунку доставки.",
    technologies: ["Next.js", "PostgreSQL", "Stripe", "Nova Poshta API"],
    year: "2024",
    duration: "6 тижнів",
    features: ["Каталог товарів", "Онлайн оплата", "Доставка", "Адмін-панель"],
    demoUrl: "/portfolio/demo/ecoshop",
  },
  {
    id: 3,
    title: "LawFirm",
    category: "Корпоративний сайт",
    description: "Сайт юридичної компанії з онлайн записом на консультацію",
    fullDescription: "Корпоративний сайт для юридичної фірми з портфоліо справ, командою спеціалістів та системою онлайн запису на консультацію. Інтеграція з Google Calendar для управління записами.",
    technologies: ["Next.js", "Tailwind CSS", "Google Calendar API", "Nodemailer"],
    year: "2024",
    duration: "4 тижні",
    features: ["Онлайн запис", "Блог", "Портфоліо справ", "Мультимовність"],
    demoUrl: "/portfolio/demo/lawfirm",
  },
  {
    id: 4,
    title: "FitClub",
    category: "Landing Page",
    description: "Лендінг фітнес-клубу з розкладом занять та онлайн записом",
    fullDescription: "Динамічний лендінг для фітнес-клубу з інтерактивним розкладом занять, галереєю тренерів та онлайн записом на тренування. Адаптивний дизайн з яскравими анімаціями.",
    technologies: ["React", "Tailwind CSS", "Framer Motion", "Calendly"],
    year: "2023",
    duration: "2 тижні",
    features: ["Розклад занять", "Онлайн запис", "Галерея", "Відгуки"],
    demoUrl: "/portfolio/demo/fitclub",
  },
  {
    id: 5,
    title: "AutoParts",
    category: "Інтернет-магазин",
    description: "Магазин автозапчастин з підбором по VIN-коду",
    fullDescription: "Інтернет-магазин автозапчастин з унікальною системою підбору деталей по VIN-коду автомобіля. Каталог з більш ніж 100,000 позицій, інтеграція з постачальниками та автоматичне оновлення цін.",
    technologies: ["Next.js", "MongoDB", "TecDoc API", "LiqPay"],
    year: "2023",
    duration: "8 тижнів",
    features: ["Підбір по VIN", "Великий каталог", "API інтеграції", "B2B кабінет"],
    demoUrl: "/portfolio/demo/autoparts",
  },
  {
    id: 6,
    title: "Consultant",
    category: "Корпоративний сайт",
    description: "Сайт консалтингової компанії з кейсами та блогом",
    fullDescription: "Корпоративний сайт для консалтингової компанії з детальним описом послуг, кейсами успішних проєктів, блогом з експертними статтями та формою запиту на консультацію.",
    technologies: ["Next.js", "Sanity CMS", "Tailwind CSS", "Vercel"],
    year: "2023",
    duration: "5 тижнів",
    features: ["CMS для контенту", "Блог", "Кейси", "Форма заявки"],
    demoUrl: "/portfolio/demo/consultant",
  },
  {
    id: 7,
    title: "MedClinic",
    category: "Корпоративний сайт",
    description: "Сайт медичної клініки з онлайн записом до лікарів",
    fullDescription: "Сучасний сайт для приватної медичної клініки. Онлайн запис до лікарів з вибором часу, особистий кабінет пацієнта, інтеграція з медичною системою клініки.",
    technologies: ["Next.js", "PostgreSQL", "Prisma", "Telegram Bot"],
    year: "2024",
    duration: "7 тижнів",
    features: ["Онлайн запис", "Кабінет пацієнта", "Розклад лікарів", "Нагадування"],
    demoUrl: "/portfolio/demo/medclinic",
  },
  {
    id: 8,
    title: "RealEstate",
    category: "Веб-додаток",
    description: "Платформа для пошуку та оренди нерухомості",
    fullDescription: "Повнофункціональна платформа для агентства нерухомості з каталогом об'єктів, фільтрацією, картою, особистим кабінетом та системою повідомлень між орендарями та власниками.",
    technologies: ["Next.js", "PostgreSQL", "Google Maps", "Socket.io"],
    year: "2024",
    duration: "10 тижнів",
    features: ["Карта об'єктів", "Фільтрація", "Чат", "Кабінет користувача"],
    demoUrl: "/portfolio/demo/realestate",
  },
  {
    id: 9,
    title: "EventPro",
    category: "Веб-додаток",
    description: "Платформа для організації та продажу квитків на події",
    fullDescription: "Веб-додаток для організаторів подій: створення сторінок заходів, продаж квитків онлайн, QR-код для входу, аналітика продажів та email розсилки учасникам.",
    technologies: ["Next.js", "Stripe", "QR Code", "SendGrid"],
    year: "2024",
    duration: "8 тижнів",
    features: ["Продаж квитків", "QR-коди", "Email розсилки", "Аналітика"],
    demoUrl: "/portfolio/demo/eventpro",
  },
];

const categories = [
  "Всі",
  "Landing Page",
  "Інтернет-магазин",
  "Корпоративний сайт",
  "Веб-додаток",
];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("Всі");
  const [selectedProject, setSelectedProject] = useState<typeof portfolioItems[0] | null>(null);

  const filteredProjects =
    activeCategory === "Всі"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory);

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 gradient-primary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              На головну
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Наші роботи
            </h1>
            <p className="text-lg text-white/80">
              Проєкти, якими ми пишаємося. Від простих лендінгів до складних веб-додатків.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category)}
                className={
                  activeCategory === category
                    ? "bg-primary"
                    : "hover:bg-primary/10"
                }
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Projects Grid */}
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    {/* Live iframe preview */}
                    {project.demoUrl ? (
                      <div className="absolute inset-0 overflow-hidden">
                        <iframe
                          src={project.demoUrl}
                          title={project.title}
                          className="w-[400%] h-[400%] origin-top-left scale-[0.25] pointer-events-none"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
                        <span className="text-4xl font-bold text-primary/30">{project.title[0]}</span>
                      </div>
                    )}

                    {project.demoUrl && (
                      <Badge className="absolute top-3 right-3 bg-primary z-10">
                        Демо
                      </Badge>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="sm"
                        className="bg-white text-primary hover:bg-white/90"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Детальніше
                      </Button>
                      {project.demoUrl && (
                        <Button
                          size="sm"
                          className="bg-secondary text-primary hover:bg-secondary/90"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.location.href = project.demoUrl!;
                          }}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Демо
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{project.category}</Badge>
                      <span className="text-xs text-muted-foreground">{project.year}</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-1">{project.title}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { value: "120+", label: "Проєктів" },
              { value: "50+", label: "Клієнтів" },
              { value: "6+", label: "Років досвіду" },
              { value: "97%", label: "Задоволених" },
            ].map((stat, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-xl shadow-sm">
                <p className="text-3xl font-bold text-primary">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Хочете такий самий результат?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Розкажіть про ваш проєкт і ми підготуємо індивідуальну пропозицію
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-primary">
              <Link href="/#calculator">Розрахувати вартість</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/#contact">Зв&apos;язатися</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Project Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedProject.title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                {/* Live iframe preview in modal */}
                <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-100">
                  {selectedProject.demoUrl ? (
                    <iframe
                      src={selectedProject.demoUrl}
                      title={selectedProject.title}
                      className="w-full h-full"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
                      <span className="text-6xl font-bold text-primary/30">{selectedProject.title[0]}</span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Tag className="w-4 h-4 text-muted-foreground" />
                    <Badge variant="secondary">{selectedProject.category}</Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {selectedProject.year} • {selectedProject.duration}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="font-semibold mb-2">Про проєкт</h4>
                  <p className="text-muted-foreground">{selectedProject.fullDescription}</p>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="font-semibold mb-2">Технології</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <Badge key={tech} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h4 className="font-semibold mb-2">Функціонал</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedProject.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="flex flex-col gap-3 pt-4 border-t">
                  {selectedProject.demoUrl && (
                    <Button asChild className="w-full bg-primary hover:bg-primary/90">
                      <Link href={selectedProject.demoUrl}>
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Переглянути демо-сайт
                      </Link>
                    </Button>
                  )}
                  <div className="flex gap-3">
                    <Button asChild className="flex-1 bg-secondary hover:bg-secondary/90 text-primary">
                      <Link href="/#calculator">Замовити схожий</Link>
                    </Button>
                    <Button variant="outline" className="flex-1" asChild>
                      <Link href="/#contact">Обговорити проєкт</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
