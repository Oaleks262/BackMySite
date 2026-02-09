"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, Calendar } from "lucide-react";
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

const doctors = [
  "Терапевт",
  "Кардіолог",
  "Невролог",
  "Офтальмолог",
  "Ортопед",
  "Педіатр",
  "Інший спеціаліст",
];

const contacts = [
  {
    icon: Phone,
    title: "Телефон",
    value: "+380 (67) 123-45-67",
    link: "tel:+380671234567",
    description: "Цілодобова реєстратура",
  },
  {
    icon: Mail,
    title: "Email",
    value: "info@medclinic.ua",
    link: "mailto:info@medclinic.ua",
    description: "Відповімо протягом дня",
  },
  {
    icon: MapPin,
    title: "Адреса",
    value: "м. Київ, вул. Здоров'я, 10",
    link: "https://maps.google.com",
    description: "Біля метро Лук'янівська",
  },
  {
    icon: Clock,
    title: "Графік",
    value: "Пн-Сб: 08:00 - 20:00",
    link: null,
    description: "Нд: 09:00 - 15:00",
  },
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    doctor: "",
    date: "",
    time: "",
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
      <section className="bg-gradient-to-br from-sky-600 to-sky-800 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-sky-200 font-medium">Контакти</span>
            <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
              Запис на прийом
            </h1>
            <p className="text-sky-100 text-lg">
              Запишіться на прийом онлайн або зателефонуйте нам.
              Реєстратура працює цілодобово.
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
                    <div className="w-14 h-14 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <contact.icon className="w-7 h-7 text-sky-600" />
                    </div>
                    <h3 className="font-semibold mb-1">{contact.title}</h3>
                    {contact.link ? (
                      <a
                        href={contact.link}
                        className="text-sky-600 hover:underline font-medium"
                      >
                        {contact.value}
                      </a>
                    ) : (
                      <p className="text-sky-600 font-medium">{contact.value}</p>
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
      <section className="py-16 bg-sky-50">
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
                        Ваша заявка прийнята. Ми зателефонуємо для підтвердження запису.
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormData({ name: "", phone: "", email: "", doctor: "", date: "", time: "", message: "" });
                        }}
                      >
                        Записатись ще
                      </Button>
                    </motion.div>
                  ) : (
                    <>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-sky-600" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold">Онлайн-запис</h2>
                          <p className="text-slate-600">Оберіть зручний час</p>
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

                        <div className="space-y-2">
                          <Label htmlFor="doctor">До якого лікаря *</Label>
                          <Select
                            value={formData.doctor}
                            onValueChange={(value) => handleChange("doctor", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Оберіть спеціаліста" />
                            </SelectTrigger>
                            <SelectContent>
                              {doctors.map((doctor) => (
                                <SelectItem key={doctor} value={doctor}>
                                  {doctor}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="date">Бажана дата</Label>
                            <Input
                              id="date"
                              type="date"
                              value={formData.date}
                              onChange={(e) => handleChange("date", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="time">Бажаний час</Label>
                            <Select
                              value={formData.time}
                              onValueChange={(value) => handleChange("time", value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Оберіть час" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="09:00">09:00</SelectItem>
                                <SelectItem value="10:00">10:00</SelectItem>
                                <SelectItem value="11:00">11:00</SelectItem>
                                <SelectItem value="12:00">12:00</SelectItem>
                                <SelectItem value="14:00">14:00</SelectItem>
                                <SelectItem value="15:00">15:00</SelectItem>
                                <SelectItem value="16:00">16:00</SelectItem>
                                <SelectItem value="17:00">17:00</SelectItem>
                                <SelectItem value="18:00">18:00</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="message">Коментар</Label>
                          <Textarea
                            id="message"
                            placeholder="Опишіть симптоми або причину візиту..."
                            rows={3}
                            value={formData.message}
                            onChange={(e) => handleChange("message", e.target.value)}
                          />
                        </div>

                        <Button
                          type="submit"
                          className="w-full bg-sky-600 hover:bg-sky-700 h-12"
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
                              Записатись на прийом
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

              {/* Emergency */}
              <Card className="bg-sky-600 text-white">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">Екстрена допомога</h3>
                  <p className="text-sky-100 text-sm mb-4">
                    При невідкладних станах дзвоніть на гарячу лінію
                  </p>
                  <a
                    href="tel:+380671234567"
                    className="inline-flex items-center gap-2 bg-white text-sky-600 px-4 py-2 rounded-lg font-medium hover:bg-sky-50 transition-colors"
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
