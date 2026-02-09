"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Users, Calendar, Award, Heart, Building2, Mic, Gift, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  { icon: Building2, title: "Корпоративи", description: "Тімбілдинги, корпоративні свята, нагородження" },
  { icon: Heart, title: "Весілля", description: "Повна організація весільного торжества" },
  { icon: Mic, title: "Конференції", description: "Бізнес-заходи, форуми, презентації" },
  { icon: Gift, title: "Приватні свята", description: "Дні народження, ювілеї, вечірки" },
];

const stats = [
  { value: "500+", label: "проведених заходів" },
  { value: "8", label: "років досвіду" },
  { value: "50+", label: "партнерів" },
  { value: "100%", label: "задоволених клієнтів" },
];

const portfolio = [
  { title: "Корпоратив IT-компанії", category: "Корпоратив", image: "https://picsum.photos/seed/event1/600/400", guests: 200 },
  { title: "Весілля на березі моря", category: "Весілля", image: "https://picsum.photos/seed/event2/600/400", guests: 80 },
  { title: "Tech Conference 2024", category: "Конференція", image: "https://picsum.photos/seed/event3/600/400", guests: 500 },
];

const testimonials = [
  {
    text: "EventPro перевершили всі очікування! Наш корпоратив став найкращим за всю історію компанії.",
    author: "Олена Коваленко",
    role: "HR Director, TechCorp",
    image: "https://i.pravatar.cc/100?img=5",
  },
  {
    text: "Завдяки EventPro наше весілля стало казкою. Професіонали своєї справи!",
    author: "Андрій та Марія",
    role: "Молодята",
    image: "https://i.pravatar.cc/100?img=11",
  },
];

export default function EventProHomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800 text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://picsum.photos/seed/eventparty/1920/1080"
            alt="Event"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-pink-900/70" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 text-sm font-medium rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              Івент-агентство №1 в Україні
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Створюємо{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300">
                незабутні
              </span>{" "}
              події
            </h1>
            <p className="text-xl text-purple-100 mb-8 leading-relaxed">
              Від ідеї до реалізації — беремо на себе все, щоб ваш захід став особливим.
              Корпоративи, весілля, конференції та приватні свята.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-purple-50 h-14 px-8 text-base">
                <Link href="/portfolio/demo/eventpro/contact">
                  Замовити івент
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-transparent border border-white/50 text-white hover:bg-white/10 h-14 px-8 text-base">
                <Link href="/portfolio/demo/eventpro/portfolio">
                  Наше портфоліо
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white">
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
                <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-purple-600 font-medium">Наші послуги</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">Що ми організовуємо</h2>
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
                <Card className="h-full hover:shadow-xl transition-all hover:-translate-y-1 text-center border-0 shadow-lg">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <service.icon className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                    <p className="text-slate-600">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              <Link href="/portfolio/demo/eventpro/services">
                Всі послуги <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <span className="text-purple-600 font-medium">Портфоліо</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2">Наші роботи</h2>
            </div>
            <Button asChild variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50">
              <Link href="/portfolio/demo/eventpro/portfolio">
                Все портфоліо <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {portfolio.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all group">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-sm text-purple-300">{item.category}</span>
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <span className="text-sm text-white/80">{item.guests} гостей</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-purple-600 font-medium">Відгуки</span>
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
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <Quote className="w-10 h-10 text-purple-200 mb-4" />
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

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Готові створити незабутню подію?
          </h2>
          <p className="text-purple-100 mb-8 max-w-xl mx-auto text-lg">
            Залиште заявку і ми зв&apos;яжемось для обговорення деталей вашого заходу
          </p>
          <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-purple-50 h-14 px-8">
            <Link href="/portfolio/demo/eventpro/contact">
              Замовити івент
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
