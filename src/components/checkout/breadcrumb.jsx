import { ChevronLeft } from 'lucide-react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], weight: ['100','200','300','400','500','700','900'] });

const Breadcrumb = () => {
  return (
    <div className={`${inter.className} py-4`}>
      <a 
        href="/usa" 
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        Visas Estados Unidos
      </a>
    </div>
  );
};

export default Breadcrumb;