"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Building2, Heart, Mic, Gift, GraduationCap, Music, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    icon: Building2,
    title: "Корпоративні заходи",
    description: "Організація корпоративів, тімбілдингів та бізнес-заходів",
    features: [
      "Новорічні корпоративи",
      "Тімбілдинги та квести",
      "Ювілеї компанії",
      "Церемонії нагородження",
      "Корпоративні вечірки",
    ],
    price: "від 50 000 ₴",
  },
  {
    icon: Heart,
    title: "Весілля",
    description: "Повна організація весільного торжества від А до Я",
    features: [
      "Підбір локації",
      "Декор та флористика",
      "Координація дня",
      "Фото та відео",
      "Кейтеринг та торт",
    ],
    price: "від 100 000 ₴",
  },
  {
    icon: Mic,
    title: "Конференції та форуми",
    description: "Організація бізнес-заходів будь-якого масштабу",
    features: [
      "Технічне забезпечення",
      "Реєстрація учасників",
      "Кейтеринг та кава-брейки",
      "Синхронний переклад",
      "Онлайн-трансляція",
    ],
    price: "від 80 000 ₴",
  },
  {
    icon: Gift,
    title: "Приватні свята",
    description: "Дні народження, ювілеї, тематичні вечірки",
    features: [
      "Дні народження",
      "Ювілеї",
      "Дитячі свята",
      "Гендер-паті",
      "Тематичні вечірки",
    ],
    price: "від 25 000 ₴",
  },
  {
    icon: GraduationCap,
    title: "Випускні",
    description: "Організація випускних вечорів та балів",
    features: [
      "Шкільні випускні",
      "Університетські бали",
      "Оренда локації",
      "Розважальна програма",
      "Фотозони",
    ],
    price: "від 40 000 ₴",
  },
  {
    icon: Music,
    title: "Фестивалі",
    description: "Організація музичних та культурних фестивалів",
    features: [
      "Сцена та звук",
      "Букінг артистів",
      "Зони фуд-корту",
      "Безпека заходу",
      "Промо та PR",
    ],
    price: "за запитом",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-purple-300 font-medium">Наші послуги</span>
            <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
              Організація заходів
            </h1>
            <p className="text-purple-100 text-lg">
              Повний цикл організації — від концепції до реалізації.
              Беремо на себе всі турботи, щоб ви насолоджувались моментом.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-purple-50">
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
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center mb-4">
                      <service.icon className="w-7 h-7 text-purple-600" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <p className="text-slate-600">{service.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center justify-between pt-4 border-t">
                      <span className="font-semibold text-purple-600">{service.price}</span>
                      <Button asChild variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700 hover:bg-purple-50">
                        <Link href="/portfolio/demo/eventpro/contact">
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
            <span className="text-purple-600 font-medium">Як ми працюємо</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">Етапи організації</h2>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {[
              { step: "01", title: "Бриф", desc: "Обговорюємо ваші побажання та бюджет" },
              { step: "02", title: "Концепція", desc: "Розробляємо ідею та сценарій" },
              { step: "03", title: "Підготовка", desc: "Підбираємо локацію, підрядників" },
              { step: "04", title: "Реалізація", desc: "Координуємо всі процеси" },
              { step: "05", title: "Захід", desc: "Контролюємо кожну деталь" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 text-white flex items-center justify-center text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Готові обговорити ваш захід?
          </h2>
          <p className="text-purple-100 mb-8 max-w-xl mx-auto">
            Залиште заявку і ми зв&apos;яжемось для безкоштовної консультації
          </p>
          <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-purple-50">
            <Link href="/portfolio/demo/eventpro/contact">
              Замовити консультацію
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
