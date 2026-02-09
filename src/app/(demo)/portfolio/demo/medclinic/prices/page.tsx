"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const priceCategories = [
  {
    title: "Терапія",
    services: [
      { name: "Консультація терапевта", price: 650 },
      { name: "Повторна консультація", price: 450 },
      { name: "Профілактичний огляд", price: 850 },
      { name: "Оформлення довідки", price: 200 },
    ],
  },
  {
    title: "Кардіологія",
    services: [
      { name: "Консультація кардіолога", price: 800 },
      { name: "ЕКГ", price: 250 },
      { name: "ЕхоКГ (УЗД серця)", price: 950 },
      { name: "Холтер-моніторинг (24 год)", price: 1200 },
      { name: "Добовий моніторинг АТ", price: 800 },
    ],
  },
  {
    title: "Неврологія",
    services: [
      { name: "Консультація невролога", price: 750 },
      { name: "ЕЕГ", price: 600 },
      { name: "Допплер судин голови", price: 850 },
      { name: "Допплер судин шиї", price: 750 },
    ],
  },
  {
    title: "Офтальмологія",
    services: [
      { name: "Консультація офтальмолога", price: 600 },
      { name: "Перевірка гостроти зору", price: 200 },
      { name: "Вимірювання очного тиску", price: 150 },
      { name: "Огляд очного дна", price: 350 },
      { name: "Підбір окулярів", price: 400 },
    ],
  },
  {
    title: "Діагностика",
    services: [
      { name: "УЗД органів черевної порожнини", price: 650 },
      { name: "УЗД щитовидної залози", price: 450 },
      { name: "УЗД нирок", price: 450 },
      { name: "Загальний аналіз крові", price: 200 },
      { name: "Біохімічний аналіз крові", price: 450 },
    ],
  },
  {
    title: "Педіатрія",
    services: [
      { name: "Консультація педіатра", price: 700 },
      { name: "Профілактичний огляд", price: 900 },
      { name: "Вакцинація (без вартості вакцини)", price: 300 },
      { name: "Патронаж немовляти", price: 800 },
    ],
  },
];

export default function PricesPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-sky-600 to-sky-800 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-sky-200 font-medium">Прайс-лист</span>
            <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
              Вартість послуг
            </h1>
            <p className="text-sky-100 text-lg">
              Прозоре ціноутворення без прихованих платежів.
              Вартість консультації включає огляд та призначення.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search */}
      <section className="py-8 bg-white border-b sticky top-20 z-40">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto relative">
            <Input
              type="search"
              placeholder="Пошук послуги..."
              className="pl-10 h-12"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          </div>
        </div>
      </section>

      {/* Prices */}
      <section className="py-16 bg-sky-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6">
            {priceCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader className="bg-sky-600 text-white rounded-t-lg">
                    <CardTitle>{category.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <table className="w-full">
                      <tbody>
                        {category.services.map((service, i) => (
                          <tr key={i} className="border-b last:border-0">
                            <td className="py-4 px-6 text-slate-700">{service.name}</td>
                            <td className="py-4 px-6 text-right font-semibold text-sky-600 whitespace-nowrap">
                              {service.price} ₴
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-white rounded-xl shadow-sm">
            <h3 className="font-semibold text-lg mb-4">Важлива інформація</h3>
            <ul className="space-y-2 text-slate-600">
              <li>• Ціни вказані в гривнях та актуальні на момент публікації</li>
              <li>• Вартість може змінюватись, уточнюйте актуальну ціну за телефоном</li>
              <li>• Діє система знижок для пенсіонерів та постійних пацієнтів</li>
              <li>• Можлива оплата карткою або готівкою</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-sky-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Готові записатись?
          </h2>
          <p className="text-sky-100 mb-8 max-w-xl mx-auto">
            Оберіть зручний час та запишіться на прийом онлайн
          </p>
          <Button asChild size="lg" className="bg-white text-sky-600 hover:bg-sky-50">
            <Link href="/portfolio/demo/medclinic/contact">
              Записатись на прийом <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
