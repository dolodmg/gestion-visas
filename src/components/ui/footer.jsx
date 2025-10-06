import { Mail } from 'lucide-react';
import Link from 'next/link';
import { Inter, Montserrat } from 'next/font/google';
import { Menu, X } from 'lucide-react';

const inter = Inter({ subsets: ['latin'], weight: ['100','200','300','400','500','700','900'] });
const montserrat = Montserrat({ subsets: ['latin'], weight: ['100','200','300','400','500','700','900'] });

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600 text-white shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 py-6 lg:px-10 lg:py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr] gap-2 md:gap-10 lg:gap-16 mb-8">
            
            {/* Sección de Marca */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
                {/* Logo */}
                <Link href="/">  
                    <div className={`${montserrat.className} flex flex-row font-bold text-lg md:text-2xl`}>
                      <span className="text-slate-300">Argen</span>
                      <span className="text-red-700">Visa</span>
                    </div>
                  </Link>
              <p className={`${inter.className} text-white/90 font-light mt-2 text-sm sm:text-base`}>
                Tu aliado en gestión de visas y documentación para argentinos
              </p>
            </div>

            {/* Sección de Contacto */}
            <div className="flex flex-row gap-2 justify-center items-center">
              <h3 className={`${inter.className} text-sm md:text-lg font-normal`}>
                Contacto:
              </h3>
              <a 
                href="mailto:visaparaargentinos@gmail.com"
                className="flex items-center gap-1 md:gap-3 text-white hover:text-white/80 transition-all duration-300 hover:translate-x-1 group"
              >
                <Mail className="w-3 h-3 md:w-6 md:h-6 flex-shrink-0" />
                <span className={`${inter.className} text-sm sm:text-base group-hover:underline`}>
                  visaparaargentinos@gmail.com
                </span>
              </a>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-white/20 pt-2 md:pt-4 text-center">
            <p className="text-sm sm:text-base text-white/90">
              &copy; 2025 ArgenVisa. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
  );
}