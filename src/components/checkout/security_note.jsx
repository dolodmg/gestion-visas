import { Shield } from 'lucide-react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], weight: ['100','200','300','400','500','700','900'] });

const SecurityNote = () => {
  return (
    <div className={`${inter.className} bg-blue-50 border border-slate-300 rounded-lg p-4`}>
      <div className="flex items-start gap-3">
        <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
        <div className="text-sm text-blue-800">
          <p className="font-semibold mb-1">Información importante:</p>
          <p>
            Utilizamos estos datos para enviarte la información y guiarte en el proceso. 
            Es fundamental que revises que sean correctos.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SecurityNote;