"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Target, BarChart, Lightbulb, Users, Cog, LineChart, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    icon: Target,
    title: "Бізнес-стратегія",
    description: "Розробка довгострокової стратегії розвитку вашого бізнесу",
    details: [
      "Аналіз ринку та конкурентів",
      "Визначення конкурентних переваг",
      "Стратегічне планування на 3-5 років",
      "Формування бізнес-моделі",
      "Розробка KPI та метрик успіху",
    ],
    price: "від $5 000",
  },
  {
    icon: BarChart,
    title: "Операційна ефективність",
    description: "Оптимізація бізнес-процесів для зниження витрат",
    details: [
      "Аудит поточних процесів",
      "Виявлення вузьких місць",
      "Реінжиніринг процесів",
      "Автоматизація рутинних операцій",
      "Впровадження Lean-методологій",
    ],
    price: "від $3 000",
  },
  {
    icon: Lightbulb,
    title: "Цифрова трансформація",
    description: "Впровадження технологій для прискорення зростання",
    details: [
      "Оцінка цифрової зрілості",
      "Вибір технологічного стеку",
      "Впровадження CRM/ERP систем",
      "Автоматизація маркетингу",
      "Аналітика та BI-рішення",
    ],
    price: "від $7 000",
  },
  {
    icon: Users,
    title: "Управління змінами",
    description: "Супровід організаційних трансформацій",
    details: [
      "Діагностика корпоративної культури",
      "Планування змін",
      "Комунікаційна стратегія",
      "Навчання персоналу",
      "Моніторинг адаптації",
    ],
    price: "від $4 000",
  },
  {
    icon: Cog,
    title: "Фінансовий консалтинг",
    description: "Оптимізація фінансової моделі бізнесу",
    details: [
      "Фінансовий аудит",
      "Бюджетування та планування",
      "Оптимізація витрат",
      "Залучення інвестицій",
      "M&A консультування",
    ],
    price: "від $4 500",
  },
  {
    icon: LineChart,
    title: "Маркетинговий консалтинг",
    description: "Стратегії залучення та утримання клієнтів",
    details: [
      "Аналіз цільової аудиторії",
      "Розробка позиціонування",
      "Маркетингова стратегія",
      "Оптимізація воронки продажів",
      "Побудова бренду",
    ],
    price: "від $3 500",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-indigo-400 font-medium">Наші послуги</span>
            <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
              Комплексні рішення для бізнесу
            </h1>
            <p className="text-slate-300 text-lg">
              Від стратегії до впровадження — супроводжуємо на кожному етапі трансформації вашого бізнесу.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-slate-50">
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
                    <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                      <service.icon className="w-7 h-7 text-indigo-600" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <p className="text-slate-600">{service.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {service.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center justify-between pt-4 border-t">
                      <span className="font-semibold text-indigo-600">{service.price}</span>
                      <Button asChild variant="ghost" size="sm" className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50">
                        <Link href="/portfolio/demo/consultant/contact">
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
            <span className="text-indigo-600 font-medium">Як ми працюємо</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">Етапи співпраці</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Діагностика", desc: "Глибокий аналіз поточного стану бізнесу" },
              { step: "02", title: "Стратегія", desc: "Розробка плану дій та рекомендацій" },
              { step: "03", title: "Впровадження", desc: "Супровід на етапі реалізації змін" },
              { step: "04", title: "Результат", desc: "Моніторинг KPI та коригування" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 text-white flex items-center justify-center text-2xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-indigo-600 to-violet-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Потрібна допомога з вибором послуги?
          </h2>
          <p className="text-indigo-100 mb-8 max-w-xl mx-auto">
            Запишіться на безкоштовну консультацію і ми підберемо оптимальне рішення для вашого бізнесу
          </p>
          <Button asChild size="lg" className="bg-white text-indigo-600 hover:bg-slate-100">
            <Link href="/portfolio/demo/consultant/contact">
              Замовити консультацію
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
