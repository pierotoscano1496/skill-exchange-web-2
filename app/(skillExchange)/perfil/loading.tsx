import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Columna de información del perfil */}
      <div className="md:col-span-1">
        <div className="p-6">
          <div className="flex flex-col items-center">
            <Skeleton className="h-24 w-24 rounded-full mb-4" />
            <Skeleton className="h-6 w-40 mb-2" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-5 w-48" />
            </div>
            <div className="flex items-center gap-3">
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-5 w-32" />
            </div>
            <div className="flex items-center gap-3">
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-5 w-40" />
            </div>
          </div>
          <div className="mt-6 pt-6 border-t">
            <Skeleton className="h-5 w-24 mb-4" />
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Skeleton className="h-5 w-5 rounded" />
                <Skeleton className="h-5 w-48" />
              </div>
              <div className="flex items-center gap-3">
                <Skeleton className="h-5 w-5 rounded" />
                <Skeleton className="h-5 w-48" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Columna principal con pestañas */}
      <div className="md:col-span-2">
        <div className="p-0">
          <div className="w-full">
            <div className="w-full rounded-none border-b flex">
              <Skeleton className="h-10 flex-1" />
              <Skeleton className="h-10 flex-1" />
              <Skeleton className="h-10 flex-1" />
            </div>

            {/* Contenido de la pestaña */}
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <Skeleton className="h-7 w-48" />
                <Skeleton className="h-9 w-24" />
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-9 w-full" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-9 w-full" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-9 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-16 w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}