'use client';
import Image from "next/image"
import { Button } from "@/components/ui/button";
import { Inter, MuseoModerno } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], weight: ['100','200','300','400','500','700','900'] });
const museo = MuseoModerno({ subsets: ['latin'], weight: ['100','200','300','400','500','700','900'] });


export const CanadaHeader = () => {

    const handleScrollToPricing = () => {
        const pricingSection = document.getElementById('pricing-section');
        if (pricingSection) {
            pricingSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    return (
        <div className={`relative w-full h-36 md:h-[350px] flex items-center ${inter.className}`}>
            <Image
            src="/images/canada_banner.png"
            alt="ArgenVisa - Gestión de visas y autorización eTA para Canadá"
            fill
            className="object-cover"
            priority
            />
            <div className="absolute inset-0"></div>
                <div className={`${museo.className} relative z-10 left-1/2 -translate-x-1/2 bottom-4 md:bottom-10 text-white font-bold text-2xl md:text-6xl`}>
                    <h1>VIAJÁ A CANADÁ</h1>
                </div>
            <Button onClick={handleScrollToPricing}
            className="absolute bottom-4 md:bottom-25 left-1/2 -translate-x-1/2 md:py-6 bg-[#BD593A] hover:bg-[#853f29] hover:cursor-pointer text-xs md:text-lg text-white font-normal">
            VER OPCIONES
            </Button>
        </div>
    )
}