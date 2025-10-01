import { Inter } from 'next/font/google';
import { useCheckout } from '@/context/checkout_context';
import SecurityNote from '../security_note';

const inter = Inter({ subsets: ['latin'], weight: ['100','200','300','400','500','700','900'] });

const PersonalInfoStep = () => {
  const { personalInfo, updatePersonalInfo, nextStep, isPersonalInfoValid } = useCheckout();
  const handleChange = (field, value) => {
    updatePersonalInfo({ [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isPersonalInfoValid) {
      nextStep();
    }
  };

  return (
    <div className={`${inter.className}`}>
      <h2 className="text-md md:text-xl font-semibold text-gray-900 mb-2 md:mb-6">
        Datos personales
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre *
            </label>
            <input
              type="text"
              value={personalInfo.nombre}
              onChange={(e) => handleChange('nombre', e.target.value)}
              className="text-sm w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingresá tu nombre"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Apellido *
            </label>
            <input
              type="text"
              value={personalInfo.apellido}
              onChange={(e) => handleChange('apellido', e.target.value)}
              className="text-sm w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingresa tu apellido"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            type="email"
            value={personalInfo.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="text-sm w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="tu@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Teléfono *
          </label>
          <input
            type="tel"
            value={personalInfo.telefono}
            onChange={(e) => handleChange('telefono', e.target.value)}
            className="text-sm w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="+54 11 1234-5678"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Número de pasaporte *
          </label>
          <input
            type="text"
            value={personalInfo.documento}
            onChange={(e) => handleChange('documento', e.target.value)}
            className="text-sm w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="ABC123456"
          />
        </div>
        <SecurityNote />

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={!isPersonalInfoValid}
            className={`
              px-6 py-2 rounded-xl font-normal transition-colors
              ${isPersonalInfoValid
                ? 'bg-slate-900 text-white hover:bg-slate-950 hover:cursor-pointer'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }
            `}
          >
            Siguiente
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfoStep;