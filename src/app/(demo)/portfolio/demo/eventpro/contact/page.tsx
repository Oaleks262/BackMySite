"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, Sparkles, Instagram } from "lucide-react";
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

const eventTypes = [
  "Корпоратив",
  "Весілля",
  "Конференція",
  "День народження",
  "Приватна вечірка",
  "Інше",
];

const contacts = [
  {
    icon: Phone,
    title: "Телефон",
    value: "+380 (67) 123-45-67",
    link: "tel:+380671234567",
    description: "Щодня з 10:00 до 20:00",
  },
  {
    icon: Mail,
    title: "Email",
    value: "hello@eventpro.ua",
    link: "mailto:hello@eventpro.ua",
    description: "Відповімо протягом години",
  },
  {
    icon: Instagram,
    title: "Instagram",
    value: "@eventpro.ua",
    link: "https://instagram.com",
    description: "Фото наших заходів",
  },
  {
    icon: Clock,
    title: "Графік",
    value: "Пн-Нд: 10:00 - 20:00",
    link: null,
    description: "Працюємо без вихідних",
  },
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    eventType: "",
    date: "",
    guests: "",
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
      <section className="bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-purple-300 font-medium">Контакти</span>
            <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
              Замовити івент
            </h1>
            <p className="text-purple-100 text-lg">
              Розкажіть про ваш майбутній захід і ми зв&apos;яжемось для обговорення деталей.
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
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <contact.icon className="w-7 h-7 text-purple-600" />
                    </div>
                    <h3 className="font-semibold mb-1">{contact.title}</h3>
                    {contact.link ? (
                      <a
                        href={contact.link}
                        className="text-purple-600 hover:underline font-medium"
                      >
                        {contact.value}
                      </a>
                    ) : (
                      <p className="text-purple-600 font-medium">{contact.value}</p>
                    )}
                    <p className="text-slate-500 text-sm mt-1">{contact.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 bg-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
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
                        Наш менеджер зв&apos;яжеться з вами протягом години.
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormData({ name: "", phone: "", email: "", eventType: "", date: "", guests: "", budget: "", message: "" });
                        }}
                      >
                        Надіслати ще одну заявку
                      </Button>
                    </motion.div>
                  ) : (
                    <>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center">
                          <Sparkles className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold">Замовити захід</h2>
                          <p className="text-slate-600">Безкоштовна консультація</p>
                        </div>
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

                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="eventType">Тип заходу *</Label>
                            <Select
                              value={formData.eventType}
                              onValueChange={(value) => handleChange("eventType", value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Оберіть тип" />
                              </SelectTrigger>
                              <SelectContent>
                                {eventTypes.map((type) => (
                                  <SelectItem key={type} value={type}>
                                    {type}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="date">Орієнтовна дата</Label>
                            <Input
                              id="date"
                              type="date"
                              value={formData.date}
                              onChange={(e) => handleChange("date", e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="guests">Кількість гостей</Label>
                            <Select
                              value={formData.guests}
                              onValueChange={(value) => handleChange("guests", value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Оберіть" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="<50">До 50 осіб</SelectItem>
                                <SelectItem value="50-100">50-100 осіб</SelectItem>
                                <SelectItem value="100-200">100-200 осіб</SelectItem>
                                <SelectItem value="200-500">200-500 осіб</SelectItem>
                                <SelectItem value=">500">Більше 500 осіб</SelectItem>
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
                                <SelectValue placeholder="Оберіть" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="<50000">До 50 000 ₴</SelectItem>
                                <SelectItem value="50000-100000">50 000 - 100 000 ₴</SelectItem>
                                <SelectItem value="100000-200000">100 000 - 200 000 ₴</SelectItem>
                                <SelectItem value=">200000">Більше 200 000 ₴</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="message">Розкажіть про ваш захід</Label>
                          <Textarea
                            id="message"
                            placeholder="Опишіть ваші побажання та ідеї..."
                            rows={4}
                            value={formData.message}
                            onChange={(e) => handleChange("message", e.target.value)}
                          />
                        </div>

                        <Button
                          type="submit"
                          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 h-12"
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
          </div>
        </div>
      </section>
    </>
  );
}
