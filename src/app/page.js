import TestVisa from '@/components/home/test_visa';
import ContactForm from '@/components/home/contact_form';
import ServiceList from '@/components/home/service_list';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="bg-white min-h-screen flex items-center justify-center flex-col">
      <Image src="/images/banner_pelotas.319Z.png" alt="Banner Visa" width={2816} height={1320} className="w-full h-auto" />
      <ServiceList />
      <TestVisa />
      <ContactForm />
    </main>
  );
}
