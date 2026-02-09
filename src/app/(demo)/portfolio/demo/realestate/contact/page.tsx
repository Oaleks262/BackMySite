"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, Building2 } from "lucide-react";
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
  "Купівля квартири",
  "Продаж квартири",
  "Купівля будинку",
  "Продаж будинку",
  "Оренда",
  "Оцінка нерухомості",
  "Інше",
];

const contacts = [
  {
    icon: Phone,
    title: "Телефон",
    value: "+380 (67) 123-45-67",
    link: "tel:+380671234567",
    description: "Щодня з 09:00 до 21:00",
  },
  {
    icon: Mail,
    title: "Email",
    value: "info@realestate.ua",
    link: "mailto:info@realestate.ua",
    description: "Відповімо протягом години",
  },
  {
    icon: MapPin,
    title: "Офіс",
    value: "м. Київ, вул. Хрещатик, 15",
    link: "https://maps.google.com",
    description: "Біля метро Хрещатик",
  },
  {
    icon: Clock,
    title: "Графік",
    value: "Щодня 09:00 - 21:00",
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
      <section className="bg-emerald-900 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-emerald-300 font-medium">Контакти</span>
            <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
              Зв&apos;яжіться з нами
            </h1>
            <p className="text-emerald-100 text-lg">
              Залиште заявку на безкоштовну консультацію і наш агент зв&apos;яжеться з вами.
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
                    <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <contact.icon className="w-7 h-7 text-emerald-600" />
                    </div>
                    <h3 className="font-semibold mb-1">{contact.title}</h3>
                    {contact.link ? (
                      <a
                        href={contact.link}
                        className="text-emerald-600 hover:underline font-medium"
                      >
                        {contact.value}
                      </a>
                    ) : (
                      <p className="text-emerald-600 font-medium">{contact.value}</p>
                    )}
                    <p className="text-slate-500 text-sm mt-1">{contact.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form & Map */}
      <section className="py-16 bg-emerald-50">
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
                      <h3 className="text-2xl font-bold mb-2">Дякуємо!</h3>
                      <p className="text-slate-600 mb-6">
                        Наш агент зв&apos;яжеться з вами найближчим часом.
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormData({ name: "", phone: "", email: "", service: "", budget: "", message: "" });
                        }}
                      >
                        Надіслати ще одну заявку
                      </Button>
                    </motion.div>
                  ) : (
                    <>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                          <Building2 className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold">Замовити консультацію</h2>
                          <p className="text-slate-600">Безкоштовно та без зобов&apos;язань</p>
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
                            <Label htmlFor="service">Послуга</Label>
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
                            <Label htmlFor="budget">Бюджет</Label>
                            <Select
                              value={formData.budget}
                              onValueChange={(value) => handleChange("budget", value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Оберіть бюджет" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="<50000">До $50 000</SelectItem>
                                <SelectItem value="50000-100000">$50 000 - $100 000</SelectItem>
                                <SelectItem value="100000-200000">$100 000 - $200 000</SelectItem>
                                <SelectItem value=">200000">Більше $200 000</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="message">Коментар</Label>
                          <Textarea
                            id="message"
                            placeholder="Опишіть що шукаєте або що хочете продати..."
                            rows={4}
                            value={formData.message}
                            onChange={(e) => handleChange("message", e.target.value)}
                          />
                        </div>

                        <Button
                          type="submit"
                          className="w-full bg-emerald-600 hover:bg-emerald-700 h-12"
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

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="aspect-video lg:aspect-[4/3] rounded-xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2540.5840830296397!2d30.520368315732873!3d50.44967097947436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4ce50f8b6e3c3%3A0xb528dc4d6dadc4f8!2z0LLRg9C70LjRhtGPINCl0YDQtdGJ0LDRgtC40LosIDEsINCa0LjRl9Cy!5e0!3m2!1suk!2sua!4v1635000000000!5m2!1suk!2sua"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                />
              </div>

              <Card className="bg-emerald-600 text-white">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">Терміново потрібна допомога?</h3>
                  <p className="text-emerald-100 text-sm mb-4">
                    Зателефонуйте нам прямо зараз — працюємо без вихідних
                  </p>
                  <a
                    href="tel:+380671234567"
                    className="inline-flex items-center gap-2 bg-white text-emerald-600 px-4 py-2 rounded-lg font-medium hover:bg-emerald-50 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    +380 (67) 123-45-67
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
