'use client';
import { Inter } from 'next/font/google';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

const inter = Inter({ subsets: ['latin'], weight: ['100','200','300','400','500','700','900'] });

const VisaStandard = () => {
  const router = useRouter();
  const title = "Visa EEUU";
  const price = "$100 USD";
  const image = "/images/usa_flag.png";
  const fallback = "🇺🇸";
  const handleClick = () => {
    router.push('/checkout?plan=1')
  }

  return (
    <div className={`${inter.className} bg-[#212020] rounded-2xl p-8 w-full max-w-md text-white relative border-2 border-transparent hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}>
      {/* Plan Label */}
      <Badge 
        variant="secondary" 
        className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-slate-600 text-white px-4 py-1 text-xs font-semibold tracking-wide"
      >
        ESTÁNDAR
      </Badge>

      {/* Header */}
      <div className='flex flex-col items-center text-center gap-4 mb-6'>
        <Avatar className="h-16 w-16 border-2 border-slate-600">
          <AvatarImage src={image} alt={title} />
          <AvatarFallback className="text-2xl">{fallback}</AvatarFallback>
        </Avatar>
        
        <div className="text-center">
          <p className="text-3xl font-bold mb-1">{price}</p>
          <p className="text-xs text-gray-400">* no incluye tasa consular</p>
        </div>

        <Button 
          onClick={handleClick}
          className='bg-slate-600 hover:bg-slate-700 font-medium text-sm px-6 py-3 rounded-xl transition-all duration-300 hover:-translate-y-0.5'
          size="lg"
        >
          Comenzar proceso estándar
        </Button>
      </div>

      {/* Features Section */}
      <div className="relative mb-6">
        <div className="flex items-center mb-6">
          <div className="flex-grow border-t border-gray-600"></div>
          <span className="mx-4 text-sm font-light text-gray-300">¿Qué incluye?</span>
          <div className="flex-grow border-t border-gray-600"></div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
            <span className="font-light text-sm leading-relaxed">Carga del formulario DS-160</span>
          </div>
          
          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
            <span className="font-light text-sm leading-relaxed">Explicación detallada sobre el proceso de solicitud</span>
          </div>
          
          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
            <span className="font-light text-sm leading-relaxed">Agenda de citas en el CAS y embajada</span>
          </div>
        </div>
      </div>

      {/* Process Note */}
      <div className="bg-white/5 rounded-lg p-3">
        <p className='text-sm font-light italic text-gray-300 text-center'>
          Todo el proceso de tu visa organizado de forma clara y eficiente, 100% online.
        </p>
      </div>
    </div>
  );
};

export default VisaStandard;
