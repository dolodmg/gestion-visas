'use client';
import React, { useState } from 'react';
import { ChevronDown, Check, X, FileText, Globe, CreditCard } from 'lucide-react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], weight: ['100','200','300','400','500','700','900'] });

const TestVisa = () => {
  const [answers, setAnswers] = useState({
    passport: null,
    origin: null,
    financial: null
  });
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      id: 'passport',
      text: '¿Tenés pasaporte vigente?',
      icon: FileText
    },
    {
      id: 'origin',
      text: '¿Podés demostrar arraigo en tu país de origen?',
      icon: Globe
    },
    {
      id: 'financial',
      text: '¿Podés demostrar solvencia económica para costear el viaje?',
      icon: CreditCard
    }
  ];

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
    if (showResults) {
      setShowResults(false);
    }
  };

  const handleShowResults = () => {
    setShowResults(true);
  };

  const allAnswered = Object.values(answers).every(answer => answer !== null);
  const allPositive = Object.values(answers).every(answer => answer === true);

  const ResultsSection = () => {
    if (!showResults) return null;

    return (
      <div className={`${inter.className} mt-8 border border-slate-700 rounded-lg bg-[#2E3141] backdrop-blur-sm`}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            {allPositive ? (
              <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center">
                <Check className="h-4 w-4 text-emerald-400" />
              </div>
            ) : (
              <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
                <X className="h-4 w-4 text-red-400" />
              </div>
            )}
            <h3 className="text-md font-medium text-slate-100">
              {allPositive ? 'Cumplís los requisitos básicos' : 'Algunos puntos por mejorar'}
            </h3>
          </div>
          
          <div className="text-slate-300 space-y-4">
            {allPositive ? (
              <>
                <p>Estás en condiciones de iniciar el proceso. Próximos pasos:</p>
                <div className="space-y-2 ml-4">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                    <span>Reunir documentación completa</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                    <span>Agendar cita consular</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                    <span>Preparación para entrevista</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <p>Recomendaciones antes de aplicar:</p>
                <div className="space-y-2 ml-4">
                  {!answers.passport && (
                    <div className="flex items-center gap-3 text-sm text-red-300">
                      <div className="w-1 h-1 bg-red-400 rounded-full"></div>
                      <span>Renovar o tramitar pasaporte</span>
                    </div>
                  )}
                  {!answers.origin && (
                    <div className="flex items-center gap-3 text-sm text-red-300">
                      <div className="w-1 h-1 bg-red-400 rounded-full"></div>
                      <span>Obtener documentos de arraigo</span>
                    </div>
                  )}
                  {!answers.financial && (
                    <div className="flex items-center gap-3 text-sm text-red-300">
                      <div className="w-1 h-1 bg-red-400 rounded-full"></div>
                      <span>Preparar respaldo financiero</span>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          <div className="mt-6 p-4 bg-slate-700/50 rounded border border-slate-600">
            <p className="text-sm text-slate-300">
              {allPositive 
                ? 'Contactanos para una evaluación detallada de tu caso.'
                : 'Te ayudamos a preparar cada requisito paso a paso.'
              }
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`${inter.className} min-h-screen w-full bg-[#636A91]`}>
      <div className="mx-auto px-6 py-16">
        <div className='flex flex-col w-1/2 mx-auto'>
          <div className="mb-12">
            <h1 className="text-3xl font-bold text-slate-100 leading-tight">
              Comprobá si aplicás para la visa en un clic,{' '}
              <span className="text-slate-900">gratis y rápido</span>
            </h1>
          </div>

          <div className="bg-[#404459] border border-slate-700 rounded-lg">
            <div className="p-8">
              <div className="space-y-6">
                {questions.map((question) => {
                  const Icon = question.icon;
                  return (
                    <div key={question.id}>
                      <div className="flex items-center gap-3 mb-2">
                        <Icon className="h-5 w-5 text-slate-400" />
                        <h3 className="text-sm text-slate-100">
                          {question.text}
                        </h3>
                      </div>
                      <div className="ml-8 flex gap-4">
                        <label className="flex items-center cursor-pointer text-sm">
                          <input
                            type="radio"
                            name={question.id}
                            value="true"
                            checked={answers[question.id] === true}
                            onChange={() => handleAnswerChange(question.id, true)}
                            className="sr-only"
                          />
                          <div className={`w-4 h-4 rounded-full border-2 mr-2 transition-colors ${
                            answers[question.id] === true
                              ? 'border-slate-300 bg-slate-300'
                              : 'border-slate-500 hover:border-slate-400'
                          }`}>
                            {answers[question.id] === true && (
                              <div className="w-full h-full bg-slate-800 rounded-full scale-50"></div>
                            )}
                          </div>
                          <span className="text-slate-300">Sí</span>
                        </label>

                        <label className="flex items-center cursor-pointer text-sm">
                          <input
                            type="radio"
                            name={question.id}
                            value="false"
                            checked={answers[question.id] === false}
                            onChange={() => handleAnswerChange(question.id, false)}
                            className="sr-only"
                          />
                          <div className={`w-4 h-4 rounded-full border-2 mr-2 transition-colors ${
                            answers[question.id] === false
                              ? 'border-slate-300 bg-slate-300'
                              : 'border-slate-500 hover:border-slate-400'
                          }`}>
                            {answers[question.id] === false && (
                              <div className="w-full h-full bg-slate-800 rounded-full scale-50"></div>
                            )}
                          </div>
                          <span className="text-slate-300">No</span>
                        </label>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8">
                <button
                  onClick={handleShowResults}
                  disabled={!allAnswered}
                  className={`w-full py-4 px-6 rounded-lg font-medium transition-all ${
                    allAnswered
                      ? 'bg-[#2E3141] text-slate-100 hover:bg-[#222531] border border-slate-600'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                  }`}
                >
                  <span className="flex items-center text-sm justify-center gap-2">
                    Ver resultados
                    <ChevronDown className="h-4 w-4" />
                  </span>
                </button>
              </div>

              <ResultsSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestVisa;