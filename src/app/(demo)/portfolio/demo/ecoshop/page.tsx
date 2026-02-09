"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Search,
  ShoppingCart,
  Heart,
  User,
  Leaf,
  Truck,
  Shield,
  Star,
  Plus,
  Minus,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const products = [
  {
    id: 1,
    name: "Бамбукова зубна щітка",
    price: 89,
    oldPrice: 129,
    image: "https://picsum.photos/seed/bamboo1/400/400",
    category: "Гігієна",
    rating: 4.8,
    reviews: 124,
    badge: "Хіт",
  },
  {
    id: 2,
    name: "Еко-сумка багаторазова",
    price: 249,
    image: "https://picsum.photos/seed/ecobag/400/400",
    category: "Сумки",
    rating: 4.9,
    reviews: 89,
    badge: "Новинка",
  },
  {
    id: 3,
    name: "Натуральне мило ручної роботи",
    price: 79,
    image: "https://picsum.photos/seed/soap/400/400",
    category: "Косметика",
    rating: 4.7,
    reviews: 56,
  },
  {
    id: 4,
    name: "Металева пляшка для води",
    price: 449,
    oldPrice: 599,
    image: "https://picsum.photos/seed/bottle/400/400",
    category: "Посуд",
    rating: 4.9,
    reviews: 203,
    badge: "-25%",
  },
  {
    id: 5,
    name: "Органічна кава в зернах",
    price: 329,
    image: "https://picsum.photos/seed/coffee/400/400",
    category: "Їжа",
    rating: 4.6,
    reviews: 78,
  },
  {
    id: 6,
    name: "Набір бамбукових столових приборів",
    price: 389,
    image: "https://picsum.photos/seed/cutlery/400/400",
    category: "Посуд",
    rating: 4.8,
    reviews: 134,
    badge: "Бестселер",
  },
  {
    id: 7,
    name: "Воскові серветки для їжі",
    price: 199,
    image: "https://picsum.photos/seed/waxwrap/400/400",
    category: "Кухня",
    rating: 4.5,
    reviews: 45,
  },
  {
    id: 8,
    name: "Шампунь твердий без сульфатів",
    price: 159,
    image: "https://picsum.photos/seed/shampoo/400/400",
    category: "Косметика",
    rating: 4.7,
    reviews: 167,
  },
];

const categories = ["Всі", "Косметика", "Посуд", "Гігієна", "Їжа", "Сумки", "Кухня"];

export default function EcoShopDemo() {
  const [activeCategory, setActiveCategory] = useState("Всі");
  const [cartItems, setCartItems] = useState<number[]>([]);

  const filteredProducts =
    activeCategory === "Всі"
      ? products
      : products.filter((p) => p.category === activeCategory);

  const addToCart = (id: number) => {
    setCartItems((prev) => [...prev, id]);
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Demo Banner */}
      <div className="bg-green-600 text-white text-center py-2 text-sm font-medium">
        <Link href="/portfolio" className="hover:underline inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Це демо-версія. Повернутись до портфоліо
        </Link>
      </div>

      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4">
          {/* Top bar */}
          <div className="flex items-center justify-between py-2 border-b text-sm text-stone-600">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Truck className="w-4 h-4" />
                Безкоштовна доставка від 500₴
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span>+380 (67) 123-45-67</span>
            </div>
          </div>

          {/* Main header */}
          <div className="flex items-center justify-between py-4 gap-8">
            <Link href="/portfolio/demo/ecoshop" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl text-green-800">EcoShop</span>
            </Link>

            <div className="flex-1 max-w-xl hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                <Input
                  placeholder="Пошук еко-товарів..."
                  className="pl-10 bg-stone-100 border-0 focus-visible:ring-green-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-stone-100 rounded-full">
                <Heart className="w-6 h-6 text-stone-600" />
              </button>
              <button className="relative p-2 hover:bg-stone-100 rounded-full">
                <ShoppingCart className="w-6 h-6 text-stone-600" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-600 text-white text-xs rounded-full flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </button>
              <button className="p-2 hover:bg-stone-100 rounded-full">
                <User className="w-6 h-6 text-stone-600" />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-6 py-3 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? "text-green-600"
                    : "text-stone-600 hover:text-green-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-green-600 to-emerald-500 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-lg">
              <Badge className="bg-white/20 text-white mb-4">Весняний розпродаж</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Живи екологічно
              </h1>
              <p className="text-green-100 mb-6">
                Знижки до 40% на всі еко-товари для дому. Зроби свій внесок у збереження планети!
              </p>
              <Button size="lg" className="bg-white text-green-600 hover:bg-green-50">
                Дивитись акції
              </Button>
            </div>
            <div className="relative w-64 h-64">
              <Image
                src="https://picsum.photos/seed/ecohero/400/400"
                alt="Eco products"
                fill
                className="object-cover rounded-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-8 border-b bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Leaf, text: "100% екологічно" },
              { icon: Truck, text: "Швидка доставка" },
              { icon: Shield, text: "Гарантія якості" },
              { icon: Heart, text: "Підтримка тварин" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 justify-center">
                <item.icon className="w-6 h-6 text-green-600" />
                <span className="text-sm font-medium text-stone-700">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-stone-800">
              {activeCategory === "Всі" ? "Популярні товари" : activeCategory}
            </h2>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="w-4 h-4" />
              Фільтри
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                  {product.badge && (
                    <Badge
                      className={`absolute top-3 left-3 ${
                        product.badge.includes("%")
                          ? "bg-red-500"
                          : product.badge === "Новинка"
                          ? "bg-blue-500"
                          : "bg-green-600"
                      }`}
                    >
                      {product.badge}
                    </Badge>
                  )}
                  <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                    <Heart className="w-4 h-4 text-stone-400 hover:text-red-500" />
                  </button>
                </div>
                <div className="p-4">
                  <p className="text-xs text-stone-500 mb-1">{product.category}</p>
                  <h3 className="font-medium text-stone-800 mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 mb-3">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium">{product.rating}</span>
                    <span className="text-xs text-stone-400">({product.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-green-600">{product.price}₴</span>
                      {product.oldPrice && (
                        <span className="text-sm text-stone-400 line-through ml-2">
                          {product.oldPrice}₴
                        </span>
                      )}
                    </div>
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 h-8 w-8 p-0"
                      onClick={() => addToCart(product.id)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <Leaf className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-stone-800 mb-2">
              Приєднуйся до еко-спільноти
            </h2>
            <p className="text-stone-600 mb-6">
              Отримуй знижки та поради про екологічний спосіб життя
            </p>
            <div className="flex gap-3">
              <Input placeholder="Ваш email" className="flex-1" />
              <Button className="bg-green-600 hover:bg-green-700">
                Підписатись
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-800 text-stone-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-white">EcoShop</span>
              </div>
              <p className="text-sm">
                Екологічні товари для свідомого споживання
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Каталог</h4>
              <ul className="space-y-2 text-sm">
                <li>Косметика</li>
                <li>Посуд</li>
                <li>Гігієна</li>
                <li>Їжа</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Допомога</h4>
              <ul className="space-y-2 text-sm">
                <li>Доставка</li>
                <li>Оплата</li>
                <li>Повернення</li>
                <li>Контакти</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Контакти</h4>
              <ul className="space-y-2 text-sm">
                <li>+380 (67) 123-45-67</li>
                <li>hello@ecoshop.ua</li>
                <li>Київ, Україна</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-stone-700 pt-8 text-center text-sm">
            <p>Демонстраційний сайт створено Growth-Tech</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
