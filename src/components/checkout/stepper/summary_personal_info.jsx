const SummaryPersonalInfo = ({ personalInfo, onEdit }) => (
  <div className="bg-gray-50 rounded-lg p-4 mb-6">
    <h3 className="font-medium text-gray-900 mb-3">Resumen de tus datos</h3>
    <div className="space-y-2 text-sm">
      <div><span className="font-medium">Nombre:</span> {personalInfo.nombre} {personalInfo.apellido}</div>
      <div><span className="font-medium">Email:</span> {personalInfo.email}</div>
      <div><span className="font-medium">Teléfono:</span> {personalInfo.telefono}</div>
      <div><span className="font-medium">Pasaporte:</span> {personalInfo.documento}</div>
    </div>
    <button 
      onClick={onEdit}
      className="hover:cursor-pointer mt-3 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
    >
      Modificar datos
    </button>
  </div>
);

export default SummaryPersonalInfo;
