"use client";

import { motion } from "framer-motion";
import { CheckCircle, Phone, Mail, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCalculator } from "@/hooks/use-calculator";
import { siteConfig } from "@/lib/constants";
import {
  getProjectTypeLabel,
  getDesignLabel,
  getTimelineLabel,
  getFeatureLabels,
} from "@/lib/calculator-data";

export function CalculatorResult() {
  const { result, projectType, design, features, timeline, contact, reset } =
    useCalculator();

  if (!result) return null;

  const featureLabels = getFeatureLabels(features);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-background rounded-2xl p-6 md:p-8 shadow-lg"
    >
      {/* Success Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/20 flex items-center justify-center"
        >
          <CheckCircle className="w-10 h-10 text-secondary" />
        </motion.div>
        <h3 className="text-2xl font-bold mb-2">Дякуємо, {contact.name}!</h3>
        <p className="text-muted-foreground">
          Ваша заявка прийнята. Ми зв&apos;яжемось з вами найближчим часом.
        </p>
      </div>

      {/* Price Result */}
      <div className="p-6 rounded-xl gradient-secondary text-primary text-center mb-6">
        <p className="text-sm opacity-80 mb-1">Орієнтовна вартість</p>
        <p className="text-4xl md:text-5xl font-bold">
          ${result.priceMin} — ${result.priceMax}
        </p>
        <p className="text-sm opacity-80 mt-2">
          Терміни: {result.daysMin}–{result.daysMax} днів
        </p>
      </div>

      {/* Summary */}
      <div className="space-y-3 mb-6">
        <h4 className="font-semibold">Деталі проєкту:</h4>
        <div className="p-4 bg-muted/50 rounded-lg space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Тип проєкту:</span>
            <span className="font-medium">{getProjectTypeLabel(projectType)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Дизайн:</span>
            <span className="font-medium">{getDesignLabel(design)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Терміни:</span>
            <span className="font-medium">{getTimelineLabel(timeline)}</span>
          </div>
          {featureLabels.length > 0 && (
            <div className="pt-2 border-t">
              <span className="text-muted-foreground">Функціонал:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {featureLabels.map((label) => (
                  <span
                    key={label}
                    className="px-2 py-0.5 bg-secondary/10 rounded text-xs"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Contact Info */}
      <div className="p-4 bg-primary/5 rounded-lg mb-6">
        <p className="text-sm text-center text-muted-foreground mb-3">
          Бажаєте прискорити процес? Зв&apos;яжіться з нами напряму:
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-2 text-primary hover:text-secondary transition-colors"
          >
            <Phone className="w-4 h-4" />
            {siteConfig.contact.phone}
          </a>
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="flex items-center gap-2 text-primary hover:text-secondary transition-colors"
          >
            <Mail className="w-4 h-4" />
            {siteConfig.contact.email}
          </a>
        </div>
      </div>

      {/* Reset Button */}
      <Button
        variant="outline"
        onClick={reset}
        className="w-full"
      >
        <RefreshCcw className="w-4 h-4 mr-2" />
        Розрахувати інший проєкт
      </Button>
    </motion.div>
  );
}
