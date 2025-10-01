import { Checkbox } from '@/components/ui/checkbox';

const VideocallAddon = ({ isSelected, onSelectionChange, disabled = false }) => {
  const VIDEOCALL_PRICE_USD = 10;

  const handleCheckboxChange = (checked) => {
    if (!disabled) {
      onSelectionChange(checked);
    }
  }
  return (
    <div className="flex items-center flex-row gap-2">
          <div onClick={(e) => e.stopPropagation()}>
            <Checkbox
              id="videocall-addon"
              checked={isSelected}
              onCheckedChange={handleCheckboxChange}
              disabled={disabled}
              className="hover:cursor-pointer h-4 w-4 border-2 border-green-600 data-[state=checked]:bg-white data-[state=checked]:text-green-600 data-[state=checked]:border-green-600"
            />
          </div>
          <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm font-normal text-green-700">
                  Agregar videollamada
                </h3>
              <p className='text-sm font-bold text-green-700'>
                +${VIDEOCALL_PRICE_USD} USD
              </p>
            </div>
        </div>
  );
};

export default VideocallAddon;