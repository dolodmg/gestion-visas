import TestVisa from '@/components/home/test_visa';
import ContactForm from '@/components/home/contact_form';
import ServiceList from '@/components/home/service_list';
import AboutUs from '@/components/home/about_us';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="bg-white min-h-screen flex items-center justify-center flex-col">
      <Image src="/images/banner.png" alt="ArgenVisa - Gestión de visas para EEUU y Canadá"  width={2816} height={1044} className="w-full h-auto" />
      <ServiceList />
      <TestVisa />
      <AboutUs />
      <ContactForm />
    </main>
  );
}
