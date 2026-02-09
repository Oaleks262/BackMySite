"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Wrench, Settings, Gauge, Disc, Zap, Thermometer, CheckCircle, Phone, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    icon: Wrench,
    title: "Діагностика",
    description: "Комп'ютерна діагностика всіх систем автомобіля",
    price: "від 350 ₴",
    items: [
      "Діагностика двигуна",
      "Перевірка електроніки",
      "Діагностика ходової",
      "Перевірка гальм",
    ],
  },
  {
    icon: Settings,
    title: "Ремонт двигуна",
    description: "Капітальний та поточний ремонт двигунів",
    price: "від 3 000 ₴",
    items: [
      "Заміна ременя ГРМ",
      "Ремонт головки блоку",
      "Заміна прокладок",
      "Капітальний ремонт",
    ],
  },
  {
    icon: Gauge,
    title: "Ремонт підвіски",
    description: "Повний ремонт ходової частини автомобіля",
    price: "від 500 ₴",
    items: [
      "Заміна амортизаторів",
      "Ремонт стійок",
      "Заміна сайлентблоків",
      "Регулювання розвалу",
    ],
  },
  {
    icon: Disc,
    title: "Гальмівна система",
    description: "Ремонт та обслуговування гальм",
    price: "від 400 ₴",
    items: [
      "Заміна колодок",
      "Заміна дисків",
      "Прокачка гальм",
      "Ремонт супортів",
    ],
  },
  {
    icon: Zap,
    title: "Електрика",
    description: "Ремонт електрообладнання авто",
    price: "від 300 ₴",
    items: [
      "Ремонт генератора",
      "Заміна стартера",
      "Ремонт проводки",
      "Встановлення сигналізації",
    ],
  },
  {
    icon: Thermometer,
    title: "Система охолодження",
    description: "Ремонт та обслуговування системи охолодження",
    price: "від 450 ₴",
    items: [
      "Заміна радіатора",
      "Заміна помпи",
      "Заміна термостата",
      "Промивка системи",
    ],
  },
];

const advantages = [
  {
    icon: Shield,
    title: "Гарантія 12 місяців",
    description: "На всі виконані роботи та встановлені запчастини",
  },
  {
    icon: Clock,
    title: "Швидке обслуговування",
    description: "Більшість робіт виконуємо за 1-2 години",
  },
  {
    icon: CheckCircle,
    title: "Досвідчені майстри",
    description: "Сертифіковані спеціалісти з досвідом 10+ років",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Header */}
      <section className="relative bg-zinc-900 text-white py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <Image
            src="https://picsum.photos/seed/service/1920/600"
            alt="Auto service"
            fill
            className="object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-red-500 font-medium">СТО AutoParts</span>
            <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
              Професійний автосервіс
            </h1>
            <p className="text-zinc-300 text-lg">
              Власна станція технічного обслуговування з сучасним обладнанням.
              Ремонтуємо авто будь-якої складності.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-8 bg-red-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {advantages.map((adv, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <adv.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{adv.title}</h3>
                  <p className="text-red-100 text-sm">{adv.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-zinc-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Наші послуги</h2>
            <p className="text-zinc-600 mt-2">Повний спектр робіт з обслуговування та ремонту авто</p>
          </div>

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
                    <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                      <service.icon className="w-7 h-7 text-red-600" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <p className="text-zinc-600">{service.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {service.items.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-zinc-600">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center justify-between pt-4 border-t">
                      <span className="font-bold text-red-600 text-lg">{service.price}</span>
                      <Button asChild variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                        <Link href="/portfolio/demo/autoparts/contact">
                          Записатись <ArrowRight className="w-4 h-4 ml-1" />
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
            <h2 className="text-3xl font-bold">Як ми працюємо</h2>
            <p className="text-zinc-600 mt-2">Прозорий процес від запису до отримання авто</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Запис", desc: "Записуєтесь онлайн або телефоном" },
              { step: "02", title: "Діагностика", desc: "Проводимо детальну діагностику" },
              { step: "03", title: "Узгодження", desc: "Узгоджуємо вартість та терміни" },
              { step: "04", title: "Ремонт", desc: "Виконуємо роботи та видаємо авто" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-600 text-white flex items-center justify-center text-2xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-zinc-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 bg-zinc-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Наш сервіс</h2>
            <p className="text-zinc-600 mt-2">Сучасне обладнання та комфортна зона очікування</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="relative aspect-square rounded-xl overflow-hidden"
              >
                <Image
                  src={`https://picsum.photos/seed/sto${i}/400/400`}
                  alt={`Service ${i}`}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-300"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-zinc-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Потрібен ремонт авто?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Запишіться на діагностику і ми визначимо обсяг необхідних робіт
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-red-600 hover:bg-red-700">
              <Link href="/portfolio/demo/autoparts/contact">
                Записатись на СТО
              </Link>
            </Button>
            <a href="tel:+380671234567" className="flex items-center gap-2 text-lg hover:text-red-500 transition-colors">
              <Phone className="w-5 h-5" />
              +380 (67) 123-45-67
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
