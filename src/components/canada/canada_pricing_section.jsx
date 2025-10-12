'use client';
import { Inter, Merriweather } from 'next/font/google';
import CanadaStandard from './canada_standard';
import CanadaPremium from './canada_premium';
import Eta from './eta';
import { Shield, Zap } from 'lucide-react';

const inter = Inter({ subsets: ['latin'], weight: ['100','200','300','400','500','700','900'] });
const merriweather = Merriweather({ subsets: ['latin'], weight: ['300','400','700'] });


const CanadaPricingSection = () => {
  return (
    <div className={`${inter.className} min-h-screen bg-gradient-to-br from-[#7d7878] to-[#1f1e1e] py-8 md:py-16 px-4`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4 md:mb-16">
          <h1 className={`${merriweather.className} text-2xl md:text-4xl font-light text-white mb-4`}>
            Tu puerta de entrada a Canadá
          </h1>
          
          <div className="flex flex-wrap justify-center gap-2 md:gap-8 mb-8 md:mb-12">
            <div className="flex items-center gap-3 text-[#FFC857]">
              <Shield className="w-5 h-5" />
              <span className="text-sm font-medium">Datos 100% seguros</span>
            </div>
            <div className="flex items-center gap-3 text-[#FFC857]">
              <Zap className="w-5 h-5" />
              <span className="text-sm font-medium">Proceso eficiente</span>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-8xl mx-auto">
          <div className="flex justify-center">
            <CanadaStandard />
          </div>
          <div className="flex justify-center">
            <CanadaPremium />
          </div>
          <div className='flex justify-center'>
            <Eta />
          </div>
        </div>
        <h3 className='text-zinc-200 font-light italic text-md text-center pt-8 '>Si estás interesado en otro tipo de visa, no dudes en consultarnos a nuestro mail: 
          <span className='underline ml-1'>visaparaargentinos@gmail.com</span>
        </h3>
      </div>
    </div>
  );
};

export default CanadaPricingSection;