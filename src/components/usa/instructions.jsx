import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  weight: ['100','200','300','400','500','700','900'],
});

const steps = [
  {
    number: 1,
    title: "Contratá el servicio online",
    description: "Elegí el trámite que necesitás, completá tus datos y aboná de forma segura a través de Mercado Pago. El proceso toma solo unos minutos."
  },
  {
    number: 2,
    title: "Recibí la guía para empezar",
    description: "Recibirás un mail con un formulario detallado para completar e instrucciones claras sobre los pasos a seguir. Si elegiste el plan Premium, también podrás agendar tu videollamada personalizada."
  },
  {
    number: 3,
    title: "Nosotros completamos tu formulario",
    description: "Un gestor especializado cargará todos tus datos en el sistema oficial de la embajada y te enviará el cupón de pago para abonar la tasa consular."
  },
  {
    number: 4,
    title: "Agendamos tus citas",
    description: "Una vez confirmado el pago de la tasa consular, programaremos las citas en el CAS y en la embajada. Te asesoraremos para que llegues completamente preparado a tu entrevista."
  }
];

const Instructions = () => {
  return (
    <section
      className={`${inter.className} max-w-none mx-auto bg-gradient-to-br from-[#3b4b7a] via-[#2a3b5f] to-[#1e2a44] px-4 sm:px-6 lg:px-8 py-14`}
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-light mb-4 text-white tracking-tight text-center md:text-left">
          ¿Cómo funciona?
        </h2>
        <p className="text-lg text-blue-200 font-light text-center md:text-left mb-8">
          Un proceso claro y profesional diseñado para hacer tu solicitud de visa lo más simple posible.
        </p>

        <div className="space-y-10">
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex flex-col md:flex-row md:items-start gap-4 group transition-all duration-300 hover:translate-x-1"
            >
              {/* Número */}
              <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 mx-auto md:mx-0 rounded-full bg-white/10 flex items-center justify-center text-lg md:text-xl font-semibold text-orange-400 border-2 border-orange-400/40 shadow-md group-hover:bg-orange-400 group-hover:text-white group-hover:border-orange-400 transition-all duration-300">
                {step.number}
              </div>

              {/* Texto */}
              <div className="text-center md:text-left">
                <h3 className="text-lg md:text-xl font-medium text-white mb-2 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-blue-200 font-light leading-relaxed max-w-5xl mx-auto md:mx-0">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Instructions;
