const PaymentOption = ({ option, isSelected, onSelect, children }) => {
  return (
    <div
      className={`
        border-2 rounded-xl p-4 cursor-pointer transition-all duration-200
        ${isSelected 
          ? 'border-blue-300' 
          : 'border-gray-200 hover:border-blue-300'
        }
      `}
      onClick={onSelect}
    >
      <div className="flex items-center gap-4">
        <input
          type="radio"
          name="payment"
          checked={isSelected}
          onChange={() => {}}
          className="w-5 h-5 text-blue-600"
        />

        {option.logoType === 'image' ? (
          <img src={option.logo} alt={option.name} className="w-4 h-4 object-contain" />
        ) : (
          <option.logo className="w-4 h-4 text-slate-700" />
        )}

        <div className="flex-1">
          <div className="font-medium text-sm text-gray-900">{option.name}</div>
          <div className="text-sm text-gray-600">{option.description}</div>
        </div>
      </div>

      {isSelected && children && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          {children}
        </div>
      )}
    </div>
  );
};

export default PaymentOption;