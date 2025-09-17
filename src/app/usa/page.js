import Instructions from '@/components/usa/instructions';
import FAQ from '@/components/common/FAQ';
import { Inter, Merriweather } from 'next/font/google';
import Image from 'next/image';
import VisaPricingSection from '@/components/usa/visa_pricing_section';

const inter = Inter({ subsets: ['latin'], weight: ['100','200','300','400','500','700','900'] });
const merriweather = Merriweather({ subsets: ['latin'], weight: ['300','400','700'] });

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

    return (
        <div>
            <div className='relative w-full h-[350px] flex items-center'>
                <Image
                src="/images/us-visa.jpg"
                alt="Visas a Estados Unidos"
                fill
                className="object-cover"
                priority
                />
                <div className="absolute inset-0 bg-white/40"></div>
                <div className={`${inter.className} relative z-10 text-[#2C3251] font-extralight text-6xl m-10`}>
                    <h1>Visas a</h1>
                    <h1>Estados Unidos</h1>
                </div>
            </div>
            <Instructions />
            <VisaPricingSection />
            <FAQ questions={questions} name="la visa americana"/>
        </div>
    )
}

export default UsaPage;