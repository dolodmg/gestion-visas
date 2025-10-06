import TestVisa from '@/components/home/test_visa';
import ContactForm from '@/components/home/contact_form';
import ServiceList from '@/components/home/service_list';
import AboutUs from '@/components/home/about_us';
import Image from 'next/image';

export const metadata = {
  title: "ArgenVisa - Gestión de Visas para EEUU y Canadá",
  description: "Simplificamos tu proceso de visa a Estados Unidos y Canadá. Asesoramiento profesional en visas de turismo, trabajo y estudio. Gestión completa del DS-160 y eTA desde Argentina.",
  keywords: ["visas", "EEUU", "Canadá", "visa Canadá", "Estados Unidos", "visa eeuu", "eTA Canadá", "DS-160", "trámite visa", "Argentina", "visa turismo", "visa usa"],
  openGraph: {
    title: "ArgenVisa - Gestión de Visas para EEUU y Canadá",
    description: "Simplificamos tu proceso de visa a Estados Unidos y Canadá. Asesoramiento profesional desde Argentina.",
    url: "https://gestion-visas.vercel.app",
    type: "website",
    images: [
      {
        url: "/images/banner.png",
        width: 2816,
        height: 1044,
        alt: "ArgenVisa - Gestión de Visas"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "ArgenVisa - Gestión de Visas para EEUU y Canadá",
    description: "Simplificamos tu proceso de visa a Estados Unidos y Canadá",
    images: ["/images/banner.png"]
  },
  alternates: {
    canonical: "https://gestion-visas.vercel.app"
  }
};

export default function Home() {
  return (
    <main className="bg-white min-h-screen flex items-center justify-center flex-col">
      <Image src="/images/banner.png" alt="Banner Visa" width={2816} height={1044} className="w-full h-auto" />
      <ServiceList />
      <TestVisa />
      <AboutUs />
      <ContactForm />
    </main>
  );
}
