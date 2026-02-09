"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, X, TrendingUp, DollarSign, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const cases = [
  {
    id: 1,
    title: "Цифрова трансформація рітейл-мережі",
    client: "RetailGroup",
    industry: "Рітейл",
    image: "https://picsum.photos/seed/case1c/800/600",
    challenge: "Мережа з 50+ магазинів втрачала клієнтів через застарілі процеси та відсутність омніканальності.",
    solution: "Впровадили CRM-систему, автоматизували логістику, запустили мобільний додаток та програму лояльності.",
    results: [
      { metric: "+35%", label: "Зростання продажів" },
      { metric: "-20%", label: "Зниження витрат" },
      { metric: "+50%", label: "Залучення нових клієнтів" },
    ],
    duration: "8 місяців",
    team: "5 консультантів",
  },
  {
    id: 2,
    title: "Стратегія виходу на європейський ринок",
    client: "TechCorp",
    industry: "IT",
    image: "https://picsum.photos/seed/case2c/800/600",
    challenge: "IT-компанія хотіла масштабуватись на ринки ЄС, але не мала чіткої стратегії та розуміння локальної специфіки.",
    solution: "Провели дослідження ринків, розробили go-to-market стратегію, допомогли з локалізацією продукту.",
    results: [
      { metric: "5 країн", label: "Успішний вихід" },
      { metric: "+€2M", label: "Додатковий дохід" },
      { metric: "12 міс", label: "ROI досягнуто" },
    ],
    duration: "6 місяців",
    team: "3 консультанти",
  },
  {
    id: 3,
    title: "Оптимізація виробничих процесів",
    client: "ManufacturePro",
    industry: "Виробництво",
    image: "https://picsum.photos/seed/case3c/800/600",
    challenge: "Виробниче підприємство мало низьку ефективність та високий відсоток браку.",
    solution: "Впровадили Lean-методології, оптимізували supply chain, автоматизували контроль якості.",
    results: [
      { metric: "-40%", label: "Зниження браку" },
      { metric: "+25%", label: "Зростання продуктивності" },
      { metric: "€500K", label: "Річна економія" },
    ],
    duration: "10 місяців",
    team: "4 консультанти",
  },
  {
    id: 4,
    title: "Трансформація HR-функції",
    client: "FinanceHub",
    industry: "Фінанси",
    image: "https://picsum.photos/seed/case4c/800/600",
    challenge: "Фінансова компанія з 1000+ співробітників мала високу плинність кадрів та застарілі HR-процеси.",
    solution: "Перебудували систему найму, впровадили систему оцінки, розробили програму розвитку талантів.",
    results: [
      { metric: "-30%", label: "Зниження плинності" },
      { metric: "+40%", label: "Задоволеність співробітників" },
      { metric: "-25%", label: "Час на найм" },
    ],
    duration: "7 місяців",
    team: "3 консультанти",
  },
];

type Case = typeof cases[0];

export default function CasesPage() {
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-indigo-400 font-medium">Наші кейси</span>
            <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
              Історії успіху клієнтів
            </h1>
            <p className="text-slate-300 text-lg">
              Реальні результати, яких досягли наші клієнти завдяки співпраці з Consultant Pro.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cases Grid */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {cases.map((caseItem, index) => (
              <motion.div
                key={caseItem.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className="overflow-hidden hover:shadow-xl transition-all cursor-pointer group"
                  onClick={() => setSelectedCase(caseItem)}
                >
                  <div className="relative aspect-video">
                    <Image
                      src={caseItem.image}
                      alt={caseItem.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-indigo-600">{caseItem.industry}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-indigo-600 transition-colors">
                      {caseItem.title}
                    </h3>
                    <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                      {caseItem.challenge}
                    </p>
                    <div className="flex gap-4">
                      {caseItem.results.slice(0, 2).map((result, i) => (
                        <div key={i} className="text-center">
                          <div className="text-xl font-bold text-indigo-600">{result.metric}</div>
                          <div className="text-xs text-slate-500">{result.label}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Modal */}
      <AnimatePresence>
        {selectedCase && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50"
              onClick={() => setSelectedCase(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-4 md:inset-10 lg:inset-20 bg-white rounded-2xl z-50 overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b">
                <Badge className="bg-indigo-600">{selectedCase.industry}</Badge>
                <button
                  onClick={() => setSelectedCase(null)}
                  className="p-2 hover:bg-slate-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                <div className="grid lg:grid-cols-2">
                  <div className="relative aspect-video lg:aspect-auto lg:h-full">
                    <Image
                      src={selectedCase.image}
                      alt={selectedCase.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="p-6 lg:p-8">
                    <h2 className="text-2xl lg:text-3xl font-bold mb-2">
                      {selectedCase.title}
                    </h2>
                    <p className="text-slate-500 mb-6">Клієнт: {selectedCase.client}</p>

                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-indigo-600 mb-2">Виклик</h4>
                        <p className="text-slate-600">{selectedCase.challenge}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-indigo-600 mb-2">Рішення</h4>
                        <p className="text-slate-600">{selectedCase.solution}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-indigo-600 mb-3">Результати</h4>
                        <div className="grid grid-cols-3 gap-4">
                          {selectedCase.results.map((result, i) => (
                            <div key={i} className="text-center p-4 bg-slate-50 rounded-xl">
                              <div className="text-2xl font-bold text-indigo-600">{result.metric}</div>
                              <div className="text-xs text-slate-500">{result.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-6 pt-4">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Clock className="w-4 h-4" />
                          {selectedCase.duration}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Users className="w-4 h-4" />
                          {selectedCase.team}
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t">
                      <p className="text-slate-500 text-sm mb-4">
                        Хочете досягти подібних результатів?
                      </p>
                      <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
                        <Link href="/portfolio/demo/consultant/contact">
                          Обговорити проект
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
      <section className="py-16 bg-gradient-to-br from-indigo-600 to-violet-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Станьте наступною історією успіху
          </h2>
          <p className="text-indigo-100 mb-8 max-w-xl mx-auto">
            Обговоріть з нами ваші бізнес-виклики і ми допоможемо знайти рішення
          </p>
          <Button asChild size="lg" className="bg-white text-indigo-600 hover:bg-slate-100">
            <Link href="/portfolio/demo/consultant/contact">
              Замовити консультацію
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
