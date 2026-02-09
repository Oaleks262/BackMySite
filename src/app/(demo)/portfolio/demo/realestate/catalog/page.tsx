"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Search, MapPin, Bed, Bath, Square, Heart, SlidersHorizontal, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const properties = [
  {
    id: 1,
    title: "Сучасна квартира в центрі",
    location: "Київ, Печерськ",
    price: 185000,
    image: "https://picsum.photos/seed/prop1/600/400",
    beds: 3,
    baths: 2,
    area: 95,
    type: "Продаж",
    propertyType: "Квартира",
    isNew: true,
  },
  {
    id: 2,
    title: "Затишний будинок з садом",
    location: "Київська обл., Бориспіль",
    price: 320000,
    image: "https://picsum.photos/seed/prop2/600/400",
    beds: 4,
    baths: 3,
    area: 180,
    type: "Продаж",
    propertyType: "Будинок",
    isNew: false,
  },
  {
    id: 3,
    title: "Офіс у бізнес-центрі",
    location: "Київ, Поділ",
    price: 2500,
    image: "https://picsum.photos/seed/prop3/600/400",
    beds: 0,
    baths: 1,
    area: 75,
    type: "Оренда/міс",
    propertyType: "Комерційна",
    isNew: true,
  },
  {
    id: 4,
    title: "Студія біля метро",
    location: "Київ, Оболонь",
    price: 65000,
    image: "https://picsum.photos/seed/prop4/600/400",
    beds: 1,
    baths: 1,
    area: 38,
    type: "Продаж",
    propertyType: "Квартира",
    isNew: false,
  },
  {
    id: 5,
    title: "Пентхаус з терасою",
    location: "Київ, Шевченківський",
    price: 450000,
    image: "https://picsum.photos/seed/prop5/600/400",
    beds: 4,
    baths: 3,
    area: 200,
    type: "Продаж",
    propertyType: "Квартира",
    isNew: true,
  },
  {
    id: 6,
    title: "Таунхаус у котеджному містечку",
    location: "Київська обл., Вишневе",
    price: 180000,
    image: "https://picsum.photos/seed/prop6/600/400",
    beds: 3,
    baths: 2,
    area: 150,
    type: "Продаж",
    propertyType: "Будинок",
    isNew: false,
  },
];

export default function CatalogPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <>
      {/* Header */}
      <section className="bg-emerald-900 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Каталог нерухомості</h1>
          <p className="text-emerald-200">Понад 500 об&apos;єктів у базі</p>
        </div>
      </section>

      {/* Search Bar */}
      <section className="py-6 bg-white border-b sticky top-20 z-40">
        <div className="container mx-auto px-4">
          <div className="flex gap-4 flex-wrap">
            <div className="relative flex-1 min-w-[200px]">
              <Input
                type="search"
                placeholder="Пошук за адресою або назвою..."
                className="pl-10 h-12"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-40 h-12">
                <SelectValue placeholder="Тип угоди" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Всі</SelectItem>
                <SelectItem value="sale">Продаж</SelectItem>
                <SelectItem value="rent">Оренда</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-40 h-12">
                <SelectValue placeholder="Тип" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Всі типи</SelectItem>
                <SelectItem value="apartment">Квартира</SelectItem>
                <SelectItem value="house">Будинок</SelectItem>
                <SelectItem value="commercial">Комерційна</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="h-12">
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Фільтри
            </Button>
          </div>
        </div>
      </section>

      <section className="py-8 bg-emerald-50">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            {/* Sidebar */}
            <aside className="w-72 flex-shrink-0 hidden lg:block">
              <div className="bg-white rounded-xl p-6 shadow-sm sticky top-44">
                <h3 className="font-semibold text-lg mb-4">Фільтри</h3>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Ціна ($)</h4>
                  <div className="flex gap-2">
                    <Input type="number" placeholder="Від" className="h-10" />
                    <Input type="number" placeholder="До" className="h-10" />
                  </div>
                </div>

                {/* Area */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Площа (м²)</h4>
                  <div className="flex gap-2">
                    <Input type="number" placeholder="Від" className="h-10" />
                    <Input type="number" placeholder="До" className="h-10" />
                  </div>
                </div>

                {/* Rooms */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Кімнат</h4>
                  <div className="flex gap-2">
                    {["1", "2", "3", "4+"].map((num) => (
                      <button
                        key={num}
                        className="w-10 h-10 border rounded-lg hover:border-emerald-600 hover:text-emerald-600"
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Особливості</h4>
                  <div className="space-y-2">
                    {["Балкон", "Паркінг", "Меблі", "Ремонт"].map((feature) => (
                      <label key={feature} className="flex items-center gap-2 cursor-pointer">
                        <Checkbox />
                        <span className="text-sm">{feature}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  Застосувати
                </Button>
              </div>
            </aside>

            {/* Properties */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-6 bg-white rounded-xl p-4 shadow-sm">
                <span className="text-slate-600">Знайдено: {properties.length} об&apos;єктів</span>
                <div className="flex items-center gap-4">
                  <Select defaultValue="newest">
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Спочатку нові</SelectItem>
                      <SelectItem value="price-asc">Дешевші спочатку</SelectItem>
                      <SelectItem value="price-desc">Дорожчі спочатку</SelectItem>
                      <SelectItem value="area">За площею</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex border rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 ${viewMode === "grid" ? "bg-emerald-100 text-emerald-600" : ""}`}
                    >
                      <Grid className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 ${viewMode === "list" ? "bg-emerald-100 text-emerald-600" : ""}`}
                    >
                      <List className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Properties Grid/List */}
              <div className={viewMode === "grid" ? "grid md:grid-cols-2 gap-6" : "space-y-4"}>
                {properties.map((property, index) => (
                  <motion.div
                    key={property.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="overflow-hidden hover:shadow-xl transition-all group">
                      <div className={viewMode === "list" ? "flex" : ""}>
                        <div className={`relative ${viewMode === "list" ? "w-72 flex-shrink-0" : "aspect-[4/3]"}`}>
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
                        <CardContent className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
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
                            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                              Детальніше
                            </Button>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-center gap-2 mt-8">
                {[1, 2, 3, 4, 5].map((page) => (
                  <button
                    key={page}
                    className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                      page === 1 ? "bg-emerald-600 text-white" : "bg-white hover:bg-emerald-50"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
