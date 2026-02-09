"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/shared/section-header";
import { processSteps } from "@/lib/constants";

export function Process() {
  return (
    <section id="process" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeader
          badge="Процес"
          title="Як ми працюємо"
          description="Прозорий процес від першого контакту до запуску проєкту"
        />

        <div className="relative mt-16">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative text-center"
              >
                {/* Step Number */}
                <div className="relative z-10 w-16 h-16 mx-auto mb-4 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold">
                  {step.step}
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm mb-2">
                  {step.description}
                </p>
                <span className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-medium">
                  {step.duration}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
