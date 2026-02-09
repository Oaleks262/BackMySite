"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Briefcase, Scale, Home, Heart, FileText, Shield, Building, Users, Gavel } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    icon: Briefcase,
    title: "Корпоративне право",
    description: "Комплексний юридичний супровід бізнесу від реєстрації до ліквідації.",
    details: [
      "Реєстрація ТОВ, ФОП, акціонерних товариств",
      "Внесення змін до статутних документів",
      "Корпоративні договори та угоди",
      "M&A угоди, злиття та поглинання",
      "Корпоративні спори та конфлікти",
    ],
    price: "від 3 000 грн",
  },
  {
    icon: Scale,
    title: "Судові справи",
    description: "Представництво інтересів клієнтів у судах усіх інстанцій.",
    details: [
      "Господарські спори",
      "Цивільні справи",
      "Адміністративні справи",
      "Оскарження рішень держорганів",
      "Виконавче провадження",
    ],
    price: "від 5 000 грн",
  },
  {
    icon: Home,
    title: "Нерухомість",
    description: "Повний юридичний супровід операцій з нерухомістю.",
    details: [
      "Перевірка об'єктів нерухомості",
      "Супровід купівлі-продажу",
      "Договори оренди",
      "Земельні питання",
      "Реєстрація права власності",
    ],
    price: "від 2 500 грн",
  },
  {
    icon: Heart,
    title: "Сімейне право",
    description: "Делікатне вирішення сімейних питань.",
    details: [
      "Розлучення (за згодою та через суд)",
      "Поділ майна подружжя",
      "Аліменти на дітей",
      "Встановлення батьківства",
      "Шлюбні договори",
    ],
    price: "від 4 000 грн",
  },
  {
    icon: FileText,
    title: "Трудове право",
    description: "Захист прав роботодавців та працівників.",
    details: [
      "Трудові спори",
      "Незаконне звільнення",
      "Трудові договори та контракти",
      "Колективні переговори",
      "HR аудит",
    ],
    price: "від 2 000 грн",
  },
  {
    icon: Shield,
    title: "Захист бізнесу",
    description: "Комплексний захист від рейдерства та недобросовісної конкуренції.",
    details: [
      "Антирейдерський захист",
      "Захист від перевірок",
      "Антимонопольне право",
      "Захист ділової репутації",
      "Інтелектуальна власність",
    ],
    price: "від 10 000 грн",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-stone-900 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-amber-400 font-medium">Наші послуги</span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mt-2 mb-4">
              Напрямки практики
            </h1>
            <p className="text-stone-300 text-lg">
              Надаємо повний спектр юридичних послуг для бізнесу та приватних осіб.
              Кожна справа отримує індивідуальний підхід.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="w-14 h-14 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                      <service.icon className="w-7 h-7 text-amber-700" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <p className="text-stone-600">{service.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {service.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-stone-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-700 mt-2 flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center justify-between pt-4 border-t">
                      <span className="font-semibold text-amber-700">{service.price}</span>
                      <Button asChild variant="ghost" size="sm" className="text-amber-700 hover:text-amber-800 hover:bg-amber-50">
                        <Link href="/portfolio/demo/lawfirm/contact">
                          Замовити <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-amber-700 font-medium">Як ми працюємо</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mt-2">Етапи роботи</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Консультація", desc: "Безкоштовна первинна консультація для оцінки ситуації" },
              { step: "02", title: "Аналіз", desc: "Детальний аналіз документів та розробка стратегії" },
              { step: "03", title: "Робота", desc: "Активна робота над справою та регулярні звіти" },
              { step: "04", title: "Результат", desc: "Досягнення поставленої мети та закриття справи" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-700 text-white flex items-center justify-center text-2xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-stone-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-amber-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold mb-4">
            Потрібна консультація?
          </h2>
          <p className="text-amber-100 mb-8 max-w-xl mx-auto">
            Запишіться на безкоштовну консультацію і ми допоможемо знайти рішення
          </p>
          <Button asChild size="lg" className="bg-white text-amber-700 hover:bg-stone-100">
            <Link href="/portfolio/demo/lawfirm/contact">
              Записатись на консультацію
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
