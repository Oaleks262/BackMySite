"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Award, Users, Target, Building2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  { value: "10+", label: "років на ринку" },
  { value: "5000+", label: "успішних угод" },
  { value: "50+", label: "агентів" },
  { value: "98%", label: "задоволених клієнтів" },
];

const team = [
  { name: "Олександр Ткаченко", role: "Директор", image: "https://i.pravatar.cc/300?img=11" },
  { name: "Марія Коваль", role: "Керівник відділу продажів", image: "https://i.pravatar.cc/300?img=5" },
  { name: "Андрій Мельник", role: "Юрист", image: "https://i.pravatar.cc/300?img=12" },
  { name: "Ірина Шевченко", role: "Старший агент", image: "https://i.pravatar.cc/300?img=9" },
];

const values = [
  { icon: Target, title: "Результат", description: "Працюємо на результат, а не на кількість показів" },
  { icon: Users, title: "Клієнт", description: "Інтереси клієнта — наш головний пріоритет" },
  { icon: Award, title: "Якість", description: "Високі стандарти роботи на кожному етапі" },
  { icon: Building2, title: "Експертиза", description: "Глибоке знання ринку нерухомості" },
];

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-emerald-900 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-emerald-300 font-medium">Про компанію</span>
            <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
              RealEstate Pro
            </h1>
            <p className="text-emerald-100 text-lg">
              Провідне агентство нерухомості з 10-річним досвідом успішної роботи на ринку України.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 bg-emerald-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-4xl font-bold">{stat.value}</div>
                <div className="text-emerald-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">Наша історія</h2>
              <div className="space-y-4 text-slate-600">
                <p>
                  RealEstate Pro було засновано у 2014 році з метою зробити ринок нерухомості
                  прозорішим та доступнішим для кожного українця.
                </p>
                <p>
                  За 10 років роботи ми допомогли понад 5000 сім&apos;ям знайти дім своєї мрії,
                  продати нерухомість за найкращою ціною та вигідно інвестувати.
                </p>
                <p>
                  Сьогодні наша команда налічує понад 50 професійних агентів, які працюють
                  у Києві, Львові, Одесі та Дніпрі.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="aspect-[4/3] relative rounded-2xl overflow-hidden">
                <Image
                  src="https://picsum.photos/seed/realestateabout/800/600"
                  alt="Our office"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-emerald-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Наші цінності</h2>
            <p className="text-slate-600 mt-2">Принципи, якими ми керуємось у роботі</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full text-center">
                  <CardContent className="pt-8 pb-6">
                    <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-7 h-7 text-emerald-600" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                    <p className="text-slate-600 text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Наша команда</h2>
            <p className="text-slate-600 mt-2">Професіонали, яким довіряють</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="relative w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-emerald-600">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-emerald-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Готові до співпраці?
          </h2>
          <p className="text-emerald-100 mb-8 max-w-xl mx-auto">
            Зв&apos;яжіться з нами для безкоштовної консультації
          </p>
          <Button asChild size="lg" className="bg-white text-emerald-600 hover:bg-emerald-50">
            <Link href="/portfolio/demo/realestate/contact">
              Зв&apos;язатись з нами
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
