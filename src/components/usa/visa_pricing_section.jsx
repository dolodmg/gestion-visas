'use client';
import { Inter, Merriweather } from 'next/font/google';
import VisaStandard from './visa_standard';
import VisaPremium from './visa_premium';
import { Shield, Zap, Star } from 'lucide-react';

const inter = Inter({ subsets: ['latin'], weight: ['100','200','300','400','500','700','900'] });
const merriweather = Merriweather({ subsets: ['latin'], weight: ['300','400','700'] });


const VisaPricingSection = () => {
  return (
    <div className={`${inter.className} min-h-screen bg-gradient-to-br from-[#404141] to-gray-800 py-16 px-4`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className={`${merriweather.className} text-4xl font-light text-white mb-4`}>
            Invertí en tu visa, {" "}
            <span className="font-semibold">sin sorpresas</span>
          </h1>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="flex items-center gap-3 text-yellow-500">
              <Star className="w-5 h-5" />
              <span className="text-sm font-medium">+50 visas aprobadas</span>
            </div>
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
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="flex justify-center">
            <VisaStandard />
          </div>
          <div className="flex justify-center">
            <VisaPremium />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisaPricingSection;