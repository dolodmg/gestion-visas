import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const OrderHeader = ({ serviceName, imageConfig }) => {
    const getServiceType = (serviceName) => {
        if (serviceName?.toLowerCase().includes('familiar')) return 'family';
        else return "standard";
    };
    const serviceType = getServiceType(serviceName);
 
    return (
        <div className="flex items-center gap-3 pb-4 border-b border-gray-200 mb-6">
            <Avatar className="h-16 w-16 border-1 border-slate-600">
                <AvatarImage src={imageConfig.image} alt={imageConfig.alt} />
                <AvatarFallback className="text-2xl">{imageConfig.fallback}</AvatarFallback>
            </Avatar>
            <div>
                <div className={`font-semibold text-gray-900 text-md`}>
                    {serviceName}
                </div>
                <div className="text-sm text-gray-600">
                    {serviceType == 'family' ? 'Servicios para grupo familiar' : 'Servicio individual'}
                </div>
            </div>
        </div>
    );
};

export default OrderHeader;
