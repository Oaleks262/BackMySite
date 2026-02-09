"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Zap, Shield, Cpu, BarChart3, Check, Star, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TechStartDemo() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Demo Banner */}
      <div className="bg-secondary text-primary text-center py-2 text-sm font-medium">
        <Link href="/portfolio" className="hover:underline inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Це демо-версія. Повернутись до портфоліо
        </Link>
      </div>

      {/* Header */}
      <header className="fixed top-8 left-0 right-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between bg-slate-900/80 backdrop-blur-md rounded-full px-6 py-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg">TechStart</span>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <a href="#features" className="text-slate-300 hover:text-white transition-colors">Можливості</a>
              <a href="#pricing" className="text-slate-300 hover:text-white transition-colors">Ціни</a>
              <a href="#testimonials" className="text-slate-300 hover:text-white transition-colors">Відгуки</a>
            </nav>
            <Button size="sm" className="bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600">
              Почати
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-40 pb-20 relative overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-violet-500/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-fuchsia-500/30 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-violet-500/20 text-violet-300 text-sm font-medium mb-6">
              Новий реліз v2.0 вже доступний
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-violet-200 to-fuchsia-200 bg-clip-text text-transparent">
              Масштабуйте свій бізнес з AI
            </h1>
            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
              Автоматизуйте рутинні процеси, аналізуйте дані та приймайте рішення на основі штучного інтелекту
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 h-14 px-8 text-lg">
                Спробувати безкоштовно
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" className="bg-transparent border border-slate-700 text-white hover:bg-slate-800 h-14 px-8 text-lg">
                <Play className="w-5 h-5 mr-2" />
                Дивитись демо
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center gap-8 mt-16 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span>4.9/5 на ProductHunt</span>
              </div>
              <div>10,000+ активних користувачів</div>
              <div>99.9% uptime</div>
            </div>
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-20 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10" />
            <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl border border-slate-700 p-4 shadow-2xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 bg-slate-800/50 rounded-xl p-6 h-64">
                  <div className="text-sm text-slate-400 mb-2">Аналітика продажів</div>
                  <div className="flex items-end gap-2 h-40">
                    {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-violet-500 to-fuchsia-500 rounded-t"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-slate-800/50 rounded-xl p-4">
                    <div className="text-sm text-slate-400">Дохід</div>
                    <div className="text-2xl font-bold text-green-400">+127%</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-xl p-4">
                    <div className="text-sm text-slate-400">Конверсія</div>
                    <div className="text-2xl font-bold text-violet-400">34.2%</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-xl p-4">
                    <div className="text-sm text-slate-400">Клієнти</div>
                    <div className="text-2xl font-bold">2,847</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Все що потрібно для росту</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Потужні інструменти для автоматизації, аналітики та масштабування вашого бізнесу
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Cpu,
                title: "AI Автоматизація",
                description: "Автоматизуйте рутинні задачі за допомогою штучного інтелекту",
              },
              {
                icon: BarChart3,
                title: "Розумна аналітика",
                description: "Глибокий аналіз даних з прогнозуванням трендів",
              },
              {
                icon: Shield,
                title: "Захист даних",
                description: "Шифрування банківського рівня та GDPR compliance",
              },
              {
                icon: Zap,
                title: "Швидкість",
                description: "Миттєва обробка запитів та реалтайм синхронізація",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 hover:border-violet-500/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Прозорі ціни</h2>
            <p className="text-slate-400">Оберіть план, що підходить вашому бізнесу</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                name: "Starter",
                price: "$29",
                features: ["До 1,000 запитів", "Базова аналітика", "Email підтримка"],
                popular: false,
              },
              {
                name: "Pro",
                price: "$99",
                features: ["До 10,000 запитів", "Розширена аналітика", "Пріоритетна підтримка", "API доступ"],
                popular: true,
              },
              {
                name: "Enterprise",
                price: "Custom",
                features: ["Необмежено запитів", "Кастомні інтеграції", "Виділений менеджер", "SLA гарантії"],
                popular: false,
              },
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-2xl p-6 ${
                  plan.popular
                    ? "bg-gradient-to-b from-violet-500/20 to-fuchsia-500/20 border-2 border-violet-500"
                    : "bg-slate-800/50 border border-slate-700"
                }`}
              >
                {plan.popular && (
                  <span className="inline-block px-3 py-1 rounded-full bg-violet-500 text-xs font-medium mb-4">
                    Популярний
                  </span>
                )}
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold mb-6">
                  {plan.price}
                  {plan.price !== "Custom" && <span className="text-lg text-slate-400">/міс</span>}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-gradient-to-r from-violet-500 to-fuchsia-500"
                      : "bg-slate-700 hover:bg-slate-600"
                  }`}
                >
                  Обрати план
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Готові почати?</h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            Приєднуйтесь до тисяч компаній, які вже використовують TechStart
          </p>
          <Button size="lg" className="bg-gradient-to-r from-violet-500 to-fuchsia-500 h-14 px-8 text-lg">
            Спробувати безкоштовно
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-800">
        <div className="container mx-auto px-4 text-center text-slate-400 text-sm">
          <p>Демонстраційний сайт створено Growth-Tech</p>
        </div>
      </footer>
    </div>
  );
}
