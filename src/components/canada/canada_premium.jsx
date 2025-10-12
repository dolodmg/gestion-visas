'use client';
import { Inter } from 'next/font/google';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Video, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';

const inter = Inter({ subsets: ['latin'], weight: ['100','200','300','400','500','700','900'] });

const CanadaPremium = () => {
  const router = useRouter();
  const title = "Visa Canadá";
  const price = "$80 USD";
  const image = "/images/canada_flag.png";
  const fallback = "ca";
  const handleClick = () => router.push('/checkout?plan=5&country=canada');

  return (
    <div className={`${inter.className} bg-gradient-to-br from-[#212020] to-[#2a2a2a] rounded-2xl p-6 sm:p-8 w-full max-w-md text-white relative border-2 border-[#D3AF37] md:hover:shadow-2xl md:hover:-translate-y-2 transition-all duration-300`}>
      
      {/* Plan Label */}
      <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-[#D3AF37] text-black px-3 py-1 sm:px-4 sm:py-1 text-xs font-bold tracking-wide">
        PREMIUM
      </Badge>
      {/* Header */}
      <div className='flex flex-col items-center text-center gap-3 sm:gap-4 mb-6'>
        <Avatar className="h-16 w-16 border-2 border-[#D3AF37]">
          <AvatarImage src={image} alt={title} />
          <AvatarFallback className="text-2xl">{fallback}</AvatarFallback>
        </Avatar>
        
        <div className="text-center">
          <p className="text-2xl sm:text-3xl font-bold mb-1">{price}</p>
          <p className="text-xs text-gray-400">* no incluye tasa consular</p>
        </div>

        <Button 
          onClick={handleClick}
          className='bg-[#D3AF37] hover:bg-yellow-500 text-black font-semibold text-sm px-4 py-2 sm:px-6 sm:py-3 rounded-xl transition-all duration-300 md:hover:-translate-y-0.5'
          size="lg"
        >
          Contratar Visa Premium
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
          {[
            'Carga del formulario en la página del gobierno de Canadá',
            'Explicación detallada sobre el proceso de solicitud',
            'Agenda de citas en el VAC'
          ].map((feat,i) => (
            <div key={i} className="flex items-start gap-2 sm:gap-3">
              <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 mt-1 flex-shrink-0" />
              <span className="font-light text-sm sm:text-sm leading-relaxed">{feat}</span>
            </div>
          ))}
          <div className="flex items-start gap-2 sm:gap-3">
            <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 mt-1 flex-shrink-0" />
            <div className="flex-1 text-sm sm:text-sm">
              <Video className="inline w-4 h-4 text-[#D3AF37] mr-1" />
              <span className="font-medium text-[#D3AF37]">Videollamada personalizada (30 min)</span>{' '}
              <span className="font-light text-gray-300">con un gestor especializado donde despejamos todas tus dudas</span>
            </div>
          </div>
        </div>
      </div>

      {/* Process Note */}
      <div className="bg-white/5 rounded-lg p-2 sm:p-3">
        <p className='text-sm font-light italic text-gray-300 text-center'>
          Incluye acompañamiento personalizado para maximizar tus chances de aprobación.
        </p>
      </div>
    </div>
  );
};

export default CanadaPremium;
