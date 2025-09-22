const FEATURES = {
  standard: [
    'Carga del formulario DS-160', 
    'Explicación detallada sobre el proceso de solicitud', 
    'Agenda de citas en el CAS y embajada'
  ],
  premium: [
    'Carga del formulario DS-160', 
    'Explicación detallada sobre el proceso de solicitud', 
    'Agenda de citas en el CAS y embajada',
    'Videollamada personalizada'
  ],
  family: [
    'Carga del formulario DS-160 para cada miembro', 
    'Explicación detallada sobre el proceso de solicitud', 
    'Agenda de citas en el CAS y embajada', 
    'Asesoría especializada en grupos'
  ],
};

const getType = (serviceName) => {
  if (serviceName?.toLowerCase().includes('familiar')) return 'family';
  if (serviceName?.toLowerCase().includes('premium')) return 'premium';
  return 'standard';
};

const OrderFeatures = ({ serviceName }) => {
  const type = getType(serviceName);
  const features = FEATURES[type] || [];
  return (
    <div className="mb-4">
      <h3 className="font-semibold mb-2">Lo que incluye tu servicio:</h3>
      <ul className="list-disc pl-5 text-sm text-gray-700">
        {features.map((f, i) => (
          <li key={i}>{f}</li>
        ))}
      </ul>
    </div>
  );
};

export default OrderFeatures;
