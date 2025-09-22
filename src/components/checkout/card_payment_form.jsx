import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], weight: ['100','200','300','400','500','700','900'] });

const CardPaymentForm = ({ data, onChange }) => {
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value) => {
    const v = value.replace(/\D/g, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 6);
    }
    return v;
  };

  const handleInputChange = (field, value) => {
    let formattedValue = value;
    
    if (field === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    } else if (field === 'expiry') {
      formattedValue = formatExpiry(value);
    } else if (field === 'cvv') {
      // Solo números, máximo 4 dígitos
      formattedValue = value.replace(/\D/g, '').substring(0, 4);
    } else if (field === 'cardHolder') {
      // Solo letras y espacios, convertir a mayúsculas
      formattedValue = value.replace(/[^a-zA-Z\s]/g, '').toUpperCase();
    } else if (field === 'docNumber') {
      // Solo números para documento
      formattedValue = value.replace(/\D/g, '');
    }
    
    onChange(field, formattedValue);
  };

  const installmentOptions = [
    { value: '1', label: '1 cuota sin interés' },
    { value: '3', label: '3 cuotas sin interés' },
    { value: '6', label: '6 cuotas (recargo 5%)' },
    { value: '12', label: '12 cuotas (recargo 12%)' }
  ];

  const documentTypes = [
    { value: 'dni', label: 'DNI' },
    { value: 'cuit', label: 'CUIT' },
    { value: 'cuil', label: 'CUIL' },
    { value: 'pasaporte', label: 'Pasaporte' }
  ];

  return (
    <div className={`${inter.className} space-y-4`}>
      {/* Número de tarjeta */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Número de tarjeta *
        </label>
        <input
          type="text"
          value={data.cardNumber}
          onChange={(e) => handleInputChange('cardNumber', e.target.value)}
          className="text-sm w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          placeholder="1234 5678 9012 3456"
          maxLength="19"
          required
        />
      </div>

      {/* Titular de la tarjeta */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Titular de la tarjeta *
        </label>
        <input
          type="text"
          value={data.cardHolder}
          onChange={(e) => handleInputChange('cardHolder', e.target.value)}
          className="text-sm w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          placeholder="Juan Perez"
          required
        />
        <p className="text-xs text-gray-500">Como aparece en la tarjeta</p>
      </div>

      {/* Vencimiento y CVV */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Vencimiento *
          </label>
          <input
            type="text"
            value={data.expiry}
            onChange={(e) => handleInputChange('expiry', e.target.value)}
            className="text-sm w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="MM/AAAA"
            maxLength="7"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            CVV *
          </label>
          <input
            type="text"
            value={data.cvv}
            onChange={(e) => handleInputChange('cvv', e.target.value)}
            className="text-sm w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="123"
            maxLength="4"
            required
          />
        </div>
      </div>

      {/* Cuotas */}
      {/*
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Cuotas
        </label>
        <select
          value={data.installments}
          onChange={(e) => onChange('installments', e.target.value)}
          className="text-sm w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        >
          {installmentOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      */}

      {/* Documento del titular */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Tipo de documento *
          </label>
          <select
            value={data.docType}
            onChange={(e) => onChange('docType', e.target.value)}
            className="text-sm w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            required
          >
            {documentTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Número de documento *
          </label>
          <input
            type="text"
            value={data.docNumber}
            onChange={(e) => handleInputChange('docNumber', e.target.value)}
            className="text-sm w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="12345678"
            required
          />
        </div>
      </div>

      {/* Tarjetas aceptadas */}
      <div className="flex items-center gap-3 pt-3 border-t border-gray-200">
        <span className="text-sm text-gray-600">Tarjetas aceptadas:</span>
        <div className="flex items-center gap-2">
          {/* Visa */}
          <div className="w-8 h-6 bg-blue-600 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">V</span>
          </div>
          
          {/* Mastercard */}
          <div className="w-8 h-6 bg-red-600 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">M</span>
          </div>
          
          {/* American Express */}
          <div className="w-8 h-6 bg-blue-500 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">A</span>
          </div>
          
          {/* Cabal */}
          <div className="w-8 h-6 bg-purple-600 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">C</span>
          </div>
        </div>
      </div>

      {/* Nota de seguridad */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
        <div className="flex items-start gap-2">
          <div className="text-green-600 mt-0.5">
            🔒
          </div>
          <div className="text-sm text-green-800">
            <p className="font-medium mb-1">Pago 100% seguro</p>
            <p className="text-green-700">
              Tu información está protegida.
              No almacenamos datos de tu tarjeta.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPaymentForm;