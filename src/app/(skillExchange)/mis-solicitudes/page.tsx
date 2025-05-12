export default function SolicitudesPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Solicitudes</h1>
      <p className="text-muted-foreground">
        Gestione y dé seguimiento a todas sus solicitudes.
      </p>

      <div className="flex gap-4 mt-4">
        <button className="px-4 py-2 rounded-md bg-primary text-primary-foreground">
          Nueva solicitud
        </button>
        <button className="px-4 py-2 rounded-md bg-muted text-muted-foreground">
          Filtrar
        </button>
      </div>

      <div className="mt-6 rounded-xl bg-muted/50 p-6">
        <h2 className="text-xl font-semibold mb-4">Solicitudes activas</h2>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between border-b pb-2"
            >
              <div>
                <p className="font-medium">Solicitud #{30000 + i}</p>
                <p className="text-sm text-muted-foreground">
                  Estado:{" "}
                  {i === 1
                    ? "Nueva"
                    : i === 2
                      ? "En proceso"
                      : i === 3
                        ? "Pendiente de aprobación"
                        : "En revisión"}
                </p>
              </div>
              <div className="flex gap-2">
                <button className="text-sm px-3 py-1 rounded-md bg-primary text-primary-foreground">
                  Ver detalles
                </button>
                <button className="text-sm px-3 py-1 rounded-md bg-muted text-muted-foreground">
                  Actualizar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
