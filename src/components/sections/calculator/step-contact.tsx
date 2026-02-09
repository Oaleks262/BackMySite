"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, User, Mail, Phone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useCalculator } from "@/hooks/use-calculator";
import {
  calculatePrice,
  getProjectTypeLabel,
  getDesignLabel,
  getTimelineLabel,
} from "@/lib/calculator-data";

export function StepContact() {
  const {
    contact,
    setContact,
    projectType,
    design,
    features,
    timeline,
    prevStep,
    setResult,
  } = useCalculator();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!contact.name || contact.name.length < 2) {
      newErrors.name = "Введіть ваше ім'я";
    }

    if (!contact.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {
      newErrors.email = "Введіть коректний email";
    }

    if (!contact.phone || contact.phone.length < 10) {
      newErrors.phone = "Введіть коректний номер телефону";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const { priceMin, priceMax, daysMin, daysMax } = calculatePrice(
        projectType,
        design,
        features,
        timeline
      );

      const response = await fetch("/api/calculator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectType,
          design,
          features,
          timeline,
          contact,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setResult({ priceMin, priceMax, daysMin, daysMax });
      } else {
        setErrors({ submit: "Помилка відправки. Спробуйте ще раз." });
      }
    } catch {
      setErrors({ submit: "Помилка з'єднання. Спробуйте ще раз." });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Live price preview
  const preview = calculatePrice(projectType, design, features, timeline);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold mb-2">Залиште контакти</h3>
        <p className="text-muted-foreground">
          Ми зв&apos;яжемось для уточнення деталей
        </p>
      </div>

      {/* Price Preview */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 rounded-xl bg-secondary/10 border border-secondary/20"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Орієнтовна вартість</p>
            <p className="text-2xl font-bold text-primary">
              ${preview.priceMin} — ${preview.priceMax}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Терміни</p>
            <p className="font-semibold">
              {preview.daysMin}–{preview.daysMax} днів
            </p>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-secondary/20 text-sm text-muted-foreground">
          <p>{getProjectTypeLabel(projectType)} • {getDesignLabel(design)} • {getTimelineLabel(timeline)}</p>
        </div>
      </motion.div>

      {/* Contact Form */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="name" className="flex items-center gap-2 mb-2">
            <User className="w-4 h-4" />
            Ваше ім&apos;я
          </Label>
          <Input
            id="name"
            placeholder="Олександр"
            value={contact.name}
            onChange={(e) => setContact({ name: e.target.value })}
            className={errors.name ? "border-destructive" : ""}
          />
          {errors.name && (
            <p className="text-sm text-destructive mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email" className="flex items-center gap-2 mb-2">
            <Mail className="w-4 h-4" />
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="email@example.com"
            value={contact.email}
            onChange={(e) => setContact({ email: e.target.value })}
            className={errors.email ? "border-destructive" : ""}
          />
          {errors.email && (
            <p className="text-sm text-destructive mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <Label htmlFor="phone" className="flex items-center gap-2 mb-2">
            <Phone className="w-4 h-4" />
            Телефон
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+380 XX XXX XX XX"
            value={contact.phone}
            onChange={(e) => setContact({ phone: e.target.value })}
            className={errors.phone ? "border-destructive" : ""}
          />
          {errors.phone && (
            <p className="text-sm text-destructive mt-1">{errors.phone}</p>
          )}
        </div>

        <div>
          <Label htmlFor="message" className="flex items-center gap-2 mb-2">
            <MessageSquare className="w-4 h-4" />
            Додаткова інформація (необов&apos;язково)
          </Label>
          <Textarea
            id="message"
            placeholder="Розкажіть більше про ваш проєкт..."
            value={contact.message}
            onChange={(e) => setContact({ message: e.target.value })}
            rows={3}
          />
        </div>
      </div>

      {errors.submit && (
        <p className="text-sm text-destructive text-center">{errors.submit}</p>
      )}

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={prevStep} disabled={isSubmitting}>
          Назад
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="bg-secondary hover:bg-secondary/90 text-primary"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Відправка...
            </>
          ) : (
            "Отримати розрахунок"
          )}
        </Button>
      </div>
    </div>
  );
}
