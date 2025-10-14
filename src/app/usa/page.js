import Instructions from '@/components/common/instructions';
import FAQ from '@/components/common/FAQ';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import VisaPricingSection from '@/components/usa/visa_pricing_section';

const inter = Inter({ subsets: ['latin'], weight: ['100','200','300','400','500','700','900'] });

const UsaPage = () => {
    const questions = [
        {   
            id: 1,
            question: "¿Cuánto dura la visa de turismo?",
            answer: "La visa de turismo B1/B2 generalmente tiene una vigencia de 10 años, con múltiples ingresos. Cada entrada a Estados Unidos puede tener una duración máxima que determina el oficial de migraciones al momento del ingreso (normalmente hasta 6 meses)."
        },
        {
            id: 2,
            question: "¿Qué documentos necesito para iniciar el trámite?",
            answer: <ul className="list-disc list-inside">
                Para comenzar el trámite de la visa B1/B2 necesitás:
                <li>Pasaporte vigente y en buen estado.</li>
                <li>Foto digital reciente, con los requisitos establecidos por la embajada.</li>
                <li>Datos personales, laborales y de viajes previos.</li>
            </ul>
        },
        {
            id: 3,
            question: "¿Qué incluye el servicio de gestión de la VISA?",
            answer: <ul className="list-disc list-inside">
                Nuestro servicio incluye:
                <li>Carga completa del formulario DS-160.</li>
                <li>Explicación detallada de cada etapa del proceso.</li>
                <li>Agenda de citas en el CAS y en la Embajada de Estados Unidos.</li>
            </ul>
        },
        {
            id: 4,
            question: "¿El costo del trámite incluye el valor de la VISA?",
            answer: "No. La tasa consular de la visa se paga directamente a la Embajada de Estados Unidos. Nosotros te enviaremos el cupón de pago oficial para que realices el pago de manera segura y directa."
        },
        {
            id: 5,
            question: "¿La contratación del servicio garantiza que me aprueben la VISA?",
            answer: "No. La aprobación de la visa depende exclusivamente de la Embajada de Estados Unidos. Nuestro servicio te asesora y acompaña en todo el proceso, pero la decisión final corresponde al oficial consular."
        }
    ]

    const h1 = "Un proceso claro y profesional diseñado para hacer tu solicitud de visa lo más simple posible.";

    const steps = [
        {
            number: 1,
            title: "Contratá el servicio online",
            description: ["Elegí el trámite que necesitás, completá tus datos y aboná de forma segura a través de Mercado Pago. El proceso toma solo unos minutos."]
        },
        {
            number: 2,
            title: "Recibí la guía para empezar",
            description: ["Recibirás un mail con un formulario detallado para completar e instrucciones claras sobre los pasos a seguir. Si elegiste el plan Premium, también podrás agendar tu videollamada personalizada."]
        },
        {
            number: 3,
            title: "Nosotros completamos tu formulario",
            description: ["Un gestor especializado cargará todos tus datos en el sistema oficial de la embajada y te enviará el cupón de pago para abonar la tasa consular."]
        },
        {
            number: 4,
            title: "Agendamos tus citas",
            description: ["Una vez confirmado el pago de la tasa consular, programaremos las citas en el CAS y en la embajada. Te asesoraremos para que llegues completamente preparado a tu entrevista."]
        }
    ];

    return (
        <div>
            <ServiceSchema 
              name="Visa de Turismo USA (B1/B2)"
              description="Gestión completa del formulario DS-160 y agenda de citas para visa de turismo a Estados Unidos"
              price="100"
            />
            <div className='relative w-full h-64 sm:h-80 md:h-[350px] flex items-center'>
                <Image
                    src="/images/us-visa.jpg"
                    alt="ArgenVisa - Gestión de visas para EEUU" 
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-white/40"></div>
                <div className={`${inter.className} relative z-10 text-[#2C3251] font-light md:font-extralight p-4 sm:p-6 md:m-10 text-3xl sm:text-4xl md:text-6xl leading-tight`}>
                    <h1>Visas a</h1>
                    <h1>Estados Unidos</h1>
                </div>
            </div>
            <Instructions steps={steps} h1={h1} />
            <VisaPricingSection />
            <FAQ questions={questions} name="la visa americana"/>
        </div>
    )
}

export default UsaPage;