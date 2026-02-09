"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail, Clock, MapPin, Heart, Facebook, Instagram, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Головна", href: "/portfolio/demo/medclinic" },
  { name: "Послуги", href: "/portfolio/demo/medclinic/services" },
  { name: "Лікарі", href: "/portfolio/demo/medclinic/doctors" },
  { name: "Ціни", href: "/portfolio/demo/medclinic/prices" },
  { name: "Контакти", href: "/portfolio/demo/medclinic/contact" },
];

export default function MedClinicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-sky-50">
      {/* Demo Banner */}
      <div className="bg-sky-600 text-white text-center py-2 text-sm font-medium">
        <Link href="/portfolio" className="hover:underline inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Це демо-версія сайту MedClinic. Повернутись до портфоліо
        </Link>
      </div>

      {/* Top Bar */}
      <div className="bg-sky-900 text-sky-100 text-sm">
        <div className="container mx-auto px-4 py-2">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <a href="tel:+380671234567" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
                +380 (67) 123-45-67
              </a>
              <span className="hidden sm:flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Пн-Сб: 08:00 - 20:00
              </span>
            </div>
            <a href="mailto:info@medclinic.ua" className="flex items-center gap-2 hover:text-white transition-colors">
              <Mail className="w-4 h-4" />
              info@medclinic.ua
            </a>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/portfolio/demo/medclinic" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-sky-600 rounded-full flex items-center justify-center">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="font-bold text-xl text-sky-900 block">MedClinic</span>
                <span className="text-xs text-sky-600">Медичний центр</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors relative py-2",
                    pathname === item.href
                      ? "text-sky-600"
                      : "text-slate-600 hover:text-sky-600"
                  )}
                >
                  {item.name}
                  {pathname === item.href && (
                    <motion.div
                      layoutId="medclinic-nav"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-600"
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden md:block">
              <Button asChild className="bg-sky-600 hover:bg-sky-700">
                <Link href="/portfolio/demo/medclinic/contact">
                  Записатись на прийом
                </Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-slate-600"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-white z-50 lg:hidden"
            >
              <div className="flex items-center justify-between p-4 border-b">
                <span className="font-bold text-lg text-sky-900">MedClinic</span>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <nav className="py-4">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "block px-6 py-3 font-medium transition-colors",
                      pathname === item.href
                        ? "text-sky-600 bg-sky-50"
                        : "text-slate-600 hover:bg-slate-50"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
              <div className="p-4 border-t">
                <Button asChild className="w-full bg-sky-600 hover:bg-sky-700">
                  <Link href="/portfolio/demo/medclinic/contact">
                    Записатись на прийом
                  </Link>
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-sky-900 text-sky-100">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-sky-600 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <span className="font-bold text-lg text-white">MedClinic</span>
              </div>
              <p className="text-sm leading-relaxed">
                Сучасний медичний центр з передовим обладнанням та досвідченими лікарями.
              </p>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold text-white mb-4">Послуги</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/portfolio/demo/medclinic/services" className="hover:text-sky-400">Терапія</Link></li>
                <li><Link href="/portfolio/demo/medclinic/services" className="hover:text-sky-400">Кардіологія</Link></li>
                <li><Link href="/portfolio/demo/medclinic/services" className="hover:text-sky-400">Неврологія</Link></li>
                <li><Link href="/portfolio/demo/medclinic/services" className="hover:text-sky-400">Діагностика</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-white mb-4">Контакти</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-sky-400" />
                  +380 (67) 123-45-67
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-sky-400" />
                  info@medclinic.ua
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-sky-400 mt-0.5" />
                  м. Київ, вул. Здоров&apos;я, 10
                </li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="font-semibold text-white mb-4">Соцмережі</h4>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-sky-800 rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-sky-800 rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-sky-800 mt-8 pt-8 text-center text-sm">
            <p>© 2024 MedClinic. Всі права захищено. | Демо-сайт створено Growth-Tech</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
