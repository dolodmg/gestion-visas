'use client';
import { useRouter } from 'next/navigation';
import ServiceCard from '@/components/home/service_card';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], weight: ['100','200','300','400','500','700','900'] });

const ServiceList = () => {
  const router = useRouter(); 
  const usaHandleClick = () => {
    router.push('/usa');
  };
  const canadaHandleClick = () => {
    router.push('/canada');
  };

  const services = [
    {
      title: "Visa EEUU",
      subtitle: "Conseguí tu visa de turismo B1/B2",
      description: "Gestión completa del formulario DS-160, programación de citas y preparación para la entrevista.",
      image: "/images/usa_flag.png", 
      fallback: "USA",
      handleClick: usaHandleClick
    },
    {
      title: "Visa & eTA Canadá",
      subtitle: "Averiguá si necesitás una eTA o una visa para ingresar a Canadá",
      description: "Te guiamos paso a paso para gestionar la autorización correcta según tu situación.",
      image: "/images/canada_flag.png",
      fallback: "CA",
      handleClick: canadaHandleClick
    }
  ];

  return (
    <div className="flex flex-col text-center gap-6 bg-gradient-to-br from-[#323232] via-[#212020] to-[#323232] w-full py-10 px-4">
      <h1 className={`${inter.className} text-2xl md:text-3xl lg:text-4xl font-light text-teal-100 mb-4 tracking-wide`}>
        Nuestros Servicios
      </h1>
      <p className="text-base md:text-lg text-zinc-300 max-w-2xl mx-auto">
        Te ayudamos con el proceso completo para obtener tu visa o autorización de viaje
      </p>

      {/* Contenedor responsivo */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-10 justify-center items-center md:items-stretch w-full max-w-5xl mx-auto">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
    </div>
  );
};

export default ServiceList;
