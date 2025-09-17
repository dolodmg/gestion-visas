import ServiceCard from '@/components/home/service_card';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], weight: ['100','200','300','400','500','700','900'] });

const ServiceList = () => {
    const services = [
    {
      title: "Visa EEUU",
      subtitle: "Conseguí tu visa de turismo B1/B2",
      description: "Gestión completa del formulario DS-160, programación de citas y preparación para la entrevista.",
      image: "/images/usa_flag.png", 
      fallback: "USA"
    },
    {
      title: "eTA Canadá",
      subtitle: "Solicitá la autorización para viajar a Canadá",
      description: "Proceso rápido para obtener tu autorización electrónica de viaje a Canadá.",
      image: "/images/canada_flag.png",
      fallback: "CA"
    }
  ]
    return (
        <div className="flex flex-col text-center gap-6 bg-gradient-to-br from-[#323232] via-[#212020] to-[#323232] w-full py-10">
            <h1 className={`${inter.className} text-3xl md:text-4xl font-light text-teal-100 mb-4 tracking-wide`} >Nuestros Servicios</h1>
            <p className="text-lg text-zinc-300 max-w-2xl mx-auto">
              Te ayudamos con el proceso completo para obtener tu visa o autorización de viaje
            </p>
            <div className='flex w-2/3 mx-auto'>
                {services.map((service, index) => (
                    <ServiceCard key={index} {...service} />
                ))}
            </div>
        </div>
    )
}

export default ServiceList;