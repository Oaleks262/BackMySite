"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Heart, Stethoscope, Brain, Activity, Eye, Bone, Users, Award, Clock, Shield, CheckCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  { icon: Stethoscope, title: "Терапія", description: "Загальна діагностика та лікування" },
  { icon: Heart, title: "Кардіологія", description: "Серцево-судинна система" },
  { icon: Brain, title: "Неврологія", description: "Нервова система" },
  { icon: Eye, title: "Офтальмологія", description: "Зір та очні захворювання" },
  { icon: Bone, title: "Ортопедія", description: "Опорно-руховий апарат" },
  { icon: Activity, title: "Діагностика", description: "УЗД, ЕКГ, аналізи" },
];

const stats = [
  { value: "15+", label: "років досвіду" },
  { value: "50+", label: "лікарів" },
  { value: "30K+", label: "пацієнтів" },
  { value: "98%", label: "задоволених" },
];

const doctors = [
  { name: "Олена Коваленко", specialty: "Терапевт", image: "https://i.pravatar.cc/300?img=5" },
  { name: "Андрій Мельник", specialty: "Кардіолог", image: "https://i.pravatar.cc/300?img=11" },
  { name: "Ірина Петренко", specialty: "Невролог", image: "https://i.pravatar.cc/300?img=9" },
];

export default function MedClinicHomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-sky-600 to-sky-800 text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjIiLz48L2c+PC9zdmc+')]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 bg-white/20 text-sm font-medium rounded-full mb-6">
                Медичний центр №1 у Києві
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Ваше здоров&apos;я — наш пріоритет
              </h1>
              <p className="text-xl text-sky-100 mb-8 leading-relaxed">
                Сучасний медичний центр з передовим обладнанням, досвідченими лікарями
                та індивідуальним підходом до кожного пацієнта.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-white text-sky-600 hover:bg-sky-50 h-14 px-8 text-base">
                  <Link href="/portfolio/demo/medclinic/contact">
                    Записатись на прийом
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button asChild size="lg" className="bg-transparent border border-white/50 text-white hover:bg-white/10 h-14 px-8 text-base">
                  <Link href="/portfolio/demo/medclinic/services">
                    Наші послуги
                  </Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="aspect-square relative rounded-full overflow-hidden border-8 border-white/20">
                  <Image
                    src="https://picsum.photos/seed/doctor/600/600"
                    alt="Medical care"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white text-sky-900 p-4 rounded-xl shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-bold">Онлайн-запис</div>
                      <div className="text-sky-600 text-sm">24/7</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white">
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
                <div className="text-4xl md:text-5xl font-bold text-sky-600 mb-2">{stat.value}</div>
                <div className="text-slate-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-sky-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-sky-600 font-medium">Напрямки</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">Наші послуги</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all hover:-translate-y-1 border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 bg-sky-100 rounded-xl flex items-center justify-center mb-4">
                      <service.icon className="w-7 h-7 text-sky-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                    <p className="text-slate-600">{service.description}</p>
                    <Link
                      href="/portfolio/demo/medclinic/services"
                      className="inline-flex items-center gap-1 text-sky-600 font-medium mt-4 hover:gap-2 transition-all"
                    >
                      Детальніше <ArrowRight className="w-4 h-4" />
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button asChild variant="outline" size="lg" className="border-sky-600 text-sky-600 hover:bg-sky-50">
              <Link href="/portfolio/demo/medclinic/services">
                Всі послуги
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/3] relative rounded-2xl overflow-hidden">
                <Image
                  src="https://picsum.photos/seed/clinic/800/600"
                  alt="Our clinic"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-sky-600 font-medium">Чому ми</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">
                Обирайте найкраще для здоров&apos;я
              </h2>
              <div className="space-y-4">
                {[
                  { icon: Users, text: "Досвідчені лікарі з 10+ років практики" },
                  { icon: Award, text: "Сучасне діагностичне обладнання" },
                  { icon: Clock, text: "Зручний графік роботи 7 днів на тиждень" },
                  { icon: Shield, text: "Гарантія якості та конфіденційності" },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-sky-50 rounded-xl">
                    <div className="w-10 h-10 bg-sky-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-slate-700 pt-2">{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Doctors Preview */}
      <section className="py-20 bg-sky-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-sky-600 font-medium">Команда</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">Наші лікарі</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {doctors.map((doctor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="relative aspect-square">
                    <Image
                      src={doctor.image}
                      alt={doctor.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-semibold">{doctor.name}</h3>
                    <p className="text-sky-600">{doctor.specialty}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button asChild variant="outline" size="lg" className="border-sky-600 text-sky-600 hover:bg-sky-50">
              <Link href="/portfolio/demo/medclinic/doctors">
                Всі лікарі
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-sky-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Потрібна консультація?
          </h2>
          <p className="text-sky-100 mb-8 max-w-xl mx-auto text-lg">
            Запишіться на прийом онлайн або зателефонуйте нам
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-sky-600 hover:bg-sky-50 h-14 px-8">
              <Link href="/portfolio/demo/medclinic/contact">
                Записатись онлайн
              </Link>
            </Button>
            <a href="tel:+380671234567" className="flex items-center gap-2 text-lg hover:text-sky-200 transition-colors">
              <Phone className="w-5 h-5" />
              +380 (67) 123-45-67
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
