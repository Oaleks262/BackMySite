"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail, ShoppingCart, Search, Car, Wrench, Facebook, Instagram, ArrowLeft, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Головна", href: "/portfolio/demo/autoparts" },
  { name: "Каталог", href: "/portfolio/demo/autoparts/catalog" },
  { name: "Послуги", href: "/portfolio/demo/autoparts/services" },
  { name: "Про нас", href: "/portfolio/demo/autoparts/about" },
  { name: "Контакти", href: "/portfolio/demo/autoparts/contact" },
];

export default function AutoPartsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount] = useState(3);

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Demo Banner */}
      <div className="bg-red-600 text-white text-center py-2 text-sm font-medium">
        <Link href="/portfolio" className="hover:underline inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Це демо-версія магазину AutoParts. Повернутись до портфоліо
        </Link>
      </div>

      {/* Top Bar */}
      <div className="bg-zinc-900 text-zinc-300 text-sm">
        <div className="container mx-auto px-4 py-2">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <a href="tel:+380671234567" className="flex items-center gap-2 hover:text-red-500 transition-colors">
                <Phone className="w-4 h-4" />
                +380 (67) 123-45-67
              </a>
              <a href="mailto:info@autoparts.ua" className="hidden sm:flex items-center gap-2 hover:text-red-500 transition-colors">
                <Mail className="w-4 h-4" />
                info@autoparts.ua
              </a>
            </div>
            <div className="flex items-center gap-4">
              <span>Графік: Пн-Сб 09:00-19:00</span>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20 gap-4">
            {/* Logo */}
            <Link href="/portfolio/demo/autoparts" className="flex items-center gap-3 flex-shrink-0">
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                <Car className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="font-bold text-xl text-zinc-800 block">AutoParts</span>
                <span className="text-xs text-zinc-500">Автозапчастини</span>
              </div>
            </Link>

            {/* Search */}
            <div className="hidden lg:flex flex-1 max-w-xl mx-8">
              <div className="relative w-full">
                <Input
                  type="search"
                  placeholder="Пошук запчастин за артикулом або назвою..."
                  className="pr-10 h-11"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button className="hidden md:flex items-center gap-2 text-zinc-600 hover:text-red-600">
                <User className="w-5 h-5" />
                <span className="text-sm">Увійти</span>
              </button>

              <button className="relative p-2">
                <ShoppingCart className="w-6 h-6 text-zinc-600" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-600 text-xs">
                    {cartCount}
                  </Badge>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 text-zinc-600"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 py-3 border-t">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-red-600 text-white"
                    : "text-zinc-600 hover:bg-zinc-100"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
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
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed top-0 left-0 bottom-0 w-80 bg-white z-50 lg:hidden"
            >
              <div className="flex items-center justify-between p-4 border-b">
                <span className="font-bold text-lg">AutoParts</span>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Search */}
              <div className="p-4 border-b">
                <Input type="search" placeholder="Пошук запчастин..." />
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
                        ? "text-red-600 bg-red-50"
                        : "text-zinc-600 hover:bg-zinc-50"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-zinc-900 text-zinc-300">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                  <Car className="w-6 h-6 text-white" />
                </div>
                <span className="font-bold text-lg text-white">AutoParts</span>
              </div>
              <p className="text-sm leading-relaxed">
                Найбільший вибір автозапчастин для всіх марок авто. Оригінальні та якісні аналоги.
              </p>
            </div>

            {/* Categories */}
            <div>
              <h4 className="font-semibold text-white mb-4">Каталог</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/portfolio/demo/autoparts/catalog" className="hover:text-red-500">Двигун</Link></li>
                <li><Link href="/portfolio/demo/autoparts/catalog" className="hover:text-red-500">Гальма</Link></li>
                <li><Link href="/portfolio/demo/autoparts/catalog" className="hover:text-red-500">Підвіска</Link></li>
                <li><Link href="/portfolio/demo/autoparts/catalog" className="hover:text-red-500">Електрика</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-white mb-4">Контакти</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-red-500" />
                  +380 (67) 123-45-67
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-red-500" />
                  info@autoparts.ua
                </li>
                <li className="flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-red-500" />
                  СТО: вул. Промислова, 15
                </li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="font-semibold text-white mb-4">Ми в соцмережах</h4>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-800 mt-8 pt-8 text-center text-sm">
            <p>© 2024 AutoParts. Всі права захищено. | Демо-сайт створено Growth-Tech</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
