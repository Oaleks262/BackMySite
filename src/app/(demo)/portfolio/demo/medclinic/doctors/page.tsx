"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Award, GraduationCap, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const doctors = [
  {
    name: "Олена Коваленко",
    specialty: "Терапевт",
    experience: "15 років",
    education: "НМУ ім. Богомольця",
    image: "https://i.pravatar.cc/400?img=5",
    categories: ["Терапія", "Діагностика"],
    about: "Лікар вищої категорії. Спеціалізується на профілактичній медицині та лікуванні хронічних захворювань.",
  },
  {
    name: "Андрій Мельник",
    specialty: "Кардіолог",
    experience: "20 років",
    education: "ЛНМУ ім. Богомольця",
    image: "https://i.pravatar.cc/400?img=11",
    categories: ["Кардіологія", "ЕКГ"],
    about: "Доктор медичних наук. Провів понад 5000 ЕхоКГ досліджень. Член Європейського товариства кардіологів.",
  },
  {
    name: "Ірина Петренко",
    specialty: "Невролог",
    experience: "12 років",
    education: "НМУ ім. Богомольця",
    image: "https://i.pravatar.cc/400?img=9",
    categories: ["Неврологія", "Реабілітація"],
    about: "Спеціалізується на лікуванні головного болю, запаморочення та захворювань хребта.",
  },
  {
    name: "Максим Бондаренко",
    specialty: "Ортопед-травматолог",
    experience: "18 років",
    education: "ХНМУ",
    image: "https://i.pravatar.cc/400?img=12",
    categories: ["Ортопедія", "Травматологія"],
    about: "Лікар вищої категорії. Спеціалізується на лікуванні захворювань суглобів та хребта.",
  },
  {
    name: "Наталія Шевченко",
    specialty: "Офтальмолог",
    experience: "10 років",
    education: "ВНМУ ім. Пирогова",
    image: "https://i.pravatar.cc/400?img=23",
    categories: ["Офтальмологія"],
    about: "Спеціалізується на діагностиці та лікуванні захворювань сітківки та глаукоми.",
  },
  {
    name: "Олександр Ткаченко",
    specialty: "Педіатр",
    experience: "14 років",
    education: "НМУ ім. Богомольця",
    image: "https://i.pravatar.cc/400?img=53",
    categories: ["Педіатрія"],
    about: "Кандидат медичних наук. Спеціалізується на дитячих інфекційних захворюваннях та вакцинації.",
  },
];

export default function DoctorsPage() {
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
            <span className="text-sky-200 font-medium">Наша команда</span>
            <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
              Лікарі клініки
            </h1>
            <p className="text-sky-100 text-lg">
              Команда досвідчених спеціалістів з багаторічним досвідом роботи.
              Кожен лікар — експерт у своїй галузі.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="py-16 bg-sky-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.map((doctor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-shadow h-full">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={doctor.image}
                      alt={doctor.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {doctor.categories.map((cat, i) => (
                        <Badge key={i} variant="secondary" className="bg-sky-100 text-sky-700">
                          {cat}
                        </Badge>
                      ))}
                    </div>
                    <h3 className="text-xl font-semibold">{doctor.name}</h3>
                    <p className="text-sky-600 font-medium mb-3">{doctor.specialty}</p>
                    <p className="text-slate-600 text-sm mb-4">{doctor.about}</p>

                    <div className="space-y-2 text-sm text-slate-600 mb-4">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-sky-600" />
                        Досвід: {doctor.experience}
                      </div>
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-sky-600" />
                        {doctor.education}
                      </div>
                    </div>

                    <Button asChild className="w-full bg-sky-600 hover:bg-sky-700">
                      <Link href="/portfolio/demo/medclinic/contact">
                        Записатись на прийом
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
            Потрібна допомога з вибором лікаря?
          </h2>
          <p className="text-sky-100 mb-8 max-w-xl mx-auto">
            Зателефонуйте нам і ми підберемо спеціаліста відповідно до ваших потреб
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
