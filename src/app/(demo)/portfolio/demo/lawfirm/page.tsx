"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Shield, Users, Award, Clock, CheckCircle, Phone, Scale, Briefcase, Home, Heart, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: Briefcase,
    title: "Корпоративне право",
    description: "Реєстрація бізнесу, супровід угод, корпоративні спори",
  },
  {
    icon: Scale,
    title: "Судові справи",
    description: "Представництво в судах усіх інстанцій",
  },
  {
    icon: Home,
    title: "Нерухомість",
    description: "Супровід купівлі-продажу, оренда, земельні питання",
  },
  {
    icon: Heart,
    title: "Сімейне право",
    description: "Розлучення, аліменти, поділ майна",
  },
];

const stats = [
  { value: "15+", label: "Років досвіду" },
  { value: "2000+", label: "Виграних справ" },
  { value: "98%", label: "Задоволених клієнтів" },
  { value: "24/7", label: "Підтримка" },
];

const team = [
  { name: "Олександр Петренко", role: "Керуючий партнер", image: "https://i.pravatar.cc/300?img=11" },
  { name: "Марія Коваленко", role: "Корпоративне право", image: "https://i.pravatar.cc/300?img=5" },
  { name: "Ігор Бондаренко", role: "Судові справи", image: "https://i.pravatar.cc/300?img=12" },
];

export default function LawFirmHomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-stone-900 text-white py-20 lg:py-32">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://picsum.photos/seed/lawoffice/1920/1080"
            alt="Law office"
            fill
            className="object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 bg-amber-700/20 text-amber-400 text-sm font-medium rounded-full mb-6">
                Юридична компанія №1 в Україні
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight">
                Захистимо ваші права та інтереси
              </h1>
              <p className="text-xl text-stone-300 mb-8 leading-relaxed">
                Професійна юридична допомога для бізнесу та приватних осіб.
                15 років успішної практики. Понад 2000 виграних справ.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-amber-700 hover:bg-amber-800 h-14 px-8 text-base">
                  <Link href="/portfolio/demo/lawfirm/contact">
                    Безкоштовна консультація
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button asChild size="lg" className="bg-transparent border border-stone-600 text-white hover:bg-stone-800 h-14 px-8 text-base">
                  <Link href="/portfolio/demo/lawfirm/cases">
                    Наші справи
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-amber-700 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-amber-200">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-amber-700 font-medium">Наші послуги</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mt-2">Напрямки практики</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                      <service.icon className="w-7 h-7 text-amber-700" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                    <p className="text-stone-600">{service.description}</p>
                    <Link
                      href="/portfolio/demo/lawfirm/services"
                      className="inline-flex items-center gap-1 text-amber-700 font-medium mt-4 hover:gap-2 transition-all"
                    >
                      Детальніше <ArrowRight className="w-4 h-4" />
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button asChild variant="outline" size="lg" className="border-amber-700 text-amber-700 hover:bg-amber-50">
              <Link href="/portfolio/demo/lawfirm/services">
                Всі послуги
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-20 bg-stone-100">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-amber-700 font-medium">Чому ми</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mt-2 mb-6">
                Обирайте досвід та професіоналізм
              </h2>
              <div className="space-y-4">
                {[
                  "Команда з 20+ досвідчених юристів",
                  "Індивідуальний підхід до кожної справи",
                  "Прозоре ціноутворення без прихованих платежів",
                  "Оплата за результат у більшості справ",
                  "Конфіденційність та захист даних",
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-amber-700 flex-shrink-0 mt-0.5" />
                    <span className="text-stone-700">{item}</span>
                  </div>
                ))}
              </div>
              <Button asChild className="mt-8 bg-amber-700 hover:bg-amber-800">
                <Link href="/portfolio/demo/lawfirm/contact">
                  Замовити консультацію
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/3] relative rounded-2xl overflow-hidden">
                <Image
                  src="https://picsum.photos/seed/lawyers/800/600"
                  alt="Our team"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-amber-700 text-white p-6 rounded-xl shadow-xl">
                <div className="text-4xl font-bold">15+</div>
                <div className="text-amber-200">Років досвіду</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-amber-700 font-medium">Наша команда</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mt-2">Провідні спеціалісти</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-stone-600">{member.role}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button asChild variant="outline" size="lg" className="border-amber-700 text-amber-700 hover:bg-amber-50">
              <Link href="/portfolio/demo/lawfirm/team">
                Вся команда
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-stone-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Потрібна юридична допомога?
            </h2>
            <p className="text-stone-400 mb-8 text-lg">
              Отримайте безкоштовну консультацію від наших експертів.
              Ми допоможемо знайти рішення вашої проблеми.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="bg-amber-700 hover:bg-amber-800 h-14 px-8">
                <Link href="/portfolio/demo/lawfirm/contact">
                  Записатись на консультацію
                </Link>
              </Button>
              <a
                href="tel:+380671234567"
                className="flex items-center gap-2 text-lg hover:text-amber-400 transition-colors"
              >
                <Phone className="w-5 h-5" />
                +380 (67) 123-45-67
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
