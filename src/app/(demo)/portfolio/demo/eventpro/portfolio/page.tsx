"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { X, Users, MapPin, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const categories = [
  { id: "all", name: "Всі" },
  { id: "corporate", name: "Корпоративи" },
  { id: "wedding", name: "Весілля" },
  { id: "conference", name: "Конференції" },
  { id: "private", name: "Приватні свята" },
];

const portfolioItems = [
  {
    id: 1,
    title: "Новорічний корпоратив IT-компанії",
    category: "corporate",
    categoryName: "Корпоратив",
    image: "https://picsum.photos/seed/port1/800/600",
    guests: 200,
    location: "Київ, Art-завод Платформа",
    date: "Грудень 2024",
    description: "Тематична вечірка у стилі «Голлівуд» з червоною доріжкою, фотозоною та виступом зіркових гостей.",
  },
  {
    id: 2,
    title: "Весілля на березі Дніпра",
    category: "wedding",
    categoryName: "Весілля",
    image: "https://picsum.photos/seed/port2/800/600",
    guests: 80,
    location: "Київська обл., Конча-Заспа",
    date: "Серпень 2024",
    description: "Елегантне весілля під відкритим небом з церемонією на заході сонця та банкетом у шатрі.",
  },
  {
    id: 3,
    title: "Tech Summit Ukraine 2024",
    category: "conference",
    categoryName: "Конференція",
    image: "https://picsum.photos/seed/port3/800/600",
    guests: 500,
    location: "Київ, МВЦ",
    date: "Жовтень 2024",
    description: "Триденна IT-конференція з 50+ спікерами, воркшопами та нетворкінг-зоною.",
  },
  {
    id: 4,
    title: "День народження 50 років",
    category: "private",
    categoryName: "Приватне свято",
    image: "https://picsum.photos/seed/port4/800/600",
    guests: 100,
    location: "Львів, Ресторан «Цитадель»",
    date: "Вересень 2024",
    description: "Ювілейна вечірка з живою музикою, кулінарним шоу та феєрверком.",
  },
  {
    id: 5,
    title: "Корпоратив банку на 500 осіб",
    category: "corporate",
    categoryName: "Корпоратив",
    image: "https://picsum.photos/seed/port5/800/600",
    guests: 500,
    location: "Київ, Палац Україна",
    date: "Грудень 2024",
    description: "Масштабний захід з концертною програмою, церемонією нагородження та фуршетом.",
  },
  {
    id: 6,
    title: "Весілля у замку",
    category: "wedding",
    categoryName: "Весілля",
    image: "https://picsum.photos/seed/port6/800/600",
    guests: 120,
    location: "Львівська обл., Замок Паланок",
    date: "Липень 2024",
    description: "Казкове весілля у середньовічному стилі з лицарським турніром та банкетом.",
  },
];

type PortfolioItem = typeof portfolioItems[0];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const filteredItems = activeCategory === "all"
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeCategory);

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
            <span className="text-purple-300 font-medium">Портфоліо</span>
            <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
              Наші роботи
            </h1>
            <p className="text-purple-100 text-lg">
              Понад 500 успішно організованих заходів. Кожен проект — унікальна історія.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-8 bg-white border-b sticky top-20 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                    : "bg-purple-50 text-purple-600 hover:bg-purple-100"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-16 bg-purple-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card
                    className="overflow-hidden hover:shadow-xl transition-all cursor-pointer group"
                    onClick={() => setSelectedItem(item)}
                  >
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <Badge className="absolute top-4 left-4 bg-gradient-to-r from-purple-600 to-pink-600">
                        {item.categoryName}
                      </Badge>
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-white/80">
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" /> {item.guests}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" /> {item.location.split(",")[0]}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedItem && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50"
              onClick={() => setSelectedItem(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-4 md:inset-10 lg:inset-20 bg-white rounded-2xl z-50 overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b">
                <Badge className="bg-gradient-to-r from-purple-600 to-pink-600">
                  {selectedItem.categoryName}
                </Badge>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="p-2 hover:bg-purple-50 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                <div className="grid lg:grid-cols-2 h-full">
                  <div className="relative aspect-video lg:aspect-auto lg:h-full">
                    <Image
                      src={selectedItem.image}
                      alt={selectedItem.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="p-6 lg:p-8">
                    <h2 className="text-2xl lg:text-3xl font-bold mb-4">
                      {selectedItem.title}
                    </h2>

                    <p className="text-slate-600 mb-6">{selectedItem.description}</p>

                    <div className="space-y-4 mb-8">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Users className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <div className="text-sm text-slate-500">Гостей</div>
                          <div className="font-medium">{selectedItem.guests} осіб</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <div className="text-sm text-slate-500">Локація</div>
                          <div className="font-medium">{selectedItem.location}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <div className="text-sm text-slate-500">Дата</div>
                          <div className="font-medium">{selectedItem.date}</div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t">
                      <p className="text-slate-500 text-sm mb-4">
                        Хочете схожий захід? Зв&apos;яжіться з нами!
                      </p>
                      <Button asChild className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                        <Link href="/portfolio/demo/eventpro/contact">
                          Замовити івент
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Хочете стати частиною нашого портфоліо?
          </h2>
          <p className="text-purple-100 mb-8 max-w-xl mx-auto">
            Залиште заявку і ми створимо для вас незабутній захід
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
