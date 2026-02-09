"use client";

import { motion } from "framer-motion";
import { Palette, Code, Rocket, Headphones } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "@/components/shared/section-header";
import { services } from "@/lib/constants";

const iconMap: Record<string, React.ReactNode> = {
  Palette: <Palette className="w-8 h-8" />,
  Code: <Code className="w-8 h-8" />,
  Rocket: <Rocket className="w-8 h-8" />,
  Headphones: <Headphones className="w-8 h-8" />,
};

export function Services() {
  return (
    <section id="services" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <SectionHeader
          badge="Послуги"
          title="Повний цикл веб-розробки"
          description="Від ідеї до запуску — забезпечуємо кожен етап створення вашого сайту"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow group">
                <CardContent className="p-6">
                  <div className="w-16 h-16 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center mb-4 group-hover:bg-secondary group-hover:text-primary transition-colors">
                    {iconMap[service.icon]}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
