"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Award, Users, Target, Lightbulb, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  { value: "15", label: "років досвіду" },
  { value: "150+", label: "успішних проектів" },
  { value: "€10M+", label: "збережено клієнтам" },
  { value: "50+", label: "компаній-клієнтів" },
];

const team = [
  {
    name: "Андрій Мельник",
    role: "Засновник та CEO",
    bio: "15 років у стратегічному консалтингу. Ex-McKinsey.",
    image: "https://i.pravatar.cc/300?img=11",
  },
  {
    name: "Олена Ковальчук",
    role: "Партнер, Операційний консалтинг",
    bio: "Експерт з оптимізації бізнес-процесів. MBA INSEAD.",
    image: "https://i.pravatar.cc/300?img=5",
  },
  {
    name: "Максим Петренко",
    role: "Партнер, Цифрова трансформація",
    bio: "10 років у IT-консалтингу. Ex-Accenture.",
    image: "https://i.pravatar.cc/300?img=12",
  },
  {
    name: "Ірина Шевченко",
    role: "Директор з розвитку",
    bio: "Експерт з управління змінами. PhD Економіка.",
    image: "https://i.pravatar.cc/300?img=9",
  },
];

const values = [
  {
    icon: Target,
    title: "Результат",
    description: "Фокусуємось на вимірюваних результатах, а не на процесі заради процесу",
  },
  {
    icon: Users,
    title: "Партнерство",
    description: "Працюємо разом з клієнтом, а не замість нього",
  },
  {
    icon: Lightbulb,
    title: "Інновації",
    description: "Постійно вдосконалюємо методології та впроваджуємо нові підходи",
  },
  {
    icon: Award,
    title: "Якість",
    description: "Високі стандарти у всьому, що ми робимо",
  },
];

export default function AboutPage() {
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
            <span className="text-indigo-400 font-medium">Про компанію</span>
            <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
              Експертиза, якій довіряють
            </h1>
            <p className="text-slate-300 text-lg">
              Consultant Pro — команда досвідчених консультантів, яка допомагає бізнесу
              досягати амбітних цілей.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 bg-indigo-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-4xl font-bold">{stat.value}</div>
                <div className="text-indigo-200">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">Наша історія</h2>
              <div className="space-y-4 text-slate-600">
                <p>
                  Consultant Pro була заснована у 2009 році з метою надати українському бізнесу
                  доступ до консалтингових послуг світового рівня.
                </p>
                <p>
                  За 15 років роботи ми допомогли понад 50 компаніям оптимізувати процеси,
                  збільшити прибутковість та успішно пройти через трансформації.
                </p>
                <p>
                  Наша команда складається з експертів з досвідом роботи у провідних
                  міжнародних консалтингових компаніях: McKinsey, BCG, Accenture.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="aspect-[4/3] relative rounded-2xl overflow-hidden">
                <Image
                  src="https://picsum.photos/seed/aboutcon/800/600"
                  alt="Our office"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Наші цінності</h2>
            <p className="text-slate-600 mt-2">Принципи, які визначають нашу роботу</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full text-center">
                  <CardContent className="pt-8 pb-6">
                    <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-7 h-7 text-indigo-600" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                    <p className="text-slate-600 text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Наша команда</h2>
            <p className="text-slate-600 mt-2">Експерти з міжнародним досвідом</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="relative aspect-square">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg">{member.name}</h3>
                    <p className="text-indigo-600 text-sm mb-2">{member.role}</p>
                    <p className="text-slate-600 text-sm">{member.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">Наш підхід</h2>
              <div className="space-y-4">
                {[
                  "Глибоке занурення в бізнес клієнта та його галузь",
                  "Використання перевірених методологій та фреймворків",
                  "Тісна співпраця з командою клієнта на кожному етапі",
                  "Фокус на практичних рекомендаціях, які можна впровадити",
                  "Супровід на етапі впровадження для досягнення результату",
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
              <Button asChild className="mt-8 bg-indigo-600 hover:bg-indigo-700">
                <Link href="/portfolio/demo/consultant/contact">
                  Обговорити проект
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="aspect-[4/3] relative rounded-2xl overflow-hidden">
                <Image
                  src="https://picsum.photos/seed/approach/800/600"
                  alt="Our approach"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
