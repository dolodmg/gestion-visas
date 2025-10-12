import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ResultsSection = ( { travelMethod, needsVisa, resetForm, showResult }) => {
    if (!showResult) return null;

    const isVisa = needsVisa();

    return (
      <div className="mt-8 border border-slate-700 rounded-lg bg-[#2a2828]/60 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            {isVisa ? (
              <div className="w-8 h-8 bg-[#AF4D31]/20 rounded-full flex items-center justify-center">
                <XCircle className="h-5 w-5 text-[#af4d31]" />
              </div>
            ) : (
              <div className="w-8 h-8 bg-[#25933D]/20 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-[#25933D]" />
              </div>
            )}
            <h3 className="text-lg font-semibold text-white">
              {isVisa ? 'Necesitás una VISA canadiense' : 'Podés solicitar una eTA'}
            </h3>
          </div>

          <div className="text-zinc-200 space-y-4">
            {isVisa ? (
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <ArrowRight className="w-4 h-4 text-[#AF4D31] mt-1 flex-shrink-0" />
                  <span>Incluye cita en el Centro de Solicitud de Visas (VAC)</span>
                </li>
                <li className="flex items-start gap-3">
                  <ArrowRight className="w-4 h-4 text-[#AF4D31] mt-1 flex-shrink-0" />
                  <span>Tiempo de procesamiento: 4-8 semanas aproximadamente</span>
                </li>
                <li className="flex items-start gap-3">
                  <ArrowRight className="w-4 h-4 text-[#AF4D31] mt-1 flex-shrink-0" />
                  <span>Válida para múltiples entradas durante su vigencia</span>
                </li>
              </ul>
            ) : (
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <ArrowRight className="w-4 h-4 text-[#25933D] mt-1 flex-shrink-0" />
                  <span>Proceso 100% online, sin necesidad de ir a la embajada</span>
                </li>
                <li className="flex items-start gap-3">
                  <ArrowRight className="w-4 h-4 text-[#25933D] mt-1 flex-shrink-0" />
                  <span>Aprobación en 24-72 horas</span>
                </li>
                <li className="flex items-start gap-3">
                  <ArrowRight className="w-4 h-4 text-[#25933D] mt-1 flex-shrink-0" />
                  <span>Válida para estadías de hasta 6 meses</span>
                </li>
                <li className="flex items-start gap-3">
                  <ArrowRight className="w-4 h-4 text-[#25933D] mt-1 flex-shrink-0" />
                  <span>Vigencia de 5 años o hasta que venza tu pasaporte</span>
                </li>
              </ul>
            )}
          </div>

          <div className={`mt-6 p-4 rounded-lg border ${
            isVisa 
              ? 'bg-[#af4d31]/10 border-[#af4d31]/30' 
              : 'bg-[#3b4b7a]/10 border-[#3b4b7a]/30'
          }`}>
            <p className="text-sm text-white">
              <strong className="text-white">Importante:</strong>{' '}
              {isVisa 
                ? (travelMethod === 'land-sea' 
                    ? 'Para ingresar a Canadá por tierra o mar, siempre se requiere una visa canadiense.'
                    : 'Sin visa estadounidense vigente ni visa canadiense previa de los últimos 10 años, debés solicitar visa canadiense.')
                : 'La eTA es válida cuando viajás en avión y tenés visa estadounidense vigente o tuviste una visa canadiense en los últimos 10 años.'
              }
            </p>
          </div>

          <div className="mt-6 flex justify-center">
            <Button
              variant="outline"
              onClick={resetForm}
              className="bg-[#2a2828]/60 border-white/15 hover:cursor-pointer hover:bg-[#1F1E1E] hover:text-white text-white"
            >
              Reiniciar formulario
            </Button>
          </div>
        </div>
      </div>
    );
  };

  export default ResultsSection;