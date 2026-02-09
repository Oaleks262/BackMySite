"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, TrendingUp, Users, Target, Lightbulb, BarChart, CheckCircle, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: Target,
    title: "Бізнес-стратегія",
    description: "Розробка стратегії розвитку та конкурентних переваг",
  },
  {
    icon: BarChart,
    title: "Операційна ефективність",
    description: "Оптимізація процесів та зниження витрат",
  },
  {
    icon: Lightbulb,
    title: "Цифрова трансформація",
    description: "Впровадження технологій для зростання бізнесу",
  },
  {
    icon: Users,
    title: "Управління змінами",
    description: "Супровід організаційних трансформацій",
  },
];

const stats = [
  { value: "150+", label: "Успішних проектів" },
  { value: "50+", label: "Клієнтів" },
  { value: "€10M+", label: "Збережено клієнтам" },
  { value: "15", label: "Років досвіду" },
];

const testimonials = [
  {
    text: "Завдяки Consultant Pro ми збільшили прибутковість на 40% за рік. Команда глибоко занурилась у наш бізнес та запропонувала дієві рішення.",
    author: "Олена Петренко",
    role: "CEO, TechStart",
    image: "https://i.pravatar.cc/100?img=5",
  },
  {
    text: "Професійний підхід та чіткі рекомендації. Допомогли оптимізувати операційні процеси та скоротити витрати на 25%.",
    author: "Максим Коваленко",
    role: "COO, RetailGroup",
    image: "https://i.pravatar.cc/100?img=11",
  },
];

const clients = ["TechCorp", "RetailPro", "FinanceHub", "MediaGroup", "BuildCo", "FoodChain"];

export default function ConsultantHomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjIiLz48L2c+PC9zdmc+')] opacity-20" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 bg-indigo-500/20 text-indigo-300 text-sm font-medium rounded-full mb-6">
                Стратегічний консалтинг
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Трансформуємо бізнес для{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
                  стабільного зростання
                </span>
              </h1>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Допомагаємо компаніям досягати амбітних цілей через стратегічне планування,
                операційну ефективність та цифрову трансформацію.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700 h-14 px-8 text-base">
                  <Link href="/portfolio/demo/consultant/contact">
                    Безкоштовна консультація
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button asChild size="lg" className="bg-transparent border border-slate-600 text-white hover:bg-slate-800 h-14 px-8 text-base">
                  <Link href="/portfolio/demo/consultant/cases">
                    Наші кейси
                  </Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="aspect-square relative rounded-2xl overflow-hidden">
                  <Image
                    src="https://picsum.photos/seed/consultant/600/600"
                    alt="Business consulting"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white text-slate-900 p-6 rounded-xl shadow-2xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">+40%</div>
                      <div className="text-slate-500 text-sm">Середнє зростання клієнтів</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-indigo-600 mb-2">{stat.value}</div>
                <div className="text-slate-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-indigo-600 font-medium">Що ми робимо</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">Наші послуги</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all hover:-translate-y-1 border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                      <service.icon className="w-7 h-7 text-indigo-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                    <p className="text-slate-600">{service.description}</p>
                    <Link
                      href="/portfolio/demo/consultant/services"
                      className="inline-flex items-center gap-1 text-indigo-600 font-medium mt-4 hover:gap-2 transition-all"
                    >
                      Детальніше <ArrowRight className="w-4 h-4" />
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-indigo-600 font-medium">Чому ми</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">
                Партнер для досягнення ваших бізнес-цілей
              </h2>
              <div className="space-y-4">
                {[
                  "Глибоке занурення в специфіку вашого бізнесу",
                  "Практичні рекомендації, а не теоретичні звіти",
                  "Супровід на етапі впровадження змін",
                  "Вимірювані результати та KPI",
                  "Команда експертів з різних галузей",
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
              <Button asChild className="mt-8 bg-indigo-600 hover:bg-indigo-700">
                <Link href="/portfolio/demo/consultant/about">
                  Про компанію
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/3] relative rounded-2xl overflow-hidden">
                <Image
                  src="https://picsum.photos/seed/team/800/600"
                  alt="Our team"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-indigo-600 font-medium">Відгуки</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">Що кажуть клієнти</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-8">
                    <Quote className="w-10 h-10 text-indigo-200 mb-4" />
                    <p className="text-slate-600 mb-6 italic">&ldquo;{testimonial.text}&rdquo;</p>
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.author}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-semibold">{testimonial.author}</div>
                        <div className="text-slate-500 text-sm">{testimonial.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-center text-slate-500 mb-8">Нам довіряють</h3>
          <div className="flex flex-wrap items-center justify-center gap-12">
            {clients.map((client, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="text-2xl font-bold text-slate-300 hover:text-slate-500 transition-colors"
              >
                {client}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-indigo-600 to-violet-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Готові до трансформації?
          </h2>
          <p className="text-indigo-100 mb-8 max-w-xl mx-auto text-lg">
            Замовте безкоштовну консультацію і ми допоможемо визначити точки зростання вашого бізнесу
          </p>
          <Button asChild size="lg" className="bg-white text-indigo-600 hover:bg-slate-100 h-14 px-8">
            <Link href="/portfolio/demo/consultant/contact">
              Замовити консультацію
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
