'use client';
import { useState, useEffect } from 'react';
import { Home } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback} from "@/components/ui/avatar";

const ComingSoonPage = ({ 
  title = "Próximamente",
  subtitle = "Visa y autorización eTA para Canadá",
  message = "Estamos trabajando para brindarte el mejor servicio de asesoría para tu viaje a Canadá. Pronto podrás acceder a toda la información y soporte que necesitás!",
  showGoHome = true,
  onGoHome = () => window.location.href = '/'
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
  }, []);

  const handleGoHome = () => {
    onGoHome();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50/40 to-yellow-50/60 flex items-center justify-center px-4 py-12 font-sans">
      <div className="max-w-3xl w-full">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border border-orange-200/50">
          
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-300/40 to-orange-300/40 rounded-full blur-3xl scale-150"></div>
              <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-2xl scale-125 animate-pulse"></div>
              
              <div className={`relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center transition-all duration-1000 ${isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                <img 
                  src="/images/hourglass.png"
                  alt="Próximamente"
                  className="w-full h-full object-contain drop-shadow-2xl animate-gentle-swing"
                  style={{
                    filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.15))'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Badge */}
          <div className='mx-auto mb-2 flex flex-row gap-2 items-center w-1/5 px-5 py-2 bg-gradient-to-r from-orange-500/10 to-pink-500/10 text-orange-700 rounded-full font-bold tracking-wide border border-orange-500/20'>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/images/canada_flag.png" alt="Bandera Canadá" />
              <AvatarFallback>CA</AvatarFallback>
            </Avatar>
            <div className='text-sm'>Canadá</div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-pink-700 to-orange-500 text-center mb-3 tracking-tight">
            {title}
          </h1>

          <h2 className="text-md md:text-xl font-semibold text-slate-700 text-center mb-6">
            {subtitle}
          </h2>

          <p className="text-slate-600 text-center text-md md:text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
            {message}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {showGoHome && (
              <button
                onClick={handleGoHome}
                className="group flex items-center justify-center gap-2 px-8 py-3.5 bg-orange-100 text-orange-700 rounded-xl font-semibold hover:bg-orange-200 transition-all hover:shadow-lg hover:scale-105"
              >
                <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Ir al inicio
              </button>
            )}
          </div>
        </div>
      </div>

      {/* CSS animaciones */}
      <style jsx>{`
        @keyframes gentle-swing {
          0%, 100% {
            transform: rotate(-2deg) translateY(0px);
          }
          50% {
            transform: rotate(2deg) translateY(-5px);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-gentle-swing {
          animation: gentle-swing 4s ease-in-out infinite;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ComingSoonPage;