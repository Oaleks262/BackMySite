"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Truck, Shield, Clock, CreditCard, Search, Car, Wrench, Gauge, Zap, Settings, Disc, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const categories = [
  { icon: Settings, name: "Двигун", count: "5 000+", href: "/portfolio/demo/autoparts/catalog" },
  { icon: Disc, name: "Гальма", count: "3 000+", href: "/portfolio/demo/autoparts/catalog" },
  { icon: Gauge, name: "Підвіска", count: "4 500+", href: "/portfolio/demo/autoparts/catalog" },
  { icon: Zap, name: "Електрика", count: "2 800+", href: "/portfolio/demo/autoparts/catalog" },
  { icon: Car, name: "Кузов", count: "6 000+", href: "/portfolio/demo/autoparts/catalog" },
  { icon: Wrench, name: "Інструменти", count: "1 500+", href: "/portfolio/demo/autoparts/catalog" },
];

const features = [
  { icon: Truck, title: "Швидка доставка", description: "Доставка по Києву за 2 години, по Україні 1-2 дні" },
  { icon: Shield, title: "Гарантія якості", description: "Тільки оригінальні запчастини та перевірені аналоги" },
  { icon: Clock, title: "Працюємо без вихідних", description: "Пн-Сб 09:00-19:00, Нд 10:00-17:00" },
  { icon: CreditCard, title: "Зручна оплата", description: "Готівка, картка, безготівковий розрахунок" },
];

const popularProducts = [
  {
    id: 1,
    name: "Гальмівні колодки Bosch",
    article: "0986494128",
    price: 1850,
    oldPrice: 2200,
    image: "https://picsum.photos/seed/brake1/400/400",
    brand: "Bosch",
    inStock: true,
  },
  {
    id: 2,
    name: "Масляний фільтр Mann",
    article: "W 712/95",
    price: 380,
    oldPrice: null,
    image: "https://picsum.photos/seed/filter1/400/400",
    brand: "Mann",
    inStock: true,
  },
  {
    id: 3,
    name: "Амортизатор передній Kayaba",
    article: "334700",
    price: 2450,
    oldPrice: 2800,
    image: "https://picsum.photos/seed/shock1/400/400",
    brand: "Kayaba",
    inStock: true,
  },
  {
    id: 4,
    name: "Свічки запалювання NGK",
    article: "BKR6E-11",
    price: 165,
    oldPrice: null,
    image: "https://picsum.photos/seed/spark1/400/400",
    brand: "NGK",
    inStock: false,
  },
];

const brands = [
  "Bosch", "Mann", "Kayaba", "NGK", "Valeo", "Sachs", "TRW", "Continental"
];

export default function AutoPartsHomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-zinc-900 text-white py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <Image
            src="https://picsum.photos/seed/autoparts/1920/1080"
            alt="Auto parts"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-900/80 to-transparent" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="bg-red-600 mb-4">Понад 50 000 позицій на складі</Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Автозапчастини для будь-якого авто
              </h1>
              <p className="text-xl text-zinc-300 mb-8">
                Оригінальні запчастини та якісні аналоги від провідних виробників.
                Швидка доставка по всій Україні.
              </p>

              {/* Search Box */}
              <div className="bg-white rounded-xl p-2 flex gap-2">
                <Input
                  type="text"
                  placeholder="Введіть артикул або назву запчастини..."
                  className="flex-1 border-0 text-zinc-800 h-12"
                />
                <Button className="bg-red-600 hover:bg-red-700 h-12 px-6">
                  <Search className="w-5 h-5 mr-2" />
                  Знайти
                </Button>
              </div>

              <p className="text-zinc-400 text-sm mt-4">
                Популярні запити: масляний фільтр, гальмівні колодки, амортизатори
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3"
              >
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{feature.title}</h3>
                  <p className="text-zinc-500 text-xs mt-0.5">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-zinc-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">Категорії товарів</h2>
            <p className="text-zinc-600 mt-2">Оберіть категорію для пошуку потрібних запчастин</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={category.href}>
                  <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group">
                    <CardContent className="p-6 text-center">
                      <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-red-600 transition-colors">
                        <category.icon className="w-7 h-7 text-red-600 group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="font-semibold">{category.name}</h3>
                      <p className="text-zinc-500 text-sm">{category.count} товарів</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold">Популярні товари</h2>
              <p className="text-zinc-600 mt-1">Найбільш затребувані запчастини</p>
            </div>
            <Button asChild variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
              <Link href="/portfolio/demo/autoparts/catalog">
                Весь каталог <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden group hover:shadow-xl transition-shadow">
                  <div className="relative aspect-square bg-zinc-100">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                    {product.oldPrice && (
                      <Badge className="absolute top-3 left-3 bg-red-600">
                        -{Math.round((1 - product.price / product.oldPrice) * 100)}%
                      </Badge>
                    )}
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white font-medium">Немає в наявності</span>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <Badge variant="outline" className="mb-2">{product.brand}</Badge>
                    <h3 className="font-semibold mb-1 line-clamp-2">{product.name}</h3>
                    <p className="text-zinc-500 text-sm mb-3">Арт: {product.article}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xl font-bold text-red-600">{product.price} ₴</span>
                        {product.oldPrice && (
                          <span className="text-zinc-400 line-through text-sm ml-2">{product.oldPrice} ₴</span>
                        )}
                      </div>
                      <Button size="sm" className="bg-red-600 hover:bg-red-700" disabled={!product.inStock}>
                        В кошик
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="py-12 bg-zinc-100">
        <div className="container mx-auto px-4">
          <h3 className="text-center text-zinc-500 mb-8">Працюємо з провідними брендами</h3>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {brands.map((brand, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="text-2xl font-bold text-zinc-400 hover:text-zinc-600 transition-colors cursor-pointer"
              >
                {brand}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Badge className="bg-red-600 mb-4">Автосервіс</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Власна СТО з досвідченими майстрами
              </h2>
              <p className="text-zinc-600 mb-6">
                Не тільки продаємо запчастини, а й встановлюємо їх.
                Власна станція технічного обслуговування з сучасним обладнанням.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Діагностика всіх систем авто",
                  "Ремонт ходової частини",
                  "Заміна гальмівної системи",
                  "Ремонт двигуна та КПП",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-600" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button asChild className="bg-red-600 hover:bg-red-700">
                <Link href="/portfolio/demo/autoparts/services">
                  Наші послуги <ArrowRight className="w-4 h-4 ml-2" />
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
                  src="https://picsum.photos/seed/garage/800/600"
                  alt="Auto service"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-red-600 text-white p-6 rounded-xl shadow-xl">
                <div className="text-3xl font-bold">10+</div>
                <div className="text-red-200">років досвіду</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-zinc-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Не знайшли потрібну запчастину?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Зв&apos;яжіться з нашими консультантами і ми підберемо запчастину за VIN-кодом вашого авто
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-red-600 hover:bg-red-700">
              <Link href="/portfolio/demo/autoparts/contact">
                Підібрати запчастину
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
