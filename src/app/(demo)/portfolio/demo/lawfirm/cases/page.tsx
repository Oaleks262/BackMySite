"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle, X, Calendar, Users, Briefcase, Scale, Building, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const categories = [
  { id: "all", name: "Всі справи" },
  { id: "corporate", name: "Корпоративне право" },
  { id: "litigation", name: "Судові справи" },
  { id: "realestate", name: "Нерухомість" },
  { id: "family", name: "Сімейне право" },
];

const cases = [
  {
    id: 1,
    title: "Злиття двох IT-компаній",
    category: "corporate",
    categoryName: "Корпоративне право",
    image: "https://picsum.photos/seed/case1/800/600",
    client: "Конфіденційно",
    year: "2024",
    result: "Успішно",
    description: "Комплексний юридичний супровід злиття двох IT-компаній з загальною капіталізацією понад $50 млн.",
    challenge: "Необхідно було узгодити інтереси акціонерів обох компаній, провести due diligence та забезпечити відповідність угоди антимонопольному законодавству.",
    solution: "Наша команда розробила оптимальну структуру угоди, провела переговори з усіма сторонами та забезпечила отримання необхідних дозволів від АМКУ.",
    achievements: [
      "Угода завершена за 4 місяці",
      "Збережено 100% робочих місць",
      "Оптимізовано податкове навантаження",
      "Захищено інтелектуальну власність",
    ],
  },
  {
    id: 2,
    title: "Захист у господарському спорі",
    category: "litigation",
    categoryName: "Судові справи",
    image: "https://picsum.photos/seed/case2/800/600",
    client: "Виробнича компанія",
    year: "2024",
    result: "Виграно",
    description: "Представництво інтересів виробничої компанії у спорі на суму 15 млн грн.",
    challenge: "Клієнт зіткнувся з необґрунтованими претензіями від контрагента щодо нібито неякісної продукції та вимогою повернення коштів.",
    solution: "Зібрали доказову базу, залучили експертів, успішно спростували всі претензії позивача у трьох інстанціях.",
    achievements: [
      "Повна відмова у позові",
      "Стягнення судових витрат",
      "Захист ділової репутації",
      "Прецедентне рішення",
    ],
  },
  {
    id: 3,
    title: "Купівля бізнес-центру",
    category: "realestate",
    categoryName: "Нерухомість",
    image: "https://picsum.photos/seed/case3/800/600",
    client: "Інвестиційний фонд",
    year: "2023",
    result: "Успішно",
    description: "Юридичний супровід придбання бізнес-центру класу А у центрі Києва.",
    challenge: "Складна структура власності об'єкта, наявність обтяжень та необхідність перевірки історії права власності за 20 років.",
    solution: "Провели глибокий due diligence, виявили та усунули всі ризики, структурували угоду через SPV для оптимізації оподаткування.",
    achievements: [
      "Виявлено 3 приховані обтяження",
      "Знижено ціну на 10%",
      "Оптимізовано структуру",
      "Швидке закриття угоди",
    ],
  },
  {
    id: 4,
    title: "Розлучення з поділом бізнесу",
    category: "family",
    categoryName: "Сімейне право",
    image: "https://picsum.photos/seed/case4/800/600",
    client: "Конфіденційно",
    year: "2024",
    result: "Успішно",
    description: "Делікатне вирішення розлучення з поділом спільного бізнесу вартістю понад 100 млн грн.",
    challenge: "Необхідність справедливого поділу активів при збереженні працездатності бізнесу та мінімізації публічності.",
    solution: "Провели переговори та досягли мирової угоди, яка задовольнила обидві сторони без судового розгляду.",
    achievements: [
      "Мирове врегулювання",
      "Збережено бізнес",
      "Повна конфіденційність",
      "Захист інтересів дітей",
    ],
  },
  {
    id: 5,
    title: "Антирейдерський захист",
    category: "corporate",
    categoryName: "Корпоративне право",
    image: "https://picsum.photos/seed/case5/800/600",
    client: "Агрохолдинг",
    year: "2023",
    result: "Захищено",
    description: "Успішний захист агрохолдингу від спроби рейдерського захоплення.",
    challenge: "Зловмисники намагалися отримати контроль через фальсифіковані документи та корупційні схеми.",
    solution: "Оперативно заблокували незаконні дії, ініціювали кримінальне провадження, повернули контроль над підприємством.",
    achievements: [
      "Захищено активи на $30 млн",
      "Порушено кримінальну справу",
      "Притягнуто винних",
      "Посилено корпоративний захист",
    ],
  },
  {
    id: 6,
    title: "Оскарження рішення податкової",
    category: "litigation",
    categoryName: "Судові справи",
    image: "https://picsum.photos/seed/case6/800/600",
    client: "Торгова компанія",
    year: "2024",
    result: "Виграно",
    description: "Успішне оскарження донарахування податків на суму 8 млн грн.",
    challenge: "Податкова служба необґрунтовано донарахувала ПДВ та штрафні санкції за нібито фіктивні операції.",
    solution: "Довели реальність господарських операцій, залучили експертів, виграли справу в адміністративному суді.",
    achievements: [
      "Скасовано донарахування",
      "Повернуто переплату",
      "Захищено репутацію",
      "Прецедентне рішення",
    ],
  },
];

type Case = typeof cases[0];

export default function CasesPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);

  const filteredCases = activeCategory === "all"
    ? cases
    : cases.filter(c => c.category === activeCategory);

  return (
    <>
      {/* Header */}
      <section className="bg-stone-900 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-amber-400 font-medium">Наші справи</span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mt-2 mb-4">
              Успішні кейси
            </h1>
            <p className="text-stone-300 text-lg">
              Приклади справ, які ми успішно вирішили для наших клієнтів.
              Кожна справа — це історія професійної роботи та досягнутого результату.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 bg-amber-700 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "2000+", label: "Виграних справ" },
              { value: "98%", label: "Успішних результатів" },
              { value: "500+", label: "Корпоративних клієнтів" },
              { value: "₴2 млрд", label: "Захищених активів" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-3xl md:text-4xl font-bold">{stat.value}</div>
                <div className="text-amber-200 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? "bg-amber-700 text-white"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Cases Grid */}
      <section className="py-16 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredCases.map((caseItem, index) => (
                <motion.div
                  key={caseItem.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card
                    className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
                    onClick={() => setSelectedCase(caseItem)}
                  >
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={caseItem.image}
                        alt={caseItem.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-amber-700">{caseItem.categoryName}</Badge>
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          {caseItem.result}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-amber-700 transition-colors">
                        {caseItem.title}
                      </h3>
                      <p className="text-stone-600 text-sm mb-4 line-clamp-2">
                        {caseItem.description}
                      </p>
                      <div className="flex items-center justify-between text-sm text-stone-500">
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {caseItem.client}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {caseItem.year}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
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
                <Badge className="bg-amber-700">{selectedCase.categoryName}</Badge>
                <button
                  onClick={() => setSelectedCase(null)}
                  className="p-2 hover:bg-stone-100 rounded-full"
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
                    <div className="flex items-center gap-4 mb-4">
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        {selectedCase.result}
                      </Badge>
                      <span className="text-stone-500 text-sm">{selectedCase.year}</span>
                    </div>

                    <h2 className="text-2xl lg:text-3xl font-serif font-bold mb-4">
                      {selectedCase.title}
                    </h2>

                    <p className="text-stone-600 mb-6">{selectedCase.description}</p>

                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-amber-700 mb-2">Виклик</h4>
                        <p className="text-stone-600 text-sm">{selectedCase.challenge}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-amber-700 mb-2">Рішення</h4>
                        <p className="text-stone-600 text-sm">{selectedCase.solution}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-amber-700 mb-3">Результати</h4>
                        <div className="grid grid-cols-2 gap-3">
                          {selectedCase.achievements.map((item, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-stone-600">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t">
                      <p className="text-stone-500 text-sm mb-4">
                        Маєте схожу ситуацію? Ми можемо допомогти.
                      </p>
                      <Button asChild className="bg-amber-700 hover:bg-amber-800">
                        <Link href="/portfolio/demo/lawfirm/contact">
                          Отримати консультацію
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
      <section className="py-16 bg-stone-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold mb-4">
            Потрібна допомога у вашій справі?
          </h2>
          <p className="text-stone-400 mb-8 max-w-xl mx-auto">
            Запишіться на безкоштовну консультацію і ми проаналізуємо вашу ситуацію
          </p>
          <Button asChild size="lg" className="bg-amber-700 hover:bg-amber-800">
            <Link href="/portfolio/demo/lawfirm/contact">
              Записатись на консультацію
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
