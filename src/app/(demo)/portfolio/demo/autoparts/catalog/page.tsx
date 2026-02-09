"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Search, Filter, Grid, List, ChevronDown, ShoppingCart, Heart } from "lucide-react";
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

const categories = [
  { name: "Двигун", count: 5234 },
  { name: "Гальмівна система", count: 3102 },
  { name: "Підвіска", count: 4521 },
  { name: "Електрика", count: 2834 },
  { name: "Кузовні запчастини", count: 6012 },
  { name: "Фільтри", count: 1856 },
  { name: "Освітлення", count: 2341 },
  { name: "Охолодження", count: 1234 },
];

const brands = [
  { name: "Bosch", count: 2341 },
  { name: "Mann", count: 1856 },
  { name: "Kayaba", count: 1234 },
  { name: "NGK", count: 987 },
  { name: "Valeo", count: 1543 },
  { name: "TRW", count: 876 },
];

const products = [
  {
    id: 1,
    name: "Гальмівні колодки передні Bosch",
    article: "0986494128",
    price: 1850,
    oldPrice: 2200,
    image: "https://picsum.photos/seed/prod1/400/400",
    brand: "Bosch",
    category: "Гальмівна система",
    inStock: true,
    rating: 4.8,
    reviews: 124,
  },
  {
    id: 2,
    name: "Масляний фільтр Mann W 712/95",
    article: "W 712/95",
    price: 380,
    oldPrice: null,
    image: "https://picsum.photos/seed/prod2/400/400",
    brand: "Mann",
    category: "Фільтри",
    inStock: true,
    rating: 4.9,
    reviews: 256,
  },
  {
    id: 3,
    name: "Амортизатор передній Kayaba Excel-G",
    article: "334700",
    price: 2450,
    oldPrice: 2800,
    image: "https://picsum.photos/seed/prod3/400/400",
    brand: "Kayaba",
    category: "Підвіска",
    inStock: true,
    rating: 4.7,
    reviews: 89,
  },
  {
    id: 4,
    name: "Свічки запалювання NGK BKR6E-11",
    article: "BKR6E-11",
    price: 165,
    oldPrice: null,
    image: "https://picsum.photos/seed/prod4/400/400",
    brand: "NGK",
    category: "Електрика",
    inStock: false,
    rating: 4.6,
    reviews: 312,
  },
  {
    id: 5,
    name: "Гальмівний диск TRW DF4294",
    article: "DF4294",
    price: 1420,
    oldPrice: 1650,
    image: "https://picsum.photos/seed/prod5/400/400",
    brand: "TRW",
    category: "Гальмівна система",
    inStock: true,
    rating: 4.8,
    reviews: 67,
  },
  {
    id: 6,
    name: "Повітряний фільтр Mann C 27 154",
    article: "C 27 154",
    price: 520,
    oldPrice: null,
    image: "https://picsum.photos/seed/prod6/400/400",
    brand: "Mann",
    category: "Фільтри",
    inStock: true,
    rating: 4.9,
    reviews: 198,
  },
  {
    id: 7,
    name: "Стійка стабілізатора Lemforder",
    article: "25714 01",
    price: 680,
    oldPrice: 820,
    image: "https://picsum.photos/seed/prod7/400/400",
    brand: "Lemforder",
    category: "Підвіска",
    inStock: true,
    rating: 4.5,
    reviews: 45,
  },
  {
    id: 8,
    name: "Помпа водяна Valeo 506576",
    article: "506576",
    price: 1890,
    oldPrice: null,
    image: "https://picsum.photos/seed/prod8/400/400",
    brand: "Valeo",
    category: "Охолодження",
    inStock: true,
    rating: 4.7,
    reviews: 78,
  },
];

export default function CatalogPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(true);

  return (
    <>
      {/* Header */}
      <section className="bg-zinc-900 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Каталог автозапчастин</h1>
          <p className="text-zinc-400">Понад 50 000 позицій від провідних виробників</p>
        </div>
      </section>

      {/* Search Bar */}
      <section className="py-4 bg-white border-b sticky top-20 z-40">
        <div className="container mx-auto px-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Input
                type="search"
                placeholder="Пошук за артикулом, назвою або VIN-кодом..."
                className="pl-10 h-12"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
            </div>
            <Button className="bg-red-600 hover:bg-red-700 h-12 px-8">
              Знайти
            </Button>
          </div>
        </div>
      </section>

      <section className="py-8 bg-zinc-50">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            {/* Sidebar Filters */}
            <aside className={`w-72 flex-shrink-0 ${showFilters ? "block" : "hidden"} lg:block`}>
              <div className="bg-white rounded-xl p-6 shadow-sm sticky top-40">
                <h3 className="font-semibold text-lg mb-4">Фільтри</h3>

                {/* Categories */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3 flex items-center justify-between cursor-pointer">
                    Категорії
                    <ChevronDown className="w-4 h-4" />
                  </h4>
                  <div className="space-y-2">
                    {categories.map((cat, i) => (
                      <label key={i} className="flex items-center gap-2 cursor-pointer">
                        <Checkbox />
                        <span className="text-sm flex-1">{cat.name}</span>
                        <span className="text-xs text-zinc-400">{cat.count}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Brands */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3 flex items-center justify-between cursor-pointer">
                    Бренди
                    <ChevronDown className="w-4 h-4" />
                  </h4>
                  <div className="space-y-2">
                    {brands.map((brand, i) => (
                      <label key={i} className="flex items-center gap-2 cursor-pointer">
                        <Checkbox />
                        <span className="text-sm flex-1">{brand.name}</span>
                        <span className="text-xs text-zinc-400">{brand.count}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Ціна</h4>
                  <div className="flex gap-2">
                    <Input type="number" placeholder="Від" className="h-10" />
                    <Input type="number" placeholder="До" className="h-10" />
                  </div>
                </div>

                {/* Availability */}
                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Checkbox />
                    <span className="text-sm">Тільки в наявності</span>
                  </label>
                </div>

                <Button className="w-full mt-6 bg-red-600 hover:bg-red-700">
                  Застосувати
                </Button>
              </div>
            </aside>

            {/* Products */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-6 bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden flex items-center gap-2 text-sm"
                  >
                    <Filter className="w-4 h-4" />
                    Фільтри
                  </button>
                  <span className="text-zinc-500 text-sm">Знайдено: {products.length} товарів</span>
                </div>

                <div className="flex items-center gap-4">
                  <Select defaultValue="popular">
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Сортування" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popular">За популярністю</SelectItem>
                      <SelectItem value="price-asc">Ціна: від низької</SelectItem>
                      <SelectItem value="price-desc">Ціна: від високої</SelectItem>
                      <SelectItem value="rating">За рейтингом</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="flex border rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 ${viewMode === "grid" ? "bg-zinc-100" : ""}`}
                    >
                      <Grid className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 ${viewMode === "list" ? "bg-zinc-100" : ""}`}
                    >
                      <List className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              <div className={viewMode === "grid" ? "grid md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}>
                {products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {viewMode === "grid" ? (
                      <Card className="overflow-hidden group hover:shadow-xl transition-all">
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
                          <button className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-50">
                            <Heart className="w-5 h-5 text-zinc-400 hover:text-red-600" />
                          </button>
                          {!product.inStock && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                              <span className="text-white font-medium">Немає в наявності</span>
                            </div>
                          )}
                        </div>
                        <CardContent className="p-4">
                          <Badge variant="outline" className="mb-2">{product.brand}</Badge>
                          <h3 className="font-semibold mb-1 line-clamp-2 group-hover:text-red-600 transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-zinc-500 text-sm mb-2">Арт: {product.article}</p>
                          <div className="flex items-center gap-2 text-sm mb-3">
                            <span className="text-yellow-500">★</span>
                            <span>{product.rating}</span>
                            <span className="text-zinc-400">({product.reviews} відгуків)</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-xl font-bold text-red-600">{product.price} ₴</span>
                              {product.oldPrice && (
                                <span className="text-zinc-400 line-through text-sm ml-2">{product.oldPrice} ₴</span>
                              )}
                            </div>
                            <Button size="sm" className="bg-red-600 hover:bg-red-700" disabled={!product.inStock}>
                              <ShoppingCart className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                        <CardContent className="p-4 flex gap-6">
                          <div className="relative w-40 h-40 flex-shrink-0 bg-zinc-100 rounded-lg overflow-hidden">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <Badge variant="outline" className="mb-2">{product.brand}</Badge>
                            <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                            <p className="text-zinc-500 text-sm mb-2">Арт: {product.article}</p>
                            <p className="text-zinc-600 text-sm mb-2">{product.category}</p>
                            <div className="flex items-center gap-2 text-sm">
                              <span className="text-yellow-500">★</span>
                              <span>{product.rating}</span>
                              <span className="text-zinc-400">({product.reviews} відгуків)</span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end justify-between">
                            <div className="text-right">
                              <span className="text-2xl font-bold text-red-600">{product.price} ₴</span>
                              {product.oldPrice && (
                                <span className="block text-zinc-400 line-through text-sm">{product.oldPrice} ₴</span>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Heart className="w-4 h-4" />
                              </Button>
                              <Button size="sm" className="bg-red-600 hover:bg-red-700" disabled={!product.inStock}>
                                В кошик
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-center gap-2 mt-8">
                {[1, 2, 3, 4, 5].map((page) => (
                  <button
                    key={page}
                    className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                      page === 1 ? "bg-red-600 text-white" : "bg-white hover:bg-zinc-100"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <span className="px-2">...</span>
                <button className="w-10 h-10 rounded-lg bg-white hover:bg-zinc-100 font-medium">
                  24
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
