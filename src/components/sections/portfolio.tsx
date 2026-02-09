"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/shared/section-header";
import { portfolio } from "@/lib/constants";
import Link from "next/link";

const categories = ["Всі", "Landing Page", "Інтернет-магазин", "Корпоративний сайт", "Веб-додаток"];

export function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("Всі");

  const filteredPortfolio =
    activeCategory === "Всі"
      ? portfolio
      : portfolio.filter((item) => item.category === activeCategory);

  return (
    <section id="portfolio" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <SectionHeader
          badge="Портфоліо"
          title="Наші роботи"
          description="Проєкти, якими ми пишаємося"
        />

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mt-10 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category)}
              className={
                activeCategory === category
                  ? "bg-primary"
                  : "hover:bg-primary/10"
              }
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredPortfolio.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  {/* Live iframe preview */}
                  {item.demoUrl ? (
                    <div className="absolute inset-0 overflow-hidden">
                      <iframe
                        src={item.demoUrl}
                        title={item.title}
                        className="w-[400%] h-[400%] origin-top-left scale-[0.25] pointer-events-none"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
                      <span className="text-4xl font-bold text-primary/30">{item.title[0]}</span>
                    </div>
                  )}

                  {item.demoUrl && (
                    <Badge className="absolute top-3 right-3 bg-primary z-10">
                      Демо
                    </Badge>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.demoUrl ? (
                      <Button
                        asChild
                        size="sm"
                        className="bg-white text-primary hover:bg-white/90"
                      >
                        <Link href={item.demoUrl}>
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Переглянути демо
                        </Link>
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        className="bg-white text-primary hover:bg-white/90"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Переглянути
                      </Button>
                    )}
                  </div>
                </div>
                <div className="p-5">
                  <Badge variant="secondary" className="mb-2">
                    {item.category}
                  </Badge>
                  <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
