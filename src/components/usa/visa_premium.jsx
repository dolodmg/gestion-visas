'use client';
import { Inter } from 'next/font/google';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Video, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';

const inter = Inter({ subsets: ['latin'], weight: ['100','200','300','400','500','700','900'] });

const VisaPremium = () => {
  const router = useRouter();
  const title = "Visa EEUU";
  const price = "$120 USD";
  const image = "/images/usa_flag.png";
  const fallback = "USA";
  const handleClick = () => {
    router.push('/checkout?plan=2')
  }

  return (
    <div className={`${inter.className} bg-gradient-to-br from-[#212020] to-[#2a2a2a] rounded-2xl p-8 w-full max-w-md text-white relative border-2 border-[#D3AF37] hover:shadow-2xl hover:-translate-y-2 transition-all duration-300`}>
      {/* Plan Label */}
      <Badge 
        className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-[#D3AF37] text-black px-4 py-1 text-xs font-bold tracking-wide"
      >
        PREMIUM
      </Badge>

      {/* Recommended Badge */}
      <Badge 
        className="absolute -top-2 right-5 bg-[#856A00] text-white px-3 py-1 text-xs font-semibold"
      >
        <Star className="w-3 h-3 mr-1" />
        Recomendado
      </Badge>

      {/* Header */}
      <div className='flex flex-col items-center text-center gap-4 mb-6'>
        <Avatar className="h-16 w-16 border-2 border-[#D3AF37]">
          <AvatarImage src={image} alt={title} />
          <AvatarFallback className="text-2xl">{fallback}</AvatarFallback>
        </Avatar>
        
        <div className="text-center">
          <p className="text-3xl font-bold mb-1">{price}</p>
          <p className="text-xs text-gray-400">* no incluye tasa consular</p>
        </div>

        <Button 
          onClick={handleClick}
          className='bg-[#D3AF37] hover:bg-yellow-500 text-black font-semibold text-sm px-6 py-3 rounded-xl transition-all duration-300 hover:-translate-y-0.5'
          size="lg"
        >
          Comenzar con asesoría premium
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
          
          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1 text-sm">
              <Video className="inline w-4 h-4 text-[#D3AF37] mr-2" />
              <span className="font-medium text-[#D3AF37]">
                Videollamada personalizada (30 min)
              </span>{" "}
              <span className="font-light text-gray-300">
                con un gestor especializado donde despejamos todas tus dudas
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Process Note */}
      <div className="bg-white/5  rounded-lg p-3">
        <p className='text-sm font-light italic text-gray-300 text-center'>
          Incluye acompañamiento personalizado para maximizar tus chances de aprobación.
        </p>
      </div>
    </div>
  );
};

export default VisaPremium;