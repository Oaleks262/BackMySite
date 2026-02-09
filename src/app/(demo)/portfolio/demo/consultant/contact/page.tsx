"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, Linkedin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const services = [
  "Бізнес-стратегія",
  "Операційна ефективність",
  "Цифрова трансформація",
  "Управління змінами",
  "Фінансовий консалтинг",
  "Маркетинговий консалтинг",
  "Інше",
];

const contacts = [
  {
    icon: Phone,
    title: "Телефон",
    value: "+380 (67) 123-45-67",
    link: "tel:+380671234567",
  },
  {
    icon: Mail,
    title: "Email",
    value: "hello@consultant.ua",
    link: "mailto:hello@consultant.ua",
  },
  {
    icon: MapPin,
    title: "Офіс",
    value: "м. Київ, БЦ «Гулівер», офіс 2501",
    link: "https://maps.google.com",
  },
  {
    icon: Clock,
    title: "Графік",
    value: "Пн-Пт: 09:00 - 18:00",
    link: null,
  },
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    position: "",
    phone: "",
    email: "",
    service: "",
    budget: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-indigo-400 font-medium">Контакти</span>
            <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
              Обговоримо ваш проект
            </h1>
            <p className="text-slate-300 text-lg">
              Залиште заявку на безкоштовну консультацію і ми зв&apos;яжемось з вами
              протягом 24 годин.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contacts.map((contact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <contact.icon className="w-7 h-7 text-indigo-600" />
                    </div>
                    <h3 className="font-semibold mb-1">{contact.title}</h3>
                    {contact.link ? (
                      <a
                        href={contact.link}
                        className="text-indigo-600 hover:underline font-medium"
                      >
                        {contact.value}
                      </a>
                    ) : (
                      <p className="text-indigo-600 font-medium">{contact.value}</p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="p-8">
                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-green-600" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">Дякуємо за заявку!</h3>
                      <p className="text-slate-600 mb-6">
                        Наш консультант зв&apos;яжеться з вами протягом 24 годин.
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormData({ name: "", company: "", position: "", phone: "", email: "", service: "", budget: "", message: "" });
                        }}
                      >
                        Надіслати ще одну заявку
                      </Button>
                    </motion.div>
                  ) : (
                    <>
                      <div className="mb-6">
                        <h2 className="text-2xl font-bold">Замовити консультацію</h2>
                        <p className="text-slate-600 mt-1">Перша консультація — безкоштовно</p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Ім&apos;я *</Label>
                            <Input
                              id="name"
                              placeholder="Ваше ім'я"
                              value={formData.name}
                              onChange={(e) => handleChange("name", e.target.value)}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="company">Компанія *</Label>
                            <Input
                              id="company"
                              placeholder="Назва компанії"
                              value={formData.company}
                              onChange={(e) => handleChange("company", e.target.value)}
                              required
                            />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="position">Посада</Label>
                            <Input
                              id="position"
                              placeholder="Ваша посада"
                              value={formData.position}
                              onChange={(e) => handleChange("position", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Телефон *</Label>
                            <Input
                              id="phone"
                              type="tel"
                              placeholder="+380"
                              value={formData.phone}
                              onChange={(e) => handleChange("phone", e.target.value)}
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="email@company.com"
                            value={formData.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            required
                          />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="service">Напрямок</Label>
                            <Select
                              value={formData.service}
                              onValueChange={(value) => handleChange("service", value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Оберіть послугу" />
                              </SelectTrigger>
                              <SelectContent>
                                {services.map((service) => (
                                  <SelectItem key={service} value={service}>
                                    {service}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="budget">Орієнтовний бюджет</Label>
                            <Select
                              value={formData.budget}
                              onValueChange={(value) => handleChange("budget", value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Оберіть бюджет" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="<5000">До $5 000</SelectItem>
                                <SelectItem value="5000-10000">$5 000 - $10 000</SelectItem>
                                <SelectItem value="10000-25000">$10 000 - $25 000</SelectItem>
                                <SelectItem value=">25000">Більше $25 000</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="message">Опишіть ваш запит</Label>
                          <Textarea
                            id="message"
                            placeholder="Розкажіть про ваш бізнес та виклики, з якими стикаєтесь..."
                            rows={4}
                            value={formData.message}
                            onChange={(e) => handleChange("message", e.target.value)}
                          />
                        </div>

                        <Button
                          type="submit"
                          className="w-full bg-indigo-600 hover:bg-indigo-700 h-12"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <span className="flex items-center gap-2">
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                              />
                              Надсилаємо...
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              <Send className="w-5 h-5" />
                              Надіслати заявку
                            </span>
                          )}
                        </Button>
                      </form>
                    </>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Book a call */}
              <Card className="bg-gradient-to-br from-indigo-600 to-violet-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Забронювати дзвінок</h3>
                      <p className="text-indigo-100 text-sm mb-3">
                        Оберіть зручний час для 30-хвилинної консультації
                      </p>
                      <Button className="bg-white text-indigo-600 hover:bg-indigo-50">
                        Обрати час
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Часті питання</h3>
                  <div className="space-y-4">
                    {[
                      { q: "Як проходить перша консультація?", a: "30-хвилинний дзвінок для обговорення вашого запиту та визначення, як ми можемо допомогти." },
                      { q: "Скільки коштують послуги?", a: "Вартість залежить від обсягу проекту. Ми підготуємо індивідуальну пропозицію після консультації." },
                      { q: "Як довго триває проект?", a: "Типовий проект триває 3-6 місяців, але терміни визначаються індивідуально." },
                    ].map((faq, i) => (
                      <div key={i}>
                        <h4 className="font-medium text-slate-800">{faq.q}</h4>
                        <p className="text-slate-600 text-sm mt-1">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Social */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Слідкуйте за нами</h3>
                  <a
                    href="#"
                    className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <Linkedin className="w-6 h-6 text-indigo-600" />
                    <div>
                      <div className="font-medium">LinkedIn</div>
                      <div className="text-slate-500 text-sm">Корисний контент про бізнес</div>
                    </div>
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
