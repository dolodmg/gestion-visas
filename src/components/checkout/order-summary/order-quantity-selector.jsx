import { Minus, Plus } from 'lucide-react';

const OrderQuantitySelector = ({ quantity, onQuantityChange, allowsVariableQuantity, min = 2, max = 10 }) => {
  if (!allowsVariableQuantity) {
    return (
      <div className="mb-4">
        <span className="font-medium">Cantidad:</span> {quantity}
      </div>
    );
  }

  const handleDecrease = () => {
    if (quantity > min) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < max) {
      onQuantityChange(quantity + 1);
    }
  };

  return (
    <div className="mb-4">
      <label className="font-medium text-sm block mb-2">Cantidad de personas</label>
      <div className="flex items-center gap-3">
        <button
          onClick={handleDecrease}
          disabled={quantity <= min}
          className="w-10 h-10 flex items-center justify-center rounded-lg border-2 border-gray-300 bg-white disabled:opacity-40 disabled:cursor-not-allowed active:bg-gray-100 transition-colors"
          aria-label="Disminuir cantidad"
        >
          <Minus className="w-5 h-5" />
        </button>
        
        <span className="text-xl font-semibold min-w-[2rem] text-center">
          {quantity}
        </span>
        
        <button
          onClick={handleIncrease}
          disabled={quantity >= max}
          className="w-10 h-10 flex items-center justify-center rounded-lg border-2 border-gray-300 bg-white disabled:opacity-40 disabled:cursor-not-allowed active:bg-gray-100 transition-colors"
          aria-label="Aumentar cantidad"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default OrderQuantitySelector;