'use client'
import React from 'react';
import Link from 'next/link';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], weight: ['100','200','300','400','500','700','900'] });

const Navbar = () => {
    return (
        <nav className="flex w-full items-center justify-between px-8 py-4 drop-shadow-lg bg-white">
            <Link href="/">
                <img src="/images/logopage.png" width={100} height={100} alt="Logo página" />
            </Link>
            <div>
                <ul className={`${inter.className} flex w-full justify-left gap-14 text-sm font-light text-sky-950`}>
                    <li><Link href="/usa" className="hover:text-sky-900">Visa EEUU</Link></li>
                    <li><Link href="/canada" className="hover:text-sky-900">eTA Canadá</Link></li>
                    <li><Link href="/about" className="hover:text-sky-900">Sobre nosotros</Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;