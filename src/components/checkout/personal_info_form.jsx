import { User } from 'lucide-react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], weight: ['100','200','300','400','500','700','900'] });

const PersonalInfoForm = ({ data, onChange }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  return (
    <div className={`${inter.className} space-y-6`}>
      <div className="flex items-center gap-2 pb-4 border-b border-gray-200">
        <User className="w-5 h-5 text-slate-700" />
        <h2 className="text-md font-medium text-slate-700">
          Datos del solicitante principal
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
            Nombre *
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={data.nombre}
            onChange={handleInputChange}
            className="text-sm w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="Tu nombre"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="apellido" className="block text-sm font-medium text-gray-700">
            Apellido *
          </label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            value={data.apellido}
            onChange={handleInputChange}
            className="text-sm w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="Tu apellido"
            required
          />
        </div>

        <div className="md:col-span-2 space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={data.email}
            onChange={handleInputChange}
            className="text-sm w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="tu@email.com"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">
            Teléfono *
          </label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            value={data.telefono}
            onChange={handleInputChange}
            className="text-sm w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="+54 11 1234-5678"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="documento" className="block text-sm font-medium text-gray-700">
            Documento *
          </label>
          <input
            type="text"
            id="documento"
            name="documento"
            value={data.documento}
            onChange={handleInputChange}
            className="text-sm w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="DNI/Pasaporte"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;