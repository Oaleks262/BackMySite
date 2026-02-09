"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, MessageSquare } from "lucide-react";
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
  "Корпоративне право",
  "Судові справи",
  "Нерухомість",
  "Сімейне право",
  "Трудове право",
  "Захист бізнесу",
  "Інше",
];

const contacts = [
  {
    icon: Phone,
    title: "Телефон",
    value: "+380 (67) 123-45-67",
    link: "tel:+380671234567",
    description: "Цілодобова гаряча лінія",
  },
  {
    icon: Mail,
    title: "Email",
    value: "info@lawfirm.ua",
    link: "mailto:info@lawfirm.ua",
    description: "Відповідаємо протягом 2 годин",
  },
  {
    icon: MapPin,
    title: "Адреса",
    value: "м. Київ, вул. Хрещатик, 1, офіс 100",
    link: "https://maps.google.com",
    description: "Біля станції метро Хрещатик",
  },
  {
    icon: Clock,
    title: "Графік роботи",
    value: "Пн-Пт: 09:00 - 18:00",
    link: null,
    description: "Сб-Нд: за попереднім записом",
  },
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
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
      <section className="bg-stone-900 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-amber-400 font-medium">Контакти</span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mt-2 mb-4">
              Зв&apos;яжіться з нами
            </h1>
            <p className="text-stone-300 text-lg">
              Запишіться на безкоштовну консультацію або задайте питання.
              Ми відповімо протягом 2 годин у робочий час.
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
                    <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <contact.icon className="w-7 h-7 text-amber-700" />
                    </div>
                    <h3 className="font-semibold mb-1">{contact.title}</h3>
                    {contact.link ? (
                      <a
                        href={contact.link}
                        className="text-amber-700 hover:underline font-medium"
                      >
                        {contact.value}
                      </a>
                    ) : (
                      <p className="text-amber-700 font-medium">{contact.value}</p>
                    )}
                    <p className="text-stone-500 text-sm mt-1">{contact.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form & Map */}
      <section className="py-16 bg-stone-50">
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
                      <h3 className="text-2xl font-serif font-bold mb-2">Дякуємо за звернення!</h3>
                      <p className="text-stone-600 mb-6">
                        Наш спеціаліст зв&apos;яжеться з вами протягом 2 годин.
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormData({ name: "", phone: "", email: "", service: "", message: "" });
                        }}
                      >
                        Надіслати ще одне звернення
                      </Button>
                    </motion.div>
                  ) : (
                    <>
                      <div className="mb-6">
                        <h2 className="text-2xl font-serif font-bold">Записатись на консультацію</h2>
                        <p className="text-stone-600 mt-1">Перша консультація — безкоштовно</p>
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
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="email@example.com"
                            value={formData.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="service">Напрямок консультації</Label>
                          <Select
                            value={formData.service}
                            onValueChange={(value) => handleChange("service", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Оберіть напрямок" />
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
                          <Label htmlFor="message">Опишіть вашу ситуацію</Label>
                          <Textarea
                            id="message"
                            placeholder="Коротко опишіть вашу проблему або питання..."
                            rows={4}
                            value={formData.message}
                            onChange={(e) => handleChange("message", e.target.value)}
                          />
                        </div>

                        <Button
                          type="submit"
                          className="w-full bg-amber-700 hover:bg-amber-800 h-12"
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

                        <p className="text-xs text-stone-500 text-center">
                          Натискаючи кнопку, ви погоджуєтесь з політикою конфіденційності
                        </p>
                      </form>
                    </>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Map & Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Map Placeholder */}
              <div className="relative aspect-video lg:aspect-[4/3] rounded-xl overflow-hidden bg-stone-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2540.5840830296397!2d30.520368315732873!3d50.44967097947436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4ce50f8b6e3c3%3A0xb528dc4d6dadc4f8!2z0LLRg9C70LjRhtGPINCl0YDQtdGJ0LDRgtC40LosIDEsINCa0LjRl9Cy!5e0!3m2!1suk!2sua!4v1635000000000!5m2!1suk!2sua"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                />
              </div>

              {/* Quick Contact */}
              <Card className="bg-amber-700 text-white">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Терміновий дзвінок?</h3>
                      <p className="text-amber-100 text-sm mb-3">
                        Для термінових справ працює цілодобова гаряча лінія
                      </p>
                      <a
                        href="tel:+380671234567"
                        className="inline-flex items-center gap-2 bg-white text-amber-700 px-4 py-2 rounded-lg font-medium hover:bg-amber-50 transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        +380 (67) 123-45-67
                      </a>
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
                      {
                        q: "Скільки коштує консультація?",
                        a: "Перша консультація тривалістю до 30 хвилин — безкоштовна.",
                      },
                      {
                        q: "Як швидко ви відповідаєте?",
                        a: "Зазвичай ми передзвонюємо протягом 2 годин у робочий час.",
                      },
                      {
                        q: "Чи можна онлайн?",
                        a: "Так, ми проводимо консультації через Zoom, Google Meet або телефоном.",
                      },
                    ].map((faq, i) => (
                      <div key={i}>
                        <h4 className="font-medium text-stone-800">{faq.q}</h4>
                        <p className="text-stone-600 text-sm mt-1">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
