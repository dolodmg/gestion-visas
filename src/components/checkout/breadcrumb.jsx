import { ChevronLeft } from 'lucide-react';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'], weight: ['100','200','300','400','500','700','900'] });

const Breadcrumb = ({href, titleBreadcrumb}) => {
  return (
    <div className={`${inter.className} py-4`}>
      <Link 
        href={href}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        {titleBreadcrumb}
      </Link>
    </div>
  );
};

export default Breadcrumb;