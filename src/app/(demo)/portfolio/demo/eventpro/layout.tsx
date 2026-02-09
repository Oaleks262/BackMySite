"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail, Sparkles, Facebook, Instagram, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Головна", href: "/portfolio/demo/eventpro" },
  { name: "Послуги", href: "/portfolio/demo/eventpro/services" },
  { name: "Портфоліо", href: "/portfolio/demo/eventpro/portfolio" },
  { name: "Про нас", href: "/portfolio/demo/eventpro/about" },
  { name: "Контакти", href: "/portfolio/demo/eventpro/contact" },
];

export default function EventProLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-purple-50">
      {/* Demo Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center py-2 text-sm font-medium">
        <Link href="/portfolio" className="hover:underline inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Це демо-версія сайту EventPro. Повернутись до портфоліо
        </Link>
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/portfolio/demo/eventpro" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="font-bold text-xl text-purple-900 block">EventPro</span>
                <span className="text-xs text-purple-600">Івент-агентство</span>
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
                      ? "text-purple-600"
                      : "text-slate-600 hover:text-purple-600"
                  )}
                >
                  {item.name}
                  {pathname === item.href && (
                    <motion.div
                      layoutId="eventpro-nav"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600"
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* CTA & Contact */}
            <div className="hidden md:flex items-center gap-4">
              <a href="tel:+380671234567" className="flex items-center gap-2 text-sm text-slate-600 hover:text-purple-600">
                <Phone className="w-4 h-4" />
                +380 (67) 123-45-67
              </a>
              <Button asChild className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <Link href="/portfolio/demo/eventpro/contact">
                  Замовити івент
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
                <span className="font-bold text-lg text-purple-900">EventPro</span>
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
                        ? "text-purple-600 bg-purple-50"
                        : "text-slate-600 hover:bg-slate-50"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
              <div className="p-4 border-t">
                <Button asChild className="w-full bg-gradient-to-r from-purple-600 to-pink-600">
                  <Link href="/portfolio/demo/eventpro/contact">
                    Замовити івент
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
      <footer className="bg-purple-900 text-purple-100">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="font-bold text-lg text-white">EventPro</span>
              </div>
              <p className="text-sm leading-relaxed">
                Створюємо незабутні події: корпоративи, весілля, конференції та приватні свята.
              </p>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold text-white mb-4">Послуги</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/portfolio/demo/eventpro/services" className="hover:text-pink-400">Корпоративи</Link></li>
                <li><Link href="/portfolio/demo/eventpro/services" className="hover:text-pink-400">Весілля</Link></li>
                <li><Link href="/portfolio/demo/eventpro/services" className="hover:text-pink-400">Конференції</Link></li>
                <li><Link href="/portfolio/demo/eventpro/services" className="hover:text-pink-400">Приватні свята</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-white mb-4">Контакти</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-pink-400" />
                  +380 (67) 123-45-67
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-pink-400" />
                  hello@eventpro.ua
                </li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="font-semibold text-white mb-4">Соцмережі</h4>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-purple-800 rounded-lg flex items-center justify-center hover:bg-pink-600 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-purple-800 rounded-lg flex items-center justify-center hover:bg-pink-600 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-purple-800 mt-8 pt-8 text-center text-sm">
            <p>© 2024 EventPro. Всі права захищено. | Демо-сайт створено Growth-Tech</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
