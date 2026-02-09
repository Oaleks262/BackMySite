"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Stethoscope, Heart, Brain, Eye, Bone, Activity, Baby, Smile, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    icon: Stethoscope,
    title: "Терапія",
    description: "Первинна діагностика та лікування загальних захворювань",
    procedures: ["Консультація терапевта", "Профілактичний огляд", "Лікування ГРВІ", "Диспансеризація", "Видача довідок"],
  },
  {
    icon: Heart,
    title: "Кардіологія",
    description: "Діагностика та лікування серцево-судинних захворювань",
    procedures: ["ЕКГ", "ЕхоКГ", "Холтер-моніторинг", "Добовий моніторинг АТ", "Консультація кардіолога"],
  },
  {
    icon: Brain,
    title: "Неврологія",
    description: "Лікування захворювань нервової системи",
    procedures: ["Консультація невролога", "ЕЕГ", "Допплер судин", "Лікування головного болю", "Реабілітація"],
  },
  {
    icon: Eye,
    title: "Офтальмологія",
    description: "Діагностика та лікування захворювань очей",
    procedures: ["Перевірка зору", "Тонометрія", "Огляд очного дна", "Підбір окулярів", "Лазерна корекція"],
  },
  {
    icon: Bone,
    title: "Ортопедія",
    description: "Лікування захворювань опорно-рухового апарату",
    procedures: ["Консультація ортопеда", "Рентген", "МРТ", "Ін'єкції", "Реабілітація"],
  },
  {
    icon: Activity,
    title: "Діагностика",
    description: "Повний спектр лабораторних та інструментальних досліджень",
    procedures: ["Аналізи крові", "УЗД", "КТ", "МРТ", "Ендоскопія"],
  },
  {
    icon: Baby,
    title: "Педіатрія",
    description: "Медичний супровід дітей від народження",
    procedures: ["Огляд педіатра", "Вакцинація", "Патронаж немовлят", "Профогляди", "Довідки в садок/школу"],
  },
  {
    icon: Smile,
    title: "Стоматологія",
    description: "Лікування та профілактика захворювань зубів",
    procedures: ["Терапевтична стоматологія", "Протезування", "Імплантація", "Відбілювання", "Гігієна"],
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-sky-600 to-sky-800 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-sky-200 font-medium">Наші послуги</span>
            <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
              Медичні напрямки
            </h1>
            <p className="text-sky-100 text-lg">
              Повний спектр медичних послуг для дорослих та дітей.
              Сучасне обладнання та досвідчені спеціалісти.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-sky-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-sky-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <service.icon className="w-7 h-7 text-sky-600" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{service.title}</CardTitle>
                        <p className="text-slate-600 mt-1">{service.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.procedures.map((procedure, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                          {procedure}
                        </li>
                      ))}
                    </ul>
                    <Button asChild className="w-full mt-6 bg-sky-600 hover:bg-sky-700">
                      <Link href="/portfolio/demo/medclinic/contact">
                        Записатись <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-sky-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Не знайшли потрібну послугу?
          </h2>
          <p className="text-sky-100 mb-8 max-w-xl mx-auto">
            Зателефонуйте нам і ми допоможемо підібрати необхідного спеціаліста
          </p>
          <Button asChild size="lg" className="bg-white text-sky-600 hover:bg-sky-50">
            <Link href="/portfolio/demo/medclinic/contact">
              Зв&apos;язатись з нами
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
