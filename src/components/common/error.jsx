'use client';

import { useState } from 'react';
import { Home, RefreshCw, ArrowLeft } from 'lucide-react';

const ErrorPage = ({ 
  title = "Algo salió mal",
  message = "Lo sentimos, ocurrió un error inesperado. Por favor, intentá nuevamente.",
  errorCode = null,
  showRefresh = true,
  showGoHome = true,
  customAction = null,
  onGoHome = () => window.location.href = '/'
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    window.location.reload();
  };

  const handleGoHome = () => {
    onGoHome();
  };

  return (
    <div className="py-4 bg-gradient-to-br from-slate-50 via-blue-50/30 to-orange-50/40 flex items-center justify-center px-4 font-sans">
      <div className="max-w-3xl w-full">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border border-slate-200/50">
          
          {/* Illustration */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              {/* Glow effects behind the image */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-300/30 to-yellow-300/30 rounded-full blur-3xl scale-150"></div>
              <div className="absolute inset-0 bg-blue-900/10 rounded-full blur-2xl scale-125 animate-pulse"></div>
              
              {/* Image container */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
                <img 
                  src="/images/error_tv.png"
                  alt="Error illustration"
                  className="w-full h-full object-contain drop-shadow-2xl animate-float"
                  style={{
                    filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.15))'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Error Code Badge */}
          {errorCode && (
            <div className="text-center mb-4">
              <span className="inline-block px-5 py-2 bg-gradient-to-r from-blue-900/10 to-orange-500/10 text-blue-900 rounded-full text-base font-bold tracking-wide border border-blue-900/20">
                Error {errorCode}
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-slate-800 to-orange-600 text-center mb-5 tracking-tight">
            {title}
          </h1>

          {/* Message */}
          <p className="text-slate-600 text-center text-lg md:text-xl mb-10 leading-relaxed max-w-2xl mx-auto">
            {message}
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            {showRefresh && (
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="group flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-xl font-semibold hover:from-blue-800 hover:to-blue-700 transition-all hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
                {isRefreshing ? 'Recargando...' : 'Reintentar'}
              </button>
            )}

            {showGoHome && (
              <button
                onClick={handleGoHome}
                className="group flex items-center justify-center gap-2 px-8 py-3.5 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-all hover:shadow-xl hover:scale-105"
              >
                <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Ir al inicio
              </button>
            )}

            {customAction && (
              <button
                onClick={customAction.onClick}
                className="flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-yellow-600 transition-all hover:shadow-xl hover:scale-105"
              >
                {customAction.icon}
                {customAction.label}
              </button>
            )}
          </div>
        </div>

      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-10px) rotate(1deg);
          }
          50% {
            transform: translateY(-20px) rotate(0deg);
          }
          75% {
            transform: translateY(-10px) rotate(-1deg);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ErrorPage;