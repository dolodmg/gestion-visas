'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { Inter, Montserrat } from 'next/font/google';
import { Menu, X } from 'lucide-react';

const inter = Inter({ subsets: ['latin'], weight: ['100','200','300','400','500','700','900'] });
const montserrat = Montserrat({ subsets: ['latin'], weight: ['100','200','300','400','500','700','900'] });

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="flex w-full items-center justify-between px-6 sm:px-8 py-4 drop-shadow-lg bg-white relative">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <img
          src="/images/logo.png"
          alt="Logo ArgenVisa"
          className="cursor-pointer w-14 sm:w-14 md:w-20 h-auto"
        />
        <div className={`${montserrat.className} flex flex-row font-bold text-lg sm:text-xl md:text-2xl`}>
          <span className="text-slate-700">Argen</span>
          <span className="text-red-700">Visa</span>
        </div>
      </Link>

      {/* Desktop Menu */}
      <ul
        className={`${inter.className} hidden md:flex gap-12 mr-4 text-sm font-light text-sky-950`}
      >
        <li>
          <Link href="/usa" className="hover:text-sky-900">
            Visa EEUU
          </Link>
        </li>
        <li>
          <Link href="/canada" className="hover:text-sky-900">
            Visa & eTA Canadá
          </Link>
        </li>
      </ul>

      {/* Mobile Button */}
      <button
        className="md:hidden text-sky-950"
        onClick={toggleMenu}
        aria-label="Abrir menú"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md md:hidden z-50">
          <ul
            className={`${inter.className} flex flex-col items-center gap-6 py-6 text-sm font-light text-sky-950`}
          >
            <li>
              <Link
                href="/usa"
                className="hover:text-sky-900"
                onClick={toggleMenu}
              >
                Visa EEUU
              </Link>
            </li>
            <li>
              <Link
                href="/canada"
                className="hover:text-sky-900"
                onClick={toggleMenu}
              >
                eTA Canadá
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-sky-900"
                onClick={toggleMenu}
              >
                Sobre nosotros
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
