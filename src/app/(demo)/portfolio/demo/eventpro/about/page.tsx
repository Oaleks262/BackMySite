"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Award, Users, Heart, Sparkles, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  { value: "8", label: "років досвіду" },
  { value: "500+", label: "заходів" },
  { value: "50+", label: "партнерів" },
  { value: "100%", label: "задоволених клієнтів" },
];

const team = [
  { name: "Анна Коваленко", role: "Засновниця, CEO", image: "https://i.pravatar.cc/300?img=5" },
  { name: "Максим Петренко", role: "Арт-директор", image: "https://i.pravatar.cc/300?img=11" },
  { name: "Олена Шевченко", role: "Івент-менеджер", image: "https://i.pravatar.cc/300?img=9" },
  { name: "Ігор Бондаренко", role: "Продюсер", image: "https://i.pravatar.cc/300?img=12" },
];

const values = [
  { icon: Sparkles, title: "Креативність", description: "Кожен захід унікальний та неповторний" },
  { icon: Heart, title: "Увага до деталей", description: "Продумуємо кожну дрібницю" },
  { icon: Users, title: "Команда", description: "Професіонали з багаторічним досвідом" },
  { icon: Award, title: "Якість", description: "Найвищі стандарти організації" },
];

export default function AboutPage() {
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
            <span className="text-purple-300 font-medium">Про нас</span>
            <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
              EventPro — агентство мрій
            </h1>
            <p className="text-purple-100 text-lg">
              Ми створюємо події, які залишаються в пам&apos;яті назавжди.
              8 років досвіду та понад 500 успішних заходів.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
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
                <div className="text-purple-100">{stat.label}</div>
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
                  EventPro було засновано у 2016 році Анною Коваленко — професійним івент-менеджером
                  з мрією створювати по-справжньому особливі події.
                </p>
                <p>
                  Ми почали з невеликих приватних свят і за 8 років виросли до провідного
                  івент-агентства України з командою з 20+ професіоналів.
                </p>
                <p>
                  Сьогодні ми організовуємо заходи будь-якого масштабу — від камерних весіль
                  до масштабних корпоративів та конференцій на тисячі гостей.
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
                  src="https://picsum.photos/seed/eventabout/800/600"
                  alt="Our team"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Наші цінності</h2>
            <p className="text-slate-600 mt-2">Що робить кожен наш захід особливим</p>
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
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-7 h-7 text-purple-600" />
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
            <p className="text-slate-600 mt-2">Творці незабутніх моментів</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="relative w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-purple-600">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="py-16 bg-purple-50">
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
                  "Повний цикл організації «під ключ»",
                  "Креативний підхід до кожного заходу",
                  "Власна база перевірених підрядників",
                  "Прозоре ціноутворення без прихованих платежів",
                  "Координація заходу в день проведення",
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
              <Button asChild className="mt-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <Link href="/portfolio/demo/eventpro/contact">
                  Обговорити захід
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
                  src="https://picsum.photos/seed/eventwork/800/600"
                  alt="Our work"
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
