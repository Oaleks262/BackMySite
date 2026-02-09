"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CalculatorProgressProps {
  currentStep: number;
  totalSteps: number;
}

const stepLabels = ["Тип", "Дизайн", "Функції", "Терміни", "Контакт"];

export function CalculatorProgress({ currentStep, totalSteps }: CalculatorProgressProps) {
  return (
    <div className="relative">
      {/* Progress bar background */}
      <div className="absolute top-5 left-0 right-0 h-0.5 bg-border" />

      {/* Active progress */}
      <motion.div
        className="absolute top-5 left-0 h-0.5 bg-secondary"
        initial={{ width: "0%" }}
        animate={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        transition={{ duration: 0.3 }}
      />

      {/* Steps */}
      <div className="relative flex justify-between">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isActive = stepNumber === currentStep;

          return (
            <div key={index} className="flex flex-col items-center">
              <motion.div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-colors",
                  isCompleted && "bg-secondary border-secondary text-primary",
                  isActive && "bg-primary border-primary text-white",
                  !isCompleted && !isActive && "bg-white border-border text-muted-foreground"
                )}
                initial={false}
                animate={{
                  scale: isActive ? 1.1 : 1,
                }}
                transition={{ duration: 0.2 }}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  stepNumber
                )}
              </motion.div>
              <span
                className={cn(
                  "mt-2 text-xs font-medium hidden sm:block",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                {stepLabels[index]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
