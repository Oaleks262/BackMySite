"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const team = [
  {
    name: "Олександр Петренко",
    role: "Керуючий партнер",
    image: "https://i.pravatar.cc/400?img=11",
    specialization: "Корпоративне право, M&A",
    experience: "20 років",
    education: "КНУ ім. Шевченка",
    email: "petrenro@lawfirm.ua",
    phone: "+380 67 111 11 11",
  },
  {
    name: "Марія Коваленко",
    role: "Партнер",
    image: "https://i.pravatar.cc/400?img=5",
    specialization: "Корпоративне право, Нерухомість",
    experience: "15 років",
    education: "Національний юридичний університет",
    email: "kovalenko@lawfirm.ua",
    phone: "+380 67 222 22 22",
  },
  {
    name: "Ігор Бондаренко",
    role: "Партнер",
    image: "https://i.pravatar.cc/400?img=12",
    specialization: "Судові справи, Господарське право",
    experience: "18 років",
    education: "КНУ ім. Шевченка",
    email: "bondarenko@lawfirm.ua",
    phone: "+380 67 333 33 33",
  },
  {
    name: "Анна Шевченко",
    role: "Старший юрист",
    image: "https://i.pravatar.cc/400?img=9",
    specialization: "Сімейне право, Спадкове право",
    experience: "10 років",
    education: "НаУКМА",
    email: "shevchenko@lawfirm.ua",
    phone: "+380 67 444 44 44",
  },
  {
    name: "Дмитро Мельник",
    role: "Старший юрист",
    image: "https://i.pravatar.cc/400?img=53",
    specialization: "Трудове право, IT право",
    experience: "8 років",
    education: "КНУ ім. Шевченка",
    email: "melnyk@lawfirm.ua",
    phone: "+380 67 555 55 55",
  },
  {
    name: "Олена Кравченко",
    role: "Юрист",
    image: "https://i.pravatar.cc/400?img=23",
    specialization: "Адміністративне право",
    experience: "5 років",
    education: "Національний юридичний університет",
    email: "kravchenko@lawfirm.ua",
    phone: "+380 67 666 66 66",
  },
];

export default function TeamPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-stone-900 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-amber-400 font-medium">Наша команда</span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mt-2 mb-4">
              Професіонали своєї справи
            </h1>
            <p className="text-stone-300 text-lg">
              Команда досвідчених юристів з різних галузей права.
              Кожен спеціаліст має багаторічний досвід успішної практики.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-16 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold">{member.name}</h3>
                    <p className="text-amber-700 font-medium mb-4">{member.role}</p>

                    <div className="space-y-2 text-sm text-stone-600 mb-4">
                      <p><strong>Спеціалізація:</strong> {member.specialization}</p>
                      <p><strong>Досвід:</strong> {member.experience}</p>
                      <p><strong>Освіта:</strong> {member.education}</p>
                    </div>

                    <div className="flex items-center gap-3 pt-4 border-t">
                      <a
                        href={`mailto:${member.email}`}
                        className="w-9 h-9 rounded-full bg-stone-100 flex items-center justify-center hover:bg-amber-100 transition-colors"
                      >
                        <Mail className="w-4 h-4 text-stone-600" />
                      </a>
                      <a
                        href={`tel:${member.phone.replace(/\s/g, "")}`}
                        className="w-9 h-9 rounded-full bg-stone-100 flex items-center justify-center hover:bg-amber-100 transition-colors"
                      >
                        <Phone className="w-4 h-4 text-stone-600" />
                      </a>
                      <a
                        href="#"
                        className="w-9 h-9 rounded-full bg-stone-100 flex items-center justify-center hover:bg-amber-100 transition-colors"
                      >
                        <Linkedin className="w-4 h-4 text-stone-600" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Team */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-serif font-bold mb-4">Приєднуйтесь до команди</h2>
            <p className="text-stone-600 mb-8">
              Ми завжди шукаємо талановитих юристів, які поділяють наші цінності
              професіоналізму та відданості клієнтам.
            </p>
            <Button asChild className="bg-amber-700 hover:bg-amber-800">
              <Link href="/portfolio/demo/lawfirm/contact">
                Надіслати резюме
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
