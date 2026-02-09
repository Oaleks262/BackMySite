"use client";

import { motion } from "framer-motion";
import { Palette, Sparkles, Crown, FileImage } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCalculator } from "@/hooks/use-calculator";
import { designOptions } from "@/lib/calculator-data";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ReactNode> = {
  template: <FileImage className="w-6 h-6" />,
  custom: <Palette className="w-6 h-6" />,
  premium: <Crown className="w-6 h-6" />,
  provided: <Sparkles className="w-6 h-6" />,
};

export function StepDesign() {
  const { design, setDesign, nextStep, prevStep } = useCalculator();

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold mb-2">Оберіть тип дизайну</h3>
        <p className="text-muted-foreground">Як має виглядати ваш сайт?</p>
      </div>

      <div className="grid gap-3">
        {designOptions.map((option, index) => (
          <motion.button
            key={option.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => setDesign(option.id)}
            className={cn(
              "w-full p-4 rounded-xl border-2 text-left transition-all flex items-center gap-4",
              design === option.id
                ? "border-secondary bg-secondary/5"
                : "border-border hover:border-secondary/50"
            )}
          >
            <div
              className={cn(
                "w-12 h-12 rounded-lg flex items-center justify-center",
                design === option.id
                  ? "bg-secondary text-primary"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {iconMap[option.id]}
            </div>
            <div className="flex-1">
              <p className="font-medium">{option.label}</p>
              <p className="text-sm text-muted-foreground">
                {option.description}
              </p>
            </div>
            <div className="text-right">
              <span
                className={cn(
                  "text-sm font-medium",
                  option.multiplier < 1
                    ? "text-green-600"
                    : option.multiplier > 1
                    ? "text-amber-600"
                    : ""
                )}
              >
                {option.multiplier < 1
                  ? `-${Math.round((1 - option.multiplier) * 100)}%`
                  : option.multiplier > 1
                  ? `+${Math.round((option.multiplier - 1) * 100)}%`
                  : "Базова ціна"}
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={prevStep}>
          Назад
        </Button>
        <Button
          onClick={nextStep}
          disabled={!design}
          className="bg-primary hover:bg-primary/90"
        >
          Далі
        </Button>
      </div>
    </div>
  );
}
