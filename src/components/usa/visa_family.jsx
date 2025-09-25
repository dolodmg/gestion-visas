'use client';
import { Inter } from 'next/font/google';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Users, UserCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';

const inter = Inter({ subsets: ['latin'], weight: ['100','200','300','400','500','700','900'] });

const VisaFamily = () => {
  const router = useRouter();
  const title = "Visa EEUU";
  const price = "Desde $75 USD";
  const image = "/images/usa_flag.png";
  const fallback = "USA";
  const handleClick = () => router.push('/checkout?plan=3');

  return (
    <div className={`${inter.className} bg-gradient-to-br from-[#212020] to-[#2a2a2a] rounded-2xl p-6 sm:p-8 w-full max-w-md text-white relative border-2 border-[#22c55e] md:hover:shadow-2xl md:hover:-translate-y-2 transition-all duration-300`}>
      
      {/* Plan Label */}
      <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-400 to-[#22c55e] text-black px-3 sm:px-4 py-1 text-xs font-bold tracking-wide">
        FAMILIAR
      </Badge>

      {/* Family Badge */}
      <Badge className="absolute -top-2 right-2 sm:right-5 bg-green-900 text-white px-2 sm:px-3 py-1 text-xs font-semibold">
        <Users className="w-3 h-3 mr-1" /> 2+ personas
      </Badge>

      {/* Header */}
      <div className='flex flex-col items-center text-center gap-3 sm:gap-4 mb-6 mt-2'>
        <div className="relative">
          <Avatar className="h-16 w-16 border-2 border-[#22c55e]">
            <AvatarImage src={image} alt={title} />
            <AvatarFallback className="text-2xl">{fallback}</AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-1 -right-1 bg-[#22c55e] rounded-full p-1">
            <Users className="w-3 h-3 text-white" />
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-2xl sm:text-3xl font-bold mb-1">{price}</p>
          <p className="text-xs text-gray-400">* por persona / no incluye tasa consular</p>
        </div>

        <Button 
        onClick={handleClick}
        className='bg-[#22c55e] hover:bg-green-500 text-black font-semibold text-sm sm:text-sm px-4 py-2 sm:px-6 sm:py-3 rounded-xl transition-all duration-300 md:hover:-translate-y-0.5 w-full sm:w-auto'
        size="lg"
        >
        Contratar pack grupal
        </Button>
      </div>

      {/* Features */}
      <div className="relative mb-6">
        <div className="flex items-center mb-4 sm:mb-6">
          <div className="flex-grow border-t border-gray-600"></div>
          <span className="mx-2 sm:mx-4 text-sm font-light text-gray-300">¿Qué incluye?</span>
          <div className="flex-grow border-t border-gray-600"></div>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {['Carga del formulario DS-160 para cada miembro','Explicación detallada sobre el proceso de solicitud','Agenda de citas en el CAS y embajada'].map((feat,i)=>(
            <div key={i} className="flex items-start gap-2 sm:gap-3">
              <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 mt-1 flex-shrink-0" />
              <span className="font-light text-sm sm:text-sm leading-relaxed">{feat}</span>
            </div>
          ))}
          <div className="flex items-start gap-2 sm:gap-3">
            <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <div className="flex items-center gap-1 sm:gap-2 mb-1">
                <UserCheck className="w-4 h-4 text-[#22c55e]" />
                <span className="font-medium text-[#22c55e] text-sm">Asesoría especializada en grupos</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Process Note */}
      <div className="bg-white/5 rounded-lg p-2 sm:p-3">
        <p className='text-sm font-light italic text-gray-300 text-center mb-2'>
          Válido para grupos de 2 o más personas con el mismo itinerario
        </p>
      </div>
    </div>
  );
};

export default VisaFamily;
