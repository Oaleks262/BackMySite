"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Home, Key, Building2, FileCheck, Search, FileText, Shield, Users, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    icon: Home,
    title: "Купівля нерухомості",
    description: "Повний супровід угоди купівлі від пошуку до отримання ключів",
    features: [
      "Підбір об'єктів за вашими критеріями",
      "Організація переглядів",
      "Перевірка юридичної чистоти",
      "Торги та узгодження ціни",
      "Супровід угоди у нотаріуса",
    ],
  },
  {
    icon: Key,
    title: "Продаж нерухомості",
    description: "Ефективний продаж за найкращою ринковою ціною",
    features: [
      "Оцінка ринкової вартості",
      "Професійна фотозйомка",
      "Розміщення на 50+ майданчиках",
      "Організація показів",
      "Супровід угоди",
    ],
  },
  {
    icon: Building2,
    title: "Оренда нерухомості",
    description: "Пошук орендарів або об'єктів для оренди",
    features: [
      "Пошук надійних орендарів",
      "Перевірка платоспроможності",
      "Складання договору оренди",
      "Передача об'єкта за актом",
      "Подальший супровід",
    ],
  },
  {
    icon: FileCheck,
    title: "Оцінка нерухомості",
    description: "Професійна оцінка вартості будь-якого типу нерухомості",
    features: [
      "Аналіз ринкової вартості",
      "Порівняння з аналогами",
      "Експертний висновок",
      "Оцінка для банку",
      "Оцінка для суду",
    ],
  },
  {
    icon: FileText,
    title: "Юридичний супровід",
    description: "Повна юридична підтримка угод з нерухомістю",
    features: [
      "Перевірка документів",
      "Due diligence об'єкта",
      "Підготовка договорів",
      "Реєстрація права власності",
      "Вирішення спорів",
    ],
  },
  {
    icon: Search,
    title: "Пошук інвестицій",
    description: "Підбір інвестиційно привабливих об'єктів",
    features: [
      "Аналіз прибутковості",
      "Підбір новобудов",
      "Комерційна нерухомість",
      "Земельні ділянки",
      "Інвестиційний портфель",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-emerald-900 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-emerald-300 font-medium">Наші послуги</span>
            <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
              Повний спектр послуг
            </h1>
            <p className="text-emerald-100 text-lg">
              Від пошуку до отримання ключів — супроводжуємо на кожному етапі угоди з нерухомістю.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-emerald-50">
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
                    <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                      <service.icon className="w-7 h-7 text-emerald-600" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <p className="text-slate-600">{service.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700">
                      <Link href="/portfolio/demo/realestate/contact">
                        Замовити <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">Чому обирають нас</h2>
              <div className="space-y-4">
                {[
                  { icon: Shield, title: "Юридична безпека", desc: "Перевіряємо кожен об'єкт на чистоту" },
                  { icon: Users, title: "Досвідчена команда", desc: "50+ професійних агентів" },
                  { icon: FileCheck, title: "Прозорі умови", desc: "Чітке ціноутворення без прихованих платежів" },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-emerald-50 rounded-xl">
                    <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-slate-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="aspect-[4/3] relative rounded-2xl overflow-hidden">
                <Image
                  src="https://picsum.photos/seed/realestateservice/800/600"
                  alt="Our services"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-emerald-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Потрібна консультація?
          </h2>
          <p className="text-emerald-100 mb-8 max-w-xl mx-auto">
            Зв&apos;яжіться з нами і ми допоможемо вирішити будь-яке питання з нерухомістю
          </p>
          <Button asChild size="lg" className="bg-white text-emerald-600 hover:bg-emerald-50">
            <Link href="/portfolio/demo/realestate/contact">
              Безкоштовна консультація
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
