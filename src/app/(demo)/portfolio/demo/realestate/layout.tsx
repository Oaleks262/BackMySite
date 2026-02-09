"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail, Building2, Facebook, Instagram, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Головна", href: "/portfolio/demo/realestate" },
  { name: "Каталог", href: "/portfolio/demo/realestate/catalog" },
  { name: "Послуги", href: "/portfolio/demo/realestate/services" },
  { name: "Про нас", href: "/portfolio/demo/realestate/about" },
  { name: "Контакти", href: "/portfolio/demo/realestate/contact" },
];

export default function RealEstateLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-emerald-50">
      {/* Demo Banner */}
      <div className="bg-emerald-600 text-white text-center py-2 text-sm font-medium">
        <Link href="/portfolio" className="hover:underline inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Це демо-версія сайту RealEstate Pro. Повернутись до портфоліо
        </Link>
      </div>

      {/* Top Bar */}
      <div className="bg-emerald-900 text-emerald-100 text-sm">
        <div className="container mx-auto px-4 py-2">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <a href="tel:+380671234567" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
                +380 (67) 123-45-67
              </a>
              <a href="mailto:info@realestate.ua" className="hidden sm:flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
                info@realestate.ua
              </a>
            </div>
            <span>Працюємо без вихідних</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/portfolio/demo/realestate" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center">
                <Building2 className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="font-bold text-xl text-emerald-900 block">RealEstate Pro</span>
                <span className="text-xs text-emerald-600">Агентство нерухомості</span>
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
                      ? "text-emerald-600"
                      : "text-slate-600 hover:text-emerald-600"
                  )}
                >
                  {item.name}
                  {pathname === item.href && (
                    <motion.div
                      layoutId="realestate-nav"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600"
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden md:block">
              <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
                <Link href="/portfolio/demo/realestate/contact">
                  Безкоштовна консультація
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
                <span className="font-bold text-lg text-emerald-900">RealEstate Pro</span>
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
                        ? "text-emerald-600 bg-emerald-50"
                        : "text-slate-600 hover:bg-slate-50"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
              <div className="p-4 border-t">
                <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700">
                  <Link href="/portfolio/demo/realestate/contact">
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
      <footer className="bg-emerald-900 text-emerald-100">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <span className="font-bold text-lg text-white">RealEstate Pro</span>
              </div>
              <p className="text-sm leading-relaxed">
                Професійне агентство нерухомості з 10-річним досвідом на ринку України.
              </p>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold text-white mb-4">Послуги</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/portfolio/demo/realestate/services" className="hover:text-emerald-400">Купівля нерухомості</Link></li>
                <li><Link href="/portfolio/demo/realestate/services" className="hover:text-emerald-400">Продаж нерухомості</Link></li>
                <li><Link href="/portfolio/demo/realestate/services" className="hover:text-emerald-400">Оренда</Link></li>
                <li><Link href="/portfolio/demo/realestate/services" className="hover:text-emerald-400">Оцінка</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-white mb-4">Контакти</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-400" />
                  +380 (67) 123-45-67
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-emerald-400" />
                  info@realestate.ua
                </li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="font-semibold text-white mb-4">Соцмережі</h4>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-emerald-800 rounded-lg flex items-center justify-center hover:bg-emerald-600 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-emerald-800 rounded-lg flex items-center justify-center hover:bg-emerald-600 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-emerald-800 mt-8 pt-8 text-center text-sm">
            <p>© 2024 RealEstate Pro. Всі права захищено. | Демо-сайт створено Growth-Tech</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
