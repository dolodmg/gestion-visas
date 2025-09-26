import { Input } from '@/components/ui/input';

const OrderQuantitySelector = ({ quantity, onQuantityChange, allowsVariableQuantity, min = 1, max = 10 }) => {
  if (!allowsVariableQuantity) {
    return (
      <div className="mb-4">
        <span className="font-medium">Cantidad:</span> {quantity}
      </div>
    );
  }
  return (
    <div className="mb-4">
      <label className="font-medium text-sm mr-2" htmlFor="quantity">Cantidad de personas</label>
      <Input
        id="quantity"
        type="number"
        min={min}
        max={max}
        value={quantity}
        onChange={e => onQuantityChange(Number(e.target.value))}
        className="w-20 mt-1"
      />
    </div>
  );
};

export default OrderQuantitySelector;
