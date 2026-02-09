"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Dumbbell,
  Users,
  Clock,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Play,
  Check,
  Calendar,
  Flame,
  Heart,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const trainers = [
  {
    name: "Олександр Петренко",
    role: "CrossFit тренер",
    image: "https://picsum.photos/seed/trainer1/400/500",
    experience: "8 років",
  },
  {
    name: "Марія Коваленко",
    role: "Йога інструктор",
    image: "https://picsum.photos/seed/trainer2/400/500",
    experience: "5 років",
  },
  {
    name: "Дмитро Бондаренко",
    role: "Персональний тренер",
    image: "https://picsum.photos/seed/trainer3/400/500",
    experience: "10 років",
  },
];

const schedule = {
  monday: [
    { time: "07:00", class: "Йога", trainer: "Марія", duration: "60 хв" },
    { time: "09:00", class: "CrossFit", trainer: "Олександр", duration: "45 хв" },
    { time: "18:00", class: "Силові", trainer: "Дмитро", duration: "60 хв" },
    { time: "19:30", class: "Stretching", trainer: "Марія", duration: "45 хв" },
  ],
  tuesday: [
    { time: "08:00", class: "Кардіо", trainer: "Дмитро", duration: "45 хв" },
    { time: "10:00", class: "Пілатес", trainer: "Марія", duration: "60 хв" },
    { time: "17:00", class: "Бокс", trainer: "Олександр", duration: "60 хв" },
    { time: "19:00", class: "Йога", trainer: "Марія", duration: "60 хв" },
  ],
  wednesday: [
    { time: "07:00", class: "CrossFit", trainer: "Олександр", duration: "45 хв" },
    { time: "09:00", class: "Йога", trainer: "Марія", duration: "60 хв" },
    { time: "18:00", class: "Функціональний", trainer: "Дмитро", duration: "45 хв" },
    { time: "20:00", class: "Stretching", trainer: "Марія", duration: "45 хв" },
  ],
};

const pricingPlans = [
  {
    name: "Старт",
    price: 800,
    period: "місяць",
    features: ["8 групових занять", "Доступ до тренажерного залу", "Роздягальня з душем"],
  },
  {
    name: "Оптимальний",
    price: 1500,
    period: "місяць",
    features: [
      "Безлім групових занять",
      "Доступ до тренажерного залу",
      "2 персональних тренування",
      "Фітнес-тестування",
      "Сауна",
    ],
    popular: true,
  },
  {
    name: "Преміум",
    price: 2500,
    period: "місяць",
    features: [
      "Безлім групових занять",
      "Доступ до тренажерного залу",
      "8 персональних тренувань",
      "Харчування від дієтолога",
      "Сауна + масаж",
      "Заморозка карти",
    ],
  },
];

export default function FitClubDemo() {
  const [activeDay, setActiveDay] = useState("monday");

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Demo Banner */}
      <div className="bg-orange-500 text-white text-center py-2 text-sm font-medium">
        <Link href="/portfolio" className="hover:underline inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Це демо-версія. Повернутись до портфоліо
        </Link>
      </div>

      {/* Header */}
      <header className="fixed top-8 left-0 right-0 z-50 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between bg-zinc-900/90 backdrop-blur-md rounded-full px-6 py-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                <Dumbbell className="w-6 h-6" />
              </div>
              <span className="font-bold text-xl">FitClub</span>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <a href="#about" className="text-zinc-400 hover:text-white transition-colors">Про нас</a>
              <a href="#schedule" className="text-zinc-400 hover:text-white transition-colors">Розклад</a>
              <a href="#trainers" className="text-zinc-400 hover:text-white transition-colors">Тренери</a>
              <a href="#pricing" className="text-zinc-400 hover:text-white transition-colors">Ціни</a>
            </nav>
            <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
              Записатись
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <Image
            src="https://picsum.photos/seed/fitnesshero/1920/1080"
            alt="Fitness"
            fill
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10 pt-32">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/50 mb-6">
              Перше заняття безкоштовно
            </Badge>
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              ПРОКАЧАЙ
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
                СЕБЕ
              </span>
            </h1>
            <p className="text-xl text-zinc-400 mb-8">
              Сучасний фітнес-клуб з професійними тренерами та новітнім обладнанням
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-red-500 h-14 px-8 text-lg">
                Почати тренування
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" className="bg-transparent border border-zinc-700 text-white hover:bg-zinc-800 h-14 px-8 text-lg">
                <Play className="w-5 h-5 mr-2" />
                Відео-тур
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16">
              {[
                { value: "2000+", label: "Клієнтів" },
                { value: "15+", label: "Тренерів" },
                { value: "50+", label: "Занять/тиждень" },
              ].map((stat, i) => (
                <div key={i}>
                  <p className="text-3xl font-bold text-orange-500">{stat.value}</p>
                  <p className="text-zinc-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="about" className="py-20 bg-zinc-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Чому обирають нас</h2>
            <p className="text-zinc-400 max-w-xl mx-auto">
              Створюємо найкращі умови для досягнення ваших фітнес-цілей
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Dumbbell, title: "Сучасне обладнання", desc: "Преміум техніка від світових брендів" },
              { icon: Users, title: "Професійні тренери", desc: "Сертифіковані спеціалісти з досвідом" },
              { icon: Clock, title: "Зручний графік", desc: "Працюємо з 6:00 до 23:00 щодня" },
              { icon: Flame, title: "Ефективні програми", desc: "Індивідуальний підхід до кожного" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-zinc-800/50 rounded-2xl p-6 text-center hover:bg-zinc-800 transition-colors"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-zinc-400 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section id="schedule" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Розклад занять</h2>
            <p className="text-zinc-400">Обери зручний час для тренування</p>
          </div>

          <Tabs defaultValue="monday" className="max-w-4xl mx-auto">
            <TabsList className="grid grid-cols-3 mb-8 bg-zinc-800/50">
              <TabsTrigger value="monday" className="data-[state=active]:bg-orange-500">
                Понеділок
              </TabsTrigger>
              <TabsTrigger value="tuesday" className="data-[state=active]:bg-orange-500">
                Вівторок
              </TabsTrigger>
              <TabsTrigger value="wednesday" className="data-[state=active]:bg-orange-500">
                Середа
              </TabsTrigger>
            </TabsList>

            {Object.entries(schedule).map(([day, classes]) => (
              <TabsContent key={day} value={day} className="space-y-4">
                {classes.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center justify-between bg-zinc-800/50 rounded-xl p-4 hover:bg-zinc-800 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-2xl font-bold text-orange-500">{item.time}</div>
                      <div>
                        <p className="font-semibold">{item.class}</p>
                        <p className="text-sm text-zinc-400">{item.trainer} • {item.duration}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white">
                      Записатись
                    </Button>
                  </motion.div>
                ))}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Trainers */}
      <section id="trainers" className="py-20 bg-zinc-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Наші тренери</h2>
            <p className="text-zinc-400">Професіонали, які допоможуть досягти результату</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {trainers.map((trainer, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-2xl"
              >
                <div className="aspect-[4/5] relative">
                  <Image
                    src={trainer.image}
                    alt={trainer.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold">{trainer.name}</h3>
                  <p className="text-orange-400">{trainer.role}</p>
                  <p className="text-zinc-400 text-sm">Досвід: {trainer.experience}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Абонементи</h2>
            <p className="text-zinc-400">Обери свій шлях до ідеальної форми</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingPlans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-2xl p-6 ${
                  plan.popular
                    ? "bg-gradient-to-b from-orange-500/20 to-red-500/20 border-2 border-orange-500"
                    : "bg-zinc-800/50"
                }`}
              >
                {plan.popular && (
                  <Badge className="bg-orange-500 mb-4">Найпопулярніший</Badge>
                )}
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold mb-1">
                  {plan.price}₴
                  <span className="text-lg text-zinc-400">/{plan.period}</span>
                </div>
                <ul className="space-y-3 my-6">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-orange-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-gradient-to-r from-orange-500 to-red-500"
                      : "bg-zinc-700 hover:bg-zinc-600"
                  }`}
                >
                  Обрати
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-red-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Перше заняття безкоштовно!</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Запишись на пробне тренування та отримай консультацію тренера
          </p>
          <Button size="lg" className="bg-white text-orange-600 hover:bg-zinc-100 h-14 px-8 text-lg">
            Записатись зараз
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-zinc-900 border-t border-zinc-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                  <Dumbbell className="w-6 h-6" />
                </div>
                <span className="font-bold text-xl">FitClub</span>
              </div>
              <p className="text-zinc-400 text-sm">
                Твій шлях до ідеальної форми починається тут
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакти</h4>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  +380 (67) 123-45-67
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  hello@fitclub.ua
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Київ, вул. Спортивна, 1
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Графік роботи</h4>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li>Пн-Пт: 06:00 - 23:00</li>
                <li>Сб-Нд: 08:00 - 21:00</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Соціальні мережі</h4>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-orange-500 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-orange-500 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-zinc-800 pt-8 text-center text-sm text-zinc-400">
            <p>Демонстраційний сайт створено Growth-Tech</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
