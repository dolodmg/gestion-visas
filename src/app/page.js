import TestVisa from '@/components/home/test_visa';
import ContactForm from '@/components/home/contact_form';
import ServiceList from '@/components/home/service_list';
import AboutUs from '@/components/home/about_us';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="bg-white min-h-screen flex items-center justify-center flex-col">
      <Image src="/images/banner_pase_embarque_mobile.png" alt="ArgenVisa - Tu visa, sin vueltas. Visas para Estados Unidos y Canadá" width={1080} height={1350} className="w-full h-auto md:hidden" />
      <Image src="/images/banner_pase_embarque.png" alt="ArgenVisa - Tu visa, sin vueltas. Visas para Estados Unidos y Canadá" width={3840} height={1440} className="w-full h-auto hidden md:block" />
      <ServiceList />
      <TestVisa />
      <AboutUs />
      <ContactForm />
    </main>
  );
}
