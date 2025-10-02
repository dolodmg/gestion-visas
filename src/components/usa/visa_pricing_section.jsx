'use client';
import { Inter, Merriweather } from 'next/font/google';
import VisaStandard from './visa_standard';
import VisaPremium from './visa_premium';
import VisaFamily from './visa_family';
import { Shield, Zap } from 'lucide-react';

const inter = Inter({ subsets: ['latin'], weight: ['100','200','300','400','500','700','900'] });
const merriweather = Merriweather({ subsets: ['latin'], weight: ['300','400','700'] });


const VisaPricingSection = () => {
  return (
    <div className={`${inter.className} min-h-screen bg-gradient-to-br from-[#404141] to-gray-800 py-8 md:py-16 px-4`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4 md:mb-16">
          <h1 className={`${merriweather.className} text-2xl md:text-4xl font-light text-white mb-4`}>
            Invertí en tu visa, {" "}
            <span className="font-semibold">sin sorpresas</span>
          </h1>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-8 mb-8 md:mb-12">
            {/*
            <div className="flex items-center gap-3 text-yellow-500">
              <Star className="w-5 h-5" />
              <span className="text-sm font-medium">+50 visas aprobadas</span>
            </div>
            */}
            <div className="flex items-center gap-3 text-yellow-500">
              <Shield className="w-5 h-5" />
              <span className="text-sm font-medium">Datos 100% seguros</span>
            </div>
            <div className="flex items-center gap-3 text-yellow-500">
              <Zap className="w-5 h-5" />
              <span className="text-sm font-medium">Proceso eficiente</span>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-8xl mx-auto">
          <div className="flex justify-center">
            <VisaStandard />
          </div>
          <div className="flex justify-center">
            <VisaPremium />
          </div>
          <div className='flex justify-center'>
            <VisaFamily />
          </div>
        </div>
        <h3 className='text-zinc-200 font-light italic text-md text-center pt-8 '>Si estás interesado en otro tipo de visa, no dudes en consultarnos a nuestro mail: 
          <span className='underline ml-1'>visaparaargentinos@gmail.com</span>
        </h3>
      </div>
    </div>
  );
};

export default VisaPricingSection;