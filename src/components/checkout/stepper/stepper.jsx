"use client";

import { Check, User, CreditCard } from "lucide-react";
import { Progress } from "@/components/ui/progress"; // componente de ShadcnUI
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "700"] });

const Stepper = ({ currentStep }) => {
  const stepData = [
    { number: 1, title: "Datos personales", icon: User },
    { number: 2, title: "Completar pago", icon: CreditCard },
  ];

  const progressValue = (currentStep / stepData.length) * 100;

  return (
    <div className={`${inter.className} mb-8`}>
      {/* Mobile: Progress bar */}
      <div className="flex flex-col gap-2 items-center justify-center md:hidden">
        <span className="text-sm font-medium text-blue-900">
          Paso {currentStep} de {stepData.length}
        </span>
        <Progress value={progressValue} className="w-3/4 h-2" />
      </div>

      {/* Desktop: stepper completo */}
      <div className="hidden md:flex items-center justify-between">
        {stepData.map((step, index) => {
          const Icon = step.icon;
          const isActive = currentStep === step.number;
          const isCompleted = currentStep > step.number;

          return (
            <div key={step.number} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                    ${
                      isCompleted
                        ? "bg-blue-950 text-white"
                        : isActive
                        ? "bg-blue-900 text-white"
                        : "bg-zinc-200 text-zinc-600"
                    }
                  `}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>
                <span
                  className={`
                    mt-2 text-sm font-medium
                    ${
                      isActive || isCompleted
                        ? "text-slate-700"
                        : "text-zinc-600"
                    }
                  `}
                >
                  {step.title}
                </span>
              </div>

              {index < stepData.length - 1 && (
                <div
                  className={`
                    flex-1 h-0.5 mx-4 -mt-6
                    ${currentStep > step.number ? "bg-slate-600" : "bg-gray-200"}
                  `}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;
