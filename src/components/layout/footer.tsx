import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Send, Instagram, Facebook } from "lucide-react";
import { siteConfig, navigation } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo-brow.png"
                alt="Growth-Tech"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <span className="font-bold text-xl">Growth-Tech</span>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed">
              Створюємо швидкі, сучасні та конверсійні веб-рішення для малого та середнього бізнесу в Україні.
            </p>
            <div className="flex items-center gap-3">
              {siteConfig.links.telegram && (
                <a
                  href={siteConfig.links.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Telegram"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary transition-colors"
                >
                  <Send className="w-5 h-5" />
                </a>
              )}
              {siteConfig.links.instagram && (
                <a
                  href={siteConfig.links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {siteConfig.links.facebook && (
                <a
                  href={siteConfig.links.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Навігація</h3>
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-white/70 hover:text-secondary transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Послуги</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li>UI/UX Дизайн</li>
              <li>Веб-розробка</li>
              <li>Лендінги</li>
              <li>Інтернет-магазини</li>
              <li>Корпоративні сайти</li>
              <li>Технічна підтримка</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Контакти</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 text-white/70 hover:text-secondary transition-colors"
                >
                  <Phone className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">{siteConfig.contact.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-center gap-3 text-white/70 hover:text-secondary transition-colors"
                >
                  <Mail className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">{siteConfig.contact.email}</span>
                </a>
              </li>
              <li className="flex items-center gap-3 text-white/70">
                <MapPin className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">{siteConfig.contact.address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm">
            &copy; {currentYear} Growth-Tech. Всі права захищено.
          </p>
          <div className="flex items-center gap-6 text-sm text-white/50">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Політика конфіденційності
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Умови використання
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
