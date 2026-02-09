"use client";

import { motion } from "framer-motion";
import {
  MessageSquare,
  Newspaper,
  ImageIcon,
  Languages,
  Users,
  CreditCard,
  Settings,
  Bot,
  Search,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCalculator } from "@/hooks/use-calculator";
import { features } from "@/lib/calculator-data";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ReactNode> = {
  "contact-form": <MessageSquare className="w-5 h-5" />,
  blog: <Newspaper className="w-5 h-5" />,
  gallery: <ImageIcon className="w-5 h-5" />,
  multilang: <Languages className="w-5 h-5" />,
  crm: <Users className="w-5 h-5" />,
  payment: <CreditCard className="w-5 h-5" />,
  admin: <Settings className="w-5 h-5" />,
  chat: <Bot className="w-5 h-5" />,
  seo: <Search className="w-5 h-5" />,
  analytics: <BarChart3 className="w-5 h-5" />,
};

export function StepFeatures() {
  const { features: selectedFeatures, toggleFeature, nextStep, prevStep } =
    useCalculator();

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold mb-2">Оберіть функціонал</h3>
        <p className="text-muted-foreground">
          Виберіть необхідні функції (можна пропустити)
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {features.map((feature, index) => {
          const isSelected = selectedFeatures.includes(feature.id);
          return (
            <motion.button
              key={feature.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              onClick={() => toggleFeature(feature.id)}
              className={cn(
                "p-3 rounded-xl border-2 text-left transition-all flex items-center gap-3",
                isSelected
                  ? "border-secondary bg-secondary/5"
                  : "border-border hover:border-secondary/50"
              )}
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                  isSelected
                    ? "bg-secondary text-primary"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {iconMap[feature.id]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{feature.label}</p>
                <p className="text-xs text-muted-foreground">
                  {feature.price === 0 ? "Безкоштовно" : `+$${feature.price}`}
                </p>
              </div>
              <div
                className={cn(
                  "w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0",
                  isSelected
                    ? "border-secondary bg-secondary"
                    : "border-border"
                )}
              >
                {isSelected && (
                  <svg
                    className="w-3 h-3 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={prevStep}>
          Назад
        </Button>
        <Button onClick={nextStep} className="bg-primary hover:bg-primary/90">
          Далі
        </Button>
      </div>
    </div>
  );
}
