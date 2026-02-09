"use client";

import { motion } from "framer-motion";
import { Globe, Layout, Building2, ShoppingCart, Laptop } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCalculator } from "@/hooks/use-calculator";
import { projectTypes } from "@/lib/calculator-data";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ReactNode> = {
  landing: <Layout className="w-6 h-6" />,
  multipage: <Globe className="w-6 h-6" />,
  corporate: <Building2 className="w-6 h-6" />,
  ecommerce: <ShoppingCart className="w-6 h-6" />,
  webapp: <Laptop className="w-6 h-6" />,
};

export function StepProjectType() {
  const { projectType, setProjectType, nextStep } = useCalculator();

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold mb-2">Оберіть тип проєкту</h3>
        <p className="text-muted-foreground">Який сайт вам потрібен?</p>
      </div>

      <div className="grid gap-3">
        {projectTypes.map((type, index) => (
          <motion.button
            key={type.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => setProjectType(type.id)}
            className={cn(
              "w-full p-4 rounded-xl border-2 text-left transition-all flex items-center gap-4",
              projectType === type.id
                ? "border-secondary bg-secondary/5"
                : "border-border hover:border-secondary/50"
            )}
          >
            <div
              className={cn(
                "w-12 h-12 rounded-lg flex items-center justify-center",
                projectType === type.id
                  ? "bg-secondary text-primary"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {iconMap[type.id]}
            </div>
            <div className="flex-1">
              <p className="font-medium">{type.label}</p>
              <p className="text-sm text-muted-foreground">
                від ${type.basePrice}
              </p>
            </div>
            <div
              className={cn(
                "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                projectType === type.id
                  ? "border-secondary bg-secondary"
                  : "border-border"
              )}
            >
              {projectType === type.id && (
                <div className="w-2 h-2 rounded-full bg-primary" />
              )}
            </div>
          </motion.button>
        ))}
      </div>

      <div className="flex justify-end pt-4">
        <Button
          onClick={nextStep}
          disabled={!projectType}
          className="bg-primary hover:bg-primary/90"
        >
          Далі
        </Button>
      </div>
    </div>
  );
}
