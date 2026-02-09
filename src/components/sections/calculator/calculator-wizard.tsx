"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCalculator } from "@/hooks/use-calculator";
import { SectionHeader } from "@/components/shared/section-header";
import { StepProjectType } from "./step-project-type";
import { StepDesign } from "./step-design";
import { StepFeatures } from "./step-features";
import { StepTimeline } from "./step-timeline";
import { StepContact } from "./step-contact";
import { CalculatorResult } from "./calculator-result";
import { CalculatorProgress } from "./calculator-progress";

export function CalculatorWizard() {
  const { step, result } = useCalculator();

  const steps = [
    { component: StepProjectType, title: "Тип проєкту" },
    { component: StepDesign, title: "Дизайн" },
    { component: StepFeatures, title: "Функціонал" },
    { component: StepTimeline, title: "Терміни" },
    { component: StepContact, title: "Контакти" },
  ];

  const CurrentStep = steps[step - 1]?.component;

  return (
    <section id="calculator" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeader
          badge="Калькулятор"
          title="Розрахуйте вартість проєкту"
          description="Отримайте попередню оцінку за 2 хвилини"
        />

        <div className="max-w-3xl mx-auto mt-12">
          {!result ? (
            <>
              <CalculatorProgress currentStep={step} totalSteps={5} />

              <div className="bg-background rounded-2xl p-6 md:p-8 shadow-lg mt-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {CurrentStep && <CurrentStep />}
                  </motion.div>
                </AnimatePresence>
              </div>
            </>
          ) : (
            <CalculatorResult />
          )}
        </div>
      </div>
    </section>
  );
}
