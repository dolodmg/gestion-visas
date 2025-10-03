import { Skeleton } from "@/components/ui/skeleton";

const CheckoutSkeleton = () => {
  return (
    <div className="bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Breadcrumb skeleton */}
        <div className="py-4">
          <Skeleton className="h-4 w-48" />
        </div>

        {/* Header skeleton */}
        <div className="md:mb-6">
          <Skeleton className="h-8 w-64 mb-4" />
          
          {/* Stepper skeleton - Mobile */}
          <div className="flex flex-col gap-2 items-center justify-center md:hidden mb-8">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-2 w-3/4" />
          </div>

          {/* Stepper skeleton - Desktop */}
          <div className="hidden md:flex items-center justify-between mb-8">
            <div className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <Skeleton className="w-10 h-10 rounded-full" />
                <Skeleton className="h-4 w-32 mt-2" />
              </div>
              <Skeleton className="flex-1 h-0.5 mx-4" />
            </div>
            <div className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <Skeleton className="w-10 h-10 rounded-full" />
                <Skeleton className="h-4 w-32 mt-2" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-8 mb-2">
          {/* Order Summary skeleton */}
          <div className="lg:col-span-1 order-1 md:order-2">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <Skeleton className="h-6 w-40 mb-4" />
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-px w-full my-4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-px w-full my-4" />
                <Skeleton className="h-6 w-full" />
              </div>
            </div>
          </div>

          {/* Form skeleton */}
          <div className="lg:col-span-2 order-2 md:order-1">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <Skeleton className="h-6 w-48 mb-6" />
              
              {/* Form fields */}
              <div className="space-y-4">
                {/* Nombre y Apellido */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Skeleton className="h-4 w-20 mb-2" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <div>
                    <Skeleton className="h-4 w-20 mb-2" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <Skeleton className="h-4 w-16 mb-2" />
                  <Skeleton className="h-10 w-full" />
                </div>

                {/* Teléfono */}
                <div>
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-10 w-full" />
                </div>

                {/* Pasaporte */}
                <div>
                  <Skeleton className="h-4 w-36 mb-2" />
                  <Skeleton className="h-10 w-full" />
                </div>

                {/* Security note */}
                <Skeleton className="h-16 w-full rounded-lg" />

                {/* Button */}
                <div className="flex justify-end pt-4">
                  <Skeleton className="h-10 w-32 rounded-xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSkeleton;