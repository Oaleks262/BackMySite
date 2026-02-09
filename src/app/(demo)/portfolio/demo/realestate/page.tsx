"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Building2, Home, Key, FileCheck, MapPin, Bed, Bath, Square, Heart, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const services = [
  { icon: Home, title: "Купівля", description: "Підберемо ідеальний варіант" },
  { icon: Key, title: "Продаж", description: "Продамо вигідно та швидко" },
  { icon: Building2, title: "Оренда", description: "Знайдемо орендарів" },
  { icon: FileCheck, title: "Оцінка", description: "Професійна оцінка вартості" },
];

const stats = [
  { value: "10+", label: "років досвіду" },
  { value: "5000+", label: "об'єктів продано" },
  { value: "98%", label: "задоволених клієнтів" },
  { value: "50+", label: "агентів" },
];

const featuredProperties = [
  {
    id: 1,
    title: "Сучасна квартира в центрі",
    location: "Київ, Печерськ",
    price: 185000,
    image: "https://picsum.photos/seed/apt1/600/400",
    beds: 3,
    baths: 2,
    area: 95,
    type: "Продаж",
    isNew: true,
  },
  {
    id: 2,
    title: "Затишний будинок з садом",
    location: "Київська обл., Бориспіль",
    price: 320000,
    image: "https://picsum.photos/seed/house1/600/400",
    beds: 4,
    baths: 3,
    area: 180,
    type: "Продаж",
    isNew: false,
  },
  {
    id: 3,
    title: "Офіс у бізнес-центрі",
    location: "Київ, Поділ",
    price: 2500,
    image: "https://picsum.photos/seed/office1/600/400",
    beds: 0,
    baths: 1,
    area: 75,
    type: "Оренда/міс",
    isNew: true,
  },
];

export default function RealEstateHomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-emerald-900 text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <Image
            src="https://picsum.photos/seed/realestate/1920/1080"
            alt="Real estate"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900 via-emerald-900/90 to-emerald-900/70" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-12"
          >
            <span className="inline-block px-4 py-1.5 bg-emerald-500/20 text-emerald-300 text-sm font-medium rounded-full mb-6">
              №1 Агентство нерухомості в Україні
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Знайдіть дім вашої мрії
            </h1>
            <p className="text-xl text-emerald-100 mb-8">
              Професійна допомога у купівлі, продажу та оренді нерухомості.
              Понад 5000 успішних угод за 10 років роботи.
            </p>
          </motion.div>

          {/* Search Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-2xl"
          >
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="text-slate-600 text-sm mb-2 block">Тип угоди</label>
                <Select defaultValue="buy">
                  <SelectTrigger className="h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="buy">Купівля</SelectItem>
                    <SelectItem value="rent">Оренда</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-slate-600 text-sm mb-2 block">Тип нерухомості</label>
                <Select defaultValue="apartment">
                  <SelectTrigger className="h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">Квартира</SelectItem>
                    <SelectItem value="house">Будинок</SelectItem>
                    <SelectItem value="commercial">Комерційна</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-slate-600 text-sm mb-2 block">Місто</label>
                <Select defaultValue="kyiv">
                  <SelectTrigger className="h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kyiv">Київ</SelectItem>
                    <SelectItem value="lviv">Львів</SelectItem>
                    <SelectItem value="odesa">Одеса</SelectItem>
                    <SelectItem value="dnipro">Дніпро</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button className="w-full h-12 bg-emerald-600 hover:bg-emerald-700">
                  <Search className="w-5 h-5 mr-2" />
                  Знайти
                </Button>
              </div>
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
                <div className="text-4xl md:text-5xl font-bold text-emerald-600 mb-2">{stat.value}</div>
                <div className="text-slate-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-emerald-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <span className="text-emerald-600 font-medium">Рекомендуємо</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2">Топ пропозиції</h2>
            </div>
            <Button asChild variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50">
              <Link href="/portfolio/demo/realestate/catalog">
                Всі об&apos;єкти <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all group">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={property.image}
                      alt={property.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className="bg-emerald-600">{property.type}</Badge>
                      {property.isNew && <Badge className="bg-orange-500">Нове</Badge>}
                    </div>
                    <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                      <Heart className="w-5 h-5 text-slate-400 hover:text-red-500" />
                    </button>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-slate-500 text-sm mb-2">
                      <MapPin className="w-4 h-4" />
                      {property.location}
                    </div>
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-emerald-600 transition-colors">
                      {property.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
                      {property.beds > 0 && (
                        <span className="flex items-center gap-1">
                          <Bed className="w-4 h-4" /> {property.beds}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Bath className="w-4 h-4" /> {property.baths}
                      </span>
                      <span className="flex items-center gap-1">
                        <Square className="w-4 h-4" /> {property.area} м²
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t">
                      <span className="text-2xl font-bold text-emerald-600">
                        ${property.price.toLocaleString()}
                      </span>
                      <Button asChild variant="ghost" size="sm" className="text-emerald-600 hover:bg-emerald-50">
                        <Link href="/portfolio/demo/realestate/catalog">
                          Детальніше
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

      {/* Services */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-emerald-600 font-medium">Що ми робимо</span>
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
                <Card className="h-full hover:shadow-xl transition-all hover:-translate-y-1 text-center">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <service.icon className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                    <p className="text-slate-600">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700">
              <Link href="/portfolio/demo/realestate/services">
                Всі послуги <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-emerald-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Готові знайти ідеальну нерухомість?
          </h2>
          <p className="text-emerald-100 mb-8 max-w-xl mx-auto text-lg">
            Отримайте безкоштовну консультацію від наших експертів
          </p>
          <Button asChild size="lg" className="bg-white text-emerald-600 hover:bg-emerald-50 h-14 px-8">
            <Link href="/portfolio/demo/realestate/contact">
              Замовити консультацію
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
