"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navigation, siteConfig } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo-brow.png"
                alt="Growth-Tech"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <span
                className={cn(
                  "font-bold text-xl transition-colors",
                  isScrolled ? "text-primary" : "text-white"
                )}
              >
                Growth-Tech
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-secondary",
                    isScrolled ? "text-foreground" : "text-white/90"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium transition-colors",
                  isScrolled ? "text-foreground" : "text-white/90"
                )}
              >
                <Phone className="w-4 h-4" />
                <span className="hidden xl:inline">{siteConfig.contact.phone}</span>
              </a>
              <Button asChild className="bg-secondary hover:bg-secondary/90 text-primary">
                <Link href="#calculator">Розрахувати вартість</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Відкрити меню"
              className={cn(
                "lg:hidden p-2 rounded-lg transition-colors",
                isScrolled ? "text-foreground" : "text-white"
              )}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-white z-50 lg:hidden shadow-2xl"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/logo-brow.png"
                      alt="Growth-Tech"
                      width={32}
                      height={32}
                      className="w-8 h-8"
                    />
                    <span className="font-bold text-lg text-primary">Growth-Tech</span>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="Закрити меню"
                    className="p-2 rounded-lg hover:bg-muted"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <nav className="flex-1 py-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-6 py-3 text-lg font-medium hover:bg-muted transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
                <div className="p-4 border-t space-y-3">
                  <a
                    href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-2 text-muted-foreground"
                  >
                    <Phone className="w-5 h-5" />
                    {siteConfig.contact.phone}
                  </a>
                  <Button asChild className="w-full bg-secondary hover:bg-secondary/90 text-primary">
                    <Link href="#calculator" onClick={() => setIsMobileMenuOpen(false)}>
                      Розрахувати вартість
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
