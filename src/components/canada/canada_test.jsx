'use client'
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plane, Ship } from 'lucide-react';
import ResultsSection from './results_section';
import { Inter, Inria_Sans } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], weight: ['100','200','300','400','500','700','900'] });
const inria = Inria_Sans({ subsets: ['latin'], weight: ['300','400','700'] });


const CanadaVisaChecker = () => {
  const [travelMethod, setTravelMethod] = useState(null);
  const [hasUSVisa, setHasUSVisa] = useState(null);
  const [hasCanadaVisa, setHasCanadaVisa] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const allAnswered = travelMethod !== null && hasUSVisa !== null && hasCanadaVisa !== null;

  useEffect(() => {
    if (allAnswered) {
      setShowResult(true);
    } else {
      setShowResult(false);
    }
  }, [allAnswered]);

  const resetForm = () => {
    setTravelMethod(null);
    setHasUSVisa(null);
    setHasCanadaVisa(null);
    setShowResult(false);
  };

  const needsVisa = () => {
    if (travelMethod === 'land-sea') return true;
    if (travelMethod === 'plane' && hasUSVisa === false && hasCanadaVisa === false) return true;
    return false;
  };

  const getProgress = () => {
    let answered = 0;
    if (travelMethod !== null) answered++;
    if (hasUSVisa !== null) answered++;
    if (hasCanadaVisa !== null) answered++;
    return (answered / 3) * 100;
  };

  return (
    <div className={`${inter.className} w-full mx-auto px-4 sm:px-6 py-8 sm:py-12`} style={{ 
      background: 'linear-gradient(135deg, #1F1E1E 0%, #343232 100%)',
      minHeight: '100vh'
    }}>
      <div className="mb-6 sm:mb-8 text-center">
        <h1 className={`${inria.className} text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3 px-2`}>
          ¿Necesito visa o autorización eTA?
        </h1>
        <p className="text-zinc-200 text-sm sm:text-base lg:text-md font-light px-4">
          Descubrí en menos de un minuto qué trámite necesitás para ingresar a Canadá
        </p>
      </div>
      <div className='space-y-6 sm:space-y-8 w-full sm:w-4/5 lg:w-3/5 xl:w-1/2 mx-auto'>
        {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs sm:text-sm text-zinc-200 mb-2">
              <span>Progreso</span>
              <span>{Math.round(getProgress())}%</span>
            </div>
            <div className="h-2 bg-[#1f1e1e] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#AF4D31] transition-all duration-500"
                style={{ width: `${getProgress()}%` }}
              />
            </div>
          </div>
        {/* Pregunta 1: Método de viaje */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className={`flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full text-xs sm:text-sm font-bold flex-shrink-0
                ${travelMethod !== null ? 'bg-[#AF4D31] text-white' : 'bg-[#2a2828] text-zinc-200 border-2 border-[#AF4D31]'}`}>
                1
              </div>
              <label className="text-white text-base sm:text-lg font-medium">
                ¿Cómo planeás viajar a Canadá?
              </label>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <Button
                variant="outline"
                className={`h-auto py-4 sm:py-6 px-4 sm:px-6 flex flex-col items-center gap-2 sm:gap-3 
                  ${travelMethod === 'plane' 
                    ? 'bg-[#3b4b7a]/60 border-[#3b4b7a] border-2 shadow-[0_0_0_3px_rgba(59,75,122,0.2)]' 
                    : 'bg-[#2a2828]/60 border-white/15 hover:border-[#3b4b7a]'
                  }`}
                onClick={() => setTravelMethod('plane')}
              >
                <Plane className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                <span className="text-white font-medium text-sm sm:text-base">Avión</span>
              </Button>

              <Button
                variant="outline"
                className={`h-auto py-4 sm:py-6 px-4 sm:px-6 flex flex-col items-center gap-2 sm:gap-3 
                  ${travelMethod === 'land-sea' 
                    ? 'bg-[#3b4b7a]/60 border-[#3b4b7a] border-2 shadow-[0_0_0_3px_rgba(59,75,122,0.2)]' 
                    : 'bg-[#2a2828]/60 border-white/15 hover:border-[#3b4b7a]'
                  }`}
                onClick={() => setTravelMethod('land-sea')}
              >
                <Ship className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                <span className="text-white font-medium text-sm sm:text-base">Tierra o mar</span>
              </Button>
            </div>
          </div>

          {/* Pregunta 2: Visa USA */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className={`flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full text-xs sm:text-sm font-bold flex-shrink-0
                ${hasUSVisa !== null ? 'bg-[#AF4D31] text-white' : 'bg-[#2a2828] text-zinc-200 border-2 border-[#AF4D31]'}`}>
                2
              </div>
              <label className="text-white text-base sm:text-lg font-medium">
                ¿Tenés una visa de Estados Unidos vigente?
              </label>
            </div>
            
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <Button
                variant="outline"
                className={`py-3 sm:py-4 transition-all text-sm sm:text-base
                  ${hasUSVisa === true 
                    ? 'bg-[#3b4b7a]/60 border-[#3b4b7a] border-2 shadow-[0_0_0_3px_rgba(59,75,122,0.2)]' 
                    : 'bg-[#2a2828]/60 border-white/15 hover:border-[#3b4b7a]'
                  }`}
                onClick={() => setHasUSVisa(true)}
              >
                <span className="text-white font-medium">Sí</span>
              </Button>

              <Button
                variant="outline"
                className={`py-3 sm:py-4 transition-all text-sm sm:text-base
                  ${hasUSVisa === false 
                    ? 'bg-[#3b4b7a]/60 border-[#3b4b7a] border-2 shadow-[0_0_0_3px_rgba(59,75,122,0.2)]' 
                    : 'bg-[#2a2828]/60 border-white/15 hover:border-[#3b4b7a]'
                  }`}
                onClick={() => setHasUSVisa(false)}
              >
                <span className="text-white font-medium">No</span>
              </Button>
            </div>
          </div>

          {/* Pregunta 3: Visa Canadá previa */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className={`flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full text-xs sm:text-sm font-bold flex-shrink-0
                ${hasCanadaVisa !== null ? 'bg-[#AF4D31] text-white' : 'bg-[#2a2828]  text-zinc-200 border-2 border-[#AF4D31]'}`}>
                3
              </div>
              <label className="text-white text-base sm:text-lg font-medium">
                ¿Tuviste una visa de Canadá en los últimos 10 años?
              </label>
            </div>
            
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <Button
                variant="outline"
                className={`py-3 sm:py-4 text-sm sm:text-base
                  ${hasCanadaVisa === true 
                    ? 'bg-[#3b4b7a]/60 border-[#3b4b7a] border-2 shadow-[0_0_0_3px_rgba(59,75,122,0.2)]' 
                    : 'bg-[#2a2828]/60 border-white/15 hover:border-[#3b4b7a]'
                  }`}
                onClick={() => setHasCanadaVisa(true)}
              >
                <span className="text-white font-medium">Sí</span>
              </Button>

              <Button
                variant="outline"
                className={`py-3 sm:py-4 transition-all text-sm sm:text-base
                  ${hasCanadaVisa === false 
                    ? 'bg-[#3b4b7a]/60 border-[#3b4b7a] border-2 shadow-[0_0_0_3px_rgba(59,75,122,0.2)]' 
                    : 'bg-[#2a2828]/60 border-white/15 hover:border-[#3b4b7a]'
                  }`}
                onClick={() => setHasCanadaVisa(false)}
              >
                <span className="text-white font-medium">No</span>
              </Button>
            </div>
          </div>

          {/* Resultados */}
          <ResultsSection 
            travelMethod={travelMethod} 
            hasUSVisa={hasUSVisa}
            hasCanadaVisa={hasCanadaVisa}
            needsVisa={needsVisa} 
            resetForm={resetForm} 
            showResult={showResult} 
          />
      </div>
    </div>
  );
};

export default CanadaVisaChecker;