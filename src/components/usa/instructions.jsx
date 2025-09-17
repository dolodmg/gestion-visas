import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], weight: ['100','200','300','400','500','700','900'] });
const steps = [
    {
      number: 1,
      title: "Contratá el servicio online",
      description: "Elegí el trámite que necesitas, completá tus datos y aboná de forma segura a través de Mercado Pago El proceso toma solo unos minutos."
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
        <div className={`${inter.className} bg-gradient-to-br from-[#3b4b7a] via-[#2a3b5f] to-[#1e2a44] px-16 py-10`}>
            <h1 className="text-3xl md:text-4xl font-light mb-5 text-white tracking-tight">¿Cómo funciona?</h1>
            <p className="text-lg text-blue-200 font-light">
                Un proceso claro y profesional diseñado para hacer tu solicitud de visa lo más simple posible.
            </p>
            <div className="grid gap-2">
                {steps.map((step) => (
                    <div 
                    key={step.number}
                    className="grid grid-cols-[80px_1fr] gap-2 py-6 border-b border-white/10 last:border-b-0 transition-all duration-300 hover:pl-5"
                    >
                        <div className="w-15 h-15 rounded-full bg-white/10 flex items-center justify-center text-2xl font-light text-orange-400 border-2 border-orange-400/30 mt-1">
                            {step.number}
                        </div>
                        <div className="min-h-[60px] flex flex-col justify-center">
                            <h3 className="text-xl md:text-lg font-medium text-white mb-1 tracking-tight">
                                {step.title}
                            </h3>
                            <p className="text-blue-200 font-light max-w-[90%] leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>    
    )
}

export default Instructions;