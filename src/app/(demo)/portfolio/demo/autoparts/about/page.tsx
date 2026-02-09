"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Users, Award, Truck, Clock, MapPin, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  { value: "10+", label: "років на ринку" },
  { value: "50K+", label: "товарів у каталозі" },
  { value: "15K+", label: "задоволених клієнтів" },
  { value: "24/7", label: "онлайн-замовлення" },
];

const team = [
  { name: "Олексій Мельник", role: "Засновник", image: "https://i.pravatar.cc/300?img=11" },
  { name: "Ірина Коваль", role: "Менеджер", image: "https://i.pravatar.cc/300?img=5" },
  { name: "Петро Сидоренко", role: "Старший майстер СТО", image: "https://i.pravatar.cc/300?img=12" },
];

const advantages = [
  "Тільки оригінальні запчастини та перевірені аналоги",
  "Власний склад у Києві з швидкою доставкою",
  "Професійний автосервіс з гарантією",
  "Консультація та підбір за VIN-кодом",
  "Гнучка система знижок для постійних клієнтів",
  "Можливість повернення протягом 14 днів",
];

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-zinc-900 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-red-500 font-medium">Про компанію</span>
            <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
              AutoParts — ваш надійний партнер
            </h1>
            <p className="text-zinc-300 text-lg">
              Понад 10 років допомагаємо автовласникам підтримувати свої авто у відмінному стані.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 bg-red-600 text-white">
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
                <div className="text-red-100">{stat.label}</div>
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
              <div className="space-y-4 text-zinc-600">
                <p>
                  AutoParts розпочав свою діяльність у 2014 році як невеликий магазин автозапчастин у Києві.
                  З перших днів нашою метою було надавати клієнтам якісні запчастини за доступними цінами.
                </p>
                <p>
                  За роки роботи ми виросли з маленького магазину до повноцінного автомобільного центру
                  з власним складом, інтернет-магазином та станцією технічного обслуговування.
                </p>
                <p>
                  Сьогодні AutoParts — це команда з 30+ професіоналів, які щодня допомагають тисячам
                  автовласників по всій Україні.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/3] relative rounded-2xl overflow-hidden">
                <Image
                  src="https://picsum.photos/seed/aboutauto/800/600"
                  alt="AutoParts history"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-16 bg-zinc-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Чому обирають нас</h2>
            <p className="text-zinc-600 mt-2">Переваги співпраці з AutoParts</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {advantages.map((advantage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3"
              >
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-zinc-700">{advantage}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Truck, title: "Швидка доставка", desc: "По Києву за 2 години" },
              { icon: Award, title: "Гарантія якості", desc: "На всі товари" },
              { icon: Users, title: "Експертна підтримка", desc: "Консультація 24/7" },
              { icon: Clock, title: "Зручний графік", desc: "Працюємо без вихідних" },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center h-full">
                  <CardContent className="pt-8 pb-6">
                    <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="w-7 h-7 text-red-600" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-zinc-600">{feature.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-zinc-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Наша команда</h2>
            <p className="text-zinc-600 mt-2">Професіонали, яким довіряють</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
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
                <p className="text-zinc-600">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Наше розташування</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Магазин та склад</h3>
                    <p className="text-zinc-600">м. Київ, вул. Промислова, 15</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Графік роботи</h3>
                    <p className="text-zinc-600">Пн-Сб: 09:00-19:00</p>
                    <p className="text-zinc-600">Нд: 10:00-17:00</p>
                  </div>
                </div>
              </div>
              <Button asChild className="mt-8 bg-red-600 hover:bg-red-700">
                <Link href="/portfolio/demo/autoparts/contact">
                  Зв&apos;язатись з нами
                </Link>
              </Button>
            </div>

            <div className="aspect-video relative rounded-xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2540.5840830296397!2d30.520368315732873!3d50.44967097947436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4ce50f8b6e3c3%3A0xb528dc4d6dadc4f8!2z0LLRg9C70LjRhtGPINCl0YDQtdGJ0LDRgtC40LosIDEsINCa0LjRl9Cy!5e0!3m2!1suk!2sua!4v1635000000000!5m2!1suk!2sua"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                className="absolute inset-0"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
