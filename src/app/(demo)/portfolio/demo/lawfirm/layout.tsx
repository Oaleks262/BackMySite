"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail, MapPin, Clock, Scale, Facebook, Linkedin, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Головна", href: "/portfolio/demo/lawfirm" },
  { name: "Послуги", href: "/portfolio/demo/lawfirm/services" },
  { name: "Команда", href: "/portfolio/demo/lawfirm/team" },
  { name: "Справи", href: "/portfolio/demo/lawfirm/cases" },
  { name: "Контакти", href: "/portfolio/demo/lawfirm/contact" },
];

export default function LawFirmLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Demo Banner */}
      <div className="bg-amber-700 text-white text-center py-2 text-sm font-medium">
        <Link href="/portfolio" className="hover:underline inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Це демо-версія сайту LawFirm. Повернутись до портфоліо
        </Link>
      </div>

      {/* Top Bar */}
      <div className="bg-stone-900 text-stone-300 text-sm">
        <div className="container mx-auto px-4 py-2">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <a href="tel:+380671234567" className="flex items-center gap-2 hover:text-amber-400 transition-colors">
                <Phone className="w-4 h-4" />
                +380 (67) 123-45-67
              </a>
              <a href="mailto:info@lawfirm.ua" className="hidden sm:flex items-center gap-2 hover:text-amber-400 transition-colors">
                <Mail className="w-4 h-4" />
                info@lawfirm.ua
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Пн-Пт: 09:00 - 18:00
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/portfolio/demo/lawfirm" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-amber-700 rounded flex items-center justify-center">
                <Scale className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="font-serif font-bold text-xl text-stone-800 block">LawFirm</span>
                <span className="text-xs text-stone-500">Юридична компанія</span>
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
                      ? "text-amber-700"
                      : "text-stone-600 hover:text-amber-700"
                  )}
                >
                  {item.name}
                  {pathname === item.href && (
                    <motion.div
                      layoutId="lawfirm-nav"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-700"
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Button asChild className="bg-amber-700 hover:bg-amber-800">
                <Link href="/portfolio/demo/lawfirm/contact">
                  Безкоштовна консультація
                </Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-stone-600"
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
                <span className="font-serif font-bold text-lg">LawFirm</span>
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
                        ? "text-amber-700 bg-amber-50"
                        : "text-stone-600 hover:bg-stone-50"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
              <div className="p-4 border-t">
                <Button asChild className="w-full bg-amber-700 hover:bg-amber-800">
                  <Link href="/portfolio/demo/lawfirm/contact">
                    Безкоштовна консультація
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
      <footer className="bg-stone-900 text-stone-300">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-amber-700 rounded flex items-center justify-center">
                  <Scale className="w-6 h-6 text-white" />
                </div>
                <span className="font-serif font-bold text-lg text-white">LawFirm</span>
              </div>
              <p className="text-sm leading-relaxed">
                Професійна юридична допомога для бізнесу та приватних осіб. 15 років успішної практики.
              </p>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold text-white mb-4">Послуги</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/portfolio/demo/lawfirm/services" className="hover:text-amber-400">Корпоративне право</Link></li>
                <li><Link href="/portfolio/demo/lawfirm/services" className="hover:text-amber-400">Судові справи</Link></li>
                <li><Link href="/portfolio/demo/lawfirm/services" className="hover:text-amber-400">Нерухомість</Link></li>
                <li><Link href="/portfolio/demo/lawfirm/services" className="hover:text-amber-400">Сімейне право</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-white mb-4">Контакти</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-500" />
                  +380 (67) 123-45-67
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-500" />
                  info@lawfirm.ua
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-amber-500 mt-0.5" />
                  м. Київ, вул. Хрещатик, 1, офіс 100
                </li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="font-semibold text-white mb-4">Соцмережі</h4>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-stone-800 rounded flex items-center justify-center hover:bg-amber-700 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-stone-800 rounded flex items-center justify-center hover:bg-amber-700 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-stone-800 mt-8 pt-8 text-center text-sm">
            <p>© 2024 LawFirm. Всі права захищено. | Демо-сайт створено Growth-Tech</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
